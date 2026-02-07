
// Declaración de variables, constantes y arrays

let productos = ["Buzo", "Pantalones", "Camisa", "Shorts", "Zapatillas", "Gorra"];
const MAX_INTENTOS = 3;
let intentos = 0;
let flagCancelar = false;

// Función para ingresar el nombre del usuario
function ingresarUsuario() {

	let nomFuntion = prompt("Por favor, ingresa tu nombre para continuar:");

	alert("¡Bienvenido, " + nomFuntion + " Aquí están los productos disponibles:");
	return nomFuntion;
}

// Función para mostrar productos disponibles
function mostrarProductos() {
	console.log("Productos disponibles:");
	for (let i = 1; i <= productos.length; i++) {
		console.log(i + ". " + productos[i - 1]);
	}
	let numeroProducto = prompt("Elige el número del producto que deseas (1-" + productos.length + "):");
	return numeroProducto;
}

// Función para confirmar la compra
function confirmarCompra(numeroProductoSelecionado) {

	if (numeroProductoSelecionado >= 1 && numeroProductoSelecionado <= productos.length) {
			let confirmacion = confirm("¿Seguro que quieres llevar " + productos[numeroProductoSelecionado - 1] + "?");
			if (confirmacion) {
				alert("¡Has seleccionado " + productos[numeroProductoSelecionado - 1] + ".");
				console.log("Usuario: " + nom + ", compró: " + productos[numeroProductoSelecionado - 1]);
				return seguir = false;
			} else {
				alert("No se realizó la compra. Puedes elegir otro producto.");
				return seguir = true;
			}
		} else {
			alert("Opción incorrecta. Vuelve a intentarlo.");
			intentos++;
			return seguir = true;
		}
}

// Seccion principal de interacción

	let nom = ingresarUsuario();
	let seguir = true;
	while (seguir && intentos < MAX_INTENTOS) {
		let numeroProductoSelecionado = parseInt(mostrarProductos());
		if (numeroProductoSelecionado === "" || numeroProductoSelecionado === null || isNaN(numeroProductoSelecionado)) {
			alert("Operación cancelada por el usuario.");
			seguir = false;
			flagCancelar = true;
		}else {
			numeroProductoSelecionado = parseInt(numeroProductoSelecionado);
			seguir = confirmarCompra(numeroProductoSelecionado);
		}
	}
	if (intentos >= MAX_INTENTOS && flagCancelar === false) {
		alert("Intentos agotados. Por favor, vuelve más tarde.");
	}
