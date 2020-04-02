
class Player {

	constructor() {

		this.pos = createVector();
		this.bounds = new BoundingBox(this.pos, 0, 0);
		this.velY = 0;
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

	moveX(dx) {
		this.pos.add(dx, 0);
		this.bounds.move(dx, 0);

		let otherBounds = collisionHandler.getCollision(this);

		if (otherBounds !== undefined) {

			let tooFar = otherBounds.getBound(-signum(dx), 0) - this.bounds.getBound(signum(dx), 0);
			this.pos.add(tooFar, 0);
			this.bounds.move(tooFar, 0);
		}
	}

	moveY(dy) {
		this.pos.add(0, dy);
		this.bounds.move(0, dy);

		let otherBounds = collisionHandler.getCollision(this);

		if (otherBounds !== undefined) {

			let tooFar = otherBounds.getBound(0, -signum(dy)) - this.bounds.getBound(0, signum(dy));
			this.pos.add(0, tooFar);
			this.bounds.move(0, tooFar);
			this.velY *= -0.4;
		}
	}

	physics() {

		this.valY = constrain(this.velY, -1, 1);
		this.velY += accY;
		this.moveY(this.velY);
	}

	getBounds() {
		return this.bounds;
	}

	display() {

		if (!this.texture)
			return;

		this.physics();

		translate(round(this.pos.x), round(this.pos.y));

		if (this.isMirrored)
			scale(-1, 1);

		image(this.texture, -this.texture.width / 2, -this.texture.width / 2);

		if (this.isMirrored)
			scale(-1, 1);

		translate(round(-this.pos.x), round(-this.pos.y));

		this.bounds.display();
	}
}