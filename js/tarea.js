var url ="https://raw.githubusercontent.com/jesuscriss301/demo-proyectos-Frontend/main/json/proyecto.json";
fetch(url)
.then((response) => response.json())
.then((json) => cargaProyectos(json));

proyecto= localStorage.getItem("proyecto");

function cargaProyectos(json){
    jsonproyecto= json[proyecto];

    let codigoProyecto=document.querySelector("#codigoProyecto");
    let nombreProyecto=document.querySelector("#nombreProyecto");
    let responsable= document.querySelector("#responsable");
    
    codigoProyecto.textContent="#"+jsonproyecto.idProyecto;
    nombreProyecto.textContent=jsonproyecto.nombreProyecto;
    responsable.textContent= jsonproyecto.responsable;
}