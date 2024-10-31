
document.addEventListener("DOMContentLoaded", function() {
    /*REGISTRA AL ADMINISTRADOR*/
    if(localStorage.getItem("usuariosRegistrados") == null){
        usuariosRegistrados = [
            {nombre: "Benito", apellido: "Perez", dni: 45963874, email: "admin1@gmail.com", contraseña: "coco159"}
        ];

        localStorage.setItem("usuariosRegistrados", JSON.stringify(usuariosRegistrados));
    }

    document.getElementById("formularioLogin").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto

        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;

        // Obtiene los usuarios registrados desde localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];

        // Variable para almacenar si el usuario fue encontrado
        let usuarioEncontrado = false;

        // Itera sobre el arreglo de usuarios registrados
        for (let i = 0; i < usuariosRegistrados.length; i++) {
            const usuario = usuariosRegistrados[i];

            // Verifica si el email y la contraseña coinciden con un usuario registrado
            if (usuario.email === email && usuario.contraseña === contraseña) {
                usuarioEncontrado = true;

                // Dependiendo del email, determina si es admin o usuario regular
                if (email === "admin1@gmail.com") {
                    localStorage.setItem("usuarioConectado", "Administrador");
                    Swal.fire({
                        title: "¡Bienvenido Administrador!",
                        icon: "success",
                        timer: 5000,
                    }).then(() => {
                        window.location.href = "../../index.html";
                    });
                } else {
                    localStorage.setItem("usuarioConectado", usuario.nombre); // Guarda el nombre del usuario
                    Swal.fire({
                        title: "¡Ha iniciado sesión!",
                        icon: "success",
                        timer: 5000,
                    }).then(() => {
                        window.location.href = "../../index.html";
                    });
                }
                break;
            }
        }

        // Si no se encontró ningún usuario, muestra un mensaje de error
        if (!usuarioEncontrado) {
            Swal.fire({
                title: "Email o contraseña son incorrectos",
                icon: "error",
                timer: 3000,
            });
        }

        limpiarCampos();
    });
});

// Función para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("email").value = "";
    document.getElementById("contraseña").value = "";
}
