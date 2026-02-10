let cartStorage = localStorage.getItem("cartProducts")
cartProducts = JSON.parse(cartStorage)
let aux = cartProducts.find(producto => producto.nombre == "Buzo")
console.log(aux)
let cartSection = document.getElementById("cart-section")

function renderCarrito (cartItems) {
    cartItems.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `<h3>${producto.nombre}</h3>
                          <h4>$${producto.precio}</h4>`
        cartSection.appendChild(card)
    })
}

renderCarrito(cartProducts)