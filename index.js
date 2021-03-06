const WIDTH = 600;
const HEIGHT = 600;

// global variable declaration
var ctx;
var canvas = document.getElementById("root");
var mouseClicked = false;
var mouseMoved = true;
var prevXPos = 0;
var prevYPos = 0; 
var prevClickedXPos;
var prevClickedYPos;
var cursorWidth = 5;
var strokeColor = "white";

//initial setup for the canvas
function setup(){
    canvas.width = WIDTH
    canvas.height = HEIGHT
    ctx = canvas.getContext("2d");

    ctx.translate(WIDTH/2, HEIGHT/2);
    resetScreen();


    addEventListener('mousedown',onMouseDown)
    addEventListener('mouseup',onMouseUP) 
    addEventListener('mousemove',onMouseMove)
    document.getElementById("reset").addEventListener("click",resetScreen);
    document.getElementById("download").addEventListener("click",downloadImage);

    // function to call the setInterval
    setInterval(changeStrokeColor, 2000);
}

//drawBorderLines to draw the axis in canvas
function drawBorderLines(){
    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.moveTo(-WIDTH/2,0);
    ctx.lineTo(WIDTH/2,0);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle = "rgba(0,0,0,0.1)";
    ctx.moveTo(0, -HEIGHT/2);
    ctx.lineTo(0, HEIGHT/2);
    ctx.stroke();
    ctx.closePath();
}

// Func when the mouse is pressed
function onMouseDown(e){
    mouseClicked = true
    prevClickedXPos = e.clientX;
    prevClickedYPos = e.clientY;

}

//Func when the mouse is released
function onMouseUP(e) {
    mouseClicked = false;
}

//Func when the mouse moves
function onMouseMove(e) { 

    if (mouseClicked) {
       
        if ( (e.clientX >= 0 && e.clientX <= WIDTH) && (e.clientY >= 0  && e.clientY <= HEIGHT) ) {
            
            for (let i=0; i<12; ++i) {
                ctx.save();
                ctx.rotate(i * Math.PI / 6);
                
                if (i % 2 == 1 ) {
                    ctx.scale(-1,1)
                }
                
                ctx.beginPath();
                ctx.moveTo(prevXPos - WIDTH/2, prevYPos - HEIGHT/2);
                ctx.lineTo(e.clientX - WIDTH/2, e.clientY - HEIGHT/2);
                ctx.strokeStyle = strokeColor;
                ctx.lineCap = "round";
                ctx.lineWidth = cursorWidth;
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
    }
    
    prevXPos = e.clientX;
    prevYPos = e.clientY
}

//setValue to set the current cursor width
function setValue() {
    cursorWidth = document.getElementById("range").value;
    document.getElementById("brushRange").innerHTML = cursorWidth;
}

// changeStrokeColor to generate random color
function changeStrokeColor(){
    strokeColor =  "rgb(" + randomNumGenerator() + "," + randomNumGenerator() + "," + randomNumGenerator() + ")"
}

// Generates random number between 0 to 255
function randomNumGenerator(){
    return Math.floor(Math.random() * 256);
}

// to reset the Screen
function resetScreen(){
    ctx.beginPath();
    ctx.fillStyle = "grey";
    ctx.fillRect(-WIDTH/2,-HEIGHT/2,WIDTH, HEIGHT);
    ctx.closePath();

   // drawBorderLines();
}

// to download the Image
function downloadImage(){
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.href = canvas.toDataURL();
    a.download = "canvas-image.png";
    a.click();   
}

function draw() {
    
    var animation = requestAnimationFrame(draw);
    document.getElementById("range").onchange = setValue()
    
}

setup();
draw(); 