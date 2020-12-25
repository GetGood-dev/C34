var dog,happyDog,dogSprite;
var foodS,foodStock;
var db;
function preload()
{
  dog=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png"); 
}
function setup() {
  createCanvas(500,500);
  db=firebase.database();
  dogSprite=createSprite(250,250,20,20);
  dogSprite.addImage(dog);
  dogSprite.scale=0.25;
  foodStock=db.ref('food');
  foodStock.on("value",readstock);
  textSize(20);
}
function draw() {  
  background(46,139,87);
  fill("white");
  push()
  textSize(10);
  text("press space to feed dog",190,50);
  text("press r to restock",200,75);
  pop()
  text("food remaing: "+foodS,175,150);
  if(keyWentDown("space")&&foodS>0)
  {
    foodS-=1
    writeStock(foodS)
    dogSprite.addImage(happyDog);
  }
  if(keyDown("r"))
  {
    foodS=20;
  }
  drawSprites();
  //add styles here
}
function readstock(data)
{
  foodS=data.val();
}
function writeStock(x)
{
  db.ref('/').update({
    food:x
  })
}