var num = parseInt(prompt("Introduce el número a adivinar"));
var num_adivinar = parseInt(prompt("Introduce un número"));

if(num!=num_adivinar){
    do{
        if(num>num_adivinar)
            alert("El número es mayor");
        else
            alert("El número es menor");

        num_adivinar = parseInt(prompt("Introduce otro número"));
    }while(num!=num_adivinar)
}

alert("Enhorabuena!! Has acertado el número");