class Producto{
    constructor(imagen, nombre, precio, descripcion){
        this.imagen = imagen;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}




/*FORMULARIO DE PRODUCTOS PARA EL ADMINISTRADOR*/
let formProductos = document.getElementById("formProductoNuevo");
let formProductosUsados = document.getElementById("formProductoUsado");
formProductos.style.display = "none"; 
            formProductosUsados.style.display = "none";

function esAdmin() {
    let usuarioConectado = localStorage.getItem("usuarioConectado");
    console.log("Usuario logueado:", usuarioConectado); 

    if (usuarioConectado === "Administrador") {
        console.log("El usuario es admin, mostrando el formulario");
        formProductos.style.display = "block";
        formProductosUsados.style.display = "none";
    }
    else{
        formProductos.style.display = "none";
        formProductosUsados.style.display = "none";
    }
}
document.onload = esAdmin();


/*FORMULARIO DE PRODUCTOS USADOS PARA EL USUARIO*/

function esUsuarioResgistrado() {
    let usuarioConectado = localStorage.getItem("usuarioConectado");
    console.log("Usuario logueado:", usuarioConectado); 

    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    for (let i = 0; i < usuariosRegistrados.length; i++) {
        const usuario = usuariosRegistrados[i];

        if (usuario.nombre === usuarioConectado) {
            console.log("El usuario logeado");
            formProductos.style.display = "none"; 
            formProductosUsados.style.display = "block";
        }
    }   
}
document.onload = esUsuarioResgistrado();









let cont = 0;
let listaProductos;

function cargarProductosActuales(){
    if(localStorage.getItem("productos") == null){
        listaProductos = [
            {imagen: "https://acdn.mitiendanube.com/stores/880/994/products/soga-trixie-pelota1-ebcbfb16fdc27581ee16862506057507-1024-1024.jpg" , nombre: "Juguete Soga", precio: 3500, descripcion: "Este Juguete está especialmente diseñada para la diversión de tu mascota, para aliviar el estrés y el aburrimiento, favoreciendo a su desarrollo físico y mental." },
            {imagen: "https://pampermut.com/blog/wp-content/uploads/2020/09/Sudadera-para-perros-fuzzyard-ya-disponible-en-Pampermut-1024x1024.jpg" , nombre: "Ropa de otoño/invierno para perros", precio: 8200, descripcion: "Las sudaderas sweater para perros de FuzzYard están hechas de un material de sudadera suave y cómodo que se puede lavar a máquina." },
            {imagen: "https://www.icasa.com/wp-content/uploads/2019/07/pags-jaulas-pagoda-surtida-para-pajaros-32-cm_general_5275.jpg" , nombre: "Jaulas PAGODA para pájaros", precio: 5000, descripcion: "Preciosa jaula con techo a dos aguas: Disponible en diferentes colores y está fabricada con materiales de alta calidad." },
            {imagen: "https://http2.mlstatic.com/D_NQ_NP_840567-MLA75303747910_032024-O.webp", nombre: "Rueda Ejercicio Hamster Rata", precio: 6200, descripcion: "Fija la rueda Rolly a su jaula. Una rueda de ejercicio que ayuda a sus mascotas a quemar energía, utilizando su instinto natural de correr." },
            /*{imagen: "" , nombre: "Juguete Soga", precio: 3500, descripcion: "Este Juguete está especialmente diseñada para la diversión de tu mascota, para aliviar el estrés y el aburrimiento, favoreciendo a su desarrollo físico y mental." }*/
        
        ];

        localStorage.setItem("productos", JSON.stringify(listaProductos));
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
                            <h5 class="card-title" onclick="toggleDescription(this)">${producto.nombre}</h5>
                            <p class="card-text">$${producto.precio}</p>
                            <p class="card-text">${producto.descripcion}</p>
                            <input type="submit" class="btn btn-danger" id="botonañadir${index}" value="Añadir al carrito">
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

/*<p class="card-text">${producto.descripcion}</p> */

document.onload = cargarProductosActuales();













/*INGRESO DE IMAGENES EN LOS FORMULARIOS */

function abrirSelector(button) {
    const form = button.closest("form");
    const fileInput = form.querySelector(".fileInput");
    fileInput.click();
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
                const form = input.closest("form");
                const imagenVistaPrevia = form.querySelector(".imagePreview");
                imagenVistaPrevia.src = e.target.result;
                imagenVistaPrevia.style.display = "block";
            };
            reader.readAsDataURL(archivo); // Lee el archivo como URL de datos
        }
    }
}







/*bloquear el salto de linea en textarea */
function pulsar(e) {
    if (e.which === 13 && !e.shiftKey) {
        e.preventDefault();
        console.log('prevented');
        return false;
    }
}
