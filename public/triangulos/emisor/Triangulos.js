class Triangulos{
    constructor(an,al){
        this.triangulos = [];
        this.crear(an,al);
    }

    crear(ancho, alto){
        this.triangulos = [];
        let columnas = ancho;
        let filas = alto;
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
            /*var x1 = this.triangulos[i].puntos[0][0]/width;
            var y1 = this.triangulos[i].puntos[0][1]/height;
            var x2 = this.triangulos[i].puntos[1][0]/width;
            var y2 = this.triangulos[i].puntos[1][1]/height;
            var x3 = this.triangulos[i].puntos[2][0]/width;
            var y3 = this.triangulos[i].puntos[2][1]/height;*/
            var t = {
               puntos: [this.triangulos[i].puntos[0][0]/width,this.triangulos[i].puntos[0][1]/height,
               this.triangulos[i].puntos[1][0]/width,this.triangulos[i].puntos[1][1]/height,
               this.triangulos[i].puntos[2][0]/width,this.triangulos[i].puntos[2][1]/height]
            }
           console.log(t)
           ts.triangulos.push(t);
        }
        return ts;
    }
}
