// Función para ingresar el nombre del usuario



let buttonUser = document.getElementById("buttonUser").onclick = () => {
        let nomFuntion = document.getElementById("usuarioInput").value;
        console.log(nomFuntion)
        if(nomFuntion.trim() !== "") {
        localStorage.setItem("user", nomFuntion);
        document.getElementById('welcomeMsg').textContent = `¡Bienvenido, ${nomFuntion}!`;
        window.location.href = './paginas/tienda.html';
        }else {
            document.getElementById('welcomeMsg').textContent = "Por favor, ingresa un nombre válido.";
        }
    };


