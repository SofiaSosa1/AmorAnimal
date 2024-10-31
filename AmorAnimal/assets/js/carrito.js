let iconoCarrito = document.querySelector(".icono-carrito");
let contenedorCarrito = document.querySelector(".contenedor-carrito");
let cerrarCarrito = document.querySelector('#carrito i');

iconoCarrito.onclick = (e) =>{
    e.preventDefault();
    contenedorCarrito.style.display = 'flex';
    contenedorCarrito.style.zIndex = '9999';
    mostrarCarrito();
}

cerrarCarrito.onclick = (e) =>{
    e.preventDefault();
    contenedorCarrito.style.display = 'none';
}













function mostrarCarrito(){
    let contenedorprodAñadidos = document.getElementById("productosAgregadosAlCarrito");
    let contenedorBotones = document.getElementById("botonesCarrito");
    let mensajeVacio = document.getElementById("mensajeCarritoVacio");

    if(localStorage.getItem("productosAñadidos") == null){
        contenedorprodAñadidos.style.display = "none";
    }
    else{
        let cont = 0;
        let listaAñadidos = [];

        function cartas(){

            listaAñadidos = JSON.parse(localStorage.getItem("productosAñadidos"));

            let carta= "";
            listaAñadidos.forEach((producto, index) =>{
                carta += `<div class="cardDelCarrito" id="producto${index}"">`;
                carta += `<img src="${producto.imagen}" class="card-img-top-Carrito" alt="...">`;
                    carta += `<div class="card-body-Carrito">`;
                        carta += `<p class="card-title-Carrito">${producto.nombre}</p>`;
                        carta += `<p class="card-text-Carrito">$${producto.precio}</p>`;
                    carta += `</div>`;
                carta += `</div>`;

                cont = index;
            });
            contenedorprodAñadidos.innerHTML = carta;
        }
        document.onload = cartas();

        mensajeVacio.style.display = "none";
        contenedorBotones.style.display = "block";
        contenedorprodAñadidos.style.display = "block";
    }
}





function borrarProductosAñadidos(){
    let contenedorprodAñadidos = document.getElementById("productosAgregadosAlCarrito");
    let mensajeVacio = document.getElementById("mensajeCarritoVacio");
    
    mensajeVacio.style.display = "block"; 
    contenedorprodAñadidos.style.display = "none"; 

    localStorage.removeItem("productosAñadidos");
}



let botonF = document.getElementById("botonFinalizarCompra");
let botonV = document.getElementById("botonVaciar");

botonF.onclick = (e) =>{
    e.preventDefault();

    window.location.href = "../pages/finalizarcompra.html";  
}

botonV.onclick = (e) =>{
    e.preventDefault();

    location.reload();

    borrarProductosAñadidos();
}