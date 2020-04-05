
class Box extends Collidable{

	constructor(width, height, weight) {
		super();

		this.hasGravity = true;
		this.isMovable = true;
		this.hitbox.setSize(width, height);
		this.weight = weight;
	}
}