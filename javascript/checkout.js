// Checkout functionality

import { calculateTotalPrice, cart, formatCurrencyAmount } from "./cart.js";
import { sendOrderViaWhatsApp } from "./whatsapp.js";

// save the form before use
const form = document.forms["myForm"];
// order object
export const order = {
    customer: {},
    delivery: {},
    items: [],
    totalPrice: 0
};

// Function to update customer information
const updateCustomerInfo = () => {
    order.customer = {
        fullName: form.fullName.value,
        phoneNumber: form.phoneNumber.value,
        email: form.email.value
    };
}

// Function to update delivery information
const updateDeliveryInfo = () => {
    order.delivery = {
        type: form.deliveryType.value,
        address: form.streetAddress.value,
        city: form.city.value,
        landMark: form.nearestLandmark.value
    };
}

// function to update order items and total price
const updateOrderDetails = () => {
    order.items = cart;
    order.totalPrice = calculateTotalPrice();
}

// helper function to update order details
const updateOrder = () => {
    updateCustomerInfo();
    updateDeliveryInfo();
    updateOrderDetails();
}

// determin to show or hide delivery address form based on delivery type
form.addEventListener("change", () => {
    updateDeliveryInfo();
    const pickupLocation = document.querySelector("#pickup-location");
    const deliveryAddress = document.querySelector("#delivery-address-fields");

    if (order.delivery.type === "pickup") {
        form.streetAddress.required = false;
        form.city.required = false;
        pickupLocation.style.display = "block";
    } else {
        pickupLocation.style.display = "none";
    }

    deliveryAddress.style.display = order.delivery.type === "delivery" ? "block" : "none";
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    updateOrder();
    sendOrderViaWhatsApp(order);
    cart = localStorage.clear();
    alert("Your order has been submitted successfully!");
});