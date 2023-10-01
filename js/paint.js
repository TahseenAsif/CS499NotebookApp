const canvas = document.querySelector("canvas");
const toolbar = document.querySelectorAll(".tool");
const fillColor = document.querySelector("#fill-color");
const sizeSlider = document.querySelector('#size-slider');
const colorBtns = document.querySelectorAll(".colors .option");
const colorPicker = document.querySelector("#color-picker");
const clearButton = document.querySelector(".clear-canvas");
const saveButton = document.querySelector(".save-img");
const ctx = canvas.getContext("2d"); 

let prevMouseX;
let prevMouseY;
let snapshot;
let isDrawing = false;
let brushWidth = 5;
let selectedTool = "brush";
let selectedColor = "#000";

const setCanvasBackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBackground();
})

const drawingStart = (e) => {
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    snapshot = ctx.getImageData(0,0,canvas.width,canvas.height);
}

const drawingStop = (e) => {
    isDrawing = false;
}

const drawing = (e) => {
    if(!isDrawing) return;
    ctx.putImageData(snapshot,0,0);

    if(selectedTool==="brush" || selectedTool==="eraser"){
        if(selectedTool==="eraser"){
            ctx.strokeStyle = "#f5f5f5";
        } 
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    } else if(selectedTool==="rectangle"){
        drawRectangle(e);
    } else if(selectedTool==="circle"){
        drawCircle(e);
    } else if(selectedTool==="triangle"){
        drawTriangle(e);
    }
}

const drawRectangle = (e) => {
    if(!fillColor.checked){
        ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX-e.offsetX, prevMouseY-e.offsetY);
    } else {
        ctx.fillRect(e.offsetX, e.offsetY, prevMouseX-e.offsetX, prevMouseY-e.offsetY);
    }
}

const drawCircle = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(Math.pow((prevMouseX-e.offsetX), 2) + Math.pow((prevMouseY - e.offsetY), 2))
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2*Math.PI);
    if(!fillColor.checked){
        ctx.stroke();
    } else {
        ctx.fill();
    }
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(prevMouseX*2 - e.offsetX, e.offsetY);
    ctx.closePath();
    if(!fillColor.checked){
        ctx.stroke();
    } else {
        ctx.fill();
    }
}

toolbar.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".options .active").classList.remove("active");
        button.classList.add("active");
        selectedTool = button.id;
        console.log(selectedTool);
    })
});

sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

colorBtns.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        button.classList.add("selected");
        selectedColor = window.getComputedStyle(button).getPropertyValue("background-color");
        console.log(btn);
    })
})

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();
})

clearButton.addEventListener("click", () => {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    setCanvasBackground();
})

saveButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();
    link.click();
})

canvas.addEventListener("mouseup", drawingStop);
canvas.addEventListener("mousedown", drawingStart);
canvas.addEventListener("mousemove", drawing);