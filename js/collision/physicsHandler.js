const gravity = 0.2;
const maxVel = 50;

class PhysicsHandler {

	constructor() {
		this.collidables = [];
	}

	addCollidable(collidable) {
		this.collidables.push(collidable);
	}

	applyPhysics() {

		for (let collidable of this.collidables) {

			if (collidable.hasGravity)
				collidable.velY = constrain(collidable.velY + gravity, -maxVel, maxVel);

			collidable.updateX();
			collidable.updateY();
		}
	}

	getCollision(collidable) {

		for (const other of this.collidables) {

			if (other === collidable)
				continue;

			if(collidable.hitbox.intersects(other.hitbox))
				return other;
		}
	}
}
