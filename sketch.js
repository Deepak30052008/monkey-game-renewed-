
var monkey , monkeyanimation,on,ground;
var banana ,bananaImage, obstacle, obstacleImage,dash;
var FoodGroup, obstacleGroup,crash;
var score=0
var PLAY=1
var END=0
var gameState=1;
var survivaltime=0
function preload(){
  
  
  monkeyanimation =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
 
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  dash=loadAnimation("sprite_4.png")
 
}



function setup() {
  createCanvas(600,300); 
 monkey=createSprite(100,250,10,10);
 monkey.addAnimation("running",monkeyanimation);
  monkey.addAnimation("d",dash)
  monkey.debug=true;
  monkey.setCollider("rectangle",50,0,2,monkey.height)
  monkey.scale=0.1;
  on=createSprite(300,291.5,600,20)
  on.visible=false;
  foodGroup=createGroup();
  obstacleGroup=createGroup()
    ground=createSprite(300,290,600,20);
  

}


function draw() {
background("skyblue");
  text("score - "+ score,500,20);
  text("survival time - "+ survivaltime,500,40);
  if(gameState===1){
      if(keyDown("space")&&monkey.y>=250){
    monkey.velocityY=-15;

  }  
    monkey.changeAnimation("running",monkeyanimation);
  obstacles();
  bananas();
  survivaltime=survivaltime+Math.round(getFrameRate()/60)
  if(foodGroup.isTouching(monkey)){
    score=score+1;
    foodGroup.destroyEach();
  }
    
    if(obstacleGroup.isTouching(monkey)){
       gameState=END;
      obstacleGroup.setVelocityXEach(0);
      foodGroup.setVelocityXEach(0);
       }
  }
  if(gameState===0){
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("d",dash)
    text ("Press R to restart",300,150);
    if(keyDown("r")){
      reset();
    }
  }
  monkey.velocityY=monkey.velocityY+1
  monkey.collide(on);

  drawSprites();
}


function obstacles(){
if(frameCount%60===0){
  obstacle=createSprite(610,260,50,50)
  obstacle.velocityX=-(10+score/2);
  obstacle.addImage(obstacleImage)
  obstacle.scale=0.169;
  obstacle.lifetime=60;
  obstacleGroup.add(obstacle);
}
}

function bananas(){
  if(frameCount%60===0){
    banana=createSprite(610,170,20,20)
    banana.velocityX=-(10+score/2);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.lifetime=60;
    foodGroup.add(banana);
     
     }
}


function reset(){
  gameState=PLAY;
  score=0;
  survivaltime=0;
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
}