class Atractor{
    constructor(n) {
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.posFija = createVector(random(width),random(height));
        this.pos = createVector(random(width),random(height));
        this.r = 3.0;
        this.velMax = 3;
        this.fuerzaMax = 1.5;
        this.fuerza = 1;
        this.nombre = n;
    }

    setFuerza(v){
        this.fuerza= v;
    }

    mover(x,y){
        this.posFija.set(x,y);
        console.log(""+this.posFija.x+" "+this.posFija.y+" "+this.pos.x+" "+this.pos.y+" ")
    }

    ejecutar() {
        this.actualizar();
        this.bordes();
        this.dibujar();
    }

    actualizar() {
        if(this.pos.dist(this.posFija)>2){
            this.vel.set(this.buscar(this.posFija));
            this.vel.limit(this.velMax);
            this.pos.add(this.vel);
        }
    }

    buscar(target) {
        let destinoDeseado = p5.Vector.sub(target,this.pos);
        destinoDeseado.normalize();
        destinoDeseado.mult(this.velMax);
        let velDeseada = p5.Vector.sub(destinoDeseado,this.vel);
        velDeseada.limit(this.fuerzaMax);
        return velDeseada;
    }

    dibujarTriangulo(r,g,b) {
        //let theta = this.vel.heading() + radians(90);
        fill(r,g,b);
        stroke(r,g,b);
        push();
        translate(this.pos.x, this.pos.y);
        textAlign(CENTER,CENTER);
        //rotate(theta);
        ellipse(0,0,2*this.r,2*this.r);
        if(nombreActual == this.nombre){
            triangle(0,0,-5,-10,5,-10);
        }
        fill(255);
        noStroke();
        text(this.nombre,0,10);
        pop();
    }

    dibujar() {
        this.dibujarTriangulo(20,150,200);
    }

    bordes() {
        if (this.pos.x < -this.r)  this.pos.x = width + this.r;
        if (this.pos.y < -this.r)  this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }
}
