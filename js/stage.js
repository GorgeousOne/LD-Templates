class Stage {

	constructor() {
		this.hitbox = new HitBox(createVector(), 1, 1);
	}

	setTexture(texture) {
		this.texture = texture;
		this.hitbox.setSize(texture.width, texture.height);
	}

	display() {

		if (!this.texture)
			return;

		image(this.texture, 0, 0);
	}
}