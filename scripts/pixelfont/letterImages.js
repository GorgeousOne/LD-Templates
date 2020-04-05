
const LetterImages = new Map();

loadImage('scripts/pixelfont/pixel-font.min.png', img => this.loadLetters(img))

function loadLetters(img) {

	for (let [char, extent] of Letters.entries())
		LetterImages.set(char, img.get(extent.x, extent.y, extent.w, extent.h))
}

function getWidth(word) {

	let width = 0;

	for (let i = 0; i < word.length; i++) {
		if(i !== 0) width += 1;
		width += LetterImages.get(word.charAt(i)).width;
	}

	return width;
}