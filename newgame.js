// Se screen constants
var SCREEN_WIDTH = 800;
var SCREEN_HEIGHT = 80000;
var SCREEN_SCALE = 4;
var DIM = 16;


// Create game port.
var gameport = window.document.getElementById("gameport");
var renderer = new PIXI.autoDetectRenderer(SCREEN_WIDTH, SCREEN_HEIGHT, {backgroundColor: 0x99D5FF});
gameport.appendChild(renderer.view);


// Creat main stage and screens.
var stage = new PIXI.Container();
stage.scale.x = SCREEN_SCALE;
stage.scale.y = SCREEN_SCALE;

var titleScreen = new PIXI.Container();
var creditsScreen = new PIXI.Container();
var instructionsScreen = new PIXI.Container();
var gameScreen = new PIXI.Container();
var endScreen = new PIXI.Container();
var stage = new PIXI.Container();
/*
var title;
var credits;
var game;
var end;
var instructions;
var playButton;
var instructionsButton
var backButton;
var creditsButton;
*/

// Create object variables
var pship;
var world;
var spawn;
var eship;


// Set flying constants
var FLY_LEFT = 1;
var FLY_RIGHT = 2;
var FLY_UP = 3;
var FLY_DOWN = 4;
var FLY_NONE = 0;

// Load assets and tile map.
PIXI.loader
.add('mainmaptile1.json')
.add('tileset.png')
.add("PlayerShipMove1.png")
.add("assets.json").load(ShipMove)
.load(ready);


// Creates World.
function ready() {
createjs.Ticker.setFPS(60);
var tu = new TileUtilities(PIXI);
world = tu.makeTiledWorld("mainmaptile1.json", "tileset.png");
stage.addChild(world);

pship = new PIXI.Sprite(PIXI.loader.resources["PlayerShipMove1.png"].texture);
pship.gx = 9;
pship.gy = 5;
pship.x = pship.gx*DIM;
pship.y = pship.gy*DIM;
pship.anchor.x = 0.0;
pship.anchor.y = 1.0;

pship.direction = FLY_STILL;
pship.flying = false;
animate();
}


/*
function loadtitle()
{
	
	playButton = new PIXI.Sprite(PIXI.Texture.fromFrame("playButton.png"));
	playButton.scale.x = 2;
	playButton.scale.y = 2;
	playButton.position.x = 20;
    playButton.position.y = 300;
	
	creditsButton = new PIXI.Sprite(PIXI.Texture.fromFrame("creditsButton.png"));
	creditsButton.scale.x = 2;
	creditsButton.scale.y = 2;
	creditsButton.position.x = 210;
    creditsButton.position.y = 300;
    
    instructionsButton = new PIXI.Sprite(PIXI.Texture.fromFrame("guideButton.png"));
	instructionsButton.scale.x = 2;
	instructionsButton.scale.y = 2;
	instructionsButton.position.x = 120;
    instructionsButton.position.y = 300;
	
	playButton.interactive = true;
	playButton.on('mousedown', mouseHandler);
	
	instructionsButton.interactive = true;
	instructionsButton.on('mousedown', mouseHandler);
	
	creditsButton.interactive = true;
	creditsButton.on('mousedown', mouseHandler);
	
	titleScreen.addChild(title);
	titleScreen.addChild(playButton);
	titleScreen.addChild(instructionsButton);
	titleScreen.addChild(creditsButton);
	stage.addChild(titleScreen);
	animate();
}

function loadGame()
{
	game = new PIXI.Sprite(PIXI.Texture.fromFrame("background.png"));
	game.scale.x = SCREEN_SCALE;
	game.scale.y = SCREEN_SCALE;
	game.position.x = 0;
    game.position.y = 0;
	gameScreen.addChild(game);
	stage.addChild(gameScreen);
	animate();
}

function loadGuide()
{
	instructionsScreen = new PIXI.Sprite(PIXI.Texture.fromFrame("background.png"));
	instructionsScreen.scale.x = SCREEN_SCALE;
	instructionsScreen.scale.y = SCREEN_SCALE;
	instructionsScreen.position.x = 0;
    instructionsScreen.position.y = 0;
	
	backButton = new PIXI.Sprite(PIXI.Texture.fromFrame("backButton"));
	backButton.scale.x = 1;
	backButton.scale.y = 1;
	backButton.position.x = 220;
    backButton.position.y = 310;
    
	backButton.interactive = true;
	backButton.on('mousedown', mouseHandler);
	
	instructionsScreen.addChild(instructions);
	instructionsScreen.addChild(backButton);
	stage.addChild(instructionsScreen);
	animate();
}

function loadCredits()
{
	creditsScreen = new PIXI.Sprite(PIXI.Texture.fromFrame("background.png"));
	creditsScreen.scale.x = SCREEN_SCALE;
	creditsScreen.scale.y = SCREEN_SCALE;
	creditsScreen.position.x = 0;
	creditsScreen.position.y = 0;
	
	backButton = new PIXI.Sprite(PIXI.Texture.fromFrame("backButton.png"));
	backButton.scale.x = 1;
	backButton.scale.y = 1;
	backButton.position.x = 200;
	backButton.position.y = 300;
	
	backButton.interactive = true;
	backButton.on('mousedown', mouseHandler);
	
	creditsScreen.addChild(credits);
	creditsScreen.addChild(backButton);
	stage.addChild(creditScreen);
}

function loadEnd()
{
	endScreen = new PIXI.Sprite(PIXI.Texture.fromFrame("background.png"));
	endScreen.scale.x = SCREEN_SCALE;
	endScreen.scale.y = SCREEN_SCALE;
	endScreen.position.x = 0;
	endScreen.position.y = 0;
	
	backButton = new PIXI.Sprite(PIXI.Texture.fromFrame("backButton.png"));
	backButton.scale.x = 1;
	backButton.scale.y = 1;
	backButton.position.x = 200;
	backButton.position.y = 300;

	backButton.interactive = true;
	backButton.on('mousedown', mouseHandler);
	
	endScreen.addChild(end);
	endScreen.addChild(backButton);
	stage.addChild(endScreen);
	animate();
}	
*/
// Plays frames for moving ship.
  function ShipMove(){

    var frames = [];
    for (var i=1; i<=5; i++){
      frames.push(PIXI.Texture.fromFrame('PlayerShip' + i + '.png'));
    }
      flying = new PIXI.extras.MovieClip(frames);
      flying.animationSpeed = 0.1;
      flying.play;
  }


  // Flys ship from depending on user input.
function fly() {

  if (pship.direction == FLY_STILL) {
    pship.flying = false;
    return;
  }

  var dx = 0;
  var dy = 0;

  if (pship.direction == FLY_LEFT) dx -= 1;
  if (pship.direction == FLY_RIGHT) dx += 1;
  if (pship.direction == FLY_UP) dy -= 1;  
  if (pship.direction == FLY_DOWN) dy += 1;

  pship.gx += dx;
  pship.gy += dy;

  pship.flying = true;
  
  createjs.Tween.get(pship).to({x: pship.gx*DIM, y: pship.gy*DIM}, 250).call(move);

}

// Gets user input for flying ship.
window.addEventListener("keydown", function (e) {
    
    if (e.keyCode == 87)
      pship.direction = FLY_UP;
    else if (e.keyCode == 83)
      pship.direction = FLY_DOWN;
    else if (e.keyCode == 65)
      pship.direction = FLY_LEFT;
    else if (e.keyCode == 68)
      pship.direction = FLY_RIGHT;
  
    move();
  });

  
  PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
  
  // Creates stage with camera.
  function animate(timestamp) {
    requestAnimationFrame(animate);
    update_camera();
    renderer.render(stage);
  }
  
  // Keeps camera on player.
  function update_camera() {
    stage.x = -pship.x*SCREEN_SCALE + SCREEN_WIDTH/2 - pship.width/2*SCREEN_SCALE;
    stage.y = -pship.y*SCREEN_SCALE + SCREEN_HEIGHT/2 + pship.height/2*SCREEN_SCALE;
    stage.x = -Math.max(0, Math.min(world.worldWidth*SCREEN_SCALE - SCREEN_WIDTH, -stage.x));
    stage.y = -Math.max(0, Math.min(world.worldHeight*SCREEN_SCALE - SCREEN_HEIGHT, -stage.y));
  }