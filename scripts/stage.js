class Stage {

	constructor() {
		this.bounds = new BoundingBox(createVector(), 1, 1);
	}

	setTexture(texture) {
		this.texture = texture;
		this.bounds.setSize(texture.width, texture.height);
		this.bounds.setInverted(true);
	}

	display() {

		if (!this.texture)
			return;

		image(this.texture, 0, 0);
		this.bounds.display();
	}
}