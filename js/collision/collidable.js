class Collidable {

	constructor(width, height, hasGravity = false, surfaceFriction = 1) {

		this.pos = createVector();
		this.hitbox = new Hitbox(this.pos, width, height);

		this.velX = 0;
		this.velY = 0;

		this.hasGravity = hasGravity;
		this.surfaceFriction = surfaceFriction;

		this._isOnGround = false;
		this._lastGround = null;
	}

	setPos(x, y) {
		this.pos.set(x, y);
		this.hitbox.setPos(x, y);
	}

	updateX() {
		//makes sure that it doesnt accidentally move away from others while not in motion
		if(abs(this.velY) > 0.001) {
			this.moveX(this.velX);

			if (this._isOnGround)
				this.velX *= 1 - this._lastGround.surfaceFriction;
		}
	}


	moveX(dx) {

		this._translateX(dx);
		let otherCollidable = physicsHandler.getCollision(this);

		if (otherCollidable === undefined)
			return dx;

		let signX = signum(dx);
		let intersection = otherCollidable.hitbox.getBoundX(-signX) - this.hitbox.getBoundX(signX);

		this._translateX(intersection);
	}

	updateY() {

		if(abs(this.velY) > 0.001) {
			this._isOnGround = false;
			this.moveY(this.velY);
		}
	}

	moveY(dy) {

		this._translateY(dy);
		let otherCollidable = physicsHandler.getCollision(this);

		if (otherCollidable === undefined)
			return dy;

		let signY = signum(dy);
		let intersection = otherCollidable.hitbox.getBoundY(-signY) - this.hitbox.getBoundY(signY);

		this._translateY(intersection);
		this.velY = 0;

		if (signY === 1) {
			this._isOnGround = true;
			this._lastGround = otherCollidable;
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