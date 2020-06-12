class Sistema {
    constructor(){
        this.listaParticulas = [];
        this.listaAtractores = new Object();
    }

    ejecutar() {
        for (let i = 0; i < this.listaParticulas.length; i++) {
            this.listaParticulas[i].ejecutar(this.listaParticulas,this.listaAtractores);
        }
        if(Object.keys(this.listaAtractores).length) {
            Object.keys(this.listaAtractores).forEach(key => {
                this.listaAtractores[key].ejecutar();
            });
        }

        if(this.listaParticulas.length != sliderCantidad.value()){
            if(this.listaParticulas.length>sliderCantidad.value()){
                let cant = this.listaParticulas.length-sliderCantidad.value();
                this.listaParticulas.splice(0,cant);
            }else{
                let cant = sliderCantidad.value()-this.listaParticulas.length;
                for (let i = 0; i < cant; i++) {
                    this.add(new Particula(width / 2,height / 2));
                }
            }
        }
    }

    add(p) {
        this.listaParticulas.push(p);
    }

    addAtractor(a){
        this.listaAtractores[i] = true;
    }

    setAtractor(key,dx,dy,f){
        if(this.listaAtractores[key] != undefined){
            this.listaAtractores[key].mover(dx,dy);
            this.listaAtractores[key].setFuerza(f)
        }else{
            this.listaAtractores[key] = new Atractor(key);
        }
    }
}
