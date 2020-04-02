
class CollisionHandler {

	constructor() {
		this.collidables = [];
	}

	addCollidable(collidable) {
		this.collidables.push(collidable);
	}

	getCollision(collidable) {

		for (const other of this.collidables) {

			if(collidable.getBounds().intersects(other.getBounds()))
				return other.getBounds();
		}
		return undefined;
	}
}
