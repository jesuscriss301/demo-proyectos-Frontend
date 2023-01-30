

        var url ="https://raw.githubusercontent.com/jesuscriss301/demo-proyectos-Frontend/main/json/proyecto.json";
        fetch(url)
        .then((response) => response.json())
        .then((json) => cargaProyectos(json));

    function cargaProyectos(json) {
      let a=localStorage.getItem("proyectonuevo");
       
      if(a!=""){
        proyectojson=JSON.parse(a);
      }else{
        proyectojson =json;
      }
        let tblBody= document.querySelector("#proyectos");
        let proyecto= document.querySelector("#proyecto");
        let table = document.querySelector("#table");
        let actualizar= document.querySelector("#actualizar");
        let eliminar= document.querySelector("#eliminar");
        let ver= document.querySelector("#ver");
        tblBody.innerHTML="";
        for (var i = 0; i < proyectojson.length; i++) {
            
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");
            
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(i+1);
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(JSON.stringify( proyectojson[i].idProyecto));
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(fecha());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(proyectojson[i].nombreProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(proyectojson[i].descripcionProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode("0%");
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode("prueba");
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
          }
          
          table.appendChild(tblBody);
          localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
          proyecto.remove();
    }
    function fecha() {
        var f = new Date();
        return f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    }
    function actualizar(id) {
      
      localStorage.setItem("proyecto", id);
      window.location='crearProyecto.html'
    }
    function ver(id) {
            
      //var select = proyectojson[id];

      localStorage.setItem("proyecto", id);
      window.location='tarea.html'
    }

    function eliminar(id) {
      var nuevo =[];
      for(var i in proyectojson){
        if(i!=id){
            nuevo.push(proyectojson[i]);
        }
      }
      proyectojson=nuevo;
      localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
      cargaProyectos(proyectojson);
    }

    function crarProyecto() {
      
      let nombreP= document.querySelector("#nombreProyecto");
      let descripcionP = document.querySelector("#descripcionProyecto");
      let n =100;
      try {
        n = proyectojson[proyectojson.length-1].idProyecto + 1;
      } catch (error) {
       n =100;
      }
      
        var nuevo={
          "idProyecto": n ,
          "nombreProyecto": nombreP.value,
          "descripcionProyecto": descripcionP.value,
          "responsable":"",
          "areaTerreno":0,
          "diseño":{},
          "presupuesto":{} 
      
     // var nuevoPJ = [proyectojson, nuevo];
     // proyectojson= nuevoPJ;
    }
    proyectojson.push(nuevo);
    localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
        window.location='proyecto.html';
        cargaProyectos(proyectojson);
    }