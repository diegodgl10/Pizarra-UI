// Pizarra base
const paintCanvas = document.querySelector( '.js-paint' );

// Pizarra grid
/*
var canvaGrid = document.getElementById("grid");
var contextoGrid = canvaGrid.getContext("2d");
for (var i = 5; i < 595; i=i+6) {
  // lineas verticales
  contextoGrid.moveTo(i,5);
  contextoGrid.lineTo(i,595);
  // lineas horizontales
  contextoGrid.moveTo(5,i);
  contextoGrid.lineTo(595,i);
  // color lineas
  contextoGrid.strokeStyle="#e1e1e1";
  contextoGrid.stroke();
}
*/

const botonesTools = document.querySelector('.botones');

// Contexto de canva
const ctxCanva = paintCanvas.getContext( '2d' );
ctxCanva.lineCap = 'round';

ctxCanva.globalCompositeOperation = 'destination-atop';
window.addEventListener('resize', () => {
  paintCanvas.width = window.innerWidth;
  paintCanvas.height = window.innerHeight;
  ctxCanva.lineCap = 'round';
})

// Accion lapiz
const procesarLapiz = function (event) {
  ctxCanva.globalCompositeOperation="source-over";
}

// Accion borrador
const procesarLapizBorrador = function (event) {
  ctxCanva.globalCompositeOperation="destination-out";
}

// Accion Limpiar pizarra
const procesarClickBorrar = function (event) {
  ctxCanva.clearRect(0, 0, paintCanvas.clientWidth, paintCanvas.clientHeight);
}

// Selector de color
const colorPicker = document.querySelector( '.js-color-picker');
const colorListener = function (event) {
  ctxCanva.strokeStyle = event.target.value;
  console.log(event.target)
}
colorPicker.addEventListener( 'change', colorListener);

// Tamanio de lapiz
const lineWidthRange = document.querySelector( '.js-line-range' );
const lineWidthLabel = document.querySelector( '.js-range-value' );
lineWidthRange.addEventListener( 'input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    ctxCanva.lineWidth = width;
} );

let x = 0, y = 0;
let isMouseDown = false;

const stopDrawing = () => { isMouseDown = false; }
const startDrawing = event => {
    isMouseDown = true;   
   [x, y] = [event.offsetX, event.offsetY];  
}
const drawLine = event => {
    if ( isMouseDown ) {
        const newX = event.offsetX;
        const newY = event.offsetY;
        ctxCanva.beginPath();
        ctxCanva.moveTo( x, y );
        ctxCanva.lineTo( newX, newY );
        ctxCanva.stroke();
        //[x, y] = [newX, newY];
        x = newX;
        y = newY;
    }
}

// Movimientos
paintCanvas.addEventListener( 'mousedown', startDrawing );
paintCanvas.addEventListener( 'mousemove', drawLine );
paintCanvas.addEventListener( 'mouseup', stopDrawing );
paintCanvas.addEventListener( 'mouseout', stopDrawing );

// Boton Lapiz de dibujo
const lapizButton = document.querySelector('#lapiz-dibujar')
lapizButton.addEventListener('click', procesarLapiz)

// Boton Borrador
const borrarLapizButton = document.querySelector('#lapiz-borrador')
borrarLapizButton.addEventListener('click', procesarLapizBorrador)

// Boton Borrado de pizarra
const borrarCanvasButton = document.querySelector('#borrar-todo')
borrarCanvasButton.addEventListener('click', procesarClickBorrar)