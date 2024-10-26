document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formularioLogin").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
    
        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;
    
        const adminEmail= "admin1@gmail.com";
        const adminContraseña = "1234";
        const userEmail = "user1@gmail.com";
        const userContraseña = "2024";
    
    
        if (email === adminEmail && contraseña === adminContraseña) {
            localStorage.setItem("loggedInUser", "Admin");
            Swal.fire({
                title: "¡Bienvenido Administrador!",
                icon: "success",
                timer: 5000,
            }).then(() => {
               // esAdmin()  Aquí llamamos a esAdmin después del inicio de sesión exitoso
                window.location.href = "../../index.html";
              
            });
            limpiarCampos(); 
         
        } else if (email === userEmail && contraseña === userContraseña) {
            localStorage.setItem("loggedInUser", "User1");
            Swal.fire({
                title: "¡Ha iniciado sesión!",
                icon: "success",
                timer: 5000,
            }).then(() => {
                // esAdmin() Aquí llamamos a esAdmin después del inicio de sesión exitoso
                window.location.href = "../../index.html";
            });
            
            limpiarCampos(); 
            
        } else {
            alert("Email o contraseña son incorrectos");
        }
        
    });
   
  
});
 


function limpiarCampos() {
    document.getElementById("email").value = "";  
    document.getElementById("contraseña").value = ""; 

};
/*

document.addEventListener("DOMContentLoaded", function() {
    // Verificar si hay un usuario logueado en localStorage
    const loggedInUser = localStorage.getItem("loggedInUser");
    const nombreUser = document.getElementById("botonLogin");
    const botonCerrarSesion = document.getElementById("botonCerrarSesion");

    if (loggedInUser) {
        // Cambiar el texto de 'Iniciar sesión' a 'Hola, User'
        nombreUser.textContent = `Hola, ${loggedInUser}`;
        nombreUser.classList.add("login-link");
        nombreUser.href = "./usuario.html"; // Eliminar el enlace de 'Iniciar sesión'
    } else {
        // Mantener el botón de 'Iniciar sesión' si no hay usuario logueado
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "./assets/pages/login.html"; // Enlace al login
    }

    // Evento para cerrar sesión
    botonCerrarSesion.addEventListener("click", function() {
        // Restablecer valores al cerrar sesión
        localStorage.removeItem("loggedInUser");
        nombreUser.textContent = "Iniciar sesión";
        nombreUser.href = "./assets/pages/login.html";
        botonCerrarSesion.style.display = "none";
    });
});


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formularioLogin").addEventListener("submit", function(event) {
        event.preventDefault(); // Evitar el envío del formulario por defecto
    
        const email = document.getElementById("email").value;
        const contraseña = document.getElementById("contraseña").value;
    
        const adminEmail= "admin1@gmail.com";
        const adminContraseña = "1234";
        const userEmail = "user1@gmail.com";
        const userContraseña = "2024";
    
    
        if (email === adminEmail && contraseña === adminContraseña) {
            localStorage.setItem("loggedInUser", "Admin");
            Swal.fire({
                title: "¡Bienvenido Administrador!",
                icon: "success",
                timer: 5000,
            }).then(() => {
                esAdmin()// Aquí llamamos a esAdmin después del inicio de sesión exitoso
                location.reload();
            });
            limpiarCampos(); 
            
        } else if (email === userEmail && contraseña === userContraseña) {
            localStorage.setItem("loggedInUser", "User1");
            Swal.fire({
                title: "¡Ha iniciado sesión!",
                icon: "success",
                timer: 5000,
            }).then(() => {
                esAdmin();  // Aseguramos que el formulario no aparezca para los usuarios normales
           location.reload(); 
            });
            limpiarCampos(); 
        } else {
            alert("Email o contraseña incorrectos");
        }
    });
});
  // Llamar a la función manualmente para ver si se muestra el formulario

/*


*/



