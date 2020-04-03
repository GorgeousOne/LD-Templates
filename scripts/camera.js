class Camera {

	constructor() {
		this.target = undefined;
		this.focusCenter = createVector(0.5, 0.5);

		this.followTargetX = false;
		this.followTargetY = false;

		this.zoom = 1;
	}

	focus() {

		if(this.followTargetX)
			translate(this.focusCenter.x * width, 0);
		if(this.followTargetY)
			translate(0, this.focusCenter.y * height);

		if(this.zoom !== 1)
			scale(this.zoom);

		if(!this.target)
			return;

		if(this.followTargetX)
			translate(-this.target.pos.x, 0);

		if(this.followTargetY)
			translate(0, -this.target.pos.y)
	}
}