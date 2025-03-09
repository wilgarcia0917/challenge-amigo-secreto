let listado = 0;
let listaDeAmigos = [];
let sorteoRealizado = false; // Variable para controlar el sorteo

function asignarTextoElemento (elemento, texto){   
    let elementoHTML = document.querySelector(elemento); 
    elementoHTML.innerHTML = texto;
    return;
}

function agregarAmigo() {
    if (sorteoRealizado) {
        alert("El sorteo ya se realizó. Reinicia para agregar nuevos amigos.");
        return;
    }
    let nombresDeUsuario = document.getElementById('amigo');
    let nombres = nombresDeUsuario.value.trim();

    //Validar nombres con al menos 3 letras
    let validar = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]{3,}$/;
        if (!validar.test(nombres)) {
            alert("Debes de ingresar un nombre válido con un mínimo de 3 letras, sin número ni símbolos.");
            return;
        }

    let formatoDeNombre = nombres.toLowerCase(); // Convertirnos nombres a minusculas para evitar  duplicados. 
        if (listaDeAmigos.some(amigo => amigo.toLowerCase() === formatoDeNombre)) {
            alert ("Este nombre ya ha sido ingresado.");
            return;
        }

    //Agregar nombre y Limpiar el campo después de agregar.
    listaDeAmigos.push(nombres);
    nombresDeUsuario.value = "";

    actualizarLista();
}

function actualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; //Limpiar antes de actualizar

    //Mostrar lista solo cuándo hay nombres
    if (listaDeAmigos.length > 0){
        lista.style.display = "grid";
    } else {
        lista.style.display = "none";
    }
    
    for (let i = 0; i < listaDeAmigos.length; i++) {
        let li = document.createElement("li");
        li.textContent = listaDeAmigos[i];
        lista.appendChild(li);
    }
}

function sortearAmigo() {    
    if (listaDeAmigos.length < 2) {
        alert ("Debes de ingresar al menos dos nombres para realizar el sorteo");
        return;
    }

    let nombresAleatorios = Math.floor(Math.random() * listaDeAmigos.length);
    let amigoSeleccionado = listaDeAmigos[nombresAleatorios];
    
    //limpiar lista
    listaDeAmigos = [];
    actualizarLista();

    asignarTextoElemento ( 'h2',`El amigo secreto es: <strong>${amigoSeleccionado}</strong>`);    
    sorteoRealizado = true; // Se marca que el sorteo ha sido realizado
}

//función para reiniciar el Juego
function reiniciarJuego() {
    listaDeAmigos = [];
    sorteoRealizado = false; //  Restablecer la variable de control

    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById('h2',"").innerHTML = "";
    document.getElementById("amigo").value = "";
}
