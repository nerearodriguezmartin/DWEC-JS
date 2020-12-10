import {PostIt, Nota, Notas} from "./clases.js";

window.onload = ()=>
{
    let nuevo = document.getElementById('new');
    let edit = document.getElementById('edit');
    let remove = document.getElementById('rmv');
    let color = document.getElementById('color');
    let colores = document.getElementById('colores');

    let post = new PostIt(nuevo, edit, remove, color, colores);
    
}


