
let a=localStorage.getItem("proyectonuevo");
jsonproyecto=JSON.parse(a);
proyecto= localStorage.getItem("proyecto");
cargaProyectos()

var url ="https://raw.githubusercontent.com/jesuscriss301/demo-proyectos-Frontend/main/json/tarea.json";
fetch(url)
.then((response) => response.json())
.then((json) => cargaTareas(json));

function cargaTareas(json) {
let a=localStorage.getItem("tareas");

if(a!=null){
    tareajson=JSON.parse(a);
}else{
    tareajson =json;
    console.log(tareajson);
}
let tblBody= document.querySelector("#tareas");
let tarea= document.querySelector("#tarea");
let table = document.querySelector("#table");
let actualizar= document.querySelector("#actualizar");
let eliminar= document.querySelector("#eliminar");
let ver= document.querySelector("#ver");
tblBody.innerHTML="";
for (var i = 0; i < tareajson.length; i++) {
    // Crea las hileras de la tabla
    if (true) {
    var hilera = document.createElement("tr");
    
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(i+1);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(tareajson[i].idTarea.toString());
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(JSON.stringify(tareajson[i].nombreTarea));
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(JSON.stringify(tareajson[i].descripcionTarea));
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(JSON.stringify(tareajson[i].fecha));
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(JSON.stringify(tareajson[i].etapa));
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(JSON.stringify(tareajson[i].completado));
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      
      var celda = document.createElement("td");

      var newactualizar=actualizar.cloneNode(true);
      newactualizar.setAttribute("onclick", "actualizar("+i+")");

      var newver=ver.cloneNode(true);
      newver.setAttribute("onclick", "ver("+i+")");

      var neweliminar=eliminar.cloneNode(true);
      neweliminar.setAttribute("onclick", "eliminar("+i+")");
      celda.appendChild(newactualizar);
      celda.appendChild(newver);
      celda.appendChild(neweliminar);
      hilera.appendChild(celda);

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }}
  
  table.appendChild(tblBody);
  //localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
  tarea.remove();
    }

function cargaProyectos(){
  //  if(localStorage.getItem("nuevoProyecto")=='['){
    jsonproyecto= jsonproyecto[proyecto];
//}

    let codigoProyecto=document.querySelector("#codigoProyecto");
    let nombreProyecto=document.querySelector("#nombreProyecto");
    let responsable= document.querySelector("#responsable");
    
    codigoProyecto.textContent="#"+jsonproyecto.idProyecto;
    nombreProyecto.textContent=jsonproyecto.nombreProyecto;
    responsable.textContent= jsonproyecto.responsable;
}

