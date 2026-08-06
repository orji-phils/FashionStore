// products functionality
import { products } from './data.js';

// function to filter products based on category
export const filterProducts = (filters) => {
    return products.filter(product => {
        for (const key in filters) {
            if (filters[key] === "") continue; // Skip empty filters

            if (key === "name" && !product[key].toLowerCase().includes(filters[key].toLowerCase())) {
                return false;
            }

            if (filters[key] !== product[key]) {
                return false;
            }
        }

        return true;
    });
}