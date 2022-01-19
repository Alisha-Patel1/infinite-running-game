var turtle, turtleImage;
var sea, seaImage;
var pearl, pearlImage;
var treasure, treasureImage;

var obstaclesGroup, shark, jellyfish, anglerFish;

var gameOver, gameOverImage;
var score;


function preload(){
    seaImage = loadImage("sea.jpg");
    turtleImage = loadImage("turtle.png");
    pearlImage = loadImage("pearl.png");
    treasureImage = loadImage("treasure.png");

    sharkImage = loadImage("shark.png");
    jellyfishImage = loadImage("jellyfish.png");
    anglerFishImage = loadImage("anglerFish.png");

    gameOverImage = loadImage("gameOver.png");
}

function setup() {
 createCanvas(900, 600)

 turtle = createSprite(50,160,20,50);

 sea = createSprite(450,300);
  sea.addImage("sea",seaImage);
  sea.x = sea.width /2;
 sea.scale = 2.3



 gameOver = createSprite(300,100);
 gameOver.addImage(gameOverImage);
 gameOver.scale = 0.5;

 obstaclesGroup = createGroup();
 score = 0;

}

function draw() {
 background(180)
 text("Score: "+ score, 500,50);

 if(gameState === PLAY){

    gameOver.visible = false;
   
    
    sea.velocityX = -(4 + 3* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    
    
    
    if (sea.x < 0){
      sea.x = sea.width/2;
    }
    
    
    if(keyDown(UP_ARROW)) {
        turtle.velocityY = -12;
        
    }
    if(keyDown(DOWN_ARROW)) {
        turtle.velocityY = 12;
        
    }

  
    turtle.velocityY = turtle.velocityY + 0.8
  
   
  
    
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(turtle)){
       gameState = END;
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      sea.velocityX = 0;
      turtle.velocityY = 0
      
     
      
    obstaclesGroup.setLifetimeEach(-1);
     obstaclesGroup.setVelocityXEach(0);
    
     
   }
  
  
  if(mousePressedOver(gameOver)) {
      reset();
    }

 drawSprites()

}
function reset(){
    gameState=PLAY
    obstaclesGroup.destroyEach()
    score=0 
   
   }
   function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -(6 + score/100);
      
       //generate random obstacles
       var rand = Math.round(random(1,6));
       switch(rand) {
         case 1: obstacle.addImage(shark);
                 break;
         case 2: obstacle.addImage(jellyfish);
                 break;
         case 3: obstacle.addImage(anglerFish);
         default: break; 
       }
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
}