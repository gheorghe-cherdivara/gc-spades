var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');
c.fillStyle = "black";
c.fillRect(0, 0, canvas.width, canvas.height);
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
var paused = false;

addEventListener("mousemove", function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

function init(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    animate();
}


function animate(){
    if(!!paused){
        console.log("jora");
        return;
    }
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    while(objectList.length < objectLimit){
        var radius = Math.floor( Math.random () * (30 - 1 + 1)) + 20; 
        var x = (Math.random() * (innerWidth - (radius * 2))) + (radius * 2);
        var y = (Math.random() * (innerHeight - (radius * 2))) + (radius * 2);
        var velocity = Math.floor( Math.random () * (3 - 2 + 1)) + 2;
        var color = colors[Math.round(Math.random() * colors.length)];
        objectList.push(new Circle( x, y, radius, velocity, color))
    }
    objectList.forEach(function(element,index){
        element.animate();
        if(element.radius < 0.5){
            objectList.splice(index, 1);
        }
    })
}


function Circle(x, y, radius, velocity, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.expectedRadius = radius;
    this.color = color;
    this.opacity = 0;
    this.backupRadius = this.expectedRadius;
    this.xVelocity = (Math.random() - 0.5) * (velocity);
    this.yVelocity = (Math.random() - 0.5) * (velocity);
    this.hovered = false;

    this.draw = function(){
        c.beginPath();
        c.globalAlpha = this.opacity;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.globalAlpha = 1.0;
        c.closePath();
    }

    this.animate = function(){
        if(this.expectedRadius < this.radius - 2){
            this.radius-=2;
        }else if(this.expectedRadius > this.radius + 4){
            this.radius+= 4;
        }
        if(getDistance(this.x,this.y,mouse.x,mouse.y)< 60 && !this.hovered){
            this.hovered = true;
            this.backupRadius = this.radius;
            this.expectedRadius = 150;
        }else if(getDistance(this.x,this.y,mouse.x,mouse.y)>= 60 && this.hovered){
            this.hovered = false;
            this.expectedRadius = this.backupRadius;
        }
        if(this.opacity < 1){
            this.opacity+= 0.01;
        }
        if(this.x + radius > innerWidth + 10 || this.x - radius < 10){
            this.xVelocity = -this.xVelocity;
            this.expectedRadius = this.radius / 2;
        }
        if(this.y + radius > innerHeight + 10 || this.y - radius < 10){
            this.yVelocity = -this.yVelocity;
            this.expectedRadius = this.radius / 2;
        }
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        this.draw();
    }
}

function pause(){
    paused = paused.toggle();
}

function getDistance(x1,y1,x2,y2){
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt( a*a + b*b );
}

init();