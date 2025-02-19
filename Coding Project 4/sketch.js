let character = [];
let charactercount;
let framecount;
let texti;
let spritesheet;
let bugsquish = 0;

function preload() {
  spritesheet = loadImage("media/bubg.png");
}

function setup() {
  
  createCanvas(1535, 725);
  imageMode(CENTER);
  angleMode(DEGREES);
  charactercount = 6;
  framecount = 0;

  for(let i = 0; i < charactercount; i++){
  character[i] = new Character(random(80, width-80),random(80, height-80), i);
  character[i].addAnimation("walking", new SpriteAnimation(spritesheet, 0, 4));
  character[i].addAnimation("squished", new SpriteAnimation(spritesheet, 5, 0));
  }
}
function update(){
  framecount++;
  if(framecount > 1800){
    textSize(25);
    gameover = 'GAME OVER\nTotal Bugs Squished: ' + bugsquish;
    text(gameover, width/2.25, height/2);
    charactercount = 0;
    for(let i = 0; i < charactercount; i++){
      charactercount[i] = 0;
    }
  }
}

function draw() {
  background(220);
  update();
  for(let i = 0; i < charactercount; i++){
  character[i].update();
  character[i].draw(); 
  }
  if(framecount < 1800){
  texti = 'Bugs Squished: ' + bugsquish + '\nTime Remaining: ' + ceil((1800 - framecount) / 60)
  text(texti, width-160, 20);
  }
}

function mouseClicked(){
  for(let i = 0; i < charactercount; i++){
    character[i].mouseClicked();
  }
}

class Character {
  constructor(x, y, i) {
    this.x = x;
    this.y = y;
    this.i = i;
    this.currentAnimation = null;
    this.animations = {};
    this.rotation = random(0,360);
    this.movetime = 0;
    this.magnitude = 0.5;
    this.mvmt = createVector(2, 2);
    this.vars;
    this.clicked = false;
    this.heading;
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  update(){
    if(this.clicked){
      this.mvmt.setMag(0.00001);
      this.currentAnimation = "squished";
    }else{
      this.currentAnimation = "walking";
    }
    if(this.movetime <= 0){
      if(this.clicked)
        {
          this.clicked = false;
          this.x = random(40, width-40);
          this.y = random(40, height-40);
          this.magnitude = 0.5 + (bugsquish/5);
        }
      this.movetime = round(random(30, 240));
      this.rotation = random(0,360);
      this.mvmt.setMag(this.magnitude);
      this.mvmt.rotate(this.rotation);
      this.heading = this.mvmt.heading();
    }
    // this.vars = 'character number: ' + this.i + '\nmvmt.x: ' + this.mvmt.x + ', mvmt.y: ' + this.mvmt.y + '\nmovetime: ' + this.movetime + '\nmagnitude: ' + this.magnitude + '\nAnimation: ' + this.currentAnimation;
    this.x += this.mvmt.x;
    this.y += this.mvmt.y;
    if(this.x > width){
      this.x = 0;
    }
    if(this.x < 0){
      this.x = width;
    }
    if(this.y < 0){
      this.y = height;
    }
    if(this.y > height){
      this.y = 0;
    }
    this.movetime--;

  }
  draw() {
    // text(this.vars, 0, (50 + this.i*80));
    this.animations[this.currentAnimation].draw(this.x, this.y, this.heading, this.currentAnimation);
  }
  mouseClicked(){
    if((mouseX > this.x - 30) && (mouseX < this.x +30) && (mouseY > this.y - 30) && mouseY < this.y + 30 && this.clicked === false){
      this.clicked = true;
      bugsquish++;
    }
  }

}
class SpriteAnimation {
  constructor(spritesheet, startU, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }
  draw(x, y, rot, spritename) {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    push();
    translate(x, y);
    rotate(rot+90);
    image(this.spritesheet, 0, 0, 32, 32, this.u*32, 0, 32, 32);
    pop();

    if(spritename != "squished"){
    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
  }
}