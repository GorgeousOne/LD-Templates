class BoundingBox {

	constructor(pos, width, height) {

		this.pos = pos.copy();
		this.width = width;
		this.height = height;
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	setPos(pos) {
		this.pos = pos.copy();
	}

	move(dx, dy) {
		this.pos.add(dx, dy);
	}

	contains(vec) {
		return vec.x > this.pos.x && vec.x < this.pos.x + this.width &&
			vec.y > this.pos.y && vec.y < this.pos.y + this.height;
	}

	getBound(dirX, dirY) {

		if(dirX === -1)
			return this.pos.x;
		else if(dirX === 1)
			return this.pos.x + this.width;
		else if(dirY === -1)
			return this.pos.y;
		else if(dirY === 1)
			return this.pos.y + this.height;
		else
			return undefined;
	}


	intersects(otherBox) {

		for (let vertex of otherBox.getVertices()) {
		    if (this.contains(vertex))
		        return true;
        }

        for (let vertex of this.getVertices()) {
            if (otherBox.contains(vertex))
                return true;
        }

        return false;
	}

	getVertices() {

		return [
			this.pos.copy(),
			this.pos.copy().add(this.width, 0),
			this.pos.copy().add(this.width, this.height),
			this.pos.copy().add(0, this.height),
		]
	}

	display() {
		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}