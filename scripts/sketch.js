new p5();

let player;
let level;
let collisionHandler;
let camera;
let text;

function setup() {

	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();
	colorMode(RGB);

	player = new Player(loadImage('assets/genga.png', img => {
		player.setTexture(img);
	}));

	level = new Stage(loadImage('assets/library.png', img => {
		level.setTexture(img);
		player.setPos(level.texture.width / 2, 50);
		camera.zoom = 2; //width / level.texture.width;
	}));

	playerCenter = createVector(width / 2, height * 2 / 3);

	let ledge = new Ledge(createVector(400, 350), 100, 10);
	let floor = new Ledge(createVector(200, 450), 700, 10);

	collisionHandler = new CollisionHandler();
	collisionHandler.addCollidable(level);
	collisionHandler.addCollidable(ledge);
	collisionHandler.addCollidable(floor);

	camera = new Camera();
	camera.target = player;
	camera.followTargetX = true;
	camera.followTargetY = true;

	stroke(255, 0, 0);
	noFill();

	for (let collidable of collisionHandler.collidables)
		collidable.display();

	text = new PixelText('hey sup! +-=()*|<>$'); //'abcdefghijklmnopq');
}

let playerCenter;

let speed = 2;
let accY = 0.2;

function draw() {

	movePlayer();
	player.physics();

	background(0);
	camera.focus();

	level.display();

	noFill();
	stroke(255, 0, 0);

	for (const collidable of collisionHandler.collidables)
		collidable.display();

	player.display();
	text.display(createVector(400, 250), 200);
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

	if (keyIsDown(UP_ARROW))
		if (player.isOnGround)
			player.jump(7);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function signum(f) {
	if (f > 0) return 1;
	if (f < 0) return -1;
	return 0;
}