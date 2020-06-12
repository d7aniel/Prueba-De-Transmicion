var socket;
var y = 300;
var texto = 'texto introductorio';
var pg;
let imagen;
function setup() {
    canvas = createCanvas(640,480);
    socket = io.connect('https://pruebatransmicion.herokuapp.com/');
    socket.on('pixels', leer);
    background(220);
}

function leer(data) {
    console.log("data recibida");
    background(220);
    imagen = createImage(data.ancho,data.alto);
    imagen.loadPixels();
    for (let i = 0; i < data.pixels.length; i++) {
        imagen.set(data.pixels[i].coord_x, data.pixels[i].coord_y, color(data.pixels[i].r,data.pixels[i].g,data.pixels[i].b));
    }
    imagen.updatePixels();
}

function draw() {
    if(imagen!=undefined){
        image(imagen,0,0);
    }
}
/*
function mousePressed(){
    console.log('you are typing: ', this.value());
}*/
