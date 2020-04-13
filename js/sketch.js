new p5();

let player;
let level;
let physicsHandler;
let camera;

let npcs;
let npcTalkingTo;

let ui;

const startTime = Date.now();

function setup() {

	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();
	colorMode(HSB);

	loadImage('js/dialog/pixel-font.min.png', img => this.loadLetters(img));

	player = new Player(20, 22);
	player.setPos(450, 310);

	loadSprite('assets', 'gengar-walking', sprite => player.setTexture(sprite));

	level = new Stage();
	loadImage('assets/library.png', img => level.setTexture(img));

	physicsHandler = new PhysicsHandler();
	physicsHandler.addCollidable(player);
	physicsHandler.addCollidable(new Ledge(createVector(400, 350), 100, 10));
	physicsHandler.addCollidable(new Ledge(createVector(200, 455), 700, 10));

	camera = new Camera(player);
	camera.followTargetX = true;
	camera.followTargetY = true;
	camera.zoom = 3;

	ui = new UI();
	let button = new Button(50, 50);
	// button.onClick = function () {
	// 	text.textColor = color(random(255), 255, 128);
	// };

	loadImage('assets/key.png', img => button.setTexture(img));
	ui.addButtons(button);

	let hunter = new NPC(20, 40);
	hunter.setDialog(new Dialog("Hello, curious traveller! What are you doing in such a dangerous place? You should look for a safe place for the night. The sun is already standing low, hurry up!", 2, 400, 2));
	hunter.setPos(450, 310);
	loadImage('assets/hunter.png', img => hunter.setTexture(img));

	npcs = [];
	npcs.push(hunter);
}

function draw() {

	physicsHandler.applyPhysics();

	push();
	background(0);
	camera.focus();

	level.display();
	physicsHandler.collidables.forEach(collidable => collidable.hitbox.display());
	npcs.forEach(npc => npc.display());

	player.display();

	if (npcTalkingTo && !npcTalkingTo.hitbox.intersects(player.hitbox)) {
		npcTalkingTo.stopTalking();
		npcTalkingTo = undefined;
	}

	pop();
	ui.display();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function signum(f) {
	if (f > 0) return 1;
	if (f < 0) return -1;
	return 0;
}

function mouseClicked() {
	ui.onMouseClick();
}

function mouseMoved() {
	ui.onMouseMove();
}

function keyPressed() {

	if (key !== 'e')
		return;

	if (npcTalkingTo) {
		npcTalkingTo.talk();
		return;
	}

	for (let npc of npcs) {
		if (npc.hitbox.intersects(player.hitbox)) {
			npcTalkingTo = npc;
			npcTalkingTo.talk();
		}
	}
}