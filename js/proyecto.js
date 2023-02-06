
//leerdatos();

function leerdatos() {
  var url ="http://localhost:8080/proyectos";
  fetch(url)
  .then((response) => response.json())
  .then((json) => cargaProyectos(json));
}
       

    function cargaProyectos(json) {

        let tblBody= document.querySelector("#proyectos");
        let proyecto= document.querySelector("#proyecto");
        let table = document.querySelector("#table");
        let actualizar= document.querySelector("#actualizar");
        let eliminar= document.querySelector("#eliminar");
        let ver= document.querySelector("#ver");
        let plano= document.querySelector("#plano");
        tblBody.innerHTML="";
        for (var i = 0; i < json.length; i++) {
            
            // Crea las hileras de la tabla
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
              var textoCelda = document.createTextNode(fecha());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(json[i].nombreProyecto);
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(json[i].descripcionProyecto);               
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode("0%");
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);

              var celda = document.createElement("td");
              var newplano=plano.cloneNode(true);
              newplano.setAttribute("onclick", "plano("+json[i].id+")");
              //var textoCelda = document.createTextNode("prueba");
              celda.appendChild(newplano);
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
          //proyecto.remove();
    }
    function fecha() {
        var f = new Date();
        return f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    }
   

    function plano(id) {
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
    function ver(id) {
      localStorage.setItem("proyecto", id);
      window.location='tarea.html'
    }

    function eliminar(id) {
      result = window.confirm("si elimina este proyecto se perdera toda la informacion relacionada a este");
      if (result) {
        fetch("http://localhost:8080/proyectos/"+id, {
      method: 'DELETE',
      })
      .then(res => res.text()) // or res.json()
      .then(res => {console.log(res);
        leerdatos();
      })
      }
      }
      
    

    function crearProyecto() {
      
      let nombreP= document.querySelector("#nombreProyecto");
      let descripcionP = document.querySelector("#descripcionProyecto");
      let responsableP = document.querySelector("#nombreResponsable");
      let areaP = document.querySelector("#area");
      let planosP = document.querySelector("#planosProyecto");

        var nuevo={
          "nombreProyecto": nombreP.value,
          "descripcionProyecto":descripcionP.value,
          "responsable": responsableP.value,
          "areaTerreno":areaP.value,
          "diseno":{
            "id": 1,
            "nombreDiseño": "",
            "direccionCarpeta": "",
            "fechaDiseño": "",
            "aprovado": false
        },
          "presupuesto": null
    }
    console.log(nuevo);
   var url="http://localhost:8080/proyectos" 
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
        console.log(response);
        window.location='proyecto.html';
        leerdatos()
    }

    function actualizarProyecto(){
      result = window.confirm("si actualiza este proyecto se perdera toda la información relacionada antes de la actualización");
      if (result) {
        let a= localStorage.getItem("idProyecto");
      let nombreP= document.querySelector("#nombreProyecto");
      let descripcionP= document.querySelector("#descripcionProyecto");
      let areaP= document.querySelector("#area");
      let responsableP= document.querySelector("#nombreResponsable");
      let planosP= document.querySelector("#planosProyecto");
    
      var nuevo={
          "id": a,
          "nombreProyecto": nombreP.value,
          "descripcionProyecto":descripcionP.value,
          "responsable": responsableP.value,
          "areaTerreno":areaP.value,
          "diseno":{
            "id": 1,
            "nombreDiseño": "",
            "direccionCarpeta": "",
            "fechaDiseño": "",
            "aprovado": false
        },
          "presupuesto": null
      }
      var url="http://localhost:8080/proyectos" 
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
      
      window.location='proyecto.html'
      leerdatos();
    }}
    function actualizar(id) {
      localStorage.setItem("idProyecto",id+"")
      locate();
    }
      function actualizacion() {

        let a= localStorage.getItem("idProyecto");
        
        var url ="http://localhost:8080/proyectos/"+a;
        fetch(url)
        .then((response) => response.json())
        .then((json) => {

        let nombreP= document.querySelector("#nombreProyecto");
        let descripcionP = document.querySelector("#descripcionProyecto");
        let responsableP = document.querySelector("#nombreResponsable");
        let areaP = document.querySelector("#area");
        let planosP = document.querySelector("#planosProyecto");
        nombreP.setAttribute("value",json.nombreProyecto.toString());
        descripcionP.innerHTML=json.descripcionProyecto;
        responsableP.setAttribute("value",json.responsable);
        areaP.setAttribute("value",json.areaTerreno); 
        //planosP.setAttribute("value",json.diseño.direccionCarpeta);
  
        if(planosP.value=='""'||planosP.value=="undefined" )planosP.setAttribute("value","");
      });
    }
   function locate() {
      window.location='actualizarProyecto.html';
    }