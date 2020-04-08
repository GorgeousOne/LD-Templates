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

	walk(speed, maxSpeed) {

		if (this.lastGround !== null)
			speed *= this.lastGround.surfaceFriction ;

		this.velX += speed;
		this.velX = constrain(this.velX, -maxSpeed, maxSpeed);

		this.setMirrored(speed > 0);
		this.isWalking = true;
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

		translate(this.pos.x + this.hitbox.width/2, this.pos.y + this.hitbox.height/2);


		if (this.isMirrored)
			scale(-1, 1);

		let tex = this.sprite.getFrame(this.isOnGround && this.isWalking ? Date.now() - startTime : 0);
		image(tex, -tex.width / 2, -tex.height/2);

		if (this.isMirrored)
			scale(-1, 1);

		translate(-this.pos.x - this.hitbox.width/2, -this.pos.y - this.hitbox.height/2);

		this.isWalking = false;
	}
}