let cartStorage = localStorage.getItem("productos")
productos = JSON.parse(cartStorage)
function agregarProducto(productList) {
	// Limpiar el contenedor de productos
    let nombreBuscado = document.getElementById("nombre").value;
	const nombreBuscadoLower = nombreBuscado.trim().toLowerCase();
	const productosFiltrados = productList.filter(producto =>
		producto.nombre.toLowerCase().includes(nombreBuscadoLower)
	);
	if (productosFiltrados.length > 0) { 
        document.getElementById("mensaje").textContent = `Producto existente: ${productosFiltrados[0].nombre} - Precio: $${productosFiltrados[0].precio}`;

    }else {
            
            let precio = parseFloat(document.getElementById("precio").value);
            if (isNaN(precio) || nombreBuscado.trim() === "") {
                document.getElementById("mensaje").textContent = "Por favor, ingresa un nombre y precio válidos.";
            }else {
                const nuevoProducto = {
                    id: productList.length + 1,
                    nombre: nombreBuscado,
                    precio: precio
                };
            productList.push(nuevoProducto)
            localStorage.setItem("productos", JSON.stringify(productList))
            document.getElementById("mensaje").textContent = `Producto agregado: ${nuevoProducto.nombre} - Precio: $${nuevoProducto.precio}`;
            }
    }
}

let user = localStorage.getItem("user")
document.getElementById("user").textContent = user
console.log(user)

document.getElementById("agregar").onclick = function() {
    agregarProducto(productos)
}

document.getElementById("logout").onclick = function() {
    localStorage.removeItem("user");
    window.location.href = "../Index.html";
}




