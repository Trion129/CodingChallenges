var pipe,bird;

function setup(){
  createCanvas(canvasHeight,canvasWidth);
  frameRate(30);
  noStroke();
  pipe = new Pipe(canvasHeight,canvasWidth);
  bird = new Bird(canvasHeight,pipe);
}

function draw(){
  background(0);
  bird.update();
  bird.draw();

  pipe.update();
  pipe.draw();
}
