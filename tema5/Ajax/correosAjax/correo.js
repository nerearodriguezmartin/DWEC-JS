function loadDoc() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       // que hago cuando entra la respuesta
       let resultado = JSON.parse(this.responseText);
       let result = resultado.listaCorreos;
       let correos = [];
       for(i=0; i<result.length; i++){
            fila = document.createElement("tr");
            columna = document.createElement("td");
            desde = document.createElement("h5");
            desde.textContent = result[i].from;
            asunto = document.createElement("h3");
            asunto.textContent = result[i].asunto;
            men = document.createElement("small");
            men.textContent = result[i].mensaje;
            columna.appendChild(desde);
            columna.appendChild(asunto);
            columna.appendChild(men);
            fila.appendChild(columna);
            document.getElementById("tabla").appendChild(fila);
       }
        
    }

    };
    xhttp.open("GET", "correo.txt", true);
    xhttp.send();
  }

  window.onload = loadDoc();

 /* setInterval(loadDoc, 5000);*/