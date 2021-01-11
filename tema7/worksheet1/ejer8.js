
window.onload =()=>{

    // cambiar fuente
    $("p#1").css("font-size", 16);
    $("p#2").css("font-size", 30);
    $("p#3").css("font-size", 50);

//mostrar/ocultar
    $("h1").click(function( event ) {
        if($(this).next().is(":visible")){
            event.preventDefault();
            $( this ).next().hide();
        }
        else{
            $( this ).next().show();
        }
        
      });

      // cambiar color de fondo y volver al original
$("p").hover(function() {
    $( this )
      .css("background-color", "blue");
  });

$("p").mouseleave(function() {
    $("p", this )
        .css("background-color", "white");
});
}




