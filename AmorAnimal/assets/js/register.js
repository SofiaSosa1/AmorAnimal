class nuevoRegistro {
    constructor(nombre, apellido, dni, email, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.email = email;
        this.contraseña = contraseña;
    }
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("DNI").value = "";
    document.getElementById("email").value = "";
    document.getElementById("contraseña").value = "";
}




const botonAcceso = document.getElementById("botonAcceso");

botonAcceso.onclick = (e) => {
    e.preventDefault(); 
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let dni = document.getElementById("DNI").value;
    let email = document.getElementById("email").value;
    let contraseña = document.getElementById("contraseña").value;

    const regexLetras = /^[A-Za-z\s]+$/;
    const regexDni = /^\d{1,10}$/; // Solo números y hasta 10 dígitos
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if (!regexLetras.test(nombre)) {
        alert("El nombre no debe contener números.");
    } 
    else if (!regexLetras.test(apellido)) {
        alert("El apellido no debe contener números.");
    }
    else if (!regexDni.test(dni)) {
        alert("El DNI debe contener solo números y no más de 10 dígitos.");
    } 
    else if (!regexEmail.test(email)) {
        alert("El correo electrónico debe tener un formato válido con '@' y un dominio.");
    } 
    else if (nombre === "" || apellido === "" || dni === "" || email === "" || contraseña === "") {
        alert("Falta completar algún campo");
    }
    else {
        let usuariosRegistrados;

        if(localStorage.getItem("usuariosRegistrados") == null){
            usuariosRegistrados = [];
        }
        else{
            usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados"));
        }
        Swal.fire({
            title: "Usuario Registrado",
            icon: "success",
            showConfirmButton: true,
            timer: 5000,
        })

        let nuevoUsuario = new nuevoRegistro(nombre, apellido, dni, email, contraseña);
        usuariosRegistrados.push(nuevoUsuario);


        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));

        limpiarCampos();

        window.location.href = "../pages/usuario.html"; 
    }
}
