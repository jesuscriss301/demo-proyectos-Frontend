
let a=localStorage.getItem("proyectonuevo");
jsonproyecto=JSON.parse(a);
proyecto= localStorage.getItem("proyecto");
cargaProyectos()

var url ="http://localhost:8080/proyectos";
fetch(url)
.then((response) => response.json())
.then((json) => cargaTareas(json));

function cargaTareas(json) {

let tblBody= document.querySelector("#tareas");
let tarea= document.querySelector("#tarea");
let table = document.querySelector("#table");
let actualizar= document.querySelector("#actualizar");
let eliminar= document.querySelector("#eliminar");
let ver= document.querySelector("#ver");
tblBody.innerHTML="";
for (var i = 0; i < tareajson.length; i++) {
    // Crea las hileras de la tabla
    if (tareajson[i].idProyecto.toString() == jsonproyecto.idProyecto) {
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
      var textoCelda = document.createTextNode(tareajson[i].nombreTarea);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(tareajson[i].descripcionTarea);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(tareajson[i].fecha);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(tareajson[i].etapa);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(tareajson[i].completado);
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
  //tarea.remove();
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
function actualizar(id) {
      
    localStorage.setItem("tarea", id);
    window.location='actualizarTarea.html'
  }
  
  function ver(id) {

    localStorage.setItem("tarea", id);
    window.location='bitacora.html'
  }

  function eliminar(id) {
    result = window.confirm("si elimina este proyecto se perdera toda la informacion relacionada a este");
      if (result) {
    var nuevo =[];
    for(var i in tareajson){
      if(i!=id){
          nuevo.push(tareajson[i]);
      }
    }
    proyectojson=nuevo;
    localStorage.setItem("tareas",JSON.stringify(proyectojson));
    cargaTareas(proyectojson);
  }
  }

  function crearTarea() {
    
    let nombreT= document.querySelector("#nombreTarea");
    let descripcionT = document.querySelector("#DescripcionTarea");
    let completoT = document.querySelector("#completo");
    let n =100;
    try {
      n = tareajson[tareajson.length-1].idTarea + 1;
    } catch (error) {
     n =100;
    }
    
      var nuevo= {
        "idProyecto":jsonproyecto.idProyecto,
        "idTarea":n,
        "nombreTarea": nombreT.value,
        "descripcionTarea": descripcionT.value,
        "etapa": "prueba",
        "completado":completoT.checked,
        "fecha":fecha()
    }
    tareajson.push(nuevo);
    localStorage.setItem("tareas",JSON.stringify(tareajson));
    window.location='tarea.html';
    cargaTareas(tareajson);
  }
  function fecha() {
    var f = new Date();
    return f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
}
function actualizarTarea(){

  result = window.confirm("si actualiza esta tarea se perdera toda la información relacionada antes de la actualización");
  if (result) {
  tarea= localStorage.getItem("tarea");
  let nombreT= document.querySelector("#nombreTarea");
  let descripcionT= document.querySelector("#DescripcionTarea");
  let completoT= document.querySelector("#completo");

  var nuevo= {
    "idProyecto":tareajson[tarea].idProyecto ,
    "idTarea":tareajson[tarea].idTarea,
    "nombreTarea": nombreT.value,
    "descripcionTarea": descripcionT.value,
    "etapa": "prueba",
    "completado":completoT.checked,
    "fecha":tareajson[tarea].fecha
  }
  
  tareajson[tarea]= nuevo;
  localStorage.setItem("tareas",JSON.stringify(tareajson));
  
  window.location='tarea.html'
  }
}
  function actualizacion() {
    var id= localStorage.getItem("tarea");
    var a = localStorage.getItem("tareas");
    tareajson=JSON.parse(a);
    console.log(tareajson[id]);
    let nombreT= document.querySelector("#nombreTarea");
    let descripcionT= document.querySelector("#DescripcionTarea");
    let checkT= document.querySelector("#completo");

    nombreT.setAttribute("value",tareajson[id].nombreTarea);
    descripcionT.innerHTML=tareajson[id].descripcionTarea;
    checkT.setAttribute("checked",tareajson[id].completado);
  }