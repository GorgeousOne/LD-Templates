class Collidable {

	constructor(width, height) {

		this.pos = createVector();
		this.hitbox = new Hitbox(this.pos, width, height);

		this.velX = 0;
		this.velY = 0;

		this.hasGravity = false;
		this.isOnGround = false;
		this.isMovable = false;

		this.lastGround = null;

		this.weight = 1;
		this.surfaceFriction = 1; //0.02;
	}

	setPos(x, y) {
		this.pos.set(x, y);
		this.hitbox.setPos(x, y);
	}

	updateX() {

		//makes sure that it doesnt accidentally move away from others while not in motion
		if(abs(this.velY) > 0.001) {
			this.moveX(this.velX, true);

			if (this.isOnGround)
				this.velX *= 1 - this.lastGround.surfaceFriction;
		}
	}


	moveX(dx, moveOthers) {

		if (!this.isMovable)
			return 0;

		this._translateX(dx);
		let otherCollidable = physicsHandler.getCollision(this);

		if (otherCollidable === undefined)
			return dx;

		let signX = signum(dx);
		let intersection = otherCollidable.hitbox.getBoundX(-signX) - this.hitbox.getBoundX(signX);

		this._translateX(intersection);

		if (!otherCollidable.isMovable || !moveOthers) {
			this.velX = 0;
			return dx + intersection;
		}

		let impulseX = this.velX * (this.weight / otherCollidable.weight);
		otherCollidable.velX = impulseX;
		let actualMoveX = otherCollidable.moveX(impulseX, false);

		this.velX = actualMoveX;
		this._translateX(actualMoveX);
	}

	updateY() {

		if(abs(this.velY) > 0.001) {
			this.isOnGround = false;
			this.moveY(this.velY);
		}
	}

	moveY(dy) {

		if (!this.isMovable)
			return 0;

		this._translateY(dy);
		let otherCollidable = physicsHandler.getCollision(this);

		if (otherCollidable === undefined)
			return dy;

		let signY = signum(dy);
		let intersection = otherCollidable.hitbox.getBoundY(-signY) - this.hitbox.getBoundY(signY);

		this._translateY(intersection);
		this.velY = 0;

		if (signY === 1) {
			this.isOnGround = true;
			this.lastGround = otherCollidable;
		}

		return dy + intersection;
	}

	_translateX(dx) {
		this.pos.add(dx, 0);
		this.hitbox.move(dx, 0);
	}

	_translateY(dy) {
		this.pos.add(0, dy);
		this.hitbox.move(0, dy);
	}
}