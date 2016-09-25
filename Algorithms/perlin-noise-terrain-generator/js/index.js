var area = [],elev = [],i,j,k,l;
var sizeFactor = 4;
var side = 500/sizeFactor;

function createBoard(){
  noiseSeed(random(50000));
  area = [],elev = [];
  background(0);
  var x=0,y=0;
  for(i = 0,y=0; i < side;i++,y+=0.03){
    for(j = 0,x = 0; j < side; j++, x+=0.03){
      var value = noise(x,y);
      area[j + i * side] = value;
    }
  }
  noiseSeed(random(50000));
  for(i = 0,y = 0;i < side;i++,y+=0.03){
    for(j = 0,x = 0; j < side; j++,x+=0.03){
      elev[j + i * side] = noise(x,y); 
    }
  }
  for(i = 0;i < side;i++){
    for(j = 0;j < side;j++){
      var index = j + i * side;
      
      //Mountains
      if(area[index] < 0.3)
        if(elev[index] < 0.7)
          fill(31,100,elev[index]*80 + 20);
        else
          fill('white');
      
      //Plains and forests
      else if(area[index] < 0.6){
        if(elev[index] > 0.5)
          fill(107,100,elev[index]*80 + 20);
        else
          fill(107,100,elev[index]*50 + 25);
      }
      
      //Lakes and Oceans
      else if(area[index] < 0.99)
        fill(202,100,elev[index]*80 + 20);
      
      
      rect(j*sizeFactor,i*sizeFactor,
           j*sizeFactor+sizeFactor,i*sizeFactor+sizeFactor);
    }
  }
}

function setup(){
  createCanvas(500,500);
  background(0);
  colorMode(HSB);
  noStroke();
  createBoard();
}

$('button').on('click',function(){
  createBoard();
})