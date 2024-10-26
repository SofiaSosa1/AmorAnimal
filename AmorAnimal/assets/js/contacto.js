const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    const letras = /^[A-Za-z\s]+$/;
    const soloNumerosTelefono = /^\d{10}$/; 

    if (nombre === "" || telefono === "" || email === "" || mensaje === "") {
        alert("Falta completar algún campo.");
    } else if (!letras.test(nombre)) {
        alert("El nombre solo debe contener letras y espacios.");
    } else if (!soloNumerosTelefono.test(telefono)) {
        alert("El teléfono debe contener exactamente 10 dígitos numéricos.");
    } else {
    
        Swal.fire({
            title: "Mensaje recibido",
            icon: "success",
            timer: 5000,
        });
        limpiarCampos(); 
    }
});

function limpiarCampos() {
    document.getElementById("nombre").value = "";  
    document.getElementById("telefono").value = ""; 
    document.getElementById("email").value = ""; 
    document.getElementById("mensaje").value = ""; 
}
