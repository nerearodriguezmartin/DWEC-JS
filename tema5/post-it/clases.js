export {Nota, Notas, PostIt};



class Nota{
    constructor(){
        this.nota = null;
    }
    
    

    guardaNota(title, text, cod, hora, posX, posY){
            this.nota = {
                Titulo: title,
                Texto: text,
                Tiempo: hora,
                Codigo: cod,
                PosX: posX,
                PosY: posY,
            }
    }

    cambiaPos(posX, posY){
        this.nota.PosX = posX;
        this.nota.PosY = posY;
    }

    
}


class Notas{
    constructor(){
        this.notas = new Array();
    }

    add(...nota) {
        this.notas.push(...nota);
    }

    returnNota(titulo,texto){
        for (const nota of this.notas) {
            if(nota.Titulo == titulo && nota.Texto == texto){
                return nota;
            }
        }
    }

    editNota(titulo,texto, title, text){
        for (const nota of this.notas) {
            if(nota.Titulo == titulo && nota.Texto == texto){
                nota.Titulo = title;
                nota.Texto = text;
            }
        }
        return null;
    }

    cambiaPosicion(titulo,texto, posX, posY){
        for (const nota of this.notas) {
            if(nota.Titulo == titulo && nota.Texto == texto){
                nota.PosX = posX;
                nota.PosY = posY;
            }
        }
        return null;
    }
    
        removeAll(){
            this.notas = [];
        }



        borrarNota(titulo,texto){
            let notaBorrada = this.notas.findIndex(nota => nota.Titulo == titulo && nota.Texto == texto);
            if (notaBorrada != -1) {
                this.notas.splice(notaBorrada, 1);
            }
        }

    
}



class PostIt{
    constructor(nuevo, edit, remove, color, colores){
        this.cod = 0;
        this.notas = new Notas();
        this.pulsado = false;
        this.nuevo = nuevo;  //boton para añadir nota
        this.posit = new Nota();
        this.edit = edit; //boton para editar notas
        this.delete = remove; //boton para borrar todas las notas
        this.color = color; //btn para cambiar el color
        this.colores = colores; //input de cambio de color
        this.pintaNotasExistentes();
        this.visualizaNota();
        this.borrarTodasNotas();
        this.capturaColor();
    }

    creaNota(){
        this.note = document.createElement('div');
        this.title = document.createElement("input");
        this.title.placeholder = "Titulo de la nota"
        this.text = document.createElement('textarea');
        this.text.placeholder = "Introduce el texto"
        this.note.className = "nota";
        this.text.className = "texto";
        this.title.className = "texto";
        this.funciones = document.createElement('div');
        this.funciones.className = "funciones";
        this.edit = document.createElement('img');
        this.edit.src = "edit.svg";
        this.edit.className = "func";
        this.borra = document.createElement('img');
        this.borra.src = "borra.svg";
        this.borra.className = "func";
        this.borra.codigo = this.cod;
        this.save = document.createElement('img');
        this.save.src = "save.svg";
        this.save.className = "func";
        this.save.id = "save";
        this.save.codigo = this.cod;
        this.mueve = document.createElement('img');
        this.mueve.src = "mueve.svg";
        this.mueve.className = "func";
        this.mueve.id = "mueve";
        this.funciones.appendChild(this.save);
        this.funciones.appendChild(this.edit);
        this.funciones.appendChild(this.borra);
        this.funciones.appendChild(this.mueve);
        this.note.appendChild(this.funciones);
        this.note.appendChild(this.title);
        this.note.appendChild(this.text);
        
        this.guardar = document.createElement('button');
        this.guardar.textContent = "Guardar cambios";
        this.guardar.style.display = "none";
        this.tiempo = document.createElement('p');
        
        this.note.appendChild(this.guardar);
        this.note.appendChild(this.tiempo);
        document.body.appendChild(this.note);  
        this.note.style.color = this.note.col;
        this.editaNota();
        this.borraNota();
        this.mueveNota();
        this.cod++;
        
    }

    visualizaNota(){
        this.nuevo.addEventListener('click', ()=>
        {
            this.creaNota();
            this.almacenaNota(); 
                
        });
    }

    

    pintaNotasExistentes(){
        let a = localStorage.getItem("notas");
        let posits = JSON.parse(a);
        for (const posit of posits) {
            this.posit.guardaNota(posit.Titulo, posit.Texto, posit.Codigo, posit.Tiempo, posit.PosX, posit.PosY);
            this.notas.add(this.posit.nota);
            this.creaNota();
            this.note.style.marginLeft = posit.PosX;
            this.note.style.marginTop = posit.PosY;
            this.title.readOnly = true;
            this.text.readOnly = true;
            this.save.style.display = "none";
            this.title.value = posit.Titulo;
            this.text.value = posit.Texto;
            this.tiempo.textContent = this.calculaTiempo(posit.Tiempo);
        }
    }

    almacenaNota(){
        this.save.addEventListener("click", (e)=>
        {
            this.title.readOnly = true;
            this.text.readOnly = true;
            let title = this.title.value;
            let texto = this.text.value;
            let posicion = this.note.getBoundingClientRect();
            this.posit.guardaNota(title, texto, this.cod, new Date(), posicion.left, posicion.top);
            this.notas.add(this.posit.nota);
            this.tiempo.textContent = this.calculaTiempo(this.posit.nota.Tiempo);
            setInterval(()=>{
                this.tiempo.textContent = this.calculaTiempo(this.posit.nota.Tiempo);
            }, 60000);
            this.save.style.display = "none";
            localStorage.setItem("notas", JSON.stringify(this.notas.notas));
        });
    }

    editaNota(){
        this.edit.addEventListener("click", (e)=>
        {
            e.stopPropagation();
            let texto = e.target.parentNode.parentNode.childNodes[1].value;
            let titulo = e.target.parentNode.parentNode.childNodes[2].value;
            e.target.parentNode.parentNode.childNodes[1].readOnly = false;
            e.target.parentNode.parentNode.childNodes[2].readOnly = false;
            e.target.parentNode.parentNode.childNodes[3].style.display = "block";
            e.target.parentNode.parentNode.childNodes[3].addEventListener("click", ()=>
            {
                e.target.parentNode.parentNode.childNodes[3].style.display = "none";
                e.target.parentNode.parentNode.childNodes[1].readOnly = true;
                e.target.parentNode.parentNode.childNodes[2].readOnly = true;
                this.notas.editNota(texto, titulo, e.target.parentNode.parentNode.childNodes[1].value, e.target.parentNode.parentNode.childNodes[2].value);
                localStorage.setItem("notas", JSON.stringify(this.notas.notas));
                
            });
            
        }
        );
        
    }


    borraNota(){
        this.borra.addEventListener("click", (e)=>{
            e.stopPropagation();
            e.target.parentNode.parentNode.remove();
            let titulo=e.target.parentNode.parentNode.childNodes[1].value
            let texto=e.target.parentNode.parentNode.childNodes[2].value
            this.notas.borrarNota(titulo,texto);
            localStorage.setItem("notas", JSON.stringify(this.notas.notas));
            
        });
    }
    
    borrarTodasNotas(){
        this.delete.addEventListener("click", ()=>
        {
            this.notas.removeAll();
            localStorage.setItem("notas", JSON.stringify(this.notas.notas));
            let notas = document.body.getElementsByClassName("nota");
            for (var i = notas.length-1; i >= 0; i--) {
                notas[i].parentNode.removeChild(notas[i]);
            }
        });
        
    }



    

    //calcular el tiempo que hace desde la publicación de la nota

    calculaTiempo(date){
        if(!date){
            return 0;
        }
        else{
            let creacion = new Date(date);
            let ahora = new Date();
            let resta = ahora.getTime() - creacion.getTime();
            let tiempoPasado = ahora - resta;
            return ("Creada "+getTimeAgo(tiempoPasado));

        }
        
    }



    mueveNota(){
        var divs=document.querySelectorAll("#mueve");
        var divActual=null;
        var arrastrando=false;
        divs.forEach(div=>{
        div.addEventListener("mousedown",(e)=>
        {
            e.stopPropagation();
            arrastrando=true;
            divActual=e.currentTarget;
        });
        });

        window.addEventListener('mousemove',(e)=>
        {
            if(arrastrando){
        
                divActual.parentNode.parentNode.style.marginLeft = (e.x-150)+"px";
                divActual.parentNode.parentNode.style.marginTop = (e.y-120)+"px";
                
            }
        });


        window.addEventListener('mouseup', (e)=>
        {
            arrastrando= false;
            let posicionX = e.target.parentNode.parentNode.style.marginLeft;
            let posicionY = e.target.parentNode.parentNode.style.marginTop;
            let titulo = e.target.parentNode.parentNode.childNodes[1].value;
            let texto = e.target.parentNode.parentNode.childNodes[2].value;
            this.notas.cambiaPosicion(titulo, texto, posicionX, posicionY);
            localStorage.setItem("notas", JSON.stringify(this.notas.notas));
        });


   
    }

    capturaColor(){
        this.color.addEventListener("click", this.cambiaColorNotas);
    }

    cambiaColorNotas(){
        var divs=document.querySelectorAll(".nota");
        document.getElementById("colores").style.display = "block";
        document.getElementById("cambiar").style.display = "block";
        document.getElementById("cambiar").addEventListener("click", ()=>
        {
            let color = document.getElementById("colores").value;
            for (const nota of divs){
                nota.style.backgroundColor = color;
            }
            document.getElementById("colores").style.display = "none";
            document.getElementById("cambiar").style.display = "none";
        });
        
    }




}
const DATE_UNITS = {
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  }
  
  const getSecondsDiff = timestamp => (Date.now() - timestamp) / 1000
  const getUnitAndValueDate = (secondsElapsed) => {
    for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
      if (secondsElapsed >= secondsInUnit || unit === "second") {
        const value = Math.floor(secondsElapsed / secondsInUnit) * -1
        return { value, unit }
      }
    }
  }
  
  const getTimeAgo = timestamp => {
    const rtf = new Intl.RelativeTimeFormat()
  
    const secondsElapsed = getSecondsDiff(timestamp)
    const {value, unit} = getUnitAndValueDate(secondsElapsed)
    return rtf.format(value, unit)
  }

