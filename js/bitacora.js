let a=localStorage.getItem("proyectonuevo");
let b= localStorage.getItem("tareas");
jsontarea= JSON.parse(b);
jsonproyecto=JSON.parse(a);
proyecto= localStorage.getItem("proyecto");
tarea= localStorage.getItem("tarea");
cargaProyecto();

var url ="https://raw.githubusercontent.com/jesuscriss301/demo-proyectos-Frontend/main/json/bitacora.json";
fetch(url)
.then((response) => response.json())
.then((json) => cargaBitacoras(json));


function cargaProyecto(){
    
    jsonproyecto= jsonproyecto[proyecto];
    jsontarea=jsontarea[tarea];
  
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
    let imagen = document.querySelector("#img");
    let actualizar= document.querySelector("#actualizar");
    let eliminar= document.querySelector("#eliminar");
    
    tblBody.innerHTML="";
    for (var i = 0; i < bitacorajson.length; i++) {
        // Crea las hileras de la tabla
        if (jsontarea.idTarea == bitacorajson[i].idTarea) {
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
          var img = imagen.cloneNode(true);
          img.setAttribute("src", bitacorajson[i].fotografia.toString());
          celda.appendChild(img);
          hilera.appendChild(celda);
          var celda = document.createElement("td");

      var newactualizar=actualizar.cloneNode(true);
      newactualizar.setAttribute("onclick", "actualizar("+i+")");

      var neweliminar=eliminar.cloneNode(true);
      neweliminar.setAttribute("onclick", "eliminar("+i+")");
      celda.appendChild(newactualizar);
      
      celda.appendChild(neweliminar);
      hilera.appendChild(celda);

    
        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
      }}
      
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