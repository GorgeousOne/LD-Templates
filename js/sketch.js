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
	player.setPos(450, 310);

	loadImage('assets/gengar-walking.png', img => {
		let sprite = createSprite(loadTexFile('assets/gengar-walking.txt'), img)
		player.setTexture(sprite);
	});

	level = new Stage(loadImage('assets/library.png', img => {
		level.setTexture(img);
	}));

	let ledge = new Ledge(createVector(400, 350), 100, 10);
	let floor = new Ledge(createVector(200, 455), 700, 10);


	physicsHandler = new PhysicsHandler();
	physicsHandler.addCollidable(player);
	physicsHandler.addCollidable(ledge);
	physicsHandler.addCollidable(floor);

	for(let i = 2; i < 8; i++) {
		let box1 = new Box(10, random(10) + 50, 2);
		box1.setPos(i*100, 0);

		if(i === 5) {
			box1.hitbox.outline = color(128);
			box1.isMovable = false;
			box1.setPos(i*100, 400);
		}

		physicsHandler.addCollidable(box1);
	}

	camera = new Camera();
	camera.target = player;
	camera.followTargetX = true;
	camera.followTargetY = true;
	//camera.setOffset(0, -0.1666);
	camera.zoom = 1.5;
	camera.setPos(0, 370);

	text = new TextBubble('Normal words: iiiiiiiii mmmmmmmm > < >', 10);

	//frameRate(4);

	console.log(physicsHandler.collidables.length + " collidables");
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

	player.display();
	text.display(createVector(400, 250));
}

let speed = 2;
let maxSpeed = 2;

function movePlayer() {

	if (keyIsDown(LEFT_ARROW))
		player.walk(-speed, maxSpeed);

	if (keyIsDown(RIGHT_ARROW))
		player.walk(speed, maxSpeed);

	if (keyIsDown(UP_ARROW))
		if (player.isOnGround)
			player.jump(110);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function signum(f) {
	if (f > 0) return 1;
	if (f < 0) return -1;
	return 0;
}