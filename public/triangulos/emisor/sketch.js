var socket;
let triangulos;
let celdasAncho = 10;
let celdasAlto = 10;
function setup() {
    canvas = createCanvas(600,600);
    socket = io.connect('https://pruebatransmicion.herokuapp.com/');
    button = createButton('+ ancho');
    button.size(70, 30);
    button.position(90, 10);
    button.style('text-align', 'center');
    button.mousePressed(sumarAncho);

    button = createButton('- ancho');
    button.size(70, 30);
    button.position(10, 10);
    button.style('text-align', 'center');
    button.mousePressed(restarAncho);


    button = createButton('+ alto');
    button.size(70, 30);
    button.position(90, 50);
    button.style('text-align', 'center');
    button.mousePressed(sumarAlto);


    button = createButton('- alto');
    button.size(70, 30);
    button.position(10, 50);
    button.style('text-align', 'center');
    button.mousePressed(restarAlto);

    triangulos = new Triangulos(celdasAncho,celdasAlto);
}

function sumarAncho() {
    celdasAncho = celdasAncho+1;
    triangulos.crear(celdasAncho,celdasAlto);
    enviar();
}
function restarAncho() {
    celdasAncho = max(celdasAncho-1,0);
    triangulos.crear(celdasAncho,celdasAlto);
    enviar();
}
function sumarAlto() {
   celdasAlto = celdasAlto+1;
   triangulos.crear(celdasAncho,celdasAlto);
   enviar();
}
function restarAlto() {
   celdasAlto = max(celdasAlto-1,0);
   triangulos.crear(celdasAncho,celdasAlto);
   enviar();
}

function enviar(){
    //console.log(triangulos.getData());
    socket.emit('triangulos', triangulos.getData());
    console.log("data enviada");
}

function draw() {
    background(0);
    triangulos.dibujar();
}

function mousePressed(){
    triangulos.empezarInteracion(mouseX,mouseY);
}

function mouseDragged(){
    triangulos.mover(mouseX,mouseY);
    //enviar();
}

function mouseReleased(){
    enviar();
}
