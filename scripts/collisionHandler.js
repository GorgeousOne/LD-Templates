class CollisionHandler {

	constructor() {
		this.collidables = [];
	}

	addCollidable(collidable) {
		this.collidables.push(collidable);
	}

	getCollision(collidable) {

		for (const other of this.collidables) {
			if (collidable.bounds.intersects(other.bounds))
				return other.bounds;
		}
		return undefined;
	}
}
