// WhatsApp integration functionality

import { formatCurrencyAmount } from "./cart.js";

// function to prepare the order summary for WhatsApp message
const prepareOrderSummary = (order) => {
    const { customer, delivery, items, totalPrice } = order;

    let message = `Hello, I would like to place an order with the following details:\n\n`;
    message += `Customer Information:\n`;
    message += `Full Name: ${customer.fullName}\n`;
    message += `Phone Number: ${customer.phoneNumber}\n`;
    if (customer.email) {
        message += `Email: ${customer.email}\n\n`;
    }
    message += `Delivery Information:\n`;
    message += `Delivery Type: ${delivery.type}\n`;
    if (delivery.type === "delivery") {
        message += `Address: ${delivery.address}\n`;
        message += `City: ${delivery.city}\n`;
        if (delivery.landMark) {
            message += `Nearest Landmark: ${delivery.landMark}\n\n`;
        }
    }
    message += `Order Items:\n`;
    items.forEach((item, index) => {
        message += `${index + 1}. ${item.name} x ${item.quantity} - ${formatCurrencyAmount(item.price * item.quantity)}\n`;
    });
    message += `\nTotal Price: ${formatCurrencyAmount(totalPrice)}\n\n`;
    message += `Thank you!`;

    return encodeURIComponent(message);
}

// function to send the order summary via WhatsApp
export const sendOrderViaWhatsApp = (order) => {
    const phoneNumber = "+2349133211565";
    const message = prepareOrderSummary(order);

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    cart = localStorage.clear();
};