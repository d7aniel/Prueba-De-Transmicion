class Triangulo{
    constructor(x1,y1,x2,y2,x3,y3){
        this.puntos = [[x1,y1], [x2,y2], [x3,y3]];
        this.puntoActual = 0;
    }

    setPuntoActual(xmouse,ymouse){
        for(var i=0;i<this.puntos.length;i++){
                if(dist(xmouse,ymouse,this.puntos[i][0],this.puntos[i][1])<
                dist(xmouse,ymouse,this.puntos[this.puntoActual][0],this.puntos[this.puntoActual][1])){
                    this.puntoActual = i;
                }
        }
    }

    mover(xmouse,ymouse){
        this.puntos[this.puntoActual][0] = xmouse;
        this.puntos[this.puntoActual][1] = ymouse;
    }

    getX(){
        return (this.puntos[0][0]+this.puntos[1][0]+this.puntos[2][0])/3.0;
    }

    getY(){
        return (this.puntos[0][1]+this.puntos[1][1]+this.puntos[2][1])/3.0;
    }

    dibujar(){
        triangle(this.puntos[0][0],this.puntos[0][1],this.puntos[1][0],this.puntos[1][1],this.puntos[2][0],this.puntos[2][1]);
    }
}
