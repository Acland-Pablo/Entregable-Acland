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

let auxProducto = localStorage.getItem("productos")
if (!auxProducto) {
	localStorage.setItem("productos", JSON.stringify(productos))
}else if(auxProducto.length < 7) {
	productos = JSON.parse(auxProducto)
	productos.push(...JSON.parse(localStorage.getItem("productos")))
	localStorage.setItem("productos", JSON.stringify(productos))
}else {
	productos = JSON.parse(auxProducto)
}


// Definir contenedor de productos y carrito
const productsContainer = document.getElementById("productsContainer");
let cartProducts = localStorage.getItem("cartProducts") ? JSON.parse(localStorage.getItem("cartProducts")) : [];
//let productList = localStorage.getItem("productos")



// Función para mostrar productos disponibles
function renderProductos (productsArray) {
	
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <h4>$${producto.precio}</h4>
                          <button class="productoAgregar" id="${producto.id}">Agregar</button>`
        productsContainer.appendChild(card)
    })
    agregarAlCarrito()
}

// Función para agregar productos al carrito
function agregarAlCarrito () {
    addButton = document.querySelectorAll(".productoAgregar")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)
            cartProducts.push(selectedProduct)
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts) )
        }
    })
}

// Función para filtrar productos por nombre y renderizar solo el resultado
function filtrarMostrarProducto(productList, nombreBuscado) {
	// Limpiar el contenedor de productos
	productsContainer.innerHTML = "";
	const nombreBuscadoLower = nombreBuscado.trim().toLowerCase();
	const productosFiltrados = productList.filter(producto =>
		producto.nombre.toLowerCase().includes(nombreBuscadoLower)
	);
	renderProductos(productosFiltrados);
}

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
		filtrarMostrarProducto(productos, nombreBuscado);
	};
	
	document.getElementById('logoutButton').onclick = function() {
		localStorage.removeItem("user");
		window.location.href = '../Index.html';
	};