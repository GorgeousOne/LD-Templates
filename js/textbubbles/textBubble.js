class TextBubble {

	constructor(text, width, textColor = color(0), background = color(255)) {

		this._text = text;
		this.width = width;

		this.paddingX = 3;
		this.paddingY = 3;
		this.lineSpacing = 1;

		this._textGraphic = null;
		this.textColor = textColor;
		this.background = background;

		this._createTextLines();
	}

	display(pos) {

		if (LetterImages.size === 0)
			return;

		if(this._textGraphic === null)
			this._createTextGraphic();

		fill(this.background);
		stroke(this.textColor);
		strokeWeight(1);
		rect(pos.x, pos.y, this.width, this.height);

		image(this._textGraphic, pos.x + this.paddingX, pos.y + this.paddingY);

		//tint(this.textColor);

		// rect(pos.x, pos.y, this.width, this.height);
		// let cursorPos = createVector(pos.x + this.paddingX, pos.y + this.paddingY);
		//
		// for (let line of this.textLines) {
		// 	for (let i = 0; i < line.length; i++) {
		//
		// 		let nextChar = line.charAt(i);
		// 		let charImg = LetterImages.get(nextChar);
		//
		// 		image(charImg, cursorPos.x, cursorPos.y);
		// 		cursorPos.add(charImg.width + 1, 0);
		// 	}
		// 	cursorPos.add(0, letterHeight + this.lineSpacing);
		// 	cursorPos.x = pos.x + this.paddingX;
		// }
	}

	_createTextLines() {

		this.width = max(this.width, this.widestWord(this._text) + 2 * this.paddingX);
		this._textLines = this.getTextLines(this._text, this.width - 2 * this.paddingX);
		this.height = this._textLines.length * (letterHeight + this.lineSpacing) - this.lineSpacing + 2 * this.paddingY;
	}

	_createTextGraphic() {


		this._textGraphic = createGraphics(
			this.width - 2*this.paddingX,
			this.height - 2*this.paddingY);

		this._textGraphic.noSmooth();
		this._textGraphic.tint(this.textColor);

		let cursorPos = createVector();

		for (let line of this._textLines) {
			for (let i = 0; i < line.length; i++) {

				let nextChar = line.charAt(i);
				let charImg = LetterImages.get(nextChar);

				this._textGraphic.image(charImg, cursorPos.x, cursorPos.y);
				cursorPos.add(charImg.width + 1, 0);
			}
			cursorPos.add(0, letterHeight + this.lineSpacing);
			cursorPos.x = 0;
		}
	}

	widestWord(text) {

		let words = text.split(' ');
		let wordWidths = words.map(function (word) {
			return getWidth(word);
		});

		return wordWidths.reduce(this.greater);
	}

	greater(champ, contender) {
		return (contender > champ) ? contender : champ;
	}

	getTextLines(text, widthLimit) {

		let lines = [];
		let words = text.split(' ');
		let lineWidth = 0;

		for (let word of words) {

			let wordWidth = getWidth(word + ' ');

			if (lineWidth === 0 || lineWidth + wordWidth > widthLimit) {
				lines.push(word + ' ');
				lineWidth = wordWidth;
				continue;
			}

			let lastIndex = lines.length - 1;

			lines[lastIndex] = lines[lastIndex] + word + ' ';
			lineWidth += wordWidth;
		}
		return lines;
	}
}