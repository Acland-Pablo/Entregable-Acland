let nom = "";
let cartProducts = [];
let cartSection = document.getElementById("cart-section");
try {
    nom = localStorage.getItem("user") || "";
    let cartStorage = localStorage.getItem(nom) ? localStorage.getItem(nom) : "[]";
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
            <img src="${producto.imagen}" alt="${producto.nombre}" style="width:80px; height:auto; border-radius:8px; margin-bottom:8px;">
            <h3>${producto.nombre}</h3>
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
                try {
                    const idx = parseInt(btn.getAttribute("data-index"));
                    cartProducts.splice(idx, 1);
                    localStorage.setItem(nom, JSON.stringify(cartProducts));
                    renderCarrito(cartProducts);
                } catch (error) {
                    console.error("Error eliminando producto del carrito:", error);
                }
            };
        });
}


renderCarrito(cartProducts);

document.getElementById("goToProducts").onclick = function() {
    window.location.href = "tienda.html";
};