var url ="https://raw.githubusercontent.com/jesuscriss301/demo-proyectos-Frontend/main/json/proyecto.json?token=GHSAT0AAAAAAB56WV5DE27QFKWPUTBWIY6GY6UI46A"
fetch(url)
    .then((response) => response.json())
    .then((json) => cargaProyectos(json));

    


    function cargaProyectos(json) {
        let tblBody= document.querySelector("#proyectos");
        let table = document.querySelector("#table")
        for (var i = 0; i < json.length; i++) {
            // Crea las hileras de la tabla
            var hilera = document.createElement("tr");
        
            
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(i+1);
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(son[i].idProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(fecha());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(son[i].idProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(son[i].idProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(son[i].idProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(son[i].idProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
              var celda = document.createElement("td");
              var textoCelda = document.createTextNode(son[i].idProyecto.toString());
              celda.appendChild(textoCelda);
              hilera.appendChild(celda);
            
        
            // agrega la hilera al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(hilera);
          }
          table.appendChild(tblBody);
          console.log(json);
    }
    function fecha() {
        var f = new Date();
        return f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear();
    }