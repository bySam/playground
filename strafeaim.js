const canvas = document.getElementById("strafeaimCanvas");
const ctx = canvas.getContext("2d");

const dx = 1;
const dy = 1;
let vrt = 0;
let relative = 0;

let direction = {red: 1, ghost: 1, green: -1};
let offset = 0

let red = {x: canvas.width/2, y: canvas.height-270};
let green = {x: canvas.width/2, y: canvas.height-80};
let ghost = {x: canvas.width/2, y: canvas.height-270};


document.getElementById("vrtOutput").innerHTML ="VRT: " + vrt + "ms";


function drawBall() {

    let slider = document.getElementById("vrt")

    slider.oninput = function() {
      document.getElementById("vrtOutput").innerHTML ="VRT: " + this.value + "ms";
      vrt = this.value;
    }

    ctx.beginPath();
    ctx.arc(red.x, red.y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.closePath();



    ctx.beginPath();
    ctx.arc(green.x, green.y, 10, 0, Math.PI*2);
    ctx.fillStyle = "#32CD32";
    ctx.fill();
    ctx.closePath();


    ctx.strokeStyle = "gray"
    ctx.moveTo(ghost.x, ghost.y);
    ctx.lineTo(green.x,green.y);
    ctx.setLineDash([5,3]);
    ctx.stroke();
    ctx.setLineDash([]);
}

function mirror() {
  offset = 0;
   red = {x: canvas.width/2, y: canvas.height-270};
  ghost = {x: canvas.width/2, y: canvas.height-270};
  green = {x: canvas.width/2, y: canvas.height-80};
  direction.green = direction.red * -1;
}

function antiMirror() {
  offset = 0;
  red = {x: canvas.width/2, y: canvas.height-270};
    ghost = {x: canvas.width/2, y: canvas.height-270};
  green = {x: canvas.width/2, y: canvas.height-80};
  direction.green = direction.red;
}

function hswMirror (){
    offset = Math.PI/4;
  red = {x: canvas.width/2, y: canvas.height-270};
    ghost = {x: canvas.width/2, y: canvas.height-270};

  green = {x: canvas.width/2, y: canvas.height-80};
  direction.green = direction.red * -1;

}

function hswAntiMirror(){
    offset = Math.PI/4;
    red = {x: canvas.width/2, y: canvas.height-270};
      ghost = {x: canvas.width/2, y: canvas.height-270};

  green = {x: canvas.width/2, y: canvas.height-80};
  direction.green = direction.red;
}

function changeDirection() {
  direction.red = direction.red * -1
  setTimeout(ghost_reset, vrt)
}

function ghost_reset()
{
  direction.green = direction.green * -1
  direction.ghost = direction.red;
  ghost.x = red.x;
  ghost.y = red.y;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    relative = Math.round(Math.abs(10*direction.red + 10*direction.green*Math.cos(offset))*100)/100
    document.getElementById("relative").innerHTML = "Relative speed: " + relative + "ups";


    let angle = Math.atan2(red.y - green.y, red.x - green.x);
    let ghost_angle = Math.atan2(ghost.y - green.y, ghost.x - green.x);

    //if (red.x + Math.cos(angle-direction.red*Math.PI/2)*dx-10 < 160 || red.x + Math.cos(angle-direction.red*Math.PI/2)*dx+10 > canvas.width-160){
    //  changeDirection();
    //}

    //if (green.x + Math.cos(ghost_angle+direction.green*Math.PI/2)*dx-10 < 160 || green.x + Math.cos(ghost_angle+direction.green*Math.PI/2)*dx+10 > canvas.width-160){
    //  changeDirection();
    //}

    ghost.x += Math.cos(ghost_angle-direction.ghost*Math.PI/2)*dx;
    ghost.y += Math.sin(ghost_angle-direction.ghost*Math.PI/2)*dy;

    red.x += Math.cos(angle-direction.red*Math.PI/2)*dx;
    red.y += Math.sin(angle-direction.red*Math.PI/2)*dy;

    green.x += Math.cos(ghost_angle+offset+direction.green*Math.PI/2)*dx;
    green.y += Math.sin(ghost_angle+offset+direction.green*Math.PI/2)*dy;
}
setInterval(draw, 10);
setInterval(changeDirection, 1000);
