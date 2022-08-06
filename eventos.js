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
document.querySelector("#tamMuestra").addEventListener("input",capturaTamMuestral);
document.querySelector("#radioPost1").addEventListener("click",describirHolguras);
document.querySelector("#radioPost2").addEventListener("click",describirHolguras);
document.querySelector("#radioLuz1").addEventListener("click",describirHolguras);
document.querySelector("#radioLuz2").addEventListener("click",describirHolguras);
document.querySelector("#radioLuz3").addEventListener("click",describirHolguras);
document.querySelector("#radiofino1").addEventListener("click",describirHolguras);
document.querySelector("#radiofino2").addEventListener("click",describirHolguras);
document.querySelector("#borrarHolguras").addEventListener("click",recetHolguras);
//Modulo 3
document.querySelector("#numOperarios").addEventListener("input",capturanumOperarios);
document.querySelector("#InfMult").addEventListener("click",leerInfOperarios);
