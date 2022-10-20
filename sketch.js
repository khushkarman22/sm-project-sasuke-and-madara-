var madara,sasuke,bg,madaraImg,sasukeImg,ray,madara1,rayGroup,finishImg,finish,
wonImg,
loseImg,
loseSound,
wonSound;

var gamestate = "play";

//madara1 is the mangekyou sharingan of madara uchiha
function preload()
 {
  bg = loadImage("hokagebackground.jpg");
  madaraImg = loadImage("madara.png");
  sasukeImg = loadImage("sasuke.png");
  madara1 = loadImage("madraSharingan.png");
  finishImg = loadImage("finishline.jpg");
  wonImg = loadImage("sasukewon.webp");
  loseImg = loadImage("madarawon.webp");
  loseSound = loadSound("madaraSound.mp3");
  wonSound = loadSound("sasukeSound.mp3");
}

function setup()
 {
  createCanvas(1000,500);
  rayGroup = new Group();

  madara = createSprite(800,300,20,20);
  madara.addImage(madaraImg);
  madara.scale = 0.4;

  sasuke = createSprite(100,400,20,20);
  sasuke.addImage(sasukeImg);
  sasuke.scale = 0.7;
  
  madara.velocityX = 10;
  madara.velocityY = 6;

  sasuke.setCollider("rectangle",-4,-6,30,30);
}

function draw()
 {
  background(bg);
  image(finishImg,950,-50,50,600);
  edges = createEdgeSprites();

  madara.bounceOff(edges);
  sasuke.bounceOff(edges);

  if(gamestate === "play")
  {
    if(frameCount%100 === 0){
      ray = createSprite(madara.x,madara.y,60,10);
      ray.velocityX = -14;
      ray.velocityY = 0;
      ray.addImage(madara1);
      ray.scale = 0.03;
      rayGroup.add(ray);
    }
  }

  if(sasuke.collide(madara) || rayGroup.isTouching(sasuke))
  {
    loseSound.play();
    gamestate = "end";
  }
  
  if(sasuke.x>950)
  {
    wonSound.play();
    gamestate = "won";
  }

  if(keyDown(UP_ARROW))
  {
    sasuke.y -= 5;
  }

  if(keyDown(DOWN_ARROW)) 
  {
    sasuke.y += 5;
  }

  if(keyDown(RIGHT_ARROW)) 
  {
    sasuke.x += 5;
  }

  if(keyDown(LEFT_ARROW)) 
  {
    sasuke.x -= 5;
  }

  if(gamestate === "end")
  {
    sasuke.visible = false;
    madara.visible = false;
    sasuke.x = 0;
    sasuke.y = 0;
    madara.x = 0;
    madara.y = 0;

    background(loseImg);
    //for entering the text that appear after losing
    fill("blue");
    stroke("blue");
    textSize(60);
    text("haha wake up to reality",200,200);
  }

  if(gamestate === "won")
  {
    sasuke.visible = false;
    madara.visible = false;

    background(wonImg);
    fill("blue");
    stroke("blue");
    textSize(60);
    text("oiva uchiha sasuke",200,200);
  }

  drawSprites();

}