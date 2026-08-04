// cart functionalities
export const cart = JSON.parse(localStorage.getItem("cart")) || [];

// function to add new product to cart
export const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    refreshCart();
}

// function to remove a product from cart
export const removeFromCart = (id) => {
    const index = cart.findIndex(product => product.id === id);

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }

    refreshCart();
}

// function to calculate cart item's price
export const calculateTotalPrice = () => {
    const calculatedAmount = cart.reduce((sum, product) => {
        return sum + (product.price * product.quantity);
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
    document.querySelector(".total-amount").textContent =
    formatCurrencyAmount(calculateTotalPrice());
    localStorage.setItem("cart", JSON.stringify(cart));
}