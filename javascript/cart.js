// cart functionalities
export const cart = JSON.parse(localStorage.getItem("cart")) || [];

// function to add new product to cart
export const addToCart = (product) => {
    cart.push(product);
    refreshCart();
}

// function to remove a product from cart
export const removeFromCart = (index) => {
    cart.splice(index, 1);
    refreshCart();
}

// function to calculate cart item's price
export const calculateTotalPrice = () => {
    const calculatedAmount = cart.reduce((sum, product) => {
        return sum + product.price;
    }, 0);

    return calculatedAmount;
}

// Function to display cart count
const showCartCount = () => {
    const cartCounter = document.querySelector(".cart-count");
    cartCounter.textContent = cart.length;
}

// Function to format currency to naira
export const formatCurrencyAmount = (amount) => {
    return new Intl.NumberFormat("en-ng", {
        style: "currency",
        currency: "ngn"
    }).format(amount);
}

// function to refresh the cart display
export const refreshCart = () => {
    showCartCount();
    localStorage.setItem("cart", JSON.stringify(cart));
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".total-amount").textContent = formatCurrencyAmount(calculateTotalPrice());
});