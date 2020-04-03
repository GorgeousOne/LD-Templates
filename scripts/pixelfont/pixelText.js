
class PixelText {

	constructor(text) {
		this.text = text;
	}

	display(pos, width) {

		fill(255);
		stroke(255);
		strokeWeight(1);

		let padX = 3;
		let padY = 3;

		rect(pos.x, pos.y, width, 13);

		let cursorPos = createVector(pos.x + padX, pos.y + padY);

		for (let i = 0; i < this.text.length; i++) {

			let nextChar = this.text.charAt(i);
			let charImg = LetterImages.get(nextChar);

			if(!charImg)
				continue;

			image(charImg, cursorPos.x, cursorPos.y);
			cursorPos.add(charImg.width + 1, 0);
		}
	}
}