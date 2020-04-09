new p5();

let player;
let level;
let physicsHandler;
let camera;
let text;

let gustav;

const startTime = Date.now();

function setup() {

	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();
	colorMode(RGB);

	player = new Player(20, 22);
	player.setPos(450, 310);

	loadImage('assets/gengar-walking.png', img => {

		loadTexFile('assets/gengar-walking.txt', texFile => {

			let sprite = createSprite(img, texFile);
			player.setTexture(sprite);

		})
	});

	level = new Stage();
	loadImage('assets/library.png', img => level.setTexture(img));

	physicsHandler = new PhysicsHandler();
	physicsHandler.addCollidable(player);
	physicsHandler.addCollidable(new Ledge(createVector(400, 350), 100, 10));
	physicsHandler.addCollidable(new Ledge(createVector(200, 455), 700, 10));

	camera = new Camera(player);
	camera.followTargetX = true;
	camera.followTargetY = true;
	camera.zoom = 1.5;

	// gustav = new NPC();

	text = new TextBubble('Normal words with more are less e\'s in it: iiiiiiiii mmmmmmmm > < >', 10, color(255, 0, 0), color(128, 0, 0));
}


function draw() {

	movePlayer();
	physicsHandler.applyPhysics();

	background(0);
	camera.focus();

	level.display();

	noFill();
	stroke(255, 0, 0);

	physicsHandler.collidables.forEach(collidable => {
		// if(collidable !== player)
			collidable.hitbox.display()
	});

	text.display(createVector(400, 250));
	player.display();
}

let speed = 2;
let maxSpeed = 2;

function movePlayer() {

	if (keyIsDown(LEFT_ARROW))
		player.walk(-speed, maxSpeed);

	if (keyIsDown(RIGHT_ARROW))
		player.walk(speed, maxSpeed);

	if (keyIsDown(UP_ARROW))
		player.jump(110);
}

function keyReleased() {
	if(keyCode === UP_ARROW)
		player.hasJumpedOnce = false;
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function signum(f) {
	if (f > 0) return 1;
	if (f < 0) return -1;
	return 0;
}