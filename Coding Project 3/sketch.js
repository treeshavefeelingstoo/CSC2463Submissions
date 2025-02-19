let cyclops;
let character = [];
let charactercount;
let spriteint;
let spritesheet;

function preload() {
  geen = loadImage("media/Green.png");
  spelunky = loadImage("media/SpelunkyGuy.png")
}

function setup() {
  createCanvas(2000, 400);
  imageMode(CENTER);
  charactercount = round(random(1, 15))

  for(let i = 0; i < charactercount; i++){
    spriteint = round(random(0,11))
    if (spriteint % 2 == 1){
        spritesheet = geen;
    }else{
      spritesheet = spelunky;}
  character[i] = new Character(random(80, width-80),random(80, height-80));
  character[i].addAnimation("left", new SpriteAnimation(spritesheet, 1, 0, 6));
  character[i].addAnimation("right", new SpriteAnimation(spritesheet, 1, 0, 6));
  character[i].addAnimation("stand", new SpriteAnimation(spritesheet, 0, 0, 1));
  character[i].animations["left"].flipped = true;
  character[i].currentAnimation = "stand";
  }
}

function draw() {
  background(220);
  for(let i = 0; i < charactercount; i++){
  character[i].draw();
  }
}

function keyPressed() {
  for(let i = 0; i < charactercount; i++){
  character[i].keyPressed();
  }
}

function keyReleased() {
  for(let i = 0; i < charactercount; i++){
  character[i].keyReleased();
  }
}

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.currentAnimation = null;
    this.animations = {};
  }

  addAnimation(key, animation) {
    this.animations[key] = animation;
  }

  draw() {
    let animation = this.animations[this.currentAnimation];
    if (animation) {
      switch (this.currentAnimation) {
        case "right":
          this.x += 2;
          if(this.x > 2050){
            this.x = 0;
          }
          break;
        case "left": 
          this.x -= 2;
          if(this.x < 0){
            this.x = 2050;
          }
          break;
      }
      push();
      translate(this.x, this.y);
      animation.draw();
      pop();
    }
  }

  keyPressed() {
    switch(keyCode) {
      case LEFT_ARROW:
        this.currentAnimation = "left";
        this.animations["stand"].flipped = true;
        break;
      case RIGHT_ARROW:
        this.currentAnimation = "right";
        this.animations["stand"].flipped = false;
        break;
    }
  }
  
  keyReleased() {
    this.currentAnimation = "stand";
    //this.animations[this.currentAnimation].flipped = true;
  }
}

class SpriteAnimation {
  constructor(spritesheet, startU, startV, duration) {
    this.spritesheet = spritesheet;
    this.u = startU;
    this.v = startV;
    this.duration = duration;
    this.startU = startU;
    this.frameCount = 0;
    this.flipped = false;
  }

  draw() {

    let s = (this.flipped) ? -1 : 1;
    scale(s,1);
    image(this.spritesheet, 0, 0, 80, 80, this.u*80, this.v*80, 80, 80);

    this.frameCount++;
    if (this.frameCount % 10 === 0)
      this.u++;

    if (this.u === this.startU + this.duration)
      this.u = this.startU;
  }
}