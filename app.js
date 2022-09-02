
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
let muestralDif=0;
let detonante=0;
let contOper=0;
let contOper2=0;
let contOper3=0;
let contOper4=0;
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
    Toastify({
        text: "Usted ha seleccionado la opción "+ selected + " veces",
        duration: 3000,
    }).showToast();
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
        document.getElementById("rangeText").innerHTML=`Perfecto,el tiempo máximo es de: ${maxim.toFixed(2)} minutos y el mínimo
        de: ${minim.toFixed(2)} minutos, por tanto, el rango de los datos
        ingresados es  ${range.toFixed(2)} minutos`
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
        document.getElementById("promText").innerHTML=`El promedio de los datos ingresados es de: ${prom.toFixed(2)} minutos`
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
        if (sampleSize==0){
            document.getElementById("tamMuestraText").innerHTML=`Tiene uno o más datos atipicos (demasiado alejado de los demás datos), por favor vuelva a realizar la toma del tiempo y reemplace este dato para poder darle un tamaño de muestra`
        }else{
        document.getElementById("tamMuestraText").innerHTML=`El tamaño de muestra o número de mediciones que deben realizarse para obtener el tiempo promedio con un 95% de confianza es de: ${sampleSize}`
        capturaTamMuestral();
    }
    })
}

function mostrarInputMuestra(){
    div = document.getElementById('muestraDif');
    div.style.display = '';
    muestralDif=1;
}

function capturaTamMuestral(e){
    document.getElementById('tiemposReferencia').innerHTML = '';
    if (muestralDif==1){
        sampleSize=parseInt((document.getElementById("tamMuestra")).value);
    }
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
        div = document.getElementById('tiemposReferencia');
        div.style.display = "none";
} 

//-------------------------------------------------------------------------------------------------------------
/*Módulo 2:Ahora deberás seleccionar al operario más calificado para realizar la tarea
y tomar sus tiempos de acuerdo al tamaño de muestra indicada en el módulo anterior, es necesario
que sea un operario con experiencia que trabaje a un ritmo estándar de desempeño, sin esfuerzo adicional ya que
que este será nuestro tiempo promedio de referencia*/



//El usuario debe ingresar la información de su operario más capaz en la tarea y se muestra esta información
function ingresarInfRef(){
    if (sampleSize!=0){
    div = document.getElementById('referenceSeccion');
    div.style.display = '';
    div = document.getElementById('tiemposReferencia');
    div.style.display = '';
    }else{
        Toastify({
            text: "No ha seleccionado un tamaño de muestra, por favor vaya al módulo 1 para ingresar el tamaño de muestra",
            duration: 3800,
        }).showToast();
    }
}


function leerInfRef(){
    Toastify({
        text: "El envío de la información fue exitoso",
        duration: 3000,
    }).showToast();
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
        p.innerHTML=`${time.toFixed(2)} minutos`;
        tiemposIngresados.appendChild(p);
    }
}

//Calcularemos el tiempo promedio inicial del operario de referencia
function calcTimeProm(listado){
    const acumTimeRef=listado.reduce((acumulador,elemento)=>acumulador+elemento,0)
    promTimeRef=acumTimeRef/sampleSize;
    document.getElementById("promTimeRef").innerHTML=`La información del tiempo promedio de 
    referencia es: ${promTimeRef.toFixed(2)} minutos` 
    return promTimeRef;
}

/*Se agregan las holguras constantes básicas recomendadas por seguridad y salud
en el trabajo al tiempo promedio*/
function agregarTolBasic(tiempoPromedio){
    estandarTimeRef=tiempoPromedio*(1+holguraFatiga+holguraNeds);
    if (cont==0){
        document.getElementById("estandTimeRef").innerHTML=`tiempo estandar básico
        (sumando las holguras por fátiga y necesidades básicas): ${estandarTimeRef.toFixed(2)} minutos`}
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
    let holguraPol=document.getElementById("inputHolguraPol").value;
    if (holguraPol!=""){
        holguraPol=parseFloat(holguraPol);
    }else{
        holguraPol=0;
    }
    holgurasVarTot=holguraPostVal+holguraEsfuerzoVal+holguraLuzVal+holguraPol;
    estandarTimeRefFinal=tiempoEstandar+tiempoPromedio*(holgurasVarTot);
    document.getElementById("estandTimeRefFinal").innerHTML=`tiempo estandar final
    (sumando las holguras básicas y variables): ${estandarTimeRefFinal.toFixed(2)} minutos`
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
    Toastify({
        text: "Se han agregado las holguras variables, puede ver las seleccionadas en el texto inferior",
        duration: 3000,
    }).showToast();
}

function mostrarHolguraPol(){
    div = document.getElementById('sectionHolguraPol');
    div.style.display = '';
}

/*Llenado del objeto y guardar en el local Storage*/
function llenarObjOperRef(){
    operariodest1=new Operariodest(nameOperRef,experienceOperRef,promTimeRef,estandarTimeRef,estandarTimeRefFinal);  
    localStorage.setItem("operarioDest",JSON.stringify(operariodest1));
}

function obtenerObjLS(){
    if (operariodest1==0){
        operariodest1=JSON.parse(localStorage.getItem("operarioDest"));
        return operariodest1;
    } 
}
//--------------------------------------------------------------------------------------------------------------
/*Módulo 3:Comparación de tiempos.
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
if (sampleSize==0){
    (sampleSize=localStorage.getItem("tamMuestra"))
    }

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
    Toastify({
        text: "Se haenviado la información de manera exitosa",
        duration: 3000,
    }).showToast();
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
    p.innerHTML=document.getElementById(`promP${i+1}`).innerHTML=`El tiempo promedio del operario ${operario[i].nombre} es:${promedioOperarios.toFixed(2)} minutos`;
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

function selecHolgVarMult(){
    if (document.querySelector('input[name="holgurasMult"]:checked')!=null){
        holgurasMult= document.querySelector('input[name=holgurasMult]:checked').value;
        switch (holgurasMult) {
            case "distMult":
                mostrarHolgurasVarMult();
            break;
            case "distInd":
                mostrarHolgurasVarInd();
            break;
        }
    }
}


function mostrarHolgurasVarMult(){
    div = document.getElementById('holgurasVarMult');
    div.style.display = '';
}

function mostrarHolgurasVarInd(){
        generarListaDesp("containerOperarios");
        mostrarHolgurasVarMult();
        detonante=1;
}

function generarListaDesp(id){
    let select = document.createElement("select");
    select.name = "operarios";
    select.id = "operarios"
    for (i in operario)
    {
        let option = document.createElement("option");
        option.value = operario[i].nombre;
        let nombre=operario[i].nombre;
        option.text = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        select.appendChild(option);
    }
    let label = document.createElement("label");
    label.innerHTML = "Selecciona el operario: "
    label.htmlFor = "operarios";
    document.getElementById(id).appendChild(label).appendChild(select);
}


function agregarTolVarMult(){
        let holguraPostVal=0;
        let holguraLuzVal=0;
        let holguraEsfuerzoVal=0;
        if (document.querySelector('input[name="postura2"]:checked')!=null){
            holguraPost= document.querySelector('input[name=postura2]:checked').value;
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
        if (document.querySelector('input[name="luz2"]:checked')!=null){
            holguraLuz= document.querySelector('input[name=luz2]:checked').value;
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
        if (document.querySelector('input[name="esfuerzo2"]:checked')!=null){
            holguraEsfuerzo= document.querySelector('input[name=esfuerzo2]:checked').value;
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
        let holguraPol=document.getElementById("inputHolguraPol2").value;
        if (holguraPol!=""){
            holguraPol=parseFloat(holguraPol);
        }else{
            holguraPol=0;
        }
        holgurasVarTot=holguraPostVal+holguraEsfuerzoVal+holguraLuzVal+holguraPol;
        if (detonante==0){
            for (i in operario)
            {
                estandarTimeRefFinalMult=operario[i].tiempoEstandar+(operario[i].tiempoPromedio*(holgurasVarTot));
                let p=document.createElement("p");
                p.setAttribute("id",`estandP${i+1}`);
                estandTimeRefFinal2.appendChild(p);
                p.innerHTML=document.getElementById(`estandP${i+1}`).innerHTML=`El tiempo estandar final del operario ${operario[i].nombre} es:${estandarTimeRefFinalMult.toFixed(2)} minutos`;
                operario[i].tiempoEstandarFinal=estandarTimeRefFinalMult;
            }
        }else{
            contOper=contOper+1;
            let index;
            for (j in operario)
            {   estandarTimeRefFinalMult=operario[j].tiempoEstandar+(operario[j].tiempoPromedio*        (holgurasVarTot));
                let nombre=document.getElementById("operarios").value;
                if (operario[j].nombre==nombre){
                    index=j;
                    operario[j].tiempoEstandarFinal=estandarTimeRefFinalMult;
                    let p=document.createElement("p");
                    p.setAttribute("id",`estandP${contOper}`);
                    estandTimeRefFinal2.appendChild(p);
                    p.innerHTML=document.getElementById(`estandP${contOper}`).innerHTML=`El tiempo estandar final del operario ${operario[j].nombre} es:${estandarTimeRefFinalMult.toFixed(2)} minutos`;
                    operario[i].tiempoEstandarFinal=estandarTimeRefFinalMult;
                }
            }
        }
    }

function describirHolgurasMult(){
    let holguraLuzText="";
    let holguraEsfuerzoText="";
    let holguraPostText="";
    let textoFinal="";
    if (document.querySelector('input[name="postura2"]:checked')!=null){
        holguraPost= document.querySelector('input[name=postura2]:checked').value;
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
    if (document.querySelector('input[name="luz2"]:checked')!=null){
        holguraLuz= document.querySelector('input[name=luz2]:checked').value;
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
    if (document.querySelector('input[name="esfuerzo2"]:checked')!=null){
        holguraEsfuerzo= document.querySelector('input[name=esfuerzo2]:checked').value;
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
    document.getElementById("holgurasSelec2").innerHTML=textoFinal;
    Toastify({
        text: "Se han agregado las holguras variables, puede ver las seleccionadas en el texto inferior",
        duration: 3000,
    }).showToast();
}

function limpiarHolguras(){
    let radio;
    radio = document.getElementById("radio2Post1");
    radio.checked = false;
    radio = document.getElementById("radio2Post2");
    radio.checked = false;
    radio = document.getElementById("radio2Post3");
    radio.checked = false;
    radio = document.getElementById("radio2Luz1");
    radio.checked = false;
    radio = document.getElementById("radio2Luz2");
    radio.checked = false;
    radio = document.getElementById("radio2Luz3");
    radio.checked = false;
    radio = document.getElementById("radio2Luz4");
    radio.checked = false;
    radio = document.getElementById("radio2fino1");
    radio.checked = false;
    radio = document.getElementById("radio2fino2");
    radio.checked = false;
    radio = document.getElementById("radio2fino3");
    radio.checked = false;
    document.getElementById("holgurasSelec2").innerHTML="";
}

function mostrarHolguraPol2(){
    div = document.getElementById('sectionHolguraPol2');
    div.style.display = '';
}




//--------------------------------------------------------------------------------------------------------------
/*Módulo 4:Cálculos entre operarios*/
function compararTiempos(){
    operariodest1=operariodest1 || obtenerObjLS(); //Operador lógico OR
    let {nombreRef,experienciaRef,tiempoPromRef}=operariodest1; //Desestructuración;
    Toastify({
        text: `Tenga en cuenta que las comparaciones se realizarán con el operario de referencia${nombreRef} que tiene ${experienciaRef} años de experiencia, cuyo tiempo promedio es ${tiempoPromRef.toFixed(2)}, si este no es el operario destacado que quiere comparar, por favor ingrese la información en el módulo 2`,
        duration: 3000,
    }).showToast();
            let index;
            let tiempoRef;
            let tiempoEstFinalOper;
            tiempoRef=operariodest1.tiempoEstRefFinal;
            contOper2=contOper2+1;
            for (j in operario)
            {
                let nombre=document.getElementById("operarios").value;
                if (operario[j].nombre==nombre){
                    index=j;
                    tiempoEstFinalOper=operario[j].tiempoEstandarFinal;
                    let ind=tiempoEstFinalOper/tiempoRef;
                    let p=document.createElement("p");
                    p.setAttribute("id",`estandP${contOper2}`);
                    comparTiemposSeccion.appendChild(p);
                    p.innerHTML=document.getElementById(`estandP${contOper2}`).innerHTML=`El tiempo estandar final del operario ${operario[j].nombre} es el:${(ind*100).toFixed(2)}% del tiempo final del operario de referencia ${operariodest1.nombreRef}`;
                }
            }
}

function converMin(){
    let jornada=document.getElementById("jornada").value;
    let jornadaMin=jornada*60;
    operariodest1=operariodest1 || obtenerObjLS(); 
    let {nombreRef,tiempoPromRef,tiempoEstRefFinal}=operariodest1; 
    let minProductRef=jornadaMin/(1+(tiempoEstRefFinal-tiempoPromRef));
    let horasProducRef=(minProductRef/60);
    let horasLibRef=jornada-horasProducRef;
    tareasDiaRef=Math.floor(jornadaMin/(tiempoEstRefFinal));
    operariodest1.tareasDiaRef=tareasDiaRef;
    document.getElementById("indOperDest").innerHTML=`El operario ${nombreRef} de referencia tiene una jornada de ${horasProducRef.toFixed(2)} 
    horas productivas y de ${horasLibRef.toFixed(2)} horas libres de acuerdo a las holguras implementadas durante el día; y realiza 
    la tarea estudiada un total de ${tareasDiaRef} veces al día`;

    let index;
    contOper3=contOper3+1;
    for (j in operario)
    {
        let nombreBot=document.getElementById("operarios").value;
        if (operario[j].nombre==nombreBot){
            index=j;
            let {nombre,tiempoPromedio,tiempoEstandarFinal}=operario[j]; 
            let minProductOper=jornadaMin/(1+(tiempoEstandarFinal-tiempoPromedio));
            let horasProducOper=(minProductOper/60);
            let horasLibOper=jornada-horasProducOper;
            tareasDiaOper=Math.floor(jornadaMin/(tiempoEstandarFinal));
            operario[j].tareasDiaOper=tareasDiaOper;
            let p=document.createElement("p");
            p.setAttribute("id",`operP${contOper3}`);
            SeccionCompar.appendChild(p);
            p.innerHTML=document.getElementById(`operP${contOper3}`).innerHTML=`El operario ${nombre} tiene una jornada de ${horasProducOper.toFixed(2)} 
            horas productivas y de ${horasLibOper.toFixed(2)} horas libres de acuerdo a las holguras implementadas durante el día; y realiza 
            la tarea estudiada un total de ${tareasDiaOper} veces al día`;
        }
    }  
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
    tareasTotRef=diasLab*operariodest1.tareasDiaRef;
    document.getElementById("IndDates").innerHTML=`El operario destacado entre el día ${date1} y el día ${date2} puede realizar la tarea un total de ${tareasTotRef} veces, considerando que de los ${diasDif} días entre las 
    dos fechas solo ${diasLab} días son laborales (lunes-Viernes) sin considerar días festivos`

    contOper4=contOper4+1;
    for (j in operario)
    {
        let nombre=document.getElementById("operarios").value;
        if (operario[j].nombre==nombre){
            tareasTotalOper=tareasDiaOper*diasLab;
            let p=document.createElement("p");
            p.setAttribute("id",`fechasP${contOper4}`);
            comparFechasSeccion.appendChild(p);
            p.innerHTML=document.getElementById(`fechasP${contOper4}`).innerHTML=`El operario ${operario[j].nombre} entre el día ${date1} y el día ${date2} puede realizar la tarea un total de ${tareasTotalOper} veces, considerando que de los ${diasDif} días entre las 
            dos fechas solo ${diasLab} días son laborales (lunes-Viernes) sin considerar días festivos`;
        }
    }  
}
//--------------------------------------------------------------------------------------------------------------
/*Módulo 5:Cálculos con el operario destacado. En este módulo se incluyeron algunos cálculos como la cantidad de veces al día que el operario repite la tarea, el tiempo trabajado durante el día y el tiempo libre, además se cálcula el número de veces que se realizará la tarea entre un intervalo de fechas considerando solo días hábiles*/

