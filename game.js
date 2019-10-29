//Creates Gameport.
var gameport = document.getElementById("gameport");

// Creates Renderer.
var renderer = PIXI.autoDetectRenderer(1000, 700, {backgroundColor: 0x000000});

//Renders Gameport.
gameport.appendChild(renderer.view);

//Sets global variables and scenes.
var enemySpawnTimer = 20000;
var stuckShip = 4;
var level = 1;
var titleScreen = new PIXI.Container();
var creditsScreen = new PIXI.Container();
var instructionsScreen = new PIXI.Container();
var endScreen = new PIXI.Container();
var stage = new PIXI.Container();

PIXI.loader
  .add("assets.json").load(ShipMove);

  function ShipMove(){

    var frames = [];
    for (var i=1; i<=5; i++){
      frames.push(PIXI.Texture.fromFrame('PlayerShip' + i + '.png'));
    }
      flying = new PIXI.extras.MovieClip(frames);
      flying.animationSpeed = 0.1;
      flying.play;
  }
  
//Create enemy ship objects.
  var eship1 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship1.position.x = 0;
  eship1.position.y = 0;
  stage.addChild(eship1);

  var eship2 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship2.position.x = 100;
  eship2.position.y = 0;
  stage.addChild(eship2);

  var eship3 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship3.position.x = 200;
  eship3.position.y = 0;
  stage.addChild(eship3);

  var eship4 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship4.position.x = 300;
  eship4.position.y = 0;
  stage.addChild(eship4);

  var eship5 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship5.position.x = 400;
  eship5.position.y = -100;
  stage.addChild(eship5);

  var eship6 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship6.position.x = 500;
  eship6.position.y = 0;
  stage.addChild(eship6);

  var eship7 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship7.position.x = 600;
  eship7.position.y = 0;
  stage.addChild(eship7);

  var eship8 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship8.position.x = 700;
  eship8.position.y = 0;
  stage.addChild(eship8);

  var eship9 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship9.position.x = 800;
  eship9.position.y = 0;
  stage.addChild(eship9);

  var eship10 = new PIXI.Sprite(PIXI.Texture.fromImage("EnemyShip.png"));
  eship10.position.x = 900;
  eship10.position.y = 0;
  stage.addChild(eship10);

  var pship = new PIXI.Sprite(PIXI.Texture.fromImage("PlayerShip.png"));
  pship.position.x = 400;
  pship.position.y = 600;
  stage.addChild(pship);

//Randomly selects a ship to not move.
function getStuckShip(){
    stuckShip = Math.floor(Math.random() * 10);
  }

  //Chooses location to spawn ship depending on whether ship is stuck or not (stuck ships get put off screen).
function spawnShip(eship, shippos, stuckShip, xpos){
  if(stuckShip == shippos)
  {
    eship.position.y = -100;
  }
  else{
    eship.position.y = 0;
  }
  eship.position.x = xpos;
}

//Resets enemy wave to the top of the game screen.
function resetEnemyWave(eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10){

  if(enemySpawnTimer > 10000){
    enemySpawnTimer -= 5000;
  }
  else(enemySpawnTimer > 1000)
    {
    enemySpawnTimer -= 500;
    }
    
  clearInterval(resetTimer);
  //clearInterval(moveTimer);
  resetTimer  = setInterval(resetEnemyWave, enemySpawnTimer, eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);
  //moveTimer = setInterval(moveEnemyWave, (enemySpawnTimer/7), eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);
  stuckShip = 5;
  getStuckShip(stuckShip);
  spawnShip(eship1, 0, stuckShip, 0);
  spawnShip(eship2, 1, stuckShip, 100);
  spawnShip(eship3, 2, stuckShip, 200);
  spawnShip(eship4, 3, stuckShip, 300);
  spawnShip(eship5, 4, stuckShip, 400);
  spawnShip(eship6, 5, stuckShip, 500);
  spawnShip(eship7, 6, stuckShip, 600);
  spawnShip(eship8, 7, stuckShip, 700);
  spawnShip(eship9, 8, stuckShip, 800);
  spawnShip(eship10, 9, stuckShip, 900);
  moveEnemyWave(eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);
  level = level+1;
  //score.text = "LEVEL: " + level;
}

//Checks to see if an enemy ship is on top of the player.
function enemyWithPlayer(ship1, ship2){
  if(ship1.position.x == ship2.position.x && ship1.position.y == ship2.position.y){
    return true;
  }
  return false;
}

//Checks if enemy has gotten to player, resets game if yes.
function enemyExecutePlayer(eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10) {
  if(enemyWithPlayer(pship, eship1) || enemyWithPlayer(pship, eship2) || enemyWithPlayer(pship, eship3) || enemyWithPlayer(pship, eship4) || enemyWithPlayer(pship, eship5) || 
  enemyWithPlayer(pship, eship6) || enemyWithPlayer(pship, eship7) || enemyWithPlayer(pship, eship8) || enemyWithPlayer(pship, eship9) || enemyWithPlayer(pship, eship10))
  {
    clearInterval(resetTimer);
    //clearInterval(moveTimer);
    enemySpawnTimer = 25000;
    resetEnemyWave(eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);
    pship.position.x = 500;
    pship.position.y = 600;
    level = 0;
  } 
}

//Moves enemy wave down.
function moveEnemyWave(eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10){
  if(stuckShip != 0){
    //eship1.position.y += 100;
    createjs.Tween.get(eship1.position).to({x: eship1.position.x, y: eship1.position.y+700}, enemySpawnTimer);
  }
  if(stuckShip != 1){
    //eship2.position.y += 100;
    createjs.Tween.get(eship2.position).to({x: eship2.position.x, y: eship2.position.y+700}, enemySpawnTimer);

  }if(stuckShip != 2){
    //eship3.position.y += 100;
    createjs.Tween.get(eship3.position).to({x: eship3.position.x, y: eship3.position.y+700}, enemySpawnTimer);

  }if(stuckShip != 3){
    //eship4.position.y += 100;
    createjs.Tween.get(eship4.position).to({x: eship4.position.x, y: eship4.position.y+700}, enemySpawnTimer);

  }if(stuckShip != 4){
    //eship5.position.y += 100;
    createjs.Tween.get(eship5.position).to({x: eship5.position.x, y: eship5.position.y+700}, enemySpawnTimer);
  }if(stuckShip != 5){
    //eship6.position.y += 100;
    createjs.Tween.get(eship6.position).to({x: eship6.position.x, y: eship6.position.y+700}, enemySpawnTimer);
  }if(stuckShip != 6){
   //eship7.position.y += 100;
   createjs.Tween.get(eship7.position).to({x: eship7.position.x, y: eship7.position.y+700}, enemySpawnTimer);
  }if(stuckShip != 7){
    //eship8.position.y += 100;
    createjs.Tween.get(eship8.position).to({x: eship8.position.x, y: eship8.position.y+700}, enemySpawnTimer);
  }if(stuckShip != 8){
    //eship9.position.y += 100;
    createjs.Tween.get(eship9.position).to({x: eship9.position.x, y: eship9.position.y+700}, enemySpawnTimer);
  }if(stuckShip != 9){
    //eship10.position.y += 100;
    createjs.Tween.get(eship10.position).to({x: eship10.position.x, y: eship10.position.y+700}, enemySpawnTimer);
  }
  enemyExecutePlayer(eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);
}

//Moves ship depending on player input.
function keydownEventHandler(e) {

  if (e.keyCode == 68 && pship.position.x != 900) { // D Key (right)
  pship.position.x += 100;
  }

  if (e.keyCode == 65 && pship.position.x != 0) { // A key (left)
  pship.position.x -= 100;
  }

  if (e.keyCode == 13){
    enemySpawnTimer = 25000;
    level = 0;
    resetEnemyWave(eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);
    pship.position.x = 500;
    pship.position.y = 600;
    
  }
}



//Adds listener for keyboard input.
document.addEventListener('keydown', keydownEventHandler);

//Initially sets the enemy wave timer.
resetTimer = setInterval(resetEnemyWave, enemySpawnTimer, eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);
//moveTimer = setInterval(moveEnemyWave, (enemySpawnTimer/7), eship1, eship2, eship3, eship4, eship5, eship6, eship7, eship8, eship9, eship10);


// Below functions pick scene to render.
function animateStage() {
  requestAnimationFrame(animate);
  renderer.render(stage);
}

function animateTitle() {
    requestAnimationFrame(animate);
    renderer.render(titleScreen);
}

function animateEnd() {
    requestAnimationFrame(animate);
    renderer.render(endScreen);
}

function animateInsructions() {
    requestAnimationFrame(animate);
    renderer.render(instructionsScreen);
}

function animateCredits() {
    requestAnimationFrame(animate);
    renderer.render(creditsScreen);
}

animateStage();