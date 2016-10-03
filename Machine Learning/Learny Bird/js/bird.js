var Bird = function(height, pipe){
  this.height = height;
  this.x = 60;
  this.y = height/2;
  this.pipe = pipe;
  this.pos = createVector(this.x,this.y);
  this.gravity = createVector(0, 2);
  this.jumpForce = createVector(0, -19);
  this.acc = createVector(0,0);

  this.jump = function(){
    this.acc.set(0,0);
    this.acc.add(this.jumpForce);
  }

  this.update = function(){
    this.acc.add(this.gravity);
    if(this.pos.y - this.pipe.entryPoint().gapHeight  >= -33)
      this.jump();
    this.pos.add(this.acc);

  }

  this.draw = function(){
    ellipse(this.pos.x,this.pos.y,30);
  }

}
