
class Particula{
    constructor(x, y) {
        this.acel = createVector(0, 0);
        this.vel = createVector(random(-1, 1), random(-1, 1));
        this.pos = createVector(x, y);
        this.r = 3.0;
        this.velMax = 3;
        this.fuerzaMax = 0.05;
    }

    ejecutar(listaDeParticulas,listaDeAtractores) {
        this.flock(listaDeParticulas);
        let atractores = this.interacionConAtractores(listaDeAtractores);
        this.aplicarFuerza(atractores);
        this.actualizar();
        this.bordes();
        this.dibujar();
    }

    aplicarFuerza(force) {
        this.acel.add(force);
    }

    flock(listaDeParticulas) {
        let sep = this.separar(listaDeParticulas);
        let ali = this.alinear(listaDeParticulas);
        let coh = this.unir(listaDeParticulas);

        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);

        this.aplicarFuerza(sep);
        this.aplicarFuerza(ali);
        this.aplicarFuerza(coh);
    }

    actualizar() {
        this.vel.add(this.acel);
        this.vel.limit(this.velMax);
        this.pos.add(this.vel);
        this.acel.mult(0);
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
        let theta = this.vel.heading() + radians(90);
        fill(r,g,b);
        stroke(r,g,b);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }

    dibujar() {
        this.dibujarTriangulo(200,200,200);
    }

    bordes() {
        if (this.pos.x < -this.r)  this.pos.x = width + this.r;
        if (this.pos.y < -this.r)  this.pos.y = height + this.r;
        if (this.pos.x > width + this.r) this.pos.x = -this.r;
        if (this.pos.y > height + this.r) this.pos.y = -this.r;
    }

    separar(listaDeParticulas) {
        let destinoDeseadoseparation = 25.0;
        let velDeseada = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < listaDeParticulas.length; i++) {
            let d = p5.Vector.dist(this.pos,listaDeParticulas[i].pos);
            if ((d > 0) && (d < destinoDeseadoseparation)) {
                let diff = p5.Vector.sub(this.pos, listaDeParticulas[i].pos);
                diff.normalize();
                diff.div(d);
                velDeseada.add(diff);
                count++;
            }
        }

        if (count > 0) {
            velDeseada.div(count);
        }

        if (velDeseada.mag() > 0) {
            velDeseada.normalize();
            velDeseada.mult(this.velMax);
            velDeseada.sub(this.vel);
            velDeseada.limit(this.fuerzaMax);
        }
        return velDeseada;
    }

    alinear(listaDeParticulas) {
        let distanciaVecindario = 50;
        let sum = createVector(0,0);
        let count = 0;
        for (let i = 0; i < listaDeParticulas.length; i++) {
            let d = p5.Vector.dist(this.pos,listaDeParticulas[i].pos);
            if ((d > 0) && (d < distanciaVecindario)) {
                sum.add(listaDeParticulas[i].vel);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.velMax);
            let velDeseada = p5.Vector.sub(sum, this.vel);
            velDeseada.limit(this.fuerzaMax);
            return velDeseada;
        } else {
            return createVector(0, 0);
        }
    }
    //--- no me gusta esta forma de ahcer cohesion
    unir(listaDeParticulas) {
        let distanciaVecindario = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < listaDeParticulas.length; i++) {
            let d = p5.Vector.dist(this.pos,listaDeParticulas[i].pos);
            if ((d > 0) && (d < distanciaVecindario)) {
                sum.add(listaDeParticulas[i].pos);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.buscar(sum);
        } else {
            return createVector(0, 0);
        }
    }

    interacionConAtractores(listaDeAtractores) {
        let destinoDeseado = 25.0;
        let velDeseada = createVector(0, 0);
        let count = 0;
        if(Object.keys(listaDeAtractores).length) {
            Object.keys(listaDeAtractores).forEach(key => {
                let d = p5.Vector.dist(this.pos,listaDeAtractores[key].pos);
                let diff = p5.Vector.sub(this.pos, listaDeAtractores[key].pos);
                diff.normalize();
                diff.div(d);
                diff.mult(listaDeAtractores[key].fuerza);
                velDeseada.add(diff);
                count++;
            });
        }
        /*for (let i = 0; i < listaDeAtractores.length; i++) {
            let d = p5.Vector.dist(this.pos,listaDeAtractores[i].pos);
            let diff = p5.Vector.sub(this.pos, listaDeAtractores[i].pos);
            diff.normalize();
            diff.div(d);
            diff.mult(listaDeAtractores[i].fuerza);
            velDeseada.add(diff);
            count++;
        }*/

        if (count > 0) {
            velDeseada.div(count);
        }

        if (velDeseada.mag() > 0) {
            velDeseada.normalize();
            velDeseada.mult(this.velMax);
            velDeseada.sub(this.vel);
            velDeseada.limit(this.fuerzaMax);
        }
        return velDeseada;
    }
}
