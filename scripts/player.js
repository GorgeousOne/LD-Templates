class Player {

	constructor() {
		this.pos = createVector();
		this.bounds = new BoundingBox(this.pos, 0, 0);

		this.velY = 0;
		this.isOnGround = false;
	}

	setTexture(texture) {
		this.texture = texture;

		this.bounds.setPos(this.pos);
		this.bounds.move(-texture.width / 2, -texture.height / 2);
		this.bounds.setSize(texture.width, texture.height);
	}

	setMirrored(bool) {
		this.isMirrored = bool;
	}

	setPos(x, y) {
		this.pos.add(x, y);
		this.bounds.move(x, y);
	}

	moveX(dx) {
		this.pos.add(dx, 0);
		this.bounds.move(dx, 0);

		let otherBounds = collisionHandler.getCollision(this);

		if (otherBounds !== undefined) {

			let tooFar = otherBounds.getBoundX(-signum(dx)) - this.bounds.getBoundX(signum(dx));
			this.pos.add(tooFar, 0);
			this.bounds.move(tooFar, 0);
		}
	}

	moveY(dy) {

		this.pos.add(0, dy);
		this.bounds.move(0, dy);
		this.isOnGround = false;

		let otherBounds = collisionHandler.getCollision(this);

		if (otherBounds !== undefined) {

			let signY = signum(dy);

			let tooFar = otherBounds.getBoundY(-signY) - this.bounds.getBoundY(signY);
			this.pos.add(0, tooFar);
			this.bounds.move(0, tooFar);
			this.velY = 0;

			if (signY === 1)
				this.isOnGround = true;
		}
	}

	jump(velocity) {
		this.velY = -abs(velocity);
	}

	physics() {
		this.velY = constrain(this.velY + accY, -10, 10);
		this.moveY(this.velY);
	}

	display() {

		if (!this.texture)
			return;

		translate(this.pos.x, this.pos.y);

		if (this.isMirrored)
			scale(-1, 1);

		image(this.texture, -this.texture.width / 2, -this.texture.width / 2);

		if (this.isMirrored)
			scale(-1, 1);

		translate(-this.pos.x, -this.pos.y);

		this.bounds.display();
	}
}