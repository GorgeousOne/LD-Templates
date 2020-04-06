class Box extends Collidable {

	constructor(width, height, weight) {
		super(width, height);

		this.hasGravity = true;
		this.isMovable = true;
		this.weight = weight;
	}
}