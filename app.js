const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";

const CANVAS_WIDTH = document.getElementsByClassName("canvas")[0].offsetWidth;
const CANVAS_HEIGHT = document.getElementsByClassName("canvas")[0].offsetHeight;

canvas.width =  CANVAS_WIDTH;
canvas.height =  CANVAS_HEIGHT;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function onMouseMove(event){
	const x = event.offsetX;
	const y = event.offsetY;

	if(!painting){
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y)
		ctx.stroke();
	}
}

function stopPainting(){
	painting = false;
}

function startPainting(){
	painting = true;
}

function changeColor(event){
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleEventChange(event){
	const size = event.target.value;
	ctx.lineWidth = size;
}

function handleModeClick(event){
	if(filling == true){
		filling = false;
		mode.innerText = "Fill";
	} else {
		filling = true;
		mode.innerText = "Line";
	}
}

function handleCanvasClick(){
	if(filling == true){
		ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	}
	
}

function handleCM(event){
	event.preventDefault();
}

function handleSaveClick(){
	const image = canvas.toDataURL("image/jpeg");
	const link = document.createElement("a");
	link.href = image;
	link.download = "image.jpg";
	link.click();
}

if(canvas){
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleCM);
}

if(range){
	range.addEventListener("input", handleEventChange);
}

if(mode){
	mode.addEventListener("click", handleModeClick);
}

if(save){
	save.addEventListener("click", handleSaveClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));