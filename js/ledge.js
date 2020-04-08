class Ledge extends Collidable {

	constructor(pos, width, height) {
		super();

		this.setPos(pos);
		this.width = width;
		this.height = height;

		this.hitbox = new Hitbox(pos, width, height);
	}

	display() {
		this.hitbox.display();
	}
}