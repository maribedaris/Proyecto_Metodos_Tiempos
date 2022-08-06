
/*Variables globales*/
let global=5;
let time1;
let time2;
let time3;
let time4;
let time5;
let time6;
let time7;
let time8;
let time9;
let time10;
let list=[];
let times=[];
let timesMult=[];
let range;
let prom;
let sampleSize;
let nameOperRef;
let experienceOperRef;
let promTimeRef;
let estandarTimeRef;
let estandarTimeRefFinal;
let holguraPost;
let holguraLuz;
let holguraEsfuerzo;
let operario=[];
let Operariodest1;
const holguraNeds=0.05;//Holgura para tomar agua, ir al baño, lavarse las manos
const holguraFatiga=0.04;//Considera la energia que se consume para realizar un trabajo y aliviar la monotonía

//--------------------------------------------------------------------------------------------------------------
/*Módulo 1:Encontrar el tamaño de muestra correcto para conseguir una mayor certeza en la información, para este 
ejercico el usuario seleccionará a su operario más hábil para la realización de la tarea, con mayor experiencia 
y mejor disponibilidad para la medición de tiempos de la misma*/

//Se ocultan los recuadros en el HTML o se muestran de acuerdo a la selección del usuario
function selectFunction(){
    let timesInit= document.getElementById('times');
    let selected = timesInit.options[timesInit.selectedIndex].text;
    alert("Usted ha seleccionado la opción "+ selected + " veces");
    // El usuario Selecciona el número de valores a ingresar pueden ser 10 o 5 dependiendo del tiempo de ciclo
    if (selected=="Diez"){
        div = document.getElementById('ocult6');
        div.style.display = '';
        div = document.getElementById('ocult7');
        div.style.display = '';
        div = document.getElementById('ocult8');
        div.style.display = '';
        div = document.getElementById('ocult9');
        div.style.display = '';
        div = document.getElementById('ocult10');
        div.style.display = '';
        global=10;
    }else{
        div = document.getElementById('ocult6');
        div.style.display = "none";
        div = document.getElementById('ocult7');
        div.style.display = "none";
        div = document.getElementById('ocult8');
        div.style.display = "none";
        div = document.getElementById('ocult9');
        div.style.display = "none";
        div = document.getElementById('ocult10');
        div.style.display = "none";
        }
    }

    function llenarVector(){
     //leer los valores ingresados por el usuario
    time1= (document.getElementById("value1")).value;
    time2= (document.getElementById("value2")).value;
    time3= (document.getElementById("value3")).value;
    time4= (document.getElementById("value4")).value;
    time5= (document.getElementById("value5")).value;
    time6= (document.getElementById("value6")).value;
    time7= (document.getElementById("value7")).value;
    time8= (document.getElementById("value8")).value;
    time9= (document.getElementById("value9")).value;
    time10= (document.getElementById("value10")).value;
    if (global===5) { 
        list=[parseFloat(time1),parseFloat(time2),parseFloat(time3),
        parseFloat(time4),parseFloat(time5)];
    }else{
        list=[parseFloat(time1),parseFloat(time2),parseFloat(time3),
        parseFloat(time4),parseFloat(time5),parseFloat(time6),parseFloat(time7),
        parseFloat(time8),parseFloat(time9),parseFloat(time10)];
    }
    return list;
    }

/*Calcularemos el rango de los datos ingresados, es decir el tiempo máximo menos el tiempo mínimo*/
function calcRange(){
    const listado=llenarVector();
    const maxim=Math.max.apply(null,listado);
    const minim=Math.min.apply(null,listado);
    range=maxim-minim;
    document.getElementById("rangeText").innerHTML=`Perfecto,el tiempo máximo es de: ${maxim} y el mínimo
    de: ${minim} , por tanto, el rango de los datos
    ingresados es  ${range}`  
}

//Calcularemos el promedio de los datos ingresados
function calcProm(){
    const listado=llenarVector();
    const acum=listado.reduce((acumulador,elemento)=>acumulador+elemento,0)
    prom=acum/global;
    document.getElementById("promText").innerHTML=`El promedio de los datos ingresados es de: ${prom}`
}

//Calcularemos el cociente de los datos ingresados
function calcIndicador(){
    const indicador=(range/prom);
    document.getElementById("indicatorText").innerHTML=`El cociente del rango y la media es de: ${indicador}`
    div = document.getElementById('float-section');
    div.style.display = '';
}

//-------------------------------------------------------------------------------------------------------------
/*Módulo 2:Ahora deberás seleccionar al operario más calificado para realizar la tarea
y tomar sus tiempos de acuerdo al tamaño de muestra indicada en el módulo anterior, es necesario
que sea un operario con experiencia que trabaje a un ritmo estándar de desempeño, sin esfuerzo adicional ya que
que este será nuestro tiempo promedio de referencia*/



//El usuario debe ingresar la información de su operario más capaz en la tarea y se muestra esta información
function ingresarInfRef(){
    div = document.getElementById('referenceSeccion');
    div.style.display = '';
}

function capturaTamMuestral(){
    sampleSize=parseInt((document.getElementById("tamMuestra")).value);
    localStorage.setItem("tamMuestra",JSON.stringify(sampleSize));
        for (let j=0;j<=(sampleSize-1);j++){
            //creamos un nodo <input></input> y agregamos la información
            let span=document.createElement("span");
            span.innerHTML=`Toma de tiempo número: ${j+1}`;
            tiemposReferencia.appendChild(span);
            let input=document.createElement("input");
            let id=j+1;
            input.setAttribute("id",id);
            tiemposReferencia.appendChild(input);
            let br=document.createElement("br");
            tiemposReferencia.appendChild(br);
        }
} 

function leerInfRef(){
    nameOperRef=(document.getElementById("nombreOpRef")).value;
    experienceOperRef=parseInt((document.getElementById("yearsExp")).value);
    for (let j=0;j<=(sampleSize-1);j++){
        let time=(document.getElementById(j+1)).value;
        times[j]=parseFloat(time);
    }
    document.getElementById("datosIngresados").innerHTML=`La información del operario de referencia es: <br>
    tamaño de muestra: ${sampleSize} datos, <br>
    nombre: ${nameOperRef}, <br>
    experiencia: ${experienceOperRef} años`
    document.getElementById("tiemposTexto").innerHTML=`La información de los tiempos ingresados es:` 
    for (const time of times){
        //creamos un nodo <p></p> y agregamos la información
        let p=document.createElement("p");
        p.innerHTML=time;
        tiemposIngresados.appendChild(p);
    }
}

//Calcularemos el tiempo promedio inicial del operario de referencia
function calcTimeProm(listado){
    const acumTimeRef=listado.reduce((acumulador,elemento)=>acumulador+elemento,0)
    promTimeRef=acumTimeRef/sampleSize;
    document.getElementById("promTimeRef").innerHTML=`La información del tiempo promedio de 
    referencia es: ${promTimeRef}` 
    return promTimeRef;
}

/*Se agregan las holguras constantes básicas recomendadas por seguridad y salud
en el trabajo al tiempo promedio*/
function agregarTolBasic(tiempoPromedio){
    estandarTimeRef=tiempoPromedio*(1+holguraFatiga+holguraNeds);
    document.getElementById("estandTimeRef").innerHTML=`tiempo estandar básico
    (sumando las holguras por fátiga y necesidades básicas): ${estandarTimeRef}`
}

/*Existen holguras adicionales que podemos agregar dependiendo de la situación, estas son llamadas 
holguras de descanso variables, vamos a sumar estas holguras dependiendo de las seleccionadas por el usuario*/
function agregarTolVar(tiempoPromedio,tiempoEstandar){
    let holguraPostVal=0;
    let holguraLuzVal=0;
    let holguraEsfuerzoVal=0;
    if (document.querySelector('input[name="postura"]:checked')!=null){
        holguraPost= document.querySelector('input[name=postura]:checked').value;
        switch (holguraPost) {
            case "parado":
                holguraPostVal=0.02;
            break;
            case "incomodo":
                holguraPostVal=0.1;
            break;
        }
    }
    if (document.querySelector('input[name="luz"]:checked')!=null){
        holguraLuz= document.querySelector('input[name=luz]:checked').value;
        switch (holguraLuz) {
            case "luz1":
                holguraLuzVal=0.01;
            break;
            case "luz2":
                holguraLuzVal=0.03;
            break;
            case "luz3":
                holguraLuzVal=0.05;
            break;
        }
    }
    if (document.querySelector('input[name="esfuerzo"]:checked')!=null){
        holguraEsfuerzo= document.querySelector('input[name=esfuerzo]:checked').value;
        switch (holguraEsfuerzo) {
            case "fino1":
                holguraEsfuerzoVal=0.02;
            break;
            case "fino2":
                holguraEsfuerzoVal=0.05;
            break;
        }
    }
    const holgurasVarTot=holguraPostVal+holguraEsfuerzoVal+holguraLuzVal;
    estandarTimeRefFinal=tiempoEstandar+tiempoPromedio*(holgurasVarTot);
    document.getElementById("estandTimeRefFinal").innerHTML=`tiempo estandar final
    (sumando las holguras básicas y variables): ${estandarTimeRefFinal}`
    llenarObjOperRef();
}

function recetHolguras() {
    let radio = document.getElementById("radioPost1");
    radio.checked = false;
    radio = document.getElementById("radioPost2");
    radio.checked = false;
    radio = document.getElementById("radioLuz1");
    radio.checked = false;
    radio = document.getElementById("radioLuz2");
    radio.checked = false;
    radio = document.getElementById("radioLuz3");
    radio.checked = false;
    radio = document.getElementById("radiofino1");
    radio.checked = false;
    radio = document.getElementById("radiofino2");
    radio.checked = false;
    document.getElementById("holgurasSelec").innerHTML="";
}

function describirHolguras(){
    let holguraLuzText="";
    let holguraEsfuerzoText="";
    let holguraPostText="";
    let textoFinal="";

    if (document.querySelector('input[name="postura"]:checked')!=null){
        holguraPost= document.querySelector('input[name=postura]:checked').value;
        switch (holguraPost) {
            case "parado":
                holguraPostText="Parado";
            break;
            case "incomodo":
                holguraPostText="Incomodo";
            break;
        }
    }
    if (document.querySelector('input[name="luz"]:checked')!=null){
        holguraLuz= document.querySelector('input[name=luz]:checked').value;
        switch (holguraLuz) {
            case "luz1":
                holguraLuzText="Un nivel (una subcategoría de IES) abajo de lo recomendado";
            break;
            case "luz2":
                holguraLuzText="Dos niveles abajo de lo recomendado";
            break;
            case "luz3":
                holguraLuzText="Tres niveles (categoría IES completa) abajo de lo recomendado";
            break;
        }
    }
    if (document.querySelector('input[name="esfuerzo"]:checked')!=null){
        holguraEsfuerzo= document.querySelector('input[name=esfuerzo]:checked').value;
        switch (holguraEsfuerzo) {
            case "fino1":
                holguraEsfuerzoText="Trabajo fino";
            break;
            case "fino2":
                holguraEsfuerzoText="Trabajo muy fino";
            break;
        }
    }
    textoFinal=`Las holguras variables que ha seleccionado son: <br>
    ${holguraPostText}<br>
    ${holguraLuzText}<br>
    ${holguraEsfuerzoText}`
    document.getElementById("holgurasSelec").innerHTML=textoFinal;
}

/*Llenado del objeto y guardar en el local Storage*/
function llenarObjOperRef(){
    Operariodest1=new Operariodest(nameOperRef,experienceOperRef,promTimeRef,estandarTimeRefFinal);  
    localStorage.setItem("operarioDest",JSON.stringify(Operariodest1));
    console.log(Operariodest1);
}

function obtenerObjLS(){
    if (localStorage. length > 0){
        Operariodest1=JSON.parse(localStorage.getItem("Operariodest1"));
        console.log(Operariodest1);
    } 
}


//--------------------------------------------------------------------------------------------------------------
/*Módulo 3:Comparación de tiempos.
Carga de información  de los tiempos de diferentes operarios, de acuerdo al número de muestra arrojado en el paso anterior (acá creo que 
esto se podría lograr a travez de un JSON, pero es algo que aún no vemos,por ahora solicitaré al usuario la
información a traves de un promp) con esta información se calcula el tiempo promedio, Valoración de tiempos de
los demás operarios*/

/*Ahora se calculará el tiempo promedio observado de los operarios que realizan la misma función para valorar
su desempeño*/ 
function calcPromTimeOpers(){
    let operatorsNumber=prompt("Por favor ingrese el número de operarios");
    let timesMult=[];
    operator=[];
    for(let i=0;i<=(operatorsNumber-1);i++){
        nameOper=prompt("Ingrese el nombre del operario "+ (i+1) );
        experienceOper=prompt("Ingrese los años de experiencia en la labor del operario "+ (i+1));
        for (let j=0;j<=(sampleSize-1);j++){
            let time=prompt("ingrese la toma de tiempo número " + (j+1));
            timesMult[j]=parseFloat(time);
        }
        
    }
}

/*
1.Verificamos que tamaño de muestra ingresó el usuario y si no ingresó significa que solo hará uso del 
módulo 3 y usamos el tamaño de muestra que haya guardado en el localStorage
2.Creamos los nodos para capturar la información de los operarios a medir
*/
function capturanumOperarios(){
let idNombre;
let idExp;
let id;
let br;
numOperarios=parseInt((document.getElementById("numOperarios")).value);
console.log(sampleSize);
if(typeof(sampleSize) === "undefined"){
    sampleSize=localStorage.getItem("tamMuestra");}
for (let j=0;j<=(numOperarios-1);j++){
    idNombre=`nombre${j+1}`;
    idExp=`exp${j+1}`;
    let spanNombre=document.createElement("span");
    spanNombre.innerHTML=`nombre del Operario número: ${j+1}`;
    infOperarios.appendChild(spanNombre);
    let nombreOpe=document.createElement("input");
    infOperarios.appendChild(nombreOpe);
    nombreOpe.setAttribute("id",idNombre);
    let spanExp=document.createElement("span");
    spanExp.innerHTML=`años de experiencia del Operario número ${j+1}`;
    infOperarios.appendChild(spanExp);
    let expOper=document.createElement("input");
    infOperarios.appendChild(expOper);
    expOper.setAttribute("id",idExp);
    br=document.createElement("br");
    infOperarios.appendChild(br);
    let p=document.createElement("p");
    p.innerHTML=`a continuación ingrese los tiempos del operario: ${j+1}`;
    infOperarios.appendChild(p);
    for (let i=0;i<=(sampleSize-1);i++){
        //creamos un nodo <input></input> y agregamos la información
        let spanTime=document.createElement("span");
        spanTime.innerHTML=`Toma de tiempo número: ${i+1}`;
        infOperarios.appendChild(spanTime);
        let input=document.createElement("input");
        id=`operador${j+1}Tiempo${i+1}`;
        input.setAttribute("id",id);
        infOperarios.appendChild(input);
        br=document.createElement("br");
        infOperarios.appendChild(br);
    }
    br=document.createElement("br");
    infOperarios.appendChild(br);
}
}

function leerInfOperarios(){
    for (let i=0;i<=(numOperarios-1);i++){
    nameOper=(document.getElementById(`nombre${i+1}`)).value;
    experienceOper=(document.getElementById(`exp${i+1}`)).value;
    for (let j=0;j<=(sampleSize-1);j++){
        let time=(document.getElementById(`operador${i+1}Tiempo${j+1}`)).value;
        timesMult[j]=parseFloat(time);}
        const promedioOperarios=calcTimeProm(timesMult);
        console.log(promedioOperarios);
        //const estandarOperarios=agregarTolBasic(promedioOperarios);
        operario[i]=new Operario(nameOper,experienceOper,promedioOperarios); 
        console.log(operario[i]);
        comparar();
    }
}


/*A esta no alcancé a trabajarle pero mi plan es realizar las comparaciones con el objeto del operario 
destacado que está en el localstorage
/*function comparar(){
    obtenerObjLS();
}*/


