document.addEventListener("DOMContentLoaded", function() {
    const nombreUser = document.getElementById("botonLogin");

    // Verificar si hay un usuario logueado en localStorage
    const usuarioConectado = localStorage.getItem("usuarioConectado");
    if (usuarioConectado) {
        // Cambiar el texto de 'Iniciar sesión' a 'Hola, User'
        nombreUser.textContent = `Hola, ${usuarioConectado}`;
        nombreUser.classList.add("login-link");
        nombreUser.href = "./assets/pages/usuario.html"; // Eliminar el enlace de 'Iniciar sesión'
    } else {
        // Mantener el botón de 'Iniciar sesión' si no hay usuario logueado
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "./assets/pages/login.html"; // Enlace al login
    }
});



/*CARRUSEL PRODUCTOS MAS VENDIDOS */

function cargarProductosEnCarrusel() {
    const contenedorCarousel = document.getElementById("contenedorCarouselProductos");

    if (!contenedorCarousel) {
        console.error("No se encuentra el contenedor del carrusel de productos.");
        return;
    }

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    if (productos.length === 0) {
        console.warn("No hay productos guardados en localStorage.");
        return;
    }

    contenedorCarousel.innerHTML = "";

    const cartasPorSlide = 3; // Número de cartas a mostrar por cada diapositiva
    let slides = Math.ceil(productos.length / cartasPorSlide);

    for (let i = 0; i < slides; i++) {
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        if (i === 0) item.classList.add("active"); // Solo el primer elemento es activo al inicio

        let contenidoSlide = `<div class="d-flex justify-content-around">`;

        for (let j = i * cartasPorSlide; j < (i + 1) * cartasPorSlide && j < productos.length; j++) {
            const producto = productos[j];
            contenidoSlide += `
                <div class="card" >
                    <div class="contenedor_imagen">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    </div>
                    
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">${producto.descripcion}</p>
                        <input type="submit" class="btn btn-danger" id="botonañadir${j}" value="Añadir al carrito">
                    </div>
                </div>`;
        }

        contenidoSlide += `</div>`;
        item.innerHTML = contenidoSlide;
        contenedorCarousel.appendChild(item);
    }

    console.log("Productos cargados en el carrusel:", productos);
}

cargarProductosEnCarrusel();