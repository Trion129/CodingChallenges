var Pipe = function(height,width){
  this.width = width;
  this.x = width;
  this.height = height;
  this.gapWidth = 100;
  this.gapHeight = 150;
  this.gapY = floor(random(this.gapHeight,height - this.gapHeight));

  this.draw = function(){
    rect(this.x, 0, this.gapWidth, this.gapY);
    rect(this.x, this.gapY + this.gapHeight, this.gapWidth, this.height - this.gapY - this.gapHeight);
  }

  this.update = function(){
    this.x -= 4;
    if(this.x+this.gapWidth < 0){
      this.x = this.width;
      this.gapY = floor(random(this.gapHeight,height - this.gapHeight));
    }
  }

  this.entryPoint = function(){
    return {
      x: this.x,
      y: this.gapY,
      gapHeight: this.gapY + this.gapHeight,
      gapWidth: this.gapWidth
    }
  }
}
