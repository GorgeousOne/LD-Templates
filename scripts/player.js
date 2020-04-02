
//new p5();
class Player {

	constructor() {

		this.pos = createVector();
		this.bounds = new BoundingBox();
		
		this.isOnGround = false;
		this.velY = 0;
	}

	setTexture(texture) {
		this.texture = texture;
		
		this.bounds.setPos(this.pos.copy());
		this.bounds.move(-texture.width/2, -texture.height/2);
		this.bounds.setSize(texture.width, texture.height);
	}

	setMirrored(bool) {
		this.isMirrored = bool;
	}

	moveX(dx) {
		this.pos.add(dx, 0);
		this.bounds.move(dx, 0);
	}

	moveY(dy) {
		this.pos.add(0, dy);
		this.bounds.move(0, dy);
	}

	physics() {

		this.velY += accY;
		this.moveY(velY);
	}

	display() {

		if(!this.texture)
			return;

		translate(this.pos);

		if (this.isMirrored)
			scale(-1, 1);

		image(this.texture, -this.texture.width/2, -this.texture.width/2);

		if (this.isMirrored)
			scale(-1, 1);

		translate(this.pos.copy().mult(-1));

		this.bounds.display();
	}
}
