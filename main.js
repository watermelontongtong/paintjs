const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#range");
const colors = document.querySelector(".colors");
const fillBtn = document.querySelector("#fill");
const saveBtn = document.querySelector("#save");
const clearBtn = document.querySelector("#clear");

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 760;

ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
ctx.lineWidth = 5;
ctx.strokeStyle = "#2C2C2C";

let painting = false;
let fill = false;

function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function startDrawing() {
  painting = true;
}

function stopDrawing() {
  painting = false;
}

function handleRange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleColor(event) {
  if (event.target.id === "random") {
    const pickedColor = event.target.value;
    paintOrFill(pickedColor);
  } else if (event.target.className === "color") {
    const chosenColor = event.target.style.backgroundColor;
    paintOrFill(chosenColor);
  }
}

function paintOrFill(color) {
  if (fill === false) {
    ctx.strokeStyle = color;
  } else {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

function handleFill() {
  if (!fill) {
    fillBtn.innerText = "Paint";
    fill = true;
  } else {
    fillBtn.innerText = "Fill";
    fill = false;
  }
}

function handleSave() {
  const link = document.createElement("a");
  const dataURL = canvas.toDataURL();
  link.href = dataURL;
  link.download = "paintJS🎨.png";
  link.click();
}

function handleClear() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

if (canvas) {
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mouseleave", stopDrawing);
}

if (range) {
  range.addEventListener("input", handleRange);
}

if (colors) {
  colors.addEventListener("click", handleColor);
}

if (fillBtn) {
  fillBtn.addEventListener("click", handleFill);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSave);
}

if (clearBtn) {
  clearBtn.addEventListener("click", handleClear);
}
