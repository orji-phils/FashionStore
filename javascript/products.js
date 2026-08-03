// products functionality
import { products } from './data.js';

// function to filter products based on category
export const filterProducts = (filters) => {
    return products.filter(product => {
        for (const key in filters) {
            // console.log("The key is:", key, "The value is:", filters[key]);
            if (filters[key] !== product[key]) {
                return false;
            }
        }

        return true;
    });
}