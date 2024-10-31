document.addEventListener("DOMContentLoaded", function() {
    const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    const listaUsuarios = document.getElementById("listaUsuarios");

    // Limpiar el contenedor antes de agregar los datos
    listaUsuarios.innerHTML = "";

    // Mostrar los datos de cada usuario en la página
    usuariosRegistrados.forEach(usuario => {
        const usuarioDiv = document.createElement("div");
        usuarioDiv.classList.add("usuario-item");

        usuarioDiv.innerHTML = `
            <p>Nombre: ${usuario.nombre}</p>
            <p>Apellido: ${usuario.apellido}</p>
            <p>DNI: ${usuario.dni}</p>
            <p>Email: ${usuario.email}</p>
            <p>Email: ${usuario.contraseña}</p>
            <hr>
        `;
 

    const listaUsuarios = document.getElementById("listaUsuarios");
        listaUsuarios.innerHTML = "";



        listaUsuarios.appendChild(usuarioDiv);
    });
    // Manejar múltiples dropdowns
document.querySelectorAll(".dropdown").forEach(dropdown => {
    const content = dropdown.querySelector(".dropdown-content");

    dropdown.addEventListener("click", function(event) {
        event.stopPropagation(); // Evitar que el clic se propague
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
});
});


// Cerrar dropdowns si se hace clic fuera de ellos
window.addEventListener("click", function() {
    document.querySelectorAll(".dropdown-content").forEach(content => {
        content.style.display = "block";
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const nombreUser = document.getElementById("botonLogin");
    const usuarioConectado = localStorage.getItem("usuarioConectado");
    if (usuarioConectado) {
        nombreUser.textContent = `Hola, ${usuarioConectado}`;
        nombreUser.classList.add("login-link");
        nombreUser.href = "../pages/usuario.html"; 
    } else {
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "../pages/login.html"; 
    }
});


const botonCerrarSesion = document.getElementById("botonCerrarSesion");

botonCerrarSesion.addEventListener("click", function() {
    // Eliminar el usuario de localStorage
    localStorage.removeItem("usuarioConectado");

    // Redirigir al index.html
    window.location.href = "../../index.html"; 
});








function cargarMascotasPerdidas() {
    const productosGuardados = localStorage.getItem("mascotasPublicadas");
    const contenedor = document.getElementById("mascotasPublicadasUsuario");

    if (productosGuardados) {
        const mascotasPublicadas = JSON.parse(productosGuardados);
        contenedor.innerHTML = ''; 
        if (mascotasPublicadas.length > 0) {
            mascotasPublicadas.forEach((mascota, index) => {
                const mascotaDiv = document.createElement('div');
                mascotaDiv.classList.add('published-pet');
                mascotaDiv.innerHTML = `
                    <h3>Nombre: ${mascota.nombre}</h3>
                    <p>Descripción: ${mascota.descripcion}</p>
                    <p>Teléfono: ${mascota.telefono}</p>
                    <button  type="button" class="btn btn-danger" onclick="eliminarMascota(${index})">Eliminar</button>
                    <button type="button" class="btn btn-secondary" onclick="editarMascota(${index})">Editar</button>
                `;
                contenedor.appendChild(mascotaDiv);
            });
        } else {
            contenedor.innerHTML = '<p>No hay mascotas publicadas.</p>';
        }
    } else {
        contenedor.innerHTML = '<p>No hay mascotas publicadas.</p>';
    }
}

function eliminarMascota(index) {
    const productosGuardados = localStorage.getItem("mascotasPublicadas");
    if (productosGuardados) {
        let productos = JSON.parse(productosGuardados);
        productos.splice(index, 1); 
        localStorage.setItem("mascotasPublicadas", JSON.stringify(productos));
       cargarMascotasPerdidas(); 
    }
}

cargarMascotasPerdidas(); 

function publicarProducto() {
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
                <input type="submit" class="submitBtn" onclick="eliminarProducto(${index})" value="Eliminar">
               <input type="submit" class="editBtn" onclick="editarProducto(${index})" value="Editar">
            </div>
        </div>`;

        cont = index
    });
    
    contenedorproductos.innerHTML = carta;
}

document.onload = publicarProducto();


function guardarProducto(producto) {
    const productosGuardados = localStorage.getItem("productos");
    let productos = productosGuardados ? JSON.parse(productosGuardados) : [];
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
}



function verificarLogin() {
    const usuarioLogueado = localStorage.getItem("usuarioConectado");
    return usuarioLogueado !== null;
}
function guardarProductoUsadoEnLocal() {
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagen = document.querySelector(".imagePreview").src;

    const Numeros = /^\d+(\.\d{1,2})?$/; // Solo números y opcionalmente con dos decimales
    const Letras = /^[A-Za-z\s]+$/; // Solo letras y espacios

    if (!verificarLogin()) {
        Swal.fire({
            icon: "error",
            title: "Usted no ha iniciado sesión",
            text: "¿No tiene cuenta?",
            showConfirmButton: false,
            showCloseButton: true,
            footer: '<a href="register.html">Registrate Aquí</a>'
        });
        return;
    }

    if (!Numeros.test(precio)) {
        alert("El precio debe ser un valor numérico válido.");
    } 
    else if (!Letras.test(descripcion)) {
        alert("La descripción no debe contener números.");
    } 
    else if (imagen === "" || document.querySelector(".fileInput").files.length === 0) {
        alert("Debe seleccionar una imagen.");
    } 
    else {
        if (nombre === "" || precio === "" || descripcion === "" || document.querySelector(".imagePreview").style.display === "none") {
            alert("Falta completar algún campo");
        } else {
            
            let usuarioConectado = localStorage.getItem("usuarioConectado");

            const producto = {
                nombre: nombre,
                precio: precio,
                descripcion: descripcion,
                imagen: imagen,
            };

            if(usuarioConectado === "Administrador"){
                guardarProducto(producto);
        
                publicarProducto();
            }
            else if(usuarioConectado !== "Administrador" && usuarioConectado !== null){
                console.log("Aa")
            }
        
            
        
            document.getElementById("nombre").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("descripcion").value = "";
            document.getElementById("imagePreview").style.display = "none"; 
        }
    }
}


function eliminarProducto(index) {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
        let productos = JSON.parse(productosGuardados);
        // Eliminar el producto seleccionado
        productos.splice(index, 1);
    
        localStorage.setItem("productos", JSON.stringify(productos));
        publicarProducto(); 
    }
}






function cargarProductosPublicados() {
    const productosGuardados = localStorage.getItem("productos");
    const contenedorproductos = document.getElementById("productosPublicadosUsuario");

    if (productosGuardados) {
        let carta= "";
        
        listaProductos.forEach((producto, index) =>{
            carta += `<div class="card-productos-publicados" id="producto${index}" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <p class="card-text2">${producto.descripcion}</p>
                    <input type="submit" class="submitBtn-productos-publicados" onclick="eliminarProducto(${index})" value="Eliminar">
                    <input type="submit" class="editBtn-productos-publicados" onclick="editarProducto(${index})" value="Editar">
                </div>
            </div>`;
            document.querySelector(`#producto${index} .editBtn`).style.display = "inline";
            cont = index
        });
        
        contenedorproductos.innerHTML = carta;
    } else {
        contenedorproductos.innerHTML = '<p>No hay productos publicados.</p>';
    }
}

// Cargar los productos al iniciar la página
window.onload = function() {
    cargarProductosPublicados(); // Cargar los productos publicados
};
document.onload = cargarProductosActuales();

function editarProducto(index) {
    // Recuperar la lista de productos del localStorage
    const listaProductos = JSON.parse(localStorage.getItem("productos"));

    // Pedir al usuario que ingrese el nuevo valor
    const nuevoNombre = prompt("Ingrese el nuevo nombre del producto:", listaProductos[index].nombre);
    const nuevoPrecio = prompt("Ingrese el nuevo precio del producto:", listaProductos[index].precio);
    const nuevaDescripcion = prompt("Ingrese la nueva descripción del producto:", listaProductos[index].descripcion);

    // Verificar que los valores no sean nulos ni vacíos
    if (nuevoNombre !== null && nuevoPrecio !== null && nuevaDescripcion !== null) {
        listaProductos[index].nombre = nuevoNombre;
        listaProductos[index].precio = nuevoPrecio;
        listaProductos[index].descripcion = nuevaDescripcion;

        // Guardar los cambios en el localStorage
        localStorage.setItem("productos", JSON.stringify(listaProductos));

        // Volver a cargar los productos para reflejar los cambios
        publicarProducto();
    }
}

function editarMascota(index) {
    const mascotasPublicadas = JSON.parse(localStorage.getItem("mascotasPublicadas"));


    const nombreElement = prompt("Ingrese el nuevo nombre de la mascota:",mascotasPublicadas[index].nombre);
    const descripcionElement = prompt("Ingrese la nueva descripcionde la mascota:", mascotasPublicadas[index].descripcion);
    const telefonoElement = prompt("Ingrese el nuevo telefono de la mascota:", mascotasPublicadas[index].telefono);


      if (nombreElement  !== null && descripcionElement !== null && telefonoElement!== null) {
        mascotasPublicadas[index].nombre = nombreElement ;
        mascotasPublicadas[index].descripcion=  descripcionElement ;
        mascotasPublicadas[index].telefono = telefonoElement;

        localStorage.setItem("mascotasPublicadas", JSON.stringify(mascotasPublicadas));
    
      
    }
   
}