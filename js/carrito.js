let cartStorage = localStorage.getItem("cartProducts")
cartProducts = JSON.parse(cartStorage)
let aux = cartProducts.find(producto => producto.nombre == "Buzo")
console.log(aux)
let cartSection = document.getElementById("cart-section")

function renderCarrito(cartItems) {
    cartSection.innerHTML = "";
    cartItems.forEach((producto, index) => {
        const card = document.createElement("div");
        card.className = "cart-card";
        card.innerHTML = `
            <h3>${producto.nombre}</h3>
            <h4>$${producto.precio}</h4>
            <button class="eliminar" data-index="${index}">Eliminar</button>
        `;
        cartSection.appendChild(card);
    });
    // Agregar funcionalidad a los botones eliminar
    const eliminarBtns = document.querySelectorAll(".eliminar");
    eliminarBtns.forEach(btn => {
        btn.onclick = function() {
            const idx = parseInt(btn.getAttribute("data-index"));
            cartProducts.splice(idx, 1);
            localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
            renderCarrito(cartProducts);
        };
    });
}

renderCarrito(cartProducts);

document.getElementById("goToProducts").onclick = function() {
    window.location.href = "tienda.html";
};