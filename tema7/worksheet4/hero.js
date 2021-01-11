
//API SuperHero

 
cont=0

function loadDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
            maquetar(JSON.parse(this.responseText));
            search(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET","https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json", true);
    xhttp.send();
  }

function maquetar(json){

    for(let i=cont;i<json.length;i++){
        $('<div/>').attr("id", cont).css({
            "widht": "10rem",
            "height": "10rem",
            "display": "inline-block",
            "margin": "1rem",
            "borderRadius": "30px",
            "paddingBottom": "2rem",
            "backgroundColor": "rgba(255,0,0,0.6)",
        }).click(maquetarCard(json[i]));
        
            /*
        var div= document.createElement("div");
        div.style.width="10rem";
        div.id = cont;
        div.style.height="10rem";
        div.style.display="inline-block";
        div.style.margin="1rem";
        div.style.borderRadius="30px";
        div.style.paddingBottom= "2rem";
        div.style.backgroundColor="rgba(255,0,0,0.6)";
        div.onclick=()=>{
            maquetarCard(json[i]);
        }*/

        /*var img=document.createElement("img");
        
        img.src=json[i].images.sm;
        img.style.width="6rem";
        img.style.borderRadius="15px";
        img.style.height="6rem";
        img.style.marginLeft="2rem";
        img.style.marginBottom="4rem";*/

        $('<img/>').attr("src", json[i].images.sm).css({
            "width": "6rem",
            "borderRadius": "15px",
            "height": "6rem",
            "marginLeft": "2rem",
            "marginBottom": "4rem"
          });

        var nombre= document.createElement("p");
        /*
        nombre.style.textAlign="center";
        nombre.style.color="white";
        nombre.style.fontSize="18px"
        nombre.textContent=json[i].name;
*/

          $("p").atrr("textContent", json[i].name);
          $("p").css({
            "color": "white",
            "fontSize": "18px",
            "textAlign": "center"
          });
        document.getElementById("card").appendChild(div);
        div.appendChild(nombre);
        div.appendChild(img);

        cont++;
}
}


function maquetarCard(json){
    console.log(json);
    var modal = document.getElementById("tvesModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";

    document.body.style.position = "static";
    document.body.style.height = "100%";
    document.body.style.overflow = "hidden";

    document.getElementById("name").textContent = json.biography.fullName;
    document.getElementById("alturas").textContent="Height: "+json.appearance.height[1];
    document.getElementById("pesos").textContent="Weight: "+json.appearance.weight[1];
    document.getElementById("pelos").textContent="Hair Color: "+json.appearance.hairColor;
    document.getElementById("ojos").textContent="Eyes Color: "+json.appearance.eyeColor;
    document.getElementById("c").textContent="Combat: "+json.powerstats.combat;
    document.getElementById("d").textContent="Durability: "+json.powerstats.durability;
    document.getElementById("i").textContent="Intelligence: "+json.powerstats.intelligence;
    document.getElementById("p").textContent="Power: "+json.powerstats.power;
    document.getElementById("sp").textContent="Speed: "+json.powerstats.speed;
    document.getElementById("st").textContent="Combat: "+json.powerstats.strength;
    span.onclick = function() {
        modal.style.display = "none";

        document.body.style.position = "inherit";
        document.body.style.height = "auto";
        document.body.style.overflow = "visible";
    }

    
    
    
}

function search(json){
    document.getElementById("bot").addEventListener("click", ()=>
    {
        for(let i=0;i<json.length;i++){
            if(document.getElementById("search").value != json[i].name)
                document.getElementById(i).style.display="none"; 
            else{
                document.getElementById(i).style.display="block";
            }
        }

        var boton = document.getElementById("boton");
        boton.style.display="block";
        boton.addEventListener("click", ()=>
        {
            for(let i=0;i<json.length;i++){
                document.getElementById(i).style.display="inline-block";   
            }
            boton.style.display="none";
            document.getElementById("search").value = "";
        });
        
    });   
}




window.onload = ()=>{setInterval(loadDoc,400)}



