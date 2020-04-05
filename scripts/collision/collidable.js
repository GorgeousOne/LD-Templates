class Collidable {

	constructor() {

		this.pos = createVector();
		this.hitbox = new HitBox(this.pos, 1, 1);

		this.hasGravity = false;
		this.velY = 0;

		this.isOnGround = false;
		this.isMovable = false;

		this.weight = 1;
	}

	setPos(x, y) {
		this.pos.add(x, y);
		this.hitbox.move(x, y);
	}

	moveX(dx) {

		if(!this.isMovable)
			return dx;

		this.pos.add(dx, 0);
		this.hitbox.move(dx, 0);

		let otherCollidable = physicsHandler.getCollision(this);
		if (otherCollidable === undefined)
			return dx;

		let signX = signum(dx);
		let otherBox = otherCollidable.hitbox;
		let intersection = otherBox.getBoundX(-signX) - this.hitbox.getBoundX(signX);

		this.pos.add(intersection, 0);
		this.hitbox.move(intersection, 0);

		if(!otherCollidable.isMovable)
			return dx + intersection;

		let impulseX = this.weight / (otherCollidable.weight + this.weight) * -intersection;
		let actualMovementX = otherCollidable.moveX(impulseX);

		this.pos.add(actualMovementX, 0);
		this.hitbox.move(actualMovementX, 0);
		return actualMovementX;
	}

	moveY(dy) {

		this.pos.add(0, dy);
		this.hitbox.move(0, dy);
		this.isOnGround = false;

		let otherCollidable = physicsHandler.getCollision(this);
		if (otherCollidable === undefined)
			return dy;

		let signY = signum(dy);
		let otherBox = otherCollidable.hitbox;
		let intersection = otherBox.getBoundY(-signY) - this.hitbox.getBoundY(signY);

		this.pos.add(0, intersection);
		this.hitbox.move(0, intersection);

		this.velY = 0;

		if(signY === 1)
			this.isOnGround = true;

		return dy + intersection;
	}
}