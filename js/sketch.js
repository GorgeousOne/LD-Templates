new p5();

let player;
let level;
let physicsHandler;
let camera;
let text;

const startTime = Date.now();

function setup() {

	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();
	colorMode(RGB);

	player = new Player(20, 22);
	player.setPos(450, 50);

	loadImage('assets/gengar-walking.png', img => {
		let sprite = createSprite(loadTexFile('assets/gengar-walking.txt'), img)
		player.setTexture(sprite);
	});

	level = new Stage(loadImage('assets/library.png', img => {
		level.setTexture(img);
		//camera.zoom = width / level.texture.width;
	}));

	let ledge = new Ledge(createVector(400, 350), 100, 10);
	let floor = new Ledge(createVector(200, 455), 700, 10);

	let box1 = new Box(10, 10, 20);
	box1.setPos(350, 0);


	let box2 = new Box(20, 20, 1);
	box2.setPos(550, 0);

	physicsHandler = new PhysicsHandler();
	physicsHandler.addCollidable(player);
	physicsHandler.addCollidable(ledge);
	physicsHandler.addCollidable(floor);
	physicsHandler.addCollidable(box1);
	physicsHandler.addCollidable(box2);

	camera = new Camera();
	camera.target = player;
	camera.followTargetX = true;
	//camera.followTargetY = true;
	camera.setOffset(0, -0.1666);
	camera.zoom = 1.5;
	camera.setPos(0, 370);

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

	physicsHandler.collidables.forEach(collidable => {
		if(collidable !== player)
			collidable.hitbox.display()
	});

	player.display();
	//text.display(createVector(400, 250));
}

function movePlayer() {

	if (keyIsDown(LEFT_ARROW)) {
		player.moveX(-speed);
		player.setMirrored(false);
		player.isWalking = true;
	}

	if (keyIsDown(RIGHT_ARROW)) {
		player.moveX(speed);
		player.setMirrored(true);
		player.isWalking = true;
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