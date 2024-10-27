class Producto{
    constructor(imagen, nombre, precio, descripcion){
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}


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
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <p class="card-text">${producto.descripcion}</p>
                        <button class="btn btn-primary" onclick="agregarAlCarrito(${j})">Añadir al carrito</button>
                    </div>
                </div>`;
        }

        contenidoSlide += `</div>`;
        item.innerHTML = contenidoSlide;
        contenedorCarousel.appendChild(item);
    }

    console.log("Productos cargados en el carrusel:", productos);
}

document.addEventListener("DOMContentLoaded", cargarProductosEnCarrusel);

function agregarAlCarrito(index) {
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
    let productosAñadidos = JSON.parse(localStorage.getItem("productosAñadidos")) || [];

    productosAñadidos.push(productos[index]);
    localStorage.setItem("productosAñadidos", JSON.stringify(productosAñadidos));
    alert("Producto añadido al carrito");
}

let formProductos = document.getElementById("formProductoNuevo");

function esAdmin() {
    let loggedInUser = localStorage.getItem("loggedInUser");
    console.log("Usuario logueado:", loggedInUser); 

    if (loggedInUser === "Admin") {
        console.log("El usuario es admin, mostrando el formulario");
        formProductos.style.display = "block";
    } else if(loggedInUser === "User1") {
        console.log("El usuario no es admin, ocultando el formulario");
        formProductos.style.display = "block"; 
    }
}
document.onload = esAdmin();


let cont = 0;
let listaProductos;

function cargarProductosActuales(){
    if(localStorage.getItem("productos") == null){
        listaProductos = [];
    }
    else{
        listaProductos = JSON.parse(localStorage.getItem("productos"));
    }

    let carta= "";
    const contenedorproductos = document.getElementById("productosPublicadosUsuario");
 
    listaProductos.forEach((producto, index) =>{
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">
        <img src="${producto.imagen}" class="card-img-top" alt="...">
           <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
               <p class="card-text">$${producto.precio}</p>
              <p class="card-text2">${producto.descripcion}</p>
              <input type="submit" class="submitBtn" id="botonañadir${index}" value="Añadir al carrito">
           </div>
        </div>`;

        cont = index
    });
    
    contenedorproductos.innerHTML = carta;

    let listaAñadidos;

    if(localStorage.getItem("productosAñadidos") == null){
        listaAñadidos = [];
    }
    else{
        listaAñadidos = JSON.parse(localStorage.getItem("productosAñadidos"));
    }
    

    for (let i = 0; i<cont+1; i++){
        let botonañadir = document.getElementById("botonañadir" + i);

        botonañadir.onclick = (e) =>{
            e.preventDefault()

            listaProductos = JSON.parse(localStorage.getItem("productos"));

            let producto = new Producto(listaProductos[i].imagen, listaProductos[i].nombre, listaProductos[i].precio, listaProductos[i].descripcion);

            listaAñadidos.push(producto);

            localStorage.setItem("productosAñadidos", JSON.stringify(listaAñadidos));
        }
    }
}


document.onload = cargarProductosActuales();








productosActuales();

function abrirSelector() {
    document.getElementById("fileInput").click();
}

function validarArchivo(input) {
    const archivo = input.files[0];
    if (archivo) {
        const tipoArchivo = archivo.type;
        if (tipoArchivo !== "image/jpeg") {
            alert("El archivo seleccionado no es de tipo .jpg");
            input.value = ""; // Resetea el campo de archivo
        } else {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imagenVistaPrevia = document.getElementById("imagePreview");
                imagenVistaPrevia.src = e.target.result;
                imagenVistaPrevia.style.display = "block";
            }
            reader.readAsDataURL(archivo); // Lee el archivo como URL de datos
        }
    }
}






















































/*
// Selecciona todas las cartas de productos
let productCards = document.querySelectorAll('.card');

// Crear un array vacío para almacenar los productos
let productsArray = [];

// Recorre cada tarjeta de producto y extrae la información
for (let i = 0; i < productCards.length; i++) {
    let card = productCards[i];
    
    // Extraer los detalles del producto
    let name = card.querySelector('.card-title').innerText;
    let price = card.querySelector('.card-price').innerText;
    let descripcion = card.querySelector('.card-descripcion').innerText;
    let image = card.querySelector('img').src;
    
    // Crear un objeto con los datos del producto
    let product = {
        name: name,
        price: price,
        descripcion: descripcion,
        image: image
    };

    // Agregar el objeto al array de productos
    productsArray.push(product);
}

// Mostrar el array en la consola
console.log(productsArray);
*/
/*
// Función para cargar las mascotas publicadas desde localStorage
function CargarProductosPublicados() {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
        const productos = JSON.parse(productosGuardados);
        productos.forEach(producto => {
            publicarProducto(producto.nombre, producto.precio, producto.descripcion, producto.imagen);
        });
    }
}*/



/*
function cargarProductosPublicados() {
    const productosGuardados = localStorage.getItem("productos");
    const contenedor = document.getElementById("productosPublicadosUsuario");
    contenedor.innerHTML = ''; // Limpiar contenido previo

    if (productosGuardados) {
        const productos = JSON.parse(productosGuardados);
        productos.forEach((producto, index) => {
            const productoDiv = document.createElement("div");
            productoDiv.classList.add("producto");

            productoDiv.innerHTML = `
                <img src="${producto.imagen}" class="card-img-top img-fluid" alt="Producto Imagen">
                <h3>${producto.nombre}</h3>
                <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                <p><strong>Precio:</strong> ${producto.precio}</p>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            `;
            contenedor.appendChild(productoDiv);
        });
    } else {
        contenedor.innerHTML = '<p>No hay productos publicados.</p>';
    }
}

window.onload = CargarProductosPublicados;
*/











































/*
class Producto{
    constructor(nombre, precio, descripcion){
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}



function validacionForm(){
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let stock = document.getElementById("stock").value;

    if (isNaN(precio) && isNaN(stock)){
        alert("No puede ingresar letras en el precio y stock, debe ingresar numeros.")
        return false;
    }
    else{
        if(isNaN(precio)){
            alert("No puede ingresar letras en el precio, debe ingresar numeros.")
            return false;
        }
        else{
            if(isNaN(stock)){
                alert("No puede ingresar letras en el stock, debe ingresar numeros.")
                return false;
            }
        }
    }


    if(nombre == "" || precio == "" || stock == ""){
        alert("El formulario está incompleto.")
        return false;
    }

    return true;
}







let cont = 0;
function cartas(){

    if(localStorage.getItem("productos") == null){
        listaProductos = [];
    }
    else{
        listaProductos = JSON.parse(localStorage.getItem("productos"));
    }
    
    
    
    

    let carta= "";
    const contenedorproductos = document.getElementById("productos");
    listaProductos.forEach((producto, index) =>{
        carta += `<div class="card" id="producto${index}" style="width: 18rem;">`;
        carta += `<img src="https://dummyimage.com/600x400/000/fff" class="card-img-top" alt="...">`;
            carta += `<div class="card-body">`;
                carta += `<h5 class="card-title">${producto.nombre}</h5>`;
                carta += `<p class="card-text">$${producto.precio}</p>`;
                carta += `<p class="card-text2">Descripcion: ${producto.descripcion}</p>`;
                carta += `<input type="submit" class="submitBtn" id="botonañadir${index}" value="Añadir al carrito">`;
            carta += `</div>`;
        carta += `</div>`;

        cont = index
    });
    
    contenedorproductos.innerHTML = carta;


    

    let listaAñadidos;

    if(localStorage.getItem("productosAñadidos") == null){
        listaAñadidos = [];
    }
    else{
        listaAñadidos = JSON.parse(localStorage.getItem("productosAñadidos"));
    }
    

    for (let i = 0; i<cont+1; i++){
        let botonañadir = document.getElementById("botonañadir" + i);

        botonañadir.onclick = (e) =>{
            e.preventDefault()

            listaProductos = JSON.parse(localStorage.getItem("productos"));

            let producto = new Producto(listaProductos[i].nombre, listaProductos[i].precio, listaProductos[i].descripcion);

            listaAñadidos.push(producto);

            localStorage.setItem("productosAñadidos", JSON.stringify(listaAñadidos));
        }
    }
}

document.onload = cartas();






const formProductos = document.getElementById("formulario");

function esAdmin(){
    let adminActivo = localStorage.getItem("Administrador");
    
    if(adminActivo == "ACTIVO"){
        formProductos.style.display = "block";
    }
    else{
        formProductos.style.display = "none";
    }
}

esAdmin();








function agregaProd(){
    if (validacionForm() == true){

        let nombre = document.getElementById("nombre").value;
        let precio = document.getElementById("precio").value;
        let stock = document.getElementById("stock").value;

        listaProductos = JSON.parse(localStorage.getItem("productos"));

        let prod = new Producto(nombre, precio, stock);
    
        listaProductos.push(prod);

        localStorage.setItem("productos", JSON.stringify(listaProductos));
        cartas();
        document.getElementById("nombre").value = "";
        document.getElementById("precio").value = "";
        document.getElementById("descripcion").value = "";
    }
    
}



let boton = document.getElementById("botonPublicarProducto");

boton.onclick = (e) =>{
    e.preventDefault()
    validacionForm()
    agregaProd()
}*/