let cartProducts = [];
let cartSection = document.getElementById("cart-section");
// Cargar productos del carrito desde localStorage
try {
    let cartStorage = localStorage.getItem("productos") ? localStorage.getItem("productos") : "[]";
    cartProducts = JSON.parse(cartStorage);
} catch (error) {
    console.error("Error accediendo a localStorage:", error);
    cartProducts = [];
}

// Función para renderizar productos en el carrito
function renderCarrito(cartItems) {
    cartSection.innerHTML = "";
    cartItems.forEach((producto, index) => {
        const card = document.createElement("div");
        card.className = "cart-card";
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:100px; height:auto; border-radius:4px; margin-bottom:4px;">
            <h3>${producto.nombre}</h3>
            <div class="cantidad-container">
            <button class="cantidad-button-minus" data-index="${index}" >-</button>
            <h4 class="cantidad">${producto.cantidad}</h4>
            <button class="cantidad-button-plus" data-index="${index}">+</button>
            </div>
            <h4>$${producto.precio * producto.cantidad}</h4>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        cartSection.appendChild(card);
    });


    // Actualizar total del carrito
    const totalPriceElement = document.getElementById("totalPrice");
    const totalPrice = cartItems.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    totalPriceElement.textContent = `Total: $${totalPrice}`;

    // Agregar eventos a botones de eliminar y cantidad
        const eliminarBtns = document.querySelectorAll(".eliminar");
        eliminarBtns.forEach(btn => {
            btn.onclick = function() {
                if (cartItems.length === 0) {
                    console.warn("Intento de eliminar producto de un carrito vacío.");
                    Swal.fire({
                        icon: 'info',
                        title: 'Carrito vacío',
                        text: 'No hay productos para eliminar.'
                    });
                }else {
                    try {
                        const idx = parseInt(btn.getAttribute("data-index"));
                        cartProducts.splice(idx, 1);
                        localStorage.setItem("productos", JSON.stringify(cartProducts));
                        renderCarrito(cartProducts);
                    } catch (error) {
                        console.error("Error eliminando producto del carrito:", error);
                    }
                }
            };
        });

const cantidadButtonsMinus = document.querySelectorAll(".cantidad-button-minus");
cantidadButtonsMinus.forEach(btn => {
    btn.onclick = function() {
        const index = parseInt(btn.getAttribute("data-index"));
        if (cartProducts[index].cantidad > 1) {
            cartProducts[index].cantidad -= 1;
            localStorage.setItem("productos", JSON.stringify(cartProducts));
            renderCarrito(cartProducts);
        }else {
            cartProducts.splice(index, 1);
            localStorage.setItem("productos", JSON.stringify(cartProducts));
            renderCarrito(cartProducts);
        }
    };
});
const cantidadButtonsPlus = document.querySelectorAll(".cantidad-button-plus");
cantidadButtonsPlus.forEach(btn => {
    btn.onclick = function() {
        const index = parseInt(btn.getAttribute("data-index"));
        cartProducts[index].cantidad += 1;
        localStorage.setItem("productos", JSON.stringify(cartProducts));
        renderCarrito(cartProducts);
    };
});
}
// Función para vaciar el carrito
function vaciarCarrito() {
    cartProducts = [];
    localStorage.setItem("productos", JSON.stringify(cartProducts));
    renderCarrito(cartProducts);
}


renderCarrito(cartProducts);

// Eventos para boton ir a tienda
document.getElementById("goToProducts").onclick = function() {
    window.location.href = "tienda.html";
};

// Evento para vaciar carrito
document.getElementById("vaciarCarrito").onclick = function() {
    if (cartProducts.length === 0) {
        Swal.fire({
                    icon: 'info',
                    title: 'Carrito vacío',
                    text: 'No hay productos para eliminar.'
                });
    } else {
    vaciarCarrito();
    }
};

// Evento para finalizar compra
document.getElementById("buy").onclick = function() {
    if (cartProducts.length !== 0) {
        Swal.fire({
            icon: 'success',
            title: '¡Compra realizada!',
            text: 'Gracias por tu compra. Pronto recibirás tu pedido.'
        });
        vaciarCarrito();
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Carrito vacío',
            text: 'No hay productos para comprar.'
        });
    }
};