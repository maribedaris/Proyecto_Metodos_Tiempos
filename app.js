
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
let range;
let prom;
let sampleSize=0;
let nameOperRef;
let experienceOperRef;
let promTimeRef;
let estandarTimeRef;
let estandarTimeRefFinal;
let holguraPost;
let holguraLuz;
let holguraEsfuerzo;
let operario=[];
let operariodest1=0;
let holgurasVarTot;
let cont=0;
let tareasDia;
let indicador;
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
    const maxim=Math.max(...listado); //Uso del operador spread
    const minim=Math.min(...listado); //Uso del operador spread
    range=maxim-minim;
    if (isNaN(range)){
        document.getElementById("rangeText").innerHTML=`Por favor ingrese los datos de manera correcta y vuelva a oprimir
        el botón,al menos
        uno de los valores está vacío o es invalido`
    }else{
        document.getElementById("rangeText").innerHTML=`Perfecto,el tiempo máximo es de: ${maxim} minutos y el mínimo
        de: ${minim} minutos, por tanto, el rango de los datos
        ingresados es  ${range} minutos`
    }
}

//Calcularemos el promedio de los datos ingresados
function calcProm(){
    const listado=llenarVector();
    const acum=listado.reduce((acumulador,elemento)=>acumulador+elemento,0)
    prom=acum/global;
    if (isNaN(prom)){
        document.getElementById("rangeText").innerHTML=`Por favor ingrese los datos de manera correcta y vuelva a 
        calcular el rango y el promedio, al menos
        uno de los valores está vacío o es invalido`
    }else{
        document.getElementById("promText").innerHTML=`El promedio de los datos ingresados es de: ${prom} minutos`
    }
}

//Calcularemos el cociente de los datos ingresados
function calcIndicador(){
    indicador=(range/prom);
    indicador=indicador.toFixed(2);
    document.getElementById("indicatorText").innerHTML=`El cociente del rango y la media es de: ${indicador}`
    aproximar();
    buscarTamanio();
}

function aproximar(){
    if (indicador<1){
        let aprox=(indicador*100);
        if (aprox%2==!0){
            aprox=aprox+1;
            let aproxStr=aprox+'';
            let indicadorStr=indicador+'';
            indicadorStr=indicadorStr.slice(0,2)+aproxStr;
            indicador=parseFloat(indicadorStr);
        }
    }else{
        let indParte=indicador+'';
        let parte=indicadorStr=indParte.slice(2,4);
        if (parte%2==!0){
            parte=parseInt(parte)+1;
            let parteStr=parte+'';
            let indicadorStr=indicador+'';
            indicadorStr=indicadorStr.slice(0,2)+parteStr;
            indicador=parseFloat(indicadorStr);
        }
    }
    
}

function buscarTamanio(){
    fetch('./datos.json')
    .then((res)=>res.json())
    .then((tamaños)=>{
        for (let i=0;i<tamaños.length;i++){
            if (tamaños[i].Indicador==indicador){
                if (global==5){
                    sampleSize=tamaños[i].Cinco;
            }
            else{
                sampleSize=tamaños[i].Diez;
            }
            }
        }
        console.log(sampleSize);
        if (sampleSize==0){
            document.getElementById("tamMuestraText").innerHTML=`Tiene uno o más datos atipicos (demasiado alejado de los demás datos), por favor vuelva a realizar la toma del tiempo y reemplace este dato para poder darle un tamaño de muestra`
        }else{
        document.getElementById("tamMuestraText").innerHTML=`El tamaño de muestra o número de mediciones que deben realizarse para obtener el tiempo promedio con un 95% de confianza es de: ${sampleSize}`
    }
    })
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
    capturaTamMuestral();
}

function capturaTamMuestral(){
    document.getElementById('tiemposReferencia').innerHTML = '';
    localStorage.setItem("tamMuestra",JSON.stringify(sampleSize));
        for (let j=0;j<=(sampleSize-1);j++){
            //creamos un nodo <input></input> y agregamos la información
            let span=document.createElement("span");
            span.innerHTML=`Toma de tiempo número: ${j+1} (minutos)`;
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
        p.innerHTML=`${time} minutos`;
        tiemposIngresados.appendChild(p);
    }
}

//Calcularemos el tiempo promedio inicial del operario de referencia
function calcTimeProm(listado){
    const acumTimeRef=listado.reduce((acumulador,elemento)=>acumulador+elemento,0)
    promTimeRef=acumTimeRef/sampleSize;
    document.getElementById("promTimeRef").innerHTML=`La información del tiempo promedio de 
    referencia es: ${promTimeRef} minutos` 
    return promTimeRef;
}

/*Se agregan las holguras constantes básicas recomendadas por seguridad y salud
en el trabajo al tiempo promedio*/
function agregarTolBasic(tiempoPromedio){
    estandarTimeRef=tiempoPromedio*(1+holguraFatiga+holguraNeds);
    if (cont==0){
        document.getElementById("estandTimeRef").innerHTML=`tiempo estandar básico
        (sumando las holguras por fátiga y necesidades básicas): ${estandarTimeRef} minutos`}
    return estandarTimeRef;
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
            case "ninguna":
                holguraPostVal=0;
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
            case "ninguna":
                holguraLuzVal=0;
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
            case "ninguna":
                holguraEsfuerzoVal=0;
            break;
        }
    }
    holgurasVarTot=holguraPostVal+holguraEsfuerzoVal+holguraLuzVal;
    estandarTimeRefFinal=tiempoEstandar+tiempoPromedio*(holgurasVarTot);
    document.getElementById("estandTimeRefFinal").innerHTML=`tiempo estandar final
    (sumando las holguras básicas y variables): ${estandarTimeRefFinal} minutos`
    llenarObjOperRef();
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
            case "ninguna":
                holguraPostText="Ninguna holgura por postura";
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
            case "ninguna":
                holguraLuzText="Ninguna holgura por la iluminación";
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
            case "ninguna":
                holguraEsfuerzoText="Ninguna holgura por esfuerzo";
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
    operariodest1=new Operariodest(nameOperRef,experienceOperRef,promTimeRef,estandarTimeRefFinal);  
    localStorage.setItem("operarioDest",JSON.stringify(operariodest1));
}

function obtenerObjLS(){
    if (operariodest1==0){
        operariodest1=JSON.parse(localStorage.getItem("operarioDest"));
        return operariodest1;
    } 
}

//--------------------------------------------------------------------------------------------------------------
/*Módulo 3:Cálculos con el operario destacado. En este módulo se incluyeron algunos cálculos como la cantidad de veces al día que el operario repite la tarea, el tiempo trabajado durante el día y el tiempo libre, además se cálcula el número de veces que se realizará la tarea entre un intervalo de fechas considerando solo días hábiles*/
function converMin(){
    let jornada=document.getElementById("jornada").value;
    let jornadaMin=jornada*60;
    operariodest1=operariodest1 || obtenerObjLS(); 
    let {nombreRef,tiempoEstRef}=operariodest1; 
    let minProduct=jornadaMin/(1+holguraNeds+holguraFatiga+holgurasVarTot)
    let horasProduc=(minProduct/60);
    let horasLib=jornada-horasProduc;
    tareasDia=Math.floor(jornadaMin/(tiempoEstRef));
    document.getElementById("indOperDest").innerHTML=`El operario ${nombreRef} tiene una jornada de ${horasProduc} 
    horas productivas y de ${horasLib} horas libres de acuerdo a las holguras implementadas durante el día; y realiza 
    la tarea estudiada un total de ${tareasDia} veces al día`;
}

function tareasEntreFechas(){
let date1=(document.getElementById("dateInit").value);
let año1=parseInt(date1.substring(0, 4));
let mes1=parseInt(date1.substring(5, 7));
let dia1=parseInt(date1.substring(8,10));
let dateInit = DateTime.local(año1,mes1,dia1);
let date2=(document.getElementById("dateFin").value);
let año2=parseInt(date2.substring(0, 4));
let mes2=parseInt(date2.substring(5, 7));
let dia2=parseInt(date2.substring(8,10));
let dateFin = DateTime.local(año2,mes2,dia2);
const interval=luxon.Interval;
const int=interval.fromDateTimes(dateInit,dateFin);
let diasDif=(int.length('days'));
let weekendCont=0;
let dt=dateInit.minus({days:1});
for (let i=0;i<=diasDif;i++){
    dt=dt.plus({days:1});
    if ((dt.weekday==6)||(dt.weekday==7)){
        weekendCont=weekendCont+1
    }
}
let diasLab=diasDif-weekendCont;
tareasTot=diasLab*tareasDia;
document.getElementById("IndDates").innerHTML=`El operario destacado entre el día ${date1} y el día ${date2} puede realizar la tarea un total de ${tareasTot} veces, considerando que de los ${diasDif} días entre las 
dos fechas solo ${diasLab} días son laborales (lunes-Viernes) sin considerar días festivos`
}

//--------------------------------------------------------------------------------------------------------------
/*Módulo 4:Comparación de tiempos.
Carga de información  de los tiempos de diferentes operarios, de acuerdo al número de muestra arrojado en el paso anterior (acá creo que 
esto se podría lograr a travez de un JSON, pero es algo que aún no vemos,por ahora solicitaré al usuario la
información a traves de un promp) con esta información se calcula el tiempo promedio, Valoración de tiempos de
los demás operarios*/
/*
1.Verificamos que tamaño de muestra ingresó el usuario y si no ingresó significa que solo hará uso del 
módulo 3 y usamos el tamaño de muestra que haya guardado en el localStorage
2.Creamos los nodos para capturar la información de los operarios a medir
*/

function capturanumOperarios(e){
let idNombre;
let idExp;
let id;
let br;
let div = document.getElementById('infOperarios');
typeof(sampleSize)==="undefined" && (sampleSize=localStorage.getItem("tamMuestra")); //Operador lógico AND
while (div.firstChild) {
    div.removeChild(div.firstChild);
}
numOperarios=parseInt((document.getElementById("numOperarios")).value);
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
        spanTime.innerHTML=`Toma de tiempo número: ${i+1} (minutos)`;
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
        let p=document.createElement("p");
        p.setAttribute("id",`p${i}`);
        multP.appendChild(p);
        p.innerHTML=document.getElementById(`p${i}`).innerHTML=`La información del operario ${i+1} es:<br>Nombre: ${nameOper}<br> Años de experiencia: ${experienceOper}`;
        operario[i]=new Operario(nameOper,experienceOper);
        for (let j=0;j<=(sampleSize-1);j++){
            let time=(document.getElementById(`operador${i+1}Tiempo${j+1}`)).value;
            operario[i].tiemposOperario[j]=parseFloat(time);
            //creamos un nodo <p></p> y agregamos la información
            let p=document.createElement("p");
            p.innerHTML=`tiempo ${j+1}: ${time} minutos`;
            multP.appendChild(p);   
            }
    }
}

function calcularPromMult(){
for (let i=0;i<=(numOperarios-1);i++){
    const promedioOperarios=calcTimeProm(operario[i].tiemposOperario);
    operario[i].tiempoPromedio=promedioOperarios;
    let p=document.createElement("p");
    p.setAttribute("id",`promP${i+1}`);
    promMultP.appendChild(p);
    p.innerHTML=document.getElementById(`promP${i+1}`).innerHTML=`El tiempo promedio del operario ${operario[i].nombre} es:${promedioOperarios} minutos`;
    }
}

function calcularEstMult(){
    cont=1;
    for (let i=0;i<=(numOperarios-1);i++){
        let promOper=operario[i].tiempoPromedio;
        agregarTolBasic(promOper);
        operario[i].tiempoEstandar=agregarTolBasic(promOper);
        let p=document.createElement("p");
        p.setAttribute("id",`estandP${i+1}`);
        timeEstSectionP.appendChild(p);
        p.innerHTML=document.getElementById(`estandP${i+1}`).innerHTML=`El tiempo estandar básico del operario ${operario[i].nombre} es:${estandarTimeRef} minutos`;
        }
}

function compararProm(){
    operariodest1=operariodest1 || obtenerObjLS(); //Operador lógico OR
    let {nombreRef,experienciaRef,tiempoPromRef}=operariodest1; //Desestructuración;
    let p=document.createElement("p");
    alert(`Tenga en cuenta que las comparaciones se realizarán con el operario ${nombreRef} que tiene ${experienciaRef} años de experiencia, cuyo tiempo promedio es ${tiempoPromRef}, si este no es el operario destacado que quiere comparar, por favor ingrese la información en el módulo 2`);
}


/*console.log(operario[i]);
    const estandarOperarios=agregarTolBasic(promedioOperarios);
    operario[i]=new Operario(nameOper,experienceOper,promedioOperarios,estandarOperarios); 
    let p=document.createElement("p");
    p.setAttribute("id",`p${i}`);
    timeMult.appendChild(p);
    p.innerHTML=document.getElementById(`p${i}`).innerHTML=`La información del operario ${i+1} es: ${JSON.stringify(operario[i])}<br>`;*/
