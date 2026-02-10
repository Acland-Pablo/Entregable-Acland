
// Declaración de variables, constantes y arrays

let productos = [
	{
		id: 1, 
		nombre:"Buzo"
	}, 
	{
		id: 2, 
		nombre:"Pantalones"

	},
	{
		id: 3,
		nombre:"Camisa"
	}, 
	{
		id: 4,
		nombre:"Shorts"

	}, 
	{
		id: 5,
		nombre:"Zapatillas"
	},
	{ 
		id: 6,
		nombre:"Gorra"
	}
];
// Definir contenedor de productos y carrito
const productsContainer = document.getElementById("productsContainer");
let cartProducts = [];

// Función para ingresar el nombre del usuario
function ingresarUsuario() {

	let nomFuntion = prompt("Por favor, ingresa tu nombre para continuar:");
	document.getElementById("user").textContent = nomFuntion;
	return nomFuntion;
}

// Función para mostrar productos disponibles
/*function mostrarProductos() {
	console.log("Productos disponibles:");
	for (let i = 1; i <= productos.length; i++) {
		console.log(i + ". " + productos[i - 1].nombre);
	}
	let numeroProducto = prompt("Elige el número del producto que deseas (1-" + productos.length + "):");
	return numeroProducto;
}*/

function renderProductos (productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <h4>$${producto.precio}</h4>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>`
        productsContainer.appendChild(card)
    })
    let	idProducto = agregarAlCarrito()
	return idProducto
}

// Función para agregar productos al carrito
function agregarAlCarrito () {
	let idProducto = 0
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
            cartProducts.push(selectedProduct)
			idProducto= selectedProduct.id
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts) )
        }
    })
	return idProducto
}

// Función para confirmar la compra
/*function confirmarCompra(numeroProductoSelecionado) {

	if (numeroProductoSelecionado >= 1 && numeroProductoSelecionado <= productos.length) {
			let confirmacion = confirm("¿Seguro que quieres llevar " + productos[numeroProductoSelecionado - 1].nombre + "?");
			if (confirmacion) {
				alert("¡Has seleccionado " + productos[numeroProductoSelecionado - 1].nombre + ".");
				console.log("Usuario: " + nom + ", compró: " + productos[numeroProductoSelecionado - 1].nombre);
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
}*/

// Seccion principal de interacción

	let nom = ingresarUsuario();
	let seguir = true;
	let numeroProductoSelecionado = parseInt(renderProductos (productos));
	
