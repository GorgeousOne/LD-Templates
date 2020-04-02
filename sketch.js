new p5();


let player;
let level;

let collidables;

function setup() {

	createCanvas(windowWidth, windowHeight, P2D);
	fullscreen();
	noSmooth();

	level = new Stage(loadImage('assets/library.png', img => level.setTexture(img)))
	player = new Player(loadImage('assets/example_img.png', img => {
			player.setTexture(img);
			player.moveX(level.texture.width/2)
			player.moveY(level.texture.height * 8/9);
			playerCenter = createVector(width/2, height * 8/9);
		}));
}

let playerCenter;
let followPlayer = false;
let speed = 2;
let accY = 1;

function draw() {

	background(0);
	movePlayer();

	if(followPlayer)
		translate(playerCenter);
	
	if(level.texture)
		scale(width / level.texture.width);

	if(followPlayer)
		translate(player.pos.copy().mult(-1))

	level.display();	
	player.display();
}

function movePlayer() {

	if(keyIsDown(LEFT_ARROW)) {
		player.moveX(-speed);
		player.setMirrored(false);
	}

	if(keyIsDown(RIGHT_ARROW)) {
		player.moveX(speed);   
		player.setMirrored(true);
	}

	if(keyIsDown(UP_ARROW))
		player.moveY(-speed);

	if(keyIsDown(DOWN_ARROW))
		player.moveY(speed);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}