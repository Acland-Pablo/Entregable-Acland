// Declaración de variables, constantes y arrays

let productos = [
	{
		id: 1, 
		nombre:"Buzo",
		precio: 5000
	}, 
	{
		id: 2, 
		nombre:"Pantalones",
		precio: 7000

	},
	{
		id: 3,
		nombre:"Camisa",
		precio: 6000
	}, 
	{
		id: 4,
		nombre:"Shorts",
		precio: 4000
	}, 
	{
		id: 5,
		nombre:"Zapatillas",
		precio: 8000
	},
	{ 
		id: 6,
		nombre:"Gorra",
		precio: 3000
	}
];

localStorage.setItem("productos", JSON.stringify(productos))
// Definir contenedor de productos y carrito
const productsContainer = document.getElementById("productsContainer");
let cartProducts = [];
let productList = localStorage.getItem("productos")



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

// Función para filtrar productos por nombre y renderizar solo el resultado
function filtrarYMostrarProducto(productList, nombreBuscado) {
	// Limpiar el contenedor de productos
	productsContainer.innerHTML = "";
	const nombreBuscadoLower = nombreBuscado.trim().toLowerCase();
	const productosFiltrados = productList.filter(producto =>
		producto.nombre.toLowerCase().includes(nombreBuscadoLower)
	);
	renderProductos(productosFiltrados);
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

	let nom = localStorage.getItem("user");
	document.getElementById('user').textContent = nom;
	document.getElementById('goToCart').onclick = function() {
    window.location.href = './carrito.html';
	};

	// Renderizar todos los productos al inicio
	renderProductos(productos);

	// Evento para buscar producto
	document.getElementById('searchButton').onclick = function() {
		const nombreBuscado = document.getElementById('search').value;
		filtrarYMostrarProducto(productos, nombreBuscado);
	};
	
