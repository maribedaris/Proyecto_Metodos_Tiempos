/*window.onload=function(){
    let archivo=new XMLHttpRequest();
    archivo.open("GET","./datos.json");
    archivo.onload=function(){
        if (archivo.status==200){
            let tamaños=JSON.parse(archivo.responseText);
            console.log(tamaños);
            let indicador=0.01;
            for (let i=0;i<tamaños.length;i++){
                if (tamaños[i].Indicador==indicador)
                console.log(tamaños[i].Cinco)
            }
        }
    };

    archivo.send();
};*/

