export {Juego, Bola, Pala};

class Juego {
  
  constructor(svg, puntos){
    this.svg = svg;
    this.bola = new Bola('bola', 10, (Math.floor(Math.random() * (700 - 300)) + 300), (Math.floor(Math.random() * (400 - 200)) + 200), 2, 2, 'pink');
    this.pala1 = new Pala('pala1', 10, 80, 10, 20);
    this.pala2 = new Pala('pala2', 10, 80, 1080, 50);
    this.dibujaPala(this.svg, this.pala1, this.pala2);
    this.dibujaBola(this.bola, this.svg);
    this.creaGif();
    this.puntos = puntos;
    this.subePala1 = false;
    this.subePala2 = false;
    this.bajaPala1 = false;
    this.bajaPala2 = false;
    
    this.puntosJugador1 = 0;
    this.puntosJugador2= 0;
    this.creaTablaPuntuaciones(puntos);
    this.goal = document.createElementNS("http://www.w3.org/2000/svg", "img");
    this.anima();
  }

  creaTablaPuntuaciones(){
    var punto = document.createElement('table');
    var tr1 = document.createElement('tr');
    var tr2 = document.createElement('tr');
    var j1 = document.createElement('th');
    j1.textContent = "Puntuación del jugador 1";
    var j2 = document.createElement('th');
    j2.textContent = "Puntuación del jugador 2";
    var pp1 = document.createElement('td');
    var pp2 = document.createElement('td');
    pp1.textContent = 0;
    pp1.id = "pp1";
    pp2.id = "pp2";
    pp2.textContent = 0;
    tr1.appendChild(j1);
    tr1.appendChild(j2);
    tr2.appendChild(pp1);
    tr2.appendChild(pp2);
    punto.appendChild(tr1);
    punto.appendChild(tr2);
    this.puntos.appendChild(punto);  
    this.div = document.createElement('div');
    this.h2 = document.createElement('h2');
    this.h2.textContent = "";
    this.div.style.display = "none";
    this.div.appendChild(this.h2);
    document.body.appendChild(this.div);
    this.boton = document.createElement('button');
    this.boton.textContent = "Juega otra partida";
    this.boton.id = "juega";

    this.div.appendChild(this.boton);

    
  }

  creaGif(){
      this.rect = document.createElementNS("http://www.w3.org/2000/svg", "image");
      this.rect.setAttribute('id', 'gif');
      this.rect.setAttribute('width', 500);
      this.rect.setAttribute('height', 500);
      this.rect.setAttribute('x', 350);
      this.rect.setAttribute('y', 100);
      this.rect.setAttribute('href', "giphy.gif");
      this.rect.style.display = "none";
      this.svg.appendChild(this.rect);  
  }


  actualizaTabla(){
    document.getElementById("pp1").textContent = this.puntosJugador1;
    document.getElementById("pp2").textContent = this.puntosJugador2;
  }



  dibujaPala(svg, pala1, pala2){
    
    pala1.creaPala(svg, pala1);
    pala2.creaPala(svg, pala2);
    var tamanoSvg = this.svg.getBoundingClientRect();

    document.addEventListener("keydown", (event) => {
      var teclaPulsada = event.keyCode;

      if(teclaPulsada == 65){
          pala1.subePala1 = true;
          
        
      }

      if(teclaPulsada == 68){
          this.pala1.bajaPala1 = true;
          

      }

      if(teclaPulsada == 40){
          pala2.subePala2 = true;
         

      }

      if(teclaPulsada == 38){
        pala2.bajaPala2 = true;
        
      }
      
    });

    document.addEventListener("keyup", (event) => {
      var teclaPulsada = event.keyCode;

      if(teclaPulsada == 65){
          pala1.subePala1 = false;
          
        
      }

      if(teclaPulsada == 68){
        
          pala1.bajaPala1 = false;

      }

      if(teclaPulsada == 40){
          pala2.subePala2 = false;

      }

      if(teclaPulsada == 38){
        pala2.bajaPala2 = false;
      }
     
    });

    setInterval(()=>{
      if(pala1.subePala1){
          pala1.muevePalaArriba(pala1, tamanoSvg.height);

      }
      
      if(pala1.bajaPala1){
        pala1.muevePalaAbajo(pala1);
      }

      if(pala2.subePala2){
        pala2.muevePalaArriba(pala2, tamanoSvg.height);

      }else if(pala2.bajaPala2){
        pala2.muevePalaAbajo(pala2);

      }

      document.getElementById("pala1").setAttribute("y", pala1.yPala);
      document.getElementById("pala2").setAttribute("y", pala2.yPala);
  },5);

  }




  dibujaBola(bola, svg){
      bola = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      bola.setAttribute('id', this.bola.id);
      bola.setAttribute('cx', this.bola.posX);
      bola.setAttribute('cy', this.bola.posY);
      bola.setAttribute('r', this.bola.radio);
      bola.setAttribute('fill', this.bola.color);
      bola.incrX = this.bola.incrX;
      bola.incrY = this.bola.incrY;
      svg.appendChild(bola);
      document.body.appendChild(svg); 
  }

  actualizaJugadores(){
            clearInterval(this.intervalo);
            this.actualizaTabla();
            this.rect.style.display = "block";
            setTimeout(() => {
              this.rect.style.display = "none";
              if(this.puntosJugador1 < 5 && this.puntosJugador2 < 5){
                this.bola = new Bola('bola', 10, (Math.floor(Math.random() * (600 - 400)) + 400), (Math.floor(Math.random() * (350 - 200)) + 200), 2, 2, 'pink');
                this.anima();
              }
              else if(this.puntosJugador1 >= 5 || this.puntosJugador2 >= 5){
                clearInterval(this.intevalo);
                if (this.puntosJugador1 == 5){
                  this.h2.textContent = "El ganador es el jugador 1";
                }
                else if (this.puntosJugador2 == 5){
                  this.h2.textContent = "El ganador es el jugador 2";
                }
                  this.svg.style.display = "none";
                  this.div.style.display = "block";

                  this.boton.addEventListener("click", () => 
                  {
                    this.svg.style.display = "block";
                    this.puntosJugador1 = 0;
                    this.puntosJugador2 = 0;
                    this.actualizaTabla();
                    this.div.style.display = "none";
                    this.bola = new Bola('bola', 10, (Math.floor(Math.random() * (700 - 300)) + 300), (Math.floor(Math.random() * (400 - 200)) + 200), 2, 2, 'pink');
                    this.anima();
                  });

              }
            }, 5000);
           
  }




  anima(){
    //this.goal.style.display = "none";
      
   this.intervalo =  setInterval(() => 
    {
        /*this.rect.style.display = "none";*/
        this.bola.posX += this.bola.incrX;
        this.bola.posY += this.bola.incrY;

        var ball = document.getElementById('bola');
        var tamanoSvg = this.svg.getBoundingClientRect();
        

        ball.setAttribute("cx", this.bola.posX);
        ball.setAttribute("cy", this.bola.posY);

        


        // choque pala1
        if ((this.bola.posX - this.bola.radio) <= (this.pala1.xPala + this.pala1.anchoPala) && this.pala1.yPala <= (this.bola.posY - this.bola.radio)  && (this.bola.posY - this.bola.radio) <= (this.pala1.yPala + this.pala1.altoPala)){
          this.bola.incrX*=-1;
          
        }

        // choque pala2
        if ((this.bola.posX + this.bola.radio) >= (this.pala2.xPala) && this.pala2.yPala <= (this.bola.posY + this.bola.radio) && (this.bola.posY + this.bola.radio) <= (this.pala2.yPala + this.pala2.altoPala)){
          this.bola.incrX*=-1;
         
        }


        // choque con paredes
        if((this.bola.posY + this.bola.radio)>= tamanoSvg.height ||  (this.bola.posY - this.bola.radio)<= 0 )
            {
                this.bola.incrY *=- 1;
            }


            // se sale del tablero por la derecha
        if ((this.bola.posX + this.bola.radio)>= tamanoSvg.width)
          {
            this.puntosJugador1++;
            this.actualizaJugadores();
            



          }

          // se sale del tablero por la izquierda
        if((this.bola.posX - this.bola.radio) <= 0)
          {
            this.puntosJugador2++;
            this.actualizaJugadores();
          }

    }, 10);
    
  }
}





class Bola{

  constructor(id, radio, posX, posY, incrX, incrY, color){
      this.id = id;
      this.radio = radio;
      this.posX = posX;
      this.posY = posY;
      this.incrX = incrX;
      this.incrY = incrY;
      this.color = color;
      this.bola = null;
  }
  
}


class Pala{
    constructor(id, anchoPala, altoPala, xPala, yPala){
        this.id = id;
        this.altoPala = altoPala;
        this.anchoPala = anchoPala;
        this.xPala = xPala;
        this.yPala = yPala;
        this.mueveArriba = false;
        this.mueveAbajo = false;

    }
    
    creaPala(svg, pala){

        this.rect=document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.rect.setAttribute("x", pala.xPala);
        this.rect.setAttribute("y", pala.yPala);
        this.rect.setAttribute("width", pala.anchoPala);
        this.rect.setAttribute("height", pala.altoPala);
        this.rect.setAttribute("id", pala.id);
        
        svg.appendChild( this.rect);
    }

    muevePalaAbajo(pala){
      if(pala.yPala > 0){
        pala.yPala -= 2;
      }
       
      
      
    }

    muevePalaArriba(pala, svgHeight){

      if(pala.yPala<svgHeight-pala.altoPala){
        pala.yPala += 2;
      }
    }

    añadePunto(){
      this.puntuacion++;
    }
    

}

