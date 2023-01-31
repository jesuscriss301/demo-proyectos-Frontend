

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
        let plano= document.querySelector("#plano");
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
              var newplano=plano.cloneNode(true);
              newplano.setAttribute("onclick", "plano("+i+")");
              //var textoCelda = document.createTextNode("prueba");
              celda.appendChild(newplano);
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
      window.location='actualizarProyecto.html'

    }

    function plano(id) {
      let plano = proyectojson[id].diseño.toString();
      if (plano != {}) {
        var win = window.open(plano, '_blank');
        win.focus();
      }
    }
    function ver(id) {
      localStorage.setItem("proyecto", id);
      window.location='tarea.html'
    }

    function eliminar(id) {
      result = window.confirm("si elimina este proyecto se perdera toda la informacion relacionada a este");
      if (result) {
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
      
    }

    function crearProyecto() {
      
      let nombreP= document.querySelector("#nombreProyecto");
      let descripcionP = document.querySelector("#descripcionProyecto");
      let responsableP = document.querySelector("#nombreResponsable");
      let areaP = document.querySelector("#area");
      let planosP = document.querySelector("#planosProyecto");
      let n =100;
    try {
      n = tareajson[tareajson.length-1].idTarea + 1;
    } catch (error) {
     n =100;
    }
        var nuevo={
          "idProyecto": n ,
          "nombreProyecto": nombreP.value,
          "descripcionProyecto": descripcionP.value,
          "responsable":responsableP.value,
          "areaTerreno":areaP.value,
          "diseño":planosP.value,
          "presupuesto":{} 
        }
      proyectojson.push(nuevo);
      localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
        window.location='proyecto.html';
        cargaProyectos(proyectojson);
    }

    function actualizarProyecto(){
      result = window.confirm("si actualiza este proyecto se perdera toda la información relacionada antes de la actualización");
      if (result) {
      proyecto= localStorage.getItem("proyecto");

      let nombreP= document.querySelector("#nombreProyecto");
      let descripcionP= document.querySelector("#descripcionProyecto");
      let areaP= document.querySelector("#area");
      let responsableP= document.querySelector("#nombreResponsable");
      let planosP= document.querySelector("#planosProyecto");
    
      var nuevo={
        "idProyecto": proyectojson[proyecto].idProyecto ,
        "nombreProyecto": nombreP.value,
        "descripcionProyecto": descripcionP.value,
        "responsable":responsableP.value,
        "areaTerreno":areaP.value,
        "diseño":planosP.value,
        "presupuesto":""
        }
      
      proyectojson[proyecto]= nuevo;
      localStorage.setItem("proyectonuevo",JSON.stringify(proyectojson));
      
      window.location='proyecto.html'
      }
    }
      function actualizacion() {
        var id= localStorage.getItem("proyecto");
        var a = localStorage.getItem("proyectonuevo");
        proyectojson=JSON.parse(a);
        console.log(proyectojson[id]);
        let nombreP= document.querySelector("#nombreProyecto");
        let descripcionP = document.querySelector("#descripcionProyecto");
        let responsableP = document.querySelector("#nombreResponsable");
        let areaP = document.querySelector("#area");
        let planosP = document.querySelector("#planosProyecto");
  
        nombreP.setAttribute("value",proyectojson[id].nombreProyecto);
        descripcionP.innerHTML=proyectojson[id].descripcionProyecto;
        responsableP.setAttribute("value",proyectojson[id].responsable);
        areaP.setAttribute("value",proyectojson[id].areaTerreno); 
        planosP.setAttribute("value",JSON.stringify(proyectojson[id].diseño));
  
        if(planosP.value=='""')planosP.setAttribute("value","");
      }
      

      
    