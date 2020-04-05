class Player extends Collidable{

	constructor() {
		super();
		this.hasGravity = true;
	}

	setTexture(texture) {
		this.texture = texture;

		this.hitbox.setPos(this.pos);
		this.hitbox.move(-texture.width / 2, -texture.height / 2);
		this.hitbox.setSize(texture.width, texture.height);
		this.isMovable = true;
	}

	setMirrored(bool) {
		this.isMirrored = bool;
	}

	jump(height) {
		let newVelY = 0;

		while (height > 0) {
			height += newVelY;
			newVelY -= gravity;
		}

		this.velY = newVelY;
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

		this.hitbox.display();
	}
}