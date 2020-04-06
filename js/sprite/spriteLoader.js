function loadTexFile(filePath) {

	let result = null;
	let xmlhttp = new XMLHttpRequest();

	xmlhttp.open("GET", filePath, false);
	xmlhttp.send();

	if (xmlhttp.status === 200)
		result = xmlhttp.responseText;

	return result;
}

function createSprite(textFile, spriteSheet) {

	let lines = textFile.split(/\r?\n/);

	if (lines.length < 2) {
		console.log('no frame coordinates defined in tex file.');
		return null;
	}

	let msPerFrame = parseInt(lines[0]);
	let frames = [];

	for (let i = 1; i < lines.length; i++) {
		let imgCoords = lines[i].split(' ').map(coord => parseInt(coord));

		frames.push(spriteSheet.get(
			imgCoords[0],
			imgCoords[1],
			imgCoords[2],
			imgCoords[3]
		));
	}

	return new Sprite(frames, msPerFrame);
}