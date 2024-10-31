let productosDelCarrito = document.getElementById("productosCarrito");

function cartas(){
    let cont = 0;
    let listaAñadidos = [];
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
    productosDelCarrito.innerHTML = carta;
}
document.onload = cartas();