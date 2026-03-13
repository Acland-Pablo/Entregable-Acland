let nom = "";
let cartProducts = [];
let cartSection = document.getElementById("cart-section");
try {
    nom = localStorage.getItem("user") || "";
    let cartStorage = localStorage.getItem("productos") ? localStorage.getItem("productos") : "[]";
    cartProducts = JSON.parse(cartStorage);
} catch (error) {
    console.error("Error accediendo a localStorage:", error);
    cartProducts = [];
}

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
            <h4>$${producto.precio}</h4>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        cartSection.appendChild(card);
    });


    const totalPriceElement = document.getElementById("totalPrice");
    const totalPrice = cartItems.reduce((total, producto) => total + producto.precio, 0);
    totalPriceElement.textContent = `Total: $${totalPrice}`;

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
function vaciarCarrito() {
    cartProducts = [];
    localStorage.setItem("productos", JSON.stringify(cartProducts));
    renderCarrito(cartProducts);
}


renderCarrito(cartProducts);

document.getElementById("goToProducts").onclick = function() {
    window.location.href = "tienda.html";
};

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