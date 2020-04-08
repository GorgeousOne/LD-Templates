class Hitbox {

	constructor(pos, width, height) {

		this.pos = pos.copy();
		this.width = width;
		this.height = height;
		this.outline = color(255, 0, 0)
	}

	setSize(width, height) {
		this.width = width;
		this.height = height;
	}

	setPos(x, y) {
		this.pos.set(x, y);
	}

	move(dx, dy) {
		this.pos.add(dx, dy);
	}

	minX() {
		return this.pos.x;
	}

	maxX() {
		return this.pos.x + this.width;
	}

	minY() {
		return this.pos.y;
	}

	maxY() {
		return this.pos.y + this.height;
	}

	intersects(otherBox) {
		return this.intersectsX(otherBox) && this.intersectsY(otherBox) ||
			otherBox.intersectsX(this) && otherBox.intersectsY(this);
	}

	intersectsX(otherBox) {
		return this.containsX(otherBox.minX()) || this.containsX(otherBox.maxX()) || otherBox.minX() < this.minX() && otherBox.maxX() > this.maxX();
	}

	intersectsY(otherBox) {
		return this.containsY(otherBox.minY()) || this.containsY(otherBox.maxY()) || otherBox.minY() < this.minY() && otherBox.maxY() > this.maxY();
	}

	containsX(x) {
		return x > this.minX() && x < this.maxX();
	}

	containsY(y) {
		return y > this.minY() && y < this.maxY();
	}

	getBoundX(dir) {
		if (dir === -1)
			return this.minX();
		else if (dir === 1)
			return this.maxX();
	}

	getBoundY(dir) {
		if (dir === -1)
			return this.minY();
		else if (dir === 1)
			return this.maxY();
	}

	display() {

		noFill();
		stroke(this.outline);

		rect(this.pos.x, this.pos.y, this.width, this.height);
	}
}