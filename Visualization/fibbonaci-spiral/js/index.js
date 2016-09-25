var current = 0.02,
    next = 0,
    last = 0,
    rot = 1;

function setup() {
  createCanvas(600, 600);
  smooth();
}

function draw() {
  if(current < 2500){
    if(rot == 0){
      bezier(300+last,300,300+last,300,300+last,300-current,300,300-current);
    }
    else if(rot == 1){
      bezier(300,300-last,300,300-last,300-current,300-last,300-current,300);
    }
    else if(rot == 2){
      bezier(300-last,300,300-last,300,300-last,300+current,300,300+current);
    }
    else if(rot == 3){
      bezier(300,300+last,300,300+last,300+current,300+last,300+current,300);
    }
    rot = (rot+1)%4;
    next = current+last;
    last = current;
    current = next;
  }
  if(mouseIsPressed){
    fill(0);
    stroke(0);
    ellipse(mouseX,mouseY,4);
  }
  else{
    fill(255);
    stroke(255);
    ellipse(mouseX,mouseY,4);
    stroke(0);
  }
}