
let bandada;
let slider;
let sliderCantidad;
let boton;
let inp;

let nombreActual;
let xActual;
let yActual;
let memoriaSlider;
var socket;

let c;
let usandoSlider = false;

function setup() {
    createCanvas(windowWidth, windowHeight);
    socket = io.connect('https://pruebatransmicion.herokuapp.com/');
    socket.on('atractor', llegaAtractor);

    slider = createSlider(-200, 200, 1);
    slider.position(10, 20);
    slider.style('width', '400px');
    slider.mousePressed(mousePressedSlider);
    slider.mouseReleased(mouseReleasedSlider);
    slider.hide();

    sliderCantidad = createSlider(50, 400, 1);
    sliderCantidad.position(10, 50);
    sliderCantidad.style('width', '400px');
    sliderCantidad.mousePressed(mousePressedSlider);
    sliderCantidad.mouseReleased(mouseReleasedSlider);
    sliderCantidad.hide();

    boton = createButton('Crear');
    boton.position(10, 50);
    boton.mousePressed(crear);

    inp = createInput('');
    inp.position(10, 20);

    bandada = new Sistema();
    for (let i = 0; i < 100; i++) {
        let p = new Particula(width / 2,height / 2);
        bandada.add(p);
    }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function data(){
    var data = {
        nombre: nombreActual,
        x : xActual/width,
        y : yActual/height,
        fuerza : -1*slider.value()
    }
    return data;
}

function llegaAtractor(data){
    bandada.setAtractor(data.nombre,data.x*width,data.y*height, data.fuerza);
}

function crear() {
    if(nombreActual==undefined && inp.value().length>3){
        nombreActual = inp.value();
        socket.emit('atractor', data());
        inp.hide();
        boton.hide();
        slider.show();
        sliderCantidad.show();
    }
}
function mouseReleasedSlider(){
    usandoSlider = false;
}
function mousePressedSlider(){
    usandoSlider = true;
}
function mousePressed(){
    if(!usandoSlider){
        if(nombreActual!=undefined){
            xActual = mouseX;
            yActual = mouseY;
            socket.emit('atractor', data());
        }
    }
}

function draw() {
    background(51);
    bandada.ejecutar();
    if(bandada.listaAtractores['a'] != undefined){
        bandada.listaAtractores['a'].setFuerza(sliderA.value());
    }
    if(bandada.listaAtractores['b'] != undefined){
        bandada.listaAtractores['b'].setFuerza(sliderB.value());
    }

    if(nombreActual!=undefined){
        if(memoriaSlider != slider.value()){
            memoriaSlider = slider.value();
            socket.emit('atractor', data());
        }
    }
    if(nombreActual!=undefined){
        push();
        noStroke();
        fill(255);
        text('Nivel de Atraccion', slider.x * 2 + slider.width, slider.y+slider.height/2.0);
        text('Cantidad de particulas', sliderCantidad.x * 2 + sliderCantidad.width, sliderCantidad.y+sliderCantidad.height/2.0);
        pop();
    }
}

//function

/*function keyPressed() {
    if(key == 'a'){
        bandada.setAtractor('a',-5,0);
    } else if(key == 'd'){
        bandada.setAtractor('a',5,0);
    } else if(key == 's'){
        bandada.setAtractor('a',0,5);
    } else if(key == 'w'){
        bandada.setAtractor('a',0,-5);
    }

    if (keyCode == UP_ARROW) {
        bandada.setAtractor('b',0,-5);
    } else if (keyCode == DOWN_ARROW) {
        bandada.setAtractor('b',0,5);
    }  else if (keyCode == RIGHT_ARROW) {
        bandada.setAtractor('b',5,0);
    }  else if (keyCode == LEFT_ARROW) {
        bandada.setAtractor('b',-5,0);
    }

}*/
/*

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

}*/
