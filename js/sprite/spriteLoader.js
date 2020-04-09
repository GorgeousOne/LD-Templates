
function loadSprite(spritePath, texPath) {

	
}


function loadTexFile(filePath, callback) {

	let result = null;
	let xmlhttp = new XMLHttpRequest();

	xmlhttp.open("GET", filePath, true);

	xmlhttp.onload = function () {

		if (xmlhttp.status === 200)
			result = xmlhttp.responseText;

		callback(result);
	};

	xmlhttp.send();
}

function createSprite(spriteSheet, textFile) {

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