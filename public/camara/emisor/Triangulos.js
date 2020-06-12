class Triangulos{
    constructor(){
        this.triangulos = [];
        let columnas = 40;
        let filas = 40;
        for(var i=0;i<columnas;i++){
            for(var j=0;j<filas;j++){
                this.triangulos.push(new Triangulo(i*width/columnas,j*height/filas
                ,(i+1)*width/columnas,j*height/filas
                ,i*width/columnas,(j+1)*height/filas));
                this.triangulos.push(new Triangulo((i+1)*width/columnas,(j+1)*height/filas
                ,(i+1)*width/columnas,j*height/filas
                ,i*width/columnas,(j+1)*height/filas));
            }
        }
        this.trianguloActual = 0;
    }

    empezarInteracion(xmouse,ymouse){
        for(var i=0;i<this.triangulos.length;i++){
            if(dist(xmouse,ymouse,this.triangulos[i].getX(),this.triangulos[i].getY())<
            dist(xmouse,ymouse,this.triangulos[this.trianguloActual].getX(),this.triangulos[this.trianguloActual].getY())){
                this.trianguloActual = i;
            }
        }
        this.triangulos[this.trianguloActual].setPuntoActual(xmouse, ymouse);
    }

    mover(xmouse,ymouse){
        this.triangulos[this.trianguloActual].mover(xmouse, ymouse);
    }

    dibujar(){
        for(var i=0;i<this.triangulos.length;i++){
            this.triangulos[i].dibujar();
        }
    }

    getData(){
        var ts = {
            triangulos: []
        }

        for(var i=0;i<this.triangulos.length;i++){
           var t = {
               puntos: [this.triangulos[i].puntos[0][0],this.triangulos[i].puntos[0][1],
               this.triangulos[i].puntos[1][0],this.triangulos[i].puntos[1][1],
               this.triangulos[i].puntos[2][0],this.triangulos[i].puntos[2][1]]
           }
           ts.triangulos.push(t);
        }
        return ts;
    }
}
