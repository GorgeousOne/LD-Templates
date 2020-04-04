
const LetterImages = new Map();

loadImage('scripts/pixelfont/pixel-font.min.png', img => this.loadLetters(img))

function loadLetters(img) {

	for (let [char, extent] of Letters.entries())
		LetterImages.set(char, img.get(extent.x, extent.y, extent.w, extent.h))
}
