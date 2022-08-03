/*Objeto operario de referencia*/
class Operariodest{
    constructor(nombreRef,experienciaRef,tiempoPromRef,tiempoEstRef){
        this.nombreRef=nombreRef;
        this.experienciaRef=experienciaRef;
        this.tiempoPromRef=tiempoPromRef;
        this.tiempoEstRef=tiempoEstRef;
    }
}

/*Objeto operarios a medir*/
class Operario{
    constructor(nombre,experiencia,tiempoPromedio){
        this.nombre=nombre;
        this.experiencia=experiencia;
        this.tiempoPromedio=tiempoPromedio;
    }
}