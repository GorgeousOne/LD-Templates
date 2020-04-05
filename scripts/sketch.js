new p5();

let player;
let level;
let physicsHandler;
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
		//camera.zoom = width / level.texture.width;
	}));

	let ledge = new Ledge(createVector(400, 350), 100, 10);
	let floor = new Ledge(createVector(200, 450), 700, 10);
	let box = new Box(10, 10, 0);

	player.setPos(450, 50);
	box.setPos(350, 0);

	physicsHandler = new PhysicsHandler();
	physicsHandler.addCollidable(player);
	physicsHandler.addCollidable(ledge);
	physicsHandler.addCollidable(floor);
	//physicsHandler.addCollidable(box);

	camera = new Camera();
	camera.target = player;
	camera.followTargetX = true;
	camera.followTargetY = true;

	text = new TextBubble('Normal words: iiiiiiiii mmmmmmmm > < >', 10);
}

let speed = 2;

function draw() {

	movePlayer();
	physicsHandler.applyPhysics();

	background(0);
	camera.focus();

	level.display();

	noFill();
	stroke(255, 0, 0);

	physicsHandler.collidables.forEach(collidable => collidable.hitbox.display());

	player.display();
	//text.display(createVector(400, 250));
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
			player.jump(100);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function signum(f) {
	if (f > 0) return 1;
	if (f < 0) return -1;
	return 0;
}