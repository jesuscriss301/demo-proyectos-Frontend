

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
        var url ="http://localhost:8080/tareas/"+tarea;
        fetch(url)
        .then((response) => response.json())
        .then((res) => {
          codigoProyecto.textContent="#"+res.idProyecto.id;
          nombreProyecto.textContent=res.idProyecto.nombreProyecto;
          responsable.textContent= res.idProyecto.responsable;
          codigotarea.textContent="#"+res.id;
          nombreTarea.textContent= res.nombreTarea;
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
        
        let tarea= localStorage.getItem("idtarea");
        let descripcionB = document.querySelector("#descripcioBitacora");
        let imagen = document.querySelector("#direcionFotografia");
          var nuevo= {
            "idTarea": {
                "id": parseInt(tarea),
                "idProyecto": {
                    "id": 0,
                    "nombreProyecto": "",
                    "descripcionProyecto": "",
                    "responsable": "",
                    "areaTerreno": 0,
                    "diseno": null,
                    "presupuesto": null
                },
                "nombreTarea": "",
                "descripcionTarea": "",
                "idEtapa": {
                    "id": 3,
                    "nombreEtapa": ""
                },
                "completado": false,
                "fecha": ""
            },
            "descripcionBitacora": descripcionB.value,
            "idFoto": {
                "id": 1,
                "nombreFoto": "",
                "direccionCarpeta":imagen.value,
                "fecha": ""
            },
            "fecha": fecha()
        }
        console.log(nuevo);
        var url="http://localhost:8080/bitacoras" 
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
          });
        
        window.location='bitacora.html'
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


    function actualizar(id) {
      
        localStorage.setItem("bitacora", id);
        window.location='actualizarRegistro.html'
      }
    
    function eliminar(id) {
      result = window.confirm("si elimina este proyecto se perdera toda la informacion relacionada a este");
      if (result) {
        fetch("http://localhost:8080/bitacoras/"+id, {
      method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {console.log(res);
      
      leerdatos();})
      }
    }
    function actualizarBitacora(){

      result = window.confirm("si actualiza esta tarea se perdera toda la información relacionada antes de la actualización");
      if (result) {
        let tarea= localStorage.getItem("idtarea");
        let bitacora= localStorage.getItem("bitacora");
        let descripcionB = document.querySelector("#descripcioBitacora");
        let imagen = document.querySelector("#direcionFotografia");
          var nuevo= {
            "id":parseInt(bitacora),
            "idTarea": {
                "id": parseInt(tarea),
                "idProyecto": {
                    "id": 0,
                    "nombreProyecto": "",
                    "descripcionProyecto": "",
                    "responsable": "",
                    "areaTerreno": 0,
                    "diseno": null,
                    "presupuesto": null
                },
                "nombreTarea": "",
                "descripcionTarea": "",
                "idEtapa": {
                    "id": 3,
                    "nombreEtapa": ""
                },
                "completado": false,
                "fecha": ""
            },
            "descripcionBitacora": descripcionB.value,
            "idFoto": {
                "id": 1,
                "nombreFoto": "",
                "direccionCarpeta":imagen.value,
                "fecha": ""
            },
            "fecha": fecha()
        }
        console.log(nuevo);
      var url="http://localhost:8080/bitacoras" ;
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
      window.location='bitacora.html'
      }
    }
      function actualizacion() {
        var id= localStorage.getItem("Bitacora");
        var url ="http://localhost:8080/tareas/"+id;
        fetch(url)
        .then((response) => response.json())
        .then((json) => {
         
        let tarea= localStorage.getItem("idtarea");
        let descripcionB = document.querySelector("#descripcioBitacora");
        let imagen = document.querySelector("#direcionFotografia");
      
          descripcionB.setAttribute("value",json.descripcionBitacora);
          leerdatos();
        });
      }