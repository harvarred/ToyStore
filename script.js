let cart = [];
const cartCountElement = document.getElementById('cart-count');
const cartItemsElement = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `{item.name} - {item.price} x {item.quantity}`;
        cartItemsElement.appendChild(listItem);
        total += item.price * item.quantity;
    });
    cartTotalElement.textContent = `Total: ${total.toFixed(2)}`;
}

function showCart() {
    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function checkout() {
    alert('Checkout functionality to be implemented.');
}

document.getElementById('category-filter').addEventListener('change', function() {
    const category = this.value;
    document.querySelectorAll('.product').forEach(product => {
        product.style.display = category === '' || product.dataset.category === category ? 'block' : 'none';
    });
});

document.getElementById('search-input').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    document.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h2').textContent.toLowerCase();
        product.style.display = name.includes(searchTerm) ? 'block' : 'none';
    });
});
function updateCart() {
    const exchangeRate = 1.0; // Assume 1 USD = 75 INR (you can adjust this as needed)
    cartCountElement.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    cartItemsElement.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        const priceInINR = item.price * exchangeRate;
        listItem.textContent = `${item.name} - ₹${priceInINR.toFixed(2)} x ${item.quantity}`;
        cartItemsElement.appendChild(listItem);
        total += priceInINR * item.quantity;
    });
    const totalInINR = total.toFixed(2);
    cartTotalElement.textContent = `Total: ₹${totalInINR}`;
}
