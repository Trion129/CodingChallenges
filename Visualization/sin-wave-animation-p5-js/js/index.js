var spaceFactor = 12;
var amplitudeFactor = 100;
var frequencyFactor = 0.05;



function Dot(x,count){
  this.x = x;
  this.count = count;
  this.y = windowHeight/2 + sin(this.count) * amplitudeFactor;
  this.update = function(){
    this.y = windowHeight/2 + sin(this.count) * amplitudeFactor;
    this.count += frequencyFactor;
  };
  this.draw = function(){
    fill(255);
    stroke(255);
    ellipse(this.x,this.y,4);
    if(this.y > windowHeight/2){
      stroke((this.y - windowHeight/2 + 40) *2.2 , 0 , 0 );
    }
    else{
      stroke((windowHeight/2 - this.y + 40) *2.2 , 0 , 0 );
    }
    line(this.x,windowHeight/2,this.x,this.y);
  };
}

var count = 0;
var dots = [];

function setup(){
  createCanvas(windowWidth,windowHeight);
  background(0);
  smooth();
  for(var i = 0;i < windowWidth/spaceFactor;i++){
    var x = i * spaceFactor;
    dots[i] = new Dot(x,count);
    count += frequencyFactor;
  }  
  frameRate(10);
}

function draw(){
  background(0);
  
  for(var i = 0;i < windowWidth/spaceFactor;i++){
    dots[i].update();
  }
  for(var i = 0;i < windowWidth/spaceFactor;i++){
    dots[i].draw();
  }
}

function windowResized() {
  setup();
}