var socket;
var deboEnviar = false;
var imagen;
function setup() {
  createCanvas(640, 240);
  socket = io.connect('https://pruebatransmicion.herokuapp.com/');
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  imagen = createImage(320,240);
  capture.hide();
  button = createButton('enviar');
  button.size(70, 30);
  button.position(20, 260);
  button.style('text-align', 'center');
 /* button.style('background-color', '#4CAF50');
  button.style('border', 'none');
  button.style('color', 'white');
  button.style('padding', '20px');
  button.style('text-align', 'center');
  button.style('text-decoration', 'none');
  button.style('display', 'inline-block');
  button.style('font-size', '16px');
  button.style('margin', 0);
  button.style('position', 'absolute');
  button.style('border-radius', '50%');*/
  button.mousePressed(enviar);

}

function draw() {

    capture.loadPixels();
  image(capture, 0, 0,320,240);
  if(deboEnviar){
    if(capture.pixels.length>0){
        imagen.copy(capture,0,0,320,240,0,0,320,240);
        image(capture, 320, 0,320,240);
        creacionYenvio();
        deboEnviar = false;
    }
  }

    capture.updatePixels();
}

function copiarImagen(src, dst) {
    var n = src.length;
    if (!dst || dst.length != n) dst = new src.constructor(n);
    while (n--) dst[n] = src[n];
    return dst;
}

function enviar() {
    deboEnviar = true;
    /**/
}

function creacionYenvio(){
    var data = {
        ancho:capture.width,
        alto:capture.height,
        pixels: []
    }

    for (var x = 0; x < capture.width; x++) {
      for (var y = 0; y < capture.height; y++) {
          var loc = (x + y * capture.width) * 4;
          var pix = {
              coord_x: x,
              coord_y: y,
              r: capture.pixels[loc],
              g: capture.pixels[loc + 1],
              b: capture.pixels[loc + 2]
          }
          data.pixels.push(pix);
      }
    }
    socket.emit('pixels', data);
    console.log(data);
    console.log("imagen enviada");
}
