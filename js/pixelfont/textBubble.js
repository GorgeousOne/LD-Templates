class TextBubble {

	constructor(text, bubbleWidth) {

		this.text = text;
		this.bubbleWidth = bubbleWidth;

		this.paddingX = 3;
		this.paddingY = 3;
		this.lineSpacing = 1;
	}

	display(pos) {

		if (LetterImages.size === 0)
			return;

		if (this.textLines === undefined)
			this.createLines();

		fill(255);
		stroke(0);
		strokeWeight(1);

		rect(pos.x, pos.y, this.bubbleWidth, this.bubbleHeight);
		let cursorPos = createVector(pos.x + this.paddingX, pos.y + this.paddingY);

		for (let line of this.textLines) {
			for (let i = 0; i < line.length; i++) {

				let nextChar = line.charAt(i);
				let charImg = LetterImages.get(nextChar);

				image(charImg, cursorPos.x, cursorPos.y);
				cursorPos.add(charImg.width + 1, 0);
			}
			cursorPos.add(0, letterHeight + this.lineSpacing);
			cursorPos.x = pos.x + this.paddingX;
		}
	}

	createLines() {
		this.bubbleWidth = max(this.bubbleWidth, this.widestWord(this.text) + 2 * this.paddingX);
		this.textLines = this.getTextLines(this.text, this.bubbleWidth - 2 * this.paddingX);
		this.bubbleHeight = this.textLines.length * (letterHeight + this.lineSpacing) - this.lineSpacing + 2 * this.paddingY;
	}

	widestWord(text) {
		let words = text.split(' ');
		let wordWidths = words.map(function (word) {
			return getWidth(word)
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