

function leerdatos() {

  proyecto= localStorage.getItem("proyecto");
  tarea= localStorage.getItem("idtarea");

  var url ="http://localhost:8080/bitacoras/tareas/"+tarea;
    fetch(url)
    .then((response) => response.json())
    .then((json) => {cargaProyecto(json);
    cargaBitacoras(json);
    });
}

function cargaProyecto(json){
  
      let codigoProyecto=document.querySelector("#codigoProyecto");
      let nombreProyecto=document.querySelector("#nombreProyecto");
      let responsable= document.querySelector("#responsable");
      let codigotarea=document.querySelector("#codigoTarea");
      let nombretarea=document.querySelector("#nombreTarea");
      console.log(json);
      if (json!=0&&json != null) {

      codigoProyecto.textContent="#"+json[0].idTarea.idProyecto.id;
      nombreProyecto.textContent=json[0].idTarea.idProyecto.nombreProyecto;
      responsable.textContent= json[0].idTarea.idProyecto.responsable;
      codigotarea.textContent="#"+json[0].idTarea.id;
      nombreTarea.textContent= json[0].idTarea.nombreTarea;

      }else{
        var url ="http://localhost:8080/bitacoras/"+tarea;
        fetch(url)
        .then((response) => response.json())
        .then((res) => {
          codigoProyecto.textContent="#"+res[0].idTarea.idProyecto.id;
          nombreProyecto.textContent=res[0].idTarea.idProyecto.nombreProyecto;
          responsable.textContent= res[0].idTarea.idProyecto.responsable;
          codigotarea.textContent="#"+res[0].idTarea.id;
          nombreTarea.textContent= res[0].idTarea.nombreTarea;
        });
      }
  }

  function cargaBitacoras(json) {
    let tblBody= document.querySelector("#bitacoras");
    let tarea= document.querySelector("#bitacora");
    let table = document.querySelector("#table");
    let imagen = document.querySelector("#img");
    let actualizar= document.querySelector("#actualizar");
    let eliminar= document.querySelector("#eliminar");
    
    tblBody.innerHTML="";
    for (var i = 0; i < json.length; i++) {

        var hilera = document.createElement("tr");
        
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(i+1);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(json[i].id);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(json[i].fecha);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(json[i].descripcionBitacora);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
          var celda = document.createElement("td");
          var img = imagen.cloneNode(true);
          img.setAttribute("src", json[i].idFoto.direccionCarpeta);
          celda.appendChild(img);
          hilera.appendChild(celda);
          var celda = document.createElement("td");

      var newactualizar=actualizar.cloneNode(true);
      newactualizar.setAttribute("onclick", "actualizar("+json[i].id+")");

      var neweliminar=eliminar.cloneNode(true);
      neweliminar.setAttribute("onclick", "eliminar("+json[i].id+")");
      celda.appendChild(newactualizar);
      
      celda.appendChild(neweliminar);
      hilera.appendChild(celda);

    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
      }
      
      table.appendChild(tblBody);
      //localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
      tarea.remove();
    }

    function crearRegistros() {
        
        let descripcionB = document.querySelector("#descripcioBitacora");
        let imagen = document.querySelector("#direcionFotografia");
        let n =100;
        try {
          n = bitacorajson[bitacorajson.length-1].idBitacora + 1;
        } catch (error) {
         n =100;
        }
        
          var nuevo= {
            "idProyecto":jsonproyecto.idProyecto,
            "idTarea":jsontarea.idTarea,
            "idBitacora":n,
            "descripcionBitacora":descripcionB.value,
            "fotografia":imagen.value,
            "fecha":fecha()
        }
        bitacorajson.push(nuevo);
        localStorage.setItem("bitacoras",JSON.stringify(bitacorajson));
        window.location='bitacora.html';
        cargaBitacoras(bitacorajson);
      }
      function fecha() {
        var f = new Date();
        return f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    }
    function actualizar(id) {
      
        localStorage.setItem("bitacora", id);
        window.location='crearBitacora.html'
      }
    
    function eliminar(id) {
      result = window.confirm("si elimina este proyecto se perdera toda la informacion relacionada a este");
      if (result) {
        var nuevo =[];
        for(var i in bitacorajson){
          if(i!=id){
              nuevo.push(bitacorajson[i]);
          }
        }
        bitacorajson=nuevo;
        localStorage.setItem("bitacoras",JSON.stringify(bitacorajson));
        cargaBitacoras(bitacorajson);
      }
    }