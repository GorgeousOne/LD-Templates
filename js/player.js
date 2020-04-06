class Player extends Collidable {

	constructor(width, height) {
		super(width, height);

		this.isMovable = true;
		this.hasGravity = true;
		this.isWalking = false;

		this.hitbox.move(-width/2, -height/2);
	}

	setTexture(sprite) {
		this.sprite = sprite;
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

		if (!this.sprite)
			return;

		translate(this.pos.x, this.pos.y);

		if (this.isMirrored)
			scale(-1, 1);


		let tex = this.sprite.getFrame(this.isOnGround && this.isWalking ? Date.now() - startTime : 0);
		image(tex, -tex.width / 2, -tex.height/2);

		if (this.isMirrored)
			scale(-1, 1);

		translate(-this.pos.x, -this.pos.y);

		this.isWalking = false;
	}
}