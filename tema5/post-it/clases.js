export {Nota, Notas, PostIt};



class Nota{
    constructor(){
        this.nota = null;
        this.posX = null;
        this.posY = null;
        this.titulo = null;
        this.texto = null;
        this.codigo = null;
        this.hora = new Date();
        this.col = null;
    }
    
    

    guardaNota(title, text, cod, hora){
            this.titulo = title;
            this.texto = text;
            this.codigo = cod;
            this.hora = hora;
            this.nota = {
                Titulo: this.titulo,
                Texto: this.texto,
                Tiempo: this.hora,
                Codigo: this.codigo
            }
    }


    cambiaColores(color){
        this.nota.style.background = color;
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
    }

    creaNota(){
        this.note = document.createElement('div');
        this.note.draggable = true;
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
        this.funciones.appendChild(this.save);
        this.funciones.appendChild(this.edit);
        this.funciones.appendChild(this.borra);
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
        /*this.mueveNota();*/
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
            this.posit.guardaNota(posit.Titulo, posit.Texto, posit.Codigo, posit.Tiempo);
            this.notas.add(this.posit.nota);
            this.creaNota();
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
            this.posit.guardaNota(title, texto, this.cod, new Date());
            this.notas.add(this.posit.nota);
            this.tiempo.textContent = this.calculaTiempo(this.posit.hora);
            setInterval(()=>{
                this.tiempo.textContent = this.calculaTiempo(this.posit.hora);
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



    cambiaColor(){

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

