/* 
  # Mohamed Elshorbagy
  # 02/06/2017
  # Steering Behaviour with Letters
  # Framework Used : P5.js
*/ 

var font;

var pts = [];

function preload() {

 font = loadFont('AvenirNextLTPro-Demi.otf');

}


function setup() {
createCanvas(windowWidth , 300);

console.log(windowWidth);


/*
  
  Function Name : textToPoints
  Functionality : Make any Letter to it's Locations with x , y , alpha 

 */

/* You Can Change Your Name Here :D */

var points = font.textToPoints('Logine' , 350 ,200, 192);



for(var i = 0 ; i < points.length ; i++) {
  
  var pointLetter = points[i];
  var pt = new dots(pointLetter.x , pointLetter.y);
  pts.push(pt);  


}






}


function draw() {
background(51);
for(var i = 0 ; i < pts.length ; i++) {
  pts[i].behaviour();
 pts[i].update();
 pts[i].show();
  
}



}





/*

  Contructor Object : dots
  
 */
function dots(x , y) {

  this.pos= createVector(random(width), random(height));
  this.vel = p5.Vector.random2D();
  this.target = createVector(x , y);
  this.acc = createVector();
  this.maxSpeed = 6;
  this.maxForce = 0.3; 

}



/* Function Show to Show the Points in the Screen */ 

dots.prototype.show = function() {
  //rgb(52, 152, 219)
  //rgb(46, 204, 113)
  stroke(46,204,113);
  strokeWeight(8);
  point(this.pos.x , this.pos.y);

}


/* To Update Points */

dots.prototype.update = function () {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}



/* Steering Behaviour Function */ 
dots.prototype.behaviour = function() {

  var arrive = this.arrive(this.target);
  this.applyForce(arrive);

}



/* Arrive Algorithm ==> to set the Steering Force Equals to Desire - Velocity of any point to seek the target  */

dots.prototype.arrive = function(target) {
  var desire = p5.Vector.sub(target,this.pos);
  var distance = desire.mag();
  var speed = this.maxSpeed;

  if (distance < 100) {
    speed = map(distance, 0 , 100 , 0 , this.maxSpeed);
    
  }

  desire.setMag(speed);
  var steeringForce = p5.Vector.sub(desire , this.vel);
  steeringForce.limit(this.maxForce);
  return steeringForce;

}

dots.prototype.applyForce = function(force) {
this.acc.add(force);
}





/* End */  



