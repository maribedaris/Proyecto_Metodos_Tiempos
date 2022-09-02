//Lector de eventos
//Modulo 1
    document.querySelector("#times").addEventListener("change",selectFunction);
    document.querySelector("#submitRange").addEventListener("click",calcRange);
    document.querySelector("#submitProm").addEventListener("click",calcProm);
    document.querySelector("#submitInd").addEventListener("click",calcIndicador);
//Modulo 2
    document.querySelector("#InfReferencia").addEventListener("click",ingresarInfRef);
    document.querySelector("#envioInfRef").addEventListener("click",leerInfRef);
    calcTimePromRef.addEventListener("click", () => calcTimeProm(times));
    calcTimeEstandRef.addEventListener("click", () => agregarTolBasic(promTimeRef));
    calcTimeEstandRefFinal.addEventListener("click", () => agregarTolVar(promTimeRef,estandarTimeRef));
    document.querySelector("#radioPost1").addEventListener("click",describirHolguras);
    document.querySelector("#radioPost2").addEventListener("click",describirHolguras);
    document.querySelector("#radioPost3").addEventListener("click",describirHolguras);
    document.querySelector("#radioLuz1").addEventListener("click",describirHolguras);
    document.querySelector("#radioLuz2").addEventListener("click",describirHolguras);
    document.querySelector("#radioLuz3").addEventListener("click",describirHolguras);
    document.querySelector("#radioLuz4").addEventListener("click",describirHolguras);
    document.querySelector("#radiofino1").addEventListener("click",describirHolguras);
    document.querySelector("#radiofino2").addEventListener("click",describirHolguras);
    document.querySelector("#radiofino3").addEventListener("click",describirHolguras);
    document.querySelector("#inputMuestra").addEventListener("click",mostrarInputMuestra);
    document.querySelector("#tamMuestra").addEventListener("input",capturaTamMuestral);
    document.getElementById('tamMuestra').addEventListener('keypress', e =>capturaTamMuestral(e) );
    document.querySelector("#holgVarMas").addEventListener("click",mostrarHolguraPol);
//Modulo 3
    document.querySelector("#numOperarios").addEventListener("input",capturanumOperarios);
    document.getElementById('numOperarios').addEventListener('keypress', e =>capturanumOperarios(e) );
    document.querySelector("#InfMult").addEventListener("click",leerInfOperarios);
    document.querySelector("#promMult").addEventListener("click",calcularPromMult);
    document.querySelector("#estMult").addEventListener("click",calcularEstMult);
    document.querySelector("#varMult").addEventListener("click",selecHolgVarMult);
    document.querySelector("#varMult2").addEventListener("click",selecHolgVarMult);
    document.querySelector("#radio2Post1").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2Post2").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2Post3").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2Luz1").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2Luz2").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2Luz3").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2Luz4").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2fino1").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2fino2").addEventListener("click",describirHolgurasMult);
    document.querySelector("#radio2fino3").addEventListener("click",describirHolgurasMult);
    document.querySelector("#holgVarMas2").addEventListener("click",mostrarHolguraPol2);
    document.querySelector("#containerOperarios").addEventListener("click",limpiarHolguras);
    calcTimeEstandRefFinal2.addEventListener("click", () => agregarTolVarMult());
//Módulo 4
    selectOper.addEventListener("click", () => generarListaDesp("desplebleList","operarios2"));
    document.querySelector("#timesCompare").addEventListener("click",compararTiempos);
    document.querySelector("#CalcTimeFree").addEventListener("click",converMin);
    document.querySelector("#entreFechas").addEventListener("click",tareasEntreFechas);
