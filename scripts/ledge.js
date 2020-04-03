class Ledge {

	constructor(pos, width, height) {

		this.pos = pos;
		this.width = width;
		this.height = height;

		this.bounds = new BoundingBox(pos, width, height);
	}

	display() {
		this.bounds.display();
	}
}