/*Objeto operario de referencia*/
class Operariodest{
    constructor(nombreRef,experienciaRef,tiempoPromRef,tiempoEstRef,tiempoEstRefFinal,tareasDiaRef){
        this.nombreRef=nombreRef;
        this.experienciaRef=experienciaRef;
        this.tiempoPromRef=tiempoPromRef;
        this.tiempoEstRef=tiempoEstRef;
        this.tiempoEstRefFinal=tiempoEstRefFinal;
        this.tareasDiaRef=tareasDiaRef;
    }
}

/*Objeto operarios a medir*/
class Operario{
    constructor(nombre,experiencia,tiempoPromedio,tiempoEstandar,tiempoEstandarFinal,tareasDiaOper){
        this.nombre=nombre;
        this.experiencia=experiencia;
        this.tiempoPromedio=tiempoPromedio;
        this.tiempoEstandar=tiempoEstandar;
        this.tiemposOperario=[];
        this.tiempoEstandarFinal=tiempoEstandarFinal;
        this.tareasDiaOper=tareasDiaOper;
    }
}