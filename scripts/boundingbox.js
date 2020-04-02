
class BoundingBox {

	constructor() {

		this.pos = createVector();
		this.width = 0;
		this.height = 0;
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	setPos(pos) {
		this.pos = pos;
	}

	move(dx, dy) {
		this.pos.add(dx, dy);
	}

	contains(vec) {
		return vec.x >= this.pos.x && vec.x <= this.pos.x + this.width &&
				vec.y >= this.pos.y && vec.y <= this.pos.x + this.height;
	}

	getCorners() {

		return [
			this.pos.copy(), 
			this.pos.copy().add(this.width, 0),
			this.pos.copy().add(this.width, this.height),
			this.pos.copy().add(0, this.height),
		]
	}

	display() {

		stroke(255, 0, 0);
		noFill();
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}