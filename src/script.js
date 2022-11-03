/*
// Pizarra base
const paintCanvas = document.querySelector( '.js-paint' );
*/
const paintCanvas = document.querySelector( '.js-paint' );
  
const contexto = paintCanvas.getContext( '2d' );
contexto.lineCap = 'round';

const canvaPintar = document.querySelector( '#pintar' );
const ctxCanvaPintar = canvaPintar.getContext( '2d' );
ctxCanvaPintar.lineCap = 'round';
ctxCanvaPintar.globalCompositeOperation = 'destination-atop';

// Contexto de lapiz
const ctxPen = paintCanvas.getContext( '2d' );
ctxPen.lineCap = 'round';

// Pizarra grid
var canvaGrid = document.getElementById("grid");
var ctxGrid = canvaGrid.getContext("2d");
for (var i = 5; i < 595; i=i+6) {
  // lineas verticales
  ctxGrid.moveTo(i,5);
  ctxGrid.lineTo(i,595);
  // lineas horizontales
  ctxGrid.moveTo(5,i);
  ctxGrid.lineTo(595,i);
  // color lineas
  ctxGrid.strokeStyle="#e1e1e1";
  ctxGrid.stroke();
}

// Accion lapiz
const procesarLapiz = function (event) {
  ctxPen.globalCompositeOperation="source-over";
}

// Accion borrador
const procesarLapizBorrador = function (event) {
  ctxPen.globalCompositeOperation="destination-out";
}

// Accion Limpiar pizarra
const procesarClickBorrar = function (event) {
  ctxPen.clearRect(0, 0, paintCanvas.clientWidth, paintCanvas.clientHeight);
}

const colorPicker = document.querySelector( '.js-color-picker');

const colorListener = function (event) {
  ctxPen.strokeStyle = event.target.value;
  console.log(event.target) // <input type="color"  class="js-color-picker  color-picker">
}

colorPicker.addEventListener( 'change', colorListener);

const lineWidthRange = document.querySelector( '.js-line-range' );
const lineWidthLabel = document.querySelector( '.js-range-value' );


lineWidthRange.addEventListener( 'input', event => {
    const width = event.target.value;
    lineWidthLabel.innerHTML = width;
    ctxPen.lineWidth = width;
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
        ctxPen.beginPath();
        ctxPen.moveTo( x, y );
        ctxPen.lineTo( newX, newY );
        ctxPen.stroke();
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

// Accionar Lapiz de dibujo
const lapizButton = document.querySelector('#lapiz-dibujar')
lapizButton.addEventListener('click', procesarLapiz)

// Accionar Borrador
const borrarLapizButton = document.querySelector('#lapiz-borrador')
borrarLapizButton.addEventListener('click', procesarLapizBorrador)
  
// Accionar Borrado de pizarra
const borrarCanvasButton = document.querySelector('#borrar-todo')
borrarCanvasButton.addEventListener('click', procesarClickBorrar)