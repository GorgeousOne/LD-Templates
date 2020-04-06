class Camera {

	constructor() {
		this.target = undefined;

		this.pos = createVector();
		this.focusOffset = createVector();

		this.followTargetX = false;
		this.followTargetY = false;

		this.zoom = 1;
	}

	setPos(x, y) {
		this.pos.set(x, y);
	}

	setOffset(relX, relY) {
		this.focusOffset.set(relX, relY)
	}

	focus() {

		if(this.followTargetX)
			this.pos.x = this.target.pos.x;
		if(this.followTargetY)
			this.pos.y = this.target.pos.y;

		translate(width/2, height/2);
		translate(-this.focusOffset.x * width, -this.focusOffset.y * height);

		scale(this.zoom);

		translate(-this.pos.x, -this.pos.y);

	}
}