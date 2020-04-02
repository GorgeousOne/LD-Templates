new p5();

let player;
let level;
let collisionHandler;
let ledge;

function setup() {

	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();
	colorMode(RGB);

	player = new Player(loadImage('../assets/genga.png', img => {
		player.setTexture(img);
	}));

	level = new Stage(loadImage('../assets/library.png', img => {
		level.setTexture(img)
		player.moveX(level.texture.width / 2);
		player.moveY(level.texture.height * 1 / 9);
	}));

	playerCenter = createVector(width / 2, height * 8 / 9);

	ledge = new Ledge(createVector(400, 350), 100, 10);

	collisionHandler = new CollisionHandler();
	//collisionHandler.addCollidable(player);
	collisionHandler.addCollidable(ledge);

	//frameRate(20);
	stroke(255, 0, 0);
	noFill();
}

let playerCenter;
let followPlayer = false;
let speed = 2;
let accY = 0.1;

function draw() {

	background(0);
	movePlayer();

	if (followPlayer)
		translate(playerCenter);

	if (level.texture)
		scale(width / level.texture.width);

	if (followPlayer)
		translate(p5.Vector.mult(player.pos, -1));


	level.display();
	ledge.display();
	player.display();
}

function movePlayer() {

	if (keyIsDown(LEFT_ARROW)) {
		player.moveX(-speed);
		player.setMirrored(false);
	}

	if (keyIsDown(RIGHT_ARROW)) {
		player.moveX(speed);
		player.setMirrored(true);
	}

	if (keyIsDown(UP_ARROW)) {
		player.velY -= 0.2;
	}

	if (keyIsDown(DOWN_ARROW))
		player.moveY(speed);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function signum(f) {
	if (f > 0) return 1;
	if (f < 0) return -1;
	return 0;
}