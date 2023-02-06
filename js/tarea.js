function leerdatos() {
  proyecto= localStorage.getItem("proyecto");
    var url ="http://localhost:8080/tareas/proyectos/"+proyecto;
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      cargaTareas(json);
      cargaProyectos(json[0]);
    });
}

function cargaTareas(json) {

let tblBody= document.querySelector("#tareas");
let tarea= document.querySelector("#tarea");
let table = document.querySelector("#table");
let actualizar= document.querySelector("#actualizar");
let eliminar= document.querySelector("#eliminar");
let ver= document.querySelector("#ver");
let completado= document.querySelector("#completo");
tblBody.innerHTML="";
for (var i = 0; i < json.length; i++) {
    // Crea las hileras de la tabla
    
    var hilera = document.createElement("tr");
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(i+1);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode("#"+json[i].id);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(json[i].nombreTarea);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(json[i].descripcionTarea);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(json[i].fecha);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var textoCelda = document.createTextNode(json[i].idEtapa.nombreEtapa);
      celda.appendChild(textoCelda);
      hilera.appendChild(celda);
      var celda = document.createElement("td");
      var newcompletado=completado.cloneNode(true);
      newcompletado.checked=json[i].completado;
      celda.appendChild(newcompletado);
      hilera.appendChild(celda);
      
      var celda = document.createElement("td");

      var newactualizar=actualizar.cloneNode(true);
      newactualizar.setAttribute("onclick", "actualizar("+json[i].id+")");

      var newver=ver.cloneNode(true);
      newver.setAttribute("onclick", "ver("+json[i].id+")");

      var neweliminar=eliminar.cloneNode(true);
      neweliminar.setAttribute("onclick", "eliminar("+json[i].id+")");
      celda.appendChild(newactualizar);
      celda.appendChild(newver);
      celda.appendChild(neweliminar);
      hilera.appendChild(celda);

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }
  
  table.appendChild(tblBody);
  //localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
  //tarea.remove();
    }
    function addplano() {
      window.location='actualizarPlano.html'

    }

    function plano() {
      let id = localStorage.getItem("proyecto");
      var url ="http://localhost:8080/proyectos/"+id;
       fetch(url)
        .then((response) => response.json())
        .then((json) => {
      let plano = json.diseno;
      if (plano != 0 && plano!=null) {
        console.log(json.diseno.direccionCarpeta);
        var win = window.open(json.diseno.direccionCarpeta, '_blank');
        win.focus();
      }
    });
    }

function cargaProyectos(json){

  proyecto= localStorage.getItem("proyecto");
    let codigoProyecto=document.querySelector("#codigoProyecto");
    let nombreProyecto=document.querySelector("#nombreProyecto");
    let responsable= document.querySelector("#responsable");
    
    if (json!=0&&json != null) {
      console.log(json);
    codigoProyecto.textContent="#"+json.idProyecto.id;
    nombreProyecto.textContent=json.idProyecto.nombreProyecto;
    responsable.textContent= json.idProyecto.responsable;}
    else{
      var url ="http://localhost:8080/proyectos/"+proyecto;
      fetch(url)
      .then((response) => response.json())
      .then((res) => {
        codigoProyecto.textContent="#"+res.id;
        nombreProyecto.textContent=res.nombreProyecto;
        responsable.textContent= res.responsable;

      });

    }
}
function actualizar(id) {
      
    localStorage.setItem("idtarea", id);
    window.location='actualizarTarea.html'
  }
  
  function ver(id) {

    localStorage.setItem("idtarea", id);
    window.location='bitacora.html'
  }

  function eliminar(id) {
    result = window.confirm("si elimina este proyecto se perdera toda la informacion relacionada a este");
    if (result) {
      fetch("http://localhost:8080/tareas/"+id, {
    method: 'DELETE',
    })
    .then(res => res.text()) // or res.json()
    .then(res => {console.log(res);
    
    leerdatos();})
    }
  }
  

  function crearTarea() {
    
    let nombreT= document.querySelector("#nombreTarea");
    let descripcionT = document.querySelector("#DescripcionTarea");
    let completoT = document.querySelector("#completo"); 
    let proyecto = localStorage.getItem("proyecto");
    let tarea=localStorage.getItem("idtarea");
    var nuevo={
      "idProyecto": {
          "id": parseInt(proyecto),
          "nombreProyecto": "",
          "descripcionProyecto": "",
          "responsable": "",
          "areaTerreno": 0,
          "diseno": null,
          "presupuesto": null
      },
      "nombreTarea": nombreT.value,
      "descripcionTarea": descripcionT.value,
      "idEtapa": {
          "id": 1,
          "nombreEtapa": ""
      },
      "completado":completoT.checked,
      "fecha": fecha()
  }
   console.log(nuevo);
  var url="http://localhost:8080/tareas" 
  const response = fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(nuevo) // body data type must match "Content-Type" header
    })
    .then((response) => response.json())
    .then((json) => {console.log(json);});
    
  
        window.location='tarea.html';
        leerdatos();
  }

  function fecha() {
    var f = new Date();
    let dia=f.getDate();
    let mes=(f.getMonth() +1);
    if (dia<10) {
      dia="0"+dia;
    }
    if (mes<10) {
      mes="0"+mes;
    }
    return  f.getFullYear()+ "-"+mes+ "-"+dia ;
}
function actualizarTarea(){

  result = window.confirm("si actualiza esta tarea se perdera toda la información relacionada antes de la actualización");
  if (result) {
  let nombreT= document.querySelector("#nombreTarea");
  let descripcionT= document.querySelector("#DescripcionTarea");
  let completoT= document.querySelector("#completo");
  let proyecto = localStorage.getItem("proyecto");
  let tarea=localStorage.getItem("idtarea");
  console.log(proyecto);
  var nuevo={
    "id": parseInt(tarea),
    "idProyecto": {
        "id": parseInt(proyecto),
        "nombreProyecto": "",
        "descripcionProyecto": "",
        "responsable": "",
        "areaTerreno": 0,
        "diseno": null,
        "presupuesto": null
    },
    "nombreTarea": nombreT.value,
    "descripcionTarea": descripcionT.value,
    "idEtapa": {
        "id": 1,
        "nombreEtapa": ""
    },
    "completado":completoT.checked,
    "fecha": fecha()
}

  var url="http://localhost:8080/tareas" ;
      const response =  fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(nuevo) // body data type must match "Content-Type" header
        });
  window.location='tarea.html'
  }
}
  function actualizacion() {
    var id= localStorage.getItem("idtarea");
    var url ="http://localhost:8080/tareas/"+id;
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
     
      let nombreT= document.querySelector("#nombreTarea");
      let descripcionT= document.querySelector("#DescripcionTarea");
      let checkT= document.querySelector("#completo");
  
      nombreT.setAttribute("value",json.nombreTarea);
      descripcionT.innerHTML=json.descripcionTarea;
      checkT.checked=json.completado;
      cargaProyectos(json);
    });
  }