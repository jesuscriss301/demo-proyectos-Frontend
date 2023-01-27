fetch('file:///C:/Users/Practicante_Sistemas/Desktop/demo-proyectos/json/proyecto.json')
    .then((response) => response.json())
    .then((json) => console.log(json));