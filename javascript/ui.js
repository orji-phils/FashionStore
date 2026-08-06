// UI functionalities
import { addToCart, calculateTotalPrice, cart, formatCurrencyAmount, refreshCart, removeFromCart } from "./cart.js";
import { products } from "./data.js";
import { filterProducts } from "./products.js";

// get the search and filter queries
const form = document.forms["search-form"]

// function to get search or filtered results
const getFilters = () => {
    const formData = new FormData(form);
    const query = Object.fromEntries(formData.entries());
    const { sort, ...filters } = query; // Destructure to separate sort from filters

    const productsFiltered = filterProducts(filters);

    const counter = productsFiltered.length;
    const productCount = document.querySelector("#product-count");
        productCount.textContent = `Found ${counter} ${counter === 1 ? 'product' : 'products'} matching your search.`;

    return productsFiltered;
}

// function to get products from URL search parameters
const getSearchQuery = () => {
    const params = new URLSearchParams(window.location.search);
    const result = Object.fromEntries(params.entries());

    return filterProducts(result);
};

// Function to display products
const displayProducts = (productsList) => {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = '';

    productsList.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="price">${formatCurrencyAmount(product.price)}</p>
            <p>In Stock</p>
            <button class="add-btn">Add to Cart</button>
        `;

        const button = productElement.querySelector(".add-btn");
        button.addEventListener("click", () => {
        addToCart(product);
    });

        productGrid.appendChild(productElement);
    });
};

// function to display cart items
export const showCart = () => {
    const cartProducts = document.querySelector(".cart-grid");
    cartProducts.innerHTML = "";

    if (!cart) return;

    cart.forEach(product => {
    const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="price">${formatCurrencyAmount(product.price)}</p>
            <p>Quantity: ${product.quantity}</p>
            <button class="remove-btn">Remove from Cart</button>
        `;

        const removeButton = productElement.querySelector(".remove-btn");
        removeButton.addEventListener("click", () => {
            removeFromCart(product.id);
        });

        cartProducts.appendChild(productElement);
    });
}

// function to show selected products 
const showSelectedProducts = (selectedProducts) => {
    const response = filterProducts(selectedProducts);

    response.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <p class="price">${formatCurrencyAmount(product.price)}</p>
            <p>In Stock</p>
            <button class="add-btn">Add to Cart</button>
        `;
    });
}

// display product categories on the home page
const showHomeCategories = () => {
    let container = document.querySelector(".category-grid");
    const keyWords = [
        { audience: "Men", category: "Clothing" }, 
        { audience: "Women", category: "Clothing" }, 
        { audience: "Women", category: "Shoe" }, 
        { category: "Bag", audience: "Unisex" }, 
        { category: "Wrist Watch", audience: "Unisex" }
    ];

    for (let i = 0; i < keyWords.length; i++) {
        const filtered = filterProducts(keyWords[i]);
        const params = new URLSearchParams(keyWords[i]);

        container.innerHTML += `
            <div class="product">
                <img src="${filtered[0].image}" alt="${filtered[0].name}">
                <h3>${filtered[0].name}</h3>
                <p>${filtered[0].description}</p>
                <a href="products.html?${params.toString()}">View Products</a>
            </div>
        `;
    }
}

// display the order summary
export const showCartSummary = () => {
    if (!cart) return;

    const orderSummary = document.querySelector(".order-summary");
    orderSummary.innerHTML = `
    <h2>Order Summary</h2>
    <p>Items in your cart:</p>
        <ul>
            <li><strong>Items: ${cart.length}</strong></li>
            <li><strong>Items List:</strong></li>
            <ol>
                ${cart.map(item => `<li>${item.name} x ${item.quantity} - ${formatCurrencyAmount(item.price * item.quantity)}</li>`).join('')}
            </ol>
            <li><strong>Subtotal: ${formatCurrencyAmount(calculateTotalPrice())}</strong></li>
            <li><strong>Delivery: Calculated at checkout.</strong></li>
            </ul>
            <hr>

            <p><strong>Total: ${formatCurrencyAmount(calculateTotalPrice())}</strong></p>
<a href="checkout.html">Proceed to Checkout</a>
<a href="categories.html">Continue Shopping</a>
    `;
}

// function to show the order summary on the checkout page
const showCheckoutSummary = () => {
    const checkoutSummary = document.querySelector(".order-items");
    const deliveryFee = 3000;
    if (!checkoutSummary) return;

    checkoutSummary.innerHTML = `
            <li><strong>Items: ${cart.length}</strong></li>
            <li><strong>Items List:</strong></li>
            <ol>
                ${cart.map(item => `<li>${item.name} x ${item.quantity} - ${formatCurrencyAmount(item.price * item.quantity)}</li>`).join('')}
            </ol>
            <li><strong>Delivery: ${formatCurrencyAmount(deliveryFee)}</strong></li>
    `;

    const totalAmount = document.querySelector("#order-total-amount");
    totalAmount.textContent = formatCurrencyAmount(calculateTotalPrice() + deliveryFee);
}

// Call the function to display products on page load
document.addEventListener("DOMContentLoaded", () => displayProducts(getSearchQuery()));
document.addEventListener("change", () => displayProducts(getFilters()));
document.addEventListener("DOMContentLoaded", showHomeCategories);
document.addEventListener("DOMContentLoaded", showCart);
document.addEventListener("DOMContentLoaded", refreshCart);
document.addEventListener("DOMContentLoaded", showCartSummary);
document.addEventListener("DOMContentLoaded", showCheckoutSummary);