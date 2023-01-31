let a=localStorage.getItem("proyectonuevo");
let b= localStorage.getItem("tareas");
jsontarea= JSON.parse(b);
jsonproyecto=JSON.parse(a);
proyecto= localStorage.getItem("proyecto");
tarea= localStorage.getItem("tarea");
cargaProyecto();

var url ="https://raw.githubusercontent.com/jesuscriss301/demo-proyectos-Frontend/main/json/tarea.json";
fetch(url)
.then((response) => response.json())
.then((json) => cargaBitacoras(json));


function cargaProyecto(){
    
    jsonproyecto= jsonproyecto[proyecto];
    jsontarea=jsontarea[tarea];
    console.log(jsontarea);
  
      let codigoProyecto=document.querySelector("#codigoProyecto");
      let nombreProyecto=document.querySelector("#nombreProyecto");
      let responsable= document.querySelector("#responsable");
      let codigotarea=document.querySelector("#codigoTarea");
      let nombretarea=document.querySelector("#nombreTarea");
      codigoProyecto.textContent="#"+jsonproyecto.idProyecto;
      nombreProyecto.textContent=jsonproyecto.nombreProyecto;
      responsable.textContent= jsonproyecto.responsable;
      codigotarea.textContent="#"+jsontarea.idTarea;
      nombreTarea.textContent= jsontarea.nombreTarea;
      
  }

  function cargaBitacoras(json) {
    let a=localStorage.getItem("bitacoras");
    
    if(a!=null){
        bitacorajson=JSON.parse(a);
    }else{
        bitacorajson =json;
    }
    let tblBody= document.querySelector("#bitacoras");
    let tarea= document.querySelector("#bitacora");
    let table = document.querySelector("#table");
    /*
    let actualizar= document.querySelector("#actualizar");
    let eliminar= document.querySelector("#eliminar");
    let ver= document.querySelector("#ver");
    */
    tblBody.innerHTML="";
    for (var i = 0; i < tareajson.length; i++) {
        // Crea las hileras de la tabla
        if (tareajson.idTarea == bitacorajson[i].idTarea
            ||true) {
        var hilera = document.createElement("tr");
        
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(i+1);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(bitacorajson[i].idBitacora.toString());
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(bitacorajson[i].fecha.toString());
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(bitacorajson[i].descripcionBitacora.toString());
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(bitacorajson[i].fotografia.toString());
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
      }}
      
      table.appendChild(tblBody);
      //localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
      tarea.remove();
        }