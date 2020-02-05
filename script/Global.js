
const width = window.innerWidth -500 ;
const height = window.innerHeight ;
const canvas = document.createElement('canvas');
canvas.width = width;
canvas.height = height
canvas.oncontextmenu = (ev) => { 
    return false;
}

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
var currentPencil;
let resultantFigure;
let figures = [];

let TypeDraw = "Rect";
let WeigthDraw = 1;
let firstColor = {
    h:1,
    s:100,
    l:0,
};

let secondColor = {
    h:1,
    s:100,
    l:100,
};

let h = 0;

let xold = 0;
let yold = 0;
let canvasBuffer;

const dom_weight = document.getElementById("stroke-width");

