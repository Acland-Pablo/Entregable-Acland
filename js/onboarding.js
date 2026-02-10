// Función para ingresar el nombre del usuario
let buttonUser = document.getElementById("buttonUser").onclick = () => {
        let nomFuntion = document.getElementById("usuarioInput").value;
        console.log(nomFuntion)
        if(nomFuntion.trim() !== "" && nomFuntion.trim().toLowerCase() !== "admin") {
        localStorage.setItem("user", nomFuntion);
        document.getElementById('welcomeMsg').textContent = `¡Bienvenido, ${nomFuntion}!`;
        window.location.href = './paginas/tienda.html';
        }else if (nomFuntion.trim().toLowerCase() === "admin") {
            localStorage.setItem("user", nomFuntion);
            window.location.href = './paginas/inventario.html'
        }else {
            
            document.getElementById('welcomeMsg').textContent = "Por favor, ingresa un nombre válido.";
        }
}

