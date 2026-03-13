// Declaración de variables, constantes y arrays

let productos = [];

// Cargar productos desde productos.json
fetch('../Json/productos.json')
  .then(response => response.json())
  .then(data => {
	productos = data;
	renderProductos(productos);
	// Evento para buscar producto
	document.getElementById('searchButton').onclick = function() {
	  const nombreBuscado = document.getElementById('search').value;
	  filtrarMostrarProducto(productos, nombreBuscado);
	};
  });


// Definir contenedor de productos y carrito
const productsContainer = document.getElementById("productsContainer");
let cartProducts = localStorage.getItem("productos") ? JSON.parse(localStorage.getItem("productos")) : [];



// Función para mostrar productos disponibles
function renderProductos (productsArray) {
	
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `
						<img src="${producto.imagen}" alt="${producto.nombre}" style="width:120px; height:auto; border-radius:8px; margin-bottom:8px;">
  						<h3>${producto.nombre}</h3>
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
			// Verificar si el producto ya está en el carrito
			if(cartProducts.some(producto => producto.id == selectedProduct.id)) {
				let index = cartProducts.findIndex(producto => producto.id == selectedProduct.id);
				cartProducts[index].cantidad += 1;
			} else {
				cartProducts.push({ ...selectedProduct, cantidad: 1 });
			}
			localStorage.setItem("productos", JSON.stringify(cartProducts) )
			// Animación visual
			button.classList.add('active');
			setTimeout(() => {
				button.classList.remove('active');
			}, 300);
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
		window.location.href = '../Index.html';
	};