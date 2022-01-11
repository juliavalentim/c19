//declarando as variáveis
var t_rex, t_rexRunning, t_rexCollide;
var edges;
var ground, groundpng, ground2
var cloud,  cloudimg
var cacto, cactoimg1, cactoimg2, cactoimg3, cactoimg4, cactoimg5, cactoimg6
var pontos = 0
var play = 1
var end = 0
var gameState = play
var cloudgp
var cactogp
var gameOver, gameOverimg
var restart, restartimg
var check
var die
var jump
var record = 0
//preload carrega as mídias do jogo
function preload(){
  //criando a animação do trex
  t_rexRunning = loadAnimation("trex3.png","trex4.png");
  t_rexCollide = loadAnimation("trex_collided.png")
  groundpng = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png")
  cactoimg1 = loadImage("obstacle1.png")
  cactoimg2  = loadImage("obstacle2.png")
  cactoimg3  = loadImage("obstacle3.png")
  cactoimg4  = loadImage("obstacle4.png")
  cactoimg5  = loadImage("obstacle5.png")
  cactoimg6 = loadImage("obstacle6.png")
  gameOverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
  check  = loadSound("checkPoint.mp3")
  die = loadSound("die.mp3")
  jump = loadSound("jump.mp3")
}


//setup faz a configuração
function setup(){
  createCanvas(windowWidth,windowHeight);

  //criando bordas
  edges = createEdgeSprites();
  
  //crie um sprite de trex
  t_rex = createSprite(50,height-50,20,40);
  t_rex.addAnimation("running",t_rexRunning);
  t_rex.addAnimation("collide", t_rexCollide)
  t_rex.scale = 0.5;

  ground = createSprite(width/2,height-15, width, 20)
  ground.addImage(groundpng)
  ground2 = createSprite(width/2,height-5,width,5)
  ground2.visible = false
  cactogp  = new Group()
  cloudgp = new Group()

  t_rex.debug = false
  //t_rex.setCollider("rectangle", 0, 0, 40, 80, 40)
  t_rex.setCollider("circle", 0, 0, 30)
  gameOver = createSprite (height/2,widght-100,50,50)
  gameOver.addImage(gameOverimg)
  
  gameOver.scale = 0.5;
  gameOver.visible = false

  restart = createSprite(width/2,height-70,50,50)
  restart.addImage(restartimg)
  restart.scale = 0.5
  restart.visible = false
}

//draw faz o movimento, a ação do jogo
function draw(){
  background("white");
  if (t_rex.isTouching(cactogp)) {
    gameState = end
    t_rex.changeAnimation("collide", t_rexCollide)
    //die.play()
  }
  if (gameState == play) {
     //pulo do trex
    if (touches > 0||keyDown("space")&& t_rex.y > height-32) {
      //direção: -y
      t_rex.velocityY = -12;
      jump.play()
      touches = []
    }
    ground.velocityX = -(2 + pontos/100) 
    if(ground.x < 0){
      ground.x = ground.width/2
    }
    gerarNuvens()
    gerarCactos()
    pontos = Math.round (frameCount/3)
    if (pontos %100 == 0 && pontos >  0   ) {
      check.play()
    }

  }

  if (gameState == end) {
    ground.velocityX = 0
    cactogp.setVelocityXEach(0)
    cloudgp.setVelocityXEach(0)
    cactogp.setLifetimeEach(-1)
    cloudgp.setLifetimeEach(-1)
    if (pontos > record) {
      record = pontos
    }
  

    gameOver.visible = true
    restart.visible = true
    if(mousePressedOver(restart)){
      gameState = play
      t_rex.changeAnimation("running",t_rexRunning);
      gameOver.visible = false
      restart.visible = false
      cactogp.destroyEach()
      cloudgp.destroyEach()
      frameCount = 0
    }
  }
 
  gravity();

  //colisão do trex
  t_rex.collide(ground2);
  
  //text("X: "+mouseX+" / Y: "+mouseY,mouseX,mouseY)
  
  text("record: " +record, width-100,height-170)

  text("pontos: " +pontos,width-100,height-182)
  drawSprites();

}

function gravity(){
  t_rex.velocityY = t_rex.velocityY + 0.5;

}

function gerarNuvens(){
  if(frameCount %80 === 0){
    cloud = createSprite(width,40,30, 20)
    cloud.velocityX = -(2 + pontos/100)
    cloud.addImage(cloudimg)
    cloud.y = random(height-150,height-80)
    cloud.scale = random(0.6 ,1)
    cloud.depth = t_rex.depth -1
    cloud.lifetime = width/cloud.velocityX;
    cloudgp.add(cloud)
  }
}

function gerarCactos(){
  if(frameCount %140 ===0){
    cacto = createSprite(width,height-17,30,20 )
    cacto.velocityX = -(2 + pontos/100)
    cacto.lifetime = width/cacto.velocityX;
    var sortcacto = Math.round(random (1,6))
    switch (sortcacto) {
      case 1:
        cacto.addImage(cactoimg1)
        break;
      case 2:
        cacto.addImage(cactoimg2)
        break;
      case 3:
        cacto.addImage(cactoimg3)
        break;
        
      case 4:
        cacto.addImage(cactoimg4)
        break; 
      case 5:
        cacto.addImage(cactoimg5)
        break;
       case 6:
        cacto.addImage(cactoimg6)
        break;
    }
    cacto.scale = 0.4;
    cactogp.add(cacto)
  
  }
}
