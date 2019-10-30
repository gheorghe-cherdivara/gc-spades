var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');
var unit= 32;
var grass_light= '#29572b';
var grass_dark= '#265228';
var snake_color= '#5c693b';
var field_x= unit;
var field_y= unit * 3;
var field_span= 20;
document.addEventListener("keydown", e => {
  let key = e.key.toLowerCase();
  if(key === "s"){
    if( s.direction['y'] === 0){
      s.futureDirection = {
        x: 0,
        y: 1
      }
    }
  }else if(key === "w"){
    if( s.direction['y'] === 0){
      s.futureDirection = {
        x: 0,
        y: -1
      }
    }
  }else if(key === "a"){
    if( s.direction['x'] === 0){
      s.futureDirection = {
        x: -1,
        y: 0
      }
    }
  }else if(key === "d"){
    if( s.direction['x'] === 0){
      s.futureDirection = {
        x: 1,
        y: 0
      }
    }
  }else if(key === "e"){
    s.grow();
  }
});
var Snake = function(x, y, length){
  this.x = x;
  this.y = y;
  this.body = [];
  this.length = length;
  this.canMove = true;
  this.direction = {
    x: 1,
    y: 0
  };
  this.futureDirection = this.direction;
  this.step = 0;
  this.scalePos = length + 1;
  this.draw = function(){
    while(this.body.length < this.length){
      this.body.push({
        x: this.x,
        y: this.y,
        scale: 1
      });
    }
    let bodyLength = this.body.length;

    this.body.forEach(function(cell,index){
      c.fillStyle = 'rgb(60,60,'+(65 + (100 / bodyLength) * (index + 1))+')';
      if(cell['scale'] == 2){
        c.fillRect(cell['x'] - unit / 5 ,cell['y'] + unit / 2 - (unit / 5), unit + (unit / 5) * 2,  unit / 2 + (unit / 5) * 2);
      }else{
        c.fillRect(cell['x'] ,cell['y'] + unit / 2, unit,  unit / 2);
      }
    })
    this.body.forEach(function(cell,index){
      c.fillStyle = 'rgb(100,100,'+(155 + (100 / bodyLength) * (index + 1))+')';
      if(cell['scale'] == 2){
        c.fillRect(cell['x'] - unit / 5,cell['y'] - unit / 2 - (unit / 5), unit + (unit / 5) * 2, unit );
      }else{
        c.fillRect(cell['x'],cell['y'] - unit / 2, unit, unit);
      }
    })
  }
  this.animate = function(){
    let tempPos = this.body[0];
    if(this.step === 0){
      this.checkDirectionChange();
      this.canMove = this.checkForCollisions(this.direction);
      if(!!this.canMove){
      this.x = this.x + unit * this.direction['x'];
      this.y = this.y + unit * this.direction['y'];
      for(let i = 0; i < this.body.length;  i++){
        var innerTempPos = {
          x: tempPos['x'],
          y: tempPos['y'],
          scale: tempPos['scale']
        }
        tempPos = {
          x: this.body[i]['x'],
          y: this.body[i]['y'],
          scale: this.body[i]['scale']
        }
        if(i === 0){
          this.body[i]['x'] = this.x;
          this.body[i]['y'] = this.y;
          this.body[i]['scale'] = this.scalePos == i ? 2 : 1;
          if(this.x === f.x && this.y === f.y){
            this.scalePos = 0;
            this.grow();
            f.respawn();
          }

        }else{
          this.body[i] = innerTempPos;
          this.body[i]['scale'] = this.scalePos == i ? 2 : 1;
        }
      }
      if(this.scalePos < this.body.length){
        this.scalePos++;
      }
    }
    }
    this.draw();
    if(this.step < 6){
      this.step++;
    }else{
      this.step = 0;
    }
  }
  this.checkForCollisions = function(direction){
    let futurePosition = {
      x: this.x + unit * direction['x'],
      y: this.y + unit * direction['y']
    };
    let canMoveToFuturePosition = true;
    for(let j = 1; j < this.body.length - 1; j++){
      if(futurePosition['x'] == this.body[j]['x'] && futurePosition['y'] == this.body[j]['y']){
        canMoveToFuturePosition = false;
        console.log('colided with myself')
      }
    }
    if(!!canMoveToFuturePosition){
      canMoveToFuturePosition = this.checkIfCanMove(direction);
    }
    return canMoveToFuturePosition;
  }
  this.checkIfCanMove = function(direction){
    let futurePosition = {
      x: this.x + unit * direction['x'],
      y: this.y + unit * direction['y']
    };
    let canMoveToFuturePosition = true;
    if(futurePosition['x'] > field_x + field_span * unit - unit ||
       futurePosition['x'] < field_x)
     {
        canMoveToFuturePosition = false;
     }
     if(futurePosition['y'] > field_y + field_span * unit - unit ||
        futurePosition['y'] < field_y)
    {
        canMoveToFuturePosition = false;
    }
    return canMoveToFuturePosition;
  }
  this.checkDirectionChange = function(){
    if(this.direction['x'] !== this.futureDirection['x'] ||
       this.direction['y'] !== this.futureDirection['y']){
         if(this.checkIfCanMove(this.futureDirection)){
           this.direction = {
             x: this.futureDirection['x'],
             y: this.futureDirection['y']
           }
         }else{
           this.futureDirection = {
             x: this.direction['x'],
             y: this.direction['y']
           }
         }
     }
  }
  this.grow = function(){
    this.body.push(this.body[this.body.length - 1]);
  }
}
var Fruit = function(x, y){
  this.x = x;
  this.y = y;

  this.draw = function(){
    c.fillStyle = "green";
    c.fillRect(this.x, this.y, unit, unit);
  }
  this.respawn = function(){
    this.x = field_x + Math.round(Math.random() * (field_span - 1) ) * unit;
    this.y = field_y + Math.round(Math.random() * (field_span - 1) ) * unit;
  }
}
var s = new Snake( unit * 5 , unit * 10 , 3);
var f = new Fruit( field_x + Math.round(Math.random() * 10 ) * unit,
                   field_y + Math.round(Math.random() * 10 ) * unit);
var objectList = [];
var objectLimit = 500;
var colors = [
    '#DCE0D9',
    '#31081F',
    '#6B0F1A',
    '#595959',
    '#808F85'
];
var mouse = {
    x : innerWidth / 2,
    y : innerHeight / 2
}
function init(){
    animate();
}
init();

function draw(){

      canvas.width = unit * field_span + field_x * 2;
      canvas.height = unit * field_span + field_y + field_x;
      c.fillStyle = "#333";
      c.fillRect(0, 0, canvas.width, canvas.height);

      c.beginPath();
      c.strokeStyle = "black";
      c.rect(field_x - 1 , field_y - 1, field_span * unit + 1, field_span * unit + 1);
      c.stroke();

      for(var i = 0; i < field_span; i++){
        for(var j = 0; j < field_span; j++){

          var tileX = field_x;
          c.fillStyle = isOdd(i + j)? grass_dark : grass_light;
          c.fillRect(field_x + (i * unit),
                    field_y + (j * unit),
                    unit,
                    unit);
        }
      }
      f.draw();
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  draw();
  objectList.forEach(function(object){
    object.animate();
  })
  s.animate();
}
function isOdd(num) {
  if (num === 0) return false;

  return (num & -num) === 1;
}
