var socket;
var y = 300;
var texto = 'texto introductorio';
var pg;
function setup() {
    canvas = createCanvas(600,600);
    socket = io.connect('https://pruebatransmicion.herokuapp.com/');
    socket.on('triangulos', leer);
    background(220);
}

function leer(data) {
    console.log("data recibida");
    background(220);
    data.triangulos.forEach(
        element => dibujarTriangulo(element)
    );
}

function dibujarTriangulo(t){
    colorMode(HSB);
    fill(noise(t.puntos[0],t.puntos[1])*255,255,255);
    noStroke();
    console.log(t);
    triangle(t.puntos[0]*width,t.puntos[1]*height,
    t.puntos[2]*width,t.puntos[3]*height,
    t.puntos[4]*width,t.puntos[5]*height);
}

function draw() {

}
/*
function mousePressed(){
    console.log('you are typing: ', this.value());
}*/
