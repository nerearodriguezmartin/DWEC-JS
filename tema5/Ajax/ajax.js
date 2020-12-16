function loadDoc() {

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       // que hago cuando entra la respuesta
       let resultado = JSON.parse(this.responseText);
       let result = resultado.listaPersonas;
       for(i=0; i<result.length; i++)
        document.write (result[i].nombre+"<br>");
    }

    };
    xhttp.open("GET", "nerea.txt", true);
    xhttp.send();
  }

  setInterval(loadDoc, 3000);