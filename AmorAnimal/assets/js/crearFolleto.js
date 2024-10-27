function seleccionarPlantilla(templateId) {
    const templates = document.querySelectorAll('.template');
    templates.forEach(template => template.style.border = 'none');
    
    const selectedTemplate = document.getElementById(templateId);
    selectedTemplate.style.border = '2px solid red'; // Resaltar la plantilla seleccionada
    
    document.getElementById('edit-section').style.display = 'block';

}

function displaymascotaPublicada() {
    const mascotaPublicada = JSON.parse(localStorage.getItem('mascotaPublicada')) || [];
    const publishedPetsContainer = document.getElementById('mascotasPublicadas');
    publishedPetsContainer.innerHTML = ''; 

    mascotaPublicada.forEach((pet, index) => {
        const petElement = document.createElement('div');
        petElement.classList.add('published-pet');
        petElement.innerHTML = `
            <h3>Nombre: ${pet.nombre}</h3>
            <p>Descripción: ${pet.descripcion}</p>
            <p>telefono: ${pet.telefono}</p>
    
        `;
        publishedPetsContainer.appendChild(petElement);
    });
}

 let selectedTemplate; 

function seleccionarPlantilla(nombrePlantilla) {
    selectedTemplate = nombrePlantilla; 

    document.getElementById("edit-section").style.display = "block"; 
  
}

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
                imagenVistaPrevia.src = e.target.result; // Establece la fuente de la imagen
                imagenVistaPrevia.style.display = "block"; 
            }
            reader.readAsDataURL(archivo); // Lee el archivo como URL de datos
        }
    }
}


function cargarMascotasPublicadas() {
    const mascotasGuardadas = localStorage.getItem("mascotasPublicadas");
    if (mascotasGuardadas) {
        const mascotas = JSON.parse(mascotasGuardadas);
        mascotas.forEach(mascota => {
            publicarMascota(mascota.nombre, mascota.descripcion, mascota.telefono, mascota.imagen, mascota.plantilla);
        });
       
    }
}


function publishPet() {
    const nombre = document.getElementById("pet-nombre").value;
    const descripcion = document.getElementById("pet-descripcion").value;
    const telefono = document.getElementById("telefono").value;
    const imagen = document.getElementById("imagePreview").src;

    if (!nombre || !descripcion || !telefono || !selectedTemplate) {
        alert('Por favor, completa todos los campos y selecciona una plantilla.');
        return;
    }

const regexSinNumeros = /^[A-Za-z\s]+$/; // Solo permite letras y espacios para el nombre
const regexSoloNumeros = /^\d{1,10}$/; // Solo permite hasta 10 dígitos para el teléfono
const regexDescripcion = /^[A-Za-z\s]+$/; // Solo letras y espacios para la descripción

if (!regexSinNumeros.test(nombre)) {
    alert('El nombre no debe contener números.');
    return;
}

if (!regexSoloNumeros.test(telefono)) {
    alert('El teléfono debe contener solo números y no más de 10 dígitos.');
    return;
}

if (!regexDescripcion.test(descripcion)) {
    alert('La descripción no debe contener números.');
    return;
}

if (!imagen || document.getElementById("fileInput").files.length === 0) {
    alert('Debe subir una imagen.');
    return;
}

    const mascota = {
        nombre: nombre,
        descripcion: descripcion,
        telefono: telefono,
        imagen: imagen,
        plantilla: selectedTemplate
    };
    Swal.fire({
        title: "Se publico mascota perdida",
        icon: "success",
        timer: 5000,
        showConfirmButton: true,
    
    })
     document.getElementById("pet-nombre").value="";
    document.getElementById("pet-descripcion").value="";
     document.getElementById("telefono").value="";
     document.getElementById("imagePreview").style.display = "none";
    guardarMascota(mascota);

    publicarMascota(nombre, descripcion, telefono, imagen, selectedTemplate);

    document.getElementById("edit-form").reset();
    document.getElementById("imagePreview").style.display = "none";
    document.getElementById("edit-section").style.display = "none"; 

}

function guardarMascota(mascota) {
    const mascotasGuardadas = localStorage.getItem("mascotasPublicadas");
    let mascotas = mascotasGuardadas ? JSON.parse(mascotasGuardadas) : [];
    mascotas.push(mascota);
    localStorage.setItem("mascotasPublicadas", JSON.stringify(mascotas));
}


function publicarMascota(nombre, descripcion, telefono, imagen, plantilla) {
    const mascotaDiv = document.createElement("div");
    mascotaDiv.classList.add("published-mascota");

    const imagenElement = document.createElement("img");
    imagenElement.src = imagen;
    imagenElement.style.maxWidth = "150px";
    imagenElement.style.display = "block";

    switch (plantilla) {
        case 'Plantilla 1':
            mascotaDiv.classList.add("template1");
            imagenElement.classList.add("formaCorazon");
            break;
        case 'Plantilla 2':
            mascotaDiv.classList.add("template2");
            imagenElement.classList.add("formaEstrella");
            break;
        case 'Plantilla 3':
            mascotaDiv.classList.add("template3");
            imagenElement.classList.add("formaRedonda");
            break;
        default:
            break;
    }

    mascotaDiv.innerHTML = `
        <h3>${nombre}</h3>
        <p><strong>Descripción:</strong> ${descripcion}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <button type="button" class="btn btn-secondary" onclick="enviarEmailMascota('${encodeURIComponent(nombre)}', '${encodeURIComponent(descripcion)}', '${encodeURIComponent(telefono)}')">Lo encontré</button>
    `;
    mascotaDiv.appendChild(imagenElement);
    document.getElementById("mascotasPublicadas").appendChild(mascotaDiv);
}
window.onload = function() {
    displaymascotaPublicada();
    verificarLogin();
    
};

window.onload = function() {
    cargarMascotasPublicadas();
 
};
function verificarLogin() {
    const usuarioLogueado = localStorage.getItem("loggedInUser");
    return usuarioLogueado !== null;
}
window.onload = function() {
    displaymascotaPublicada();
    cargarMascotasPublicadas(); 
    if (!verificarLogin()) {
        const crearFolletoButton = document.querySelector('.crearFolleto-button');
        crearFolletoButton.addEventListener('click', function(event) {
            event.preventDefault();
            alert("Debe iniciar sesión para crear el folleto");
            window.location.href = "../../index.html"; 
        });
    }
};

document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("Bt4v9mN1cBxVunHe0");
    console.log("EmailJS inicializado correctamente");
});

async function enviarEmailMascota(nombre, descripcion, telefono) {
    try {
        const response = await emailjs.send('sofisosaaa', 'mascota', {
            pet_name: nombre,
            pet_description: descripcion,
            contact_phone: telefono,
            user_email: 'sosa38205@gmail.com'
        });
        console.log('Correo electrónico enviado exitosamente:', response.status, response.text);
        Swal.fire({
            title: "Correo enviado",
            text: "Se ha notificado al dueño de la mascota.",
            icon: "success",
            timer: 5000,
            showConfirmButton: true
        });
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
    }
}