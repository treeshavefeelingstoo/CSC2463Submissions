
function setup() {
  createCanvas(1200, 1200);
  colorMode(HSB);
}

function draw() {
  // start green rect and white square+circle
  strokeWeight(1);
  background(0, 0, 100);
  fill(125, 205, 100);
  rect(0, 0, 550, 250);
  fill(125, 0, 100);
  square(30, 20, 200);
  circle(400, 115, 200);
  // end green rect and white square+circle

  //start translucent circles
  fill(250, 100, 100, 0.5);
  noStroke()
  circle(950, 200, 150);
  fill(150, 100, 100, 0.5);
  circle(1075, 200, 150);
  fill(0, 100, 100, 0.5);
  circle(1012, 125, 150);
  stroke(0, 0, 0);
  // end translucent circles

  //start pac man
  fill(0, 0, 0)
  rect(0, 300, 450, 250);
  fill(50, 75, 100);
  arc(75, 425, 160, 160, PI+QUARTER_PI, PI-QUARTER_PI);
  fill(0, 100, 100)
  noStroke();
  rect(200, 400, 150, 100);
  circle(275, 400, 150);
  fill(0,0,100);
  circle(235, 400, 50);
  circle(310, 400, 50);
  fill(225, 100, 100);
  circle(235, 400, 35);
  circle(310, 400, 35)
  stroke(0,0,0);

  //end pac man

  //start shape combo

  fill(225, 100, 50);
  square(800, 400, 350);
  stroke(0, 0, 100);
  fill(100, 100, 50);
  strokeWeight(3);
  circle(975, 575, 200);
  fill(0, 100, 85);
  beginShape();
  vertex(975, 475);
  vertex(955, 550);
  
  vertex(875, 550);
  vertex(940, 585);

  vertex(900, 650);
  vertex(975, 610);
  
  vertex(1050, 650);
  vertex(1010, 585);
  
  vertex(1075, 550);
  vertex(995,550);
  endShape(CLOSE);
}
