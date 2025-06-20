// Geen imports nodig - dit is een pure data class

/**
 * Represents a customer order with random food items
 * Generates 1-3 random food IDs (1-5) for the customer to order
 */
export class Order {
    #orderArray = []
    
    constructor() {
        this.#generateRandomOrder()
    }

    /**
     * Generate a random order with 1-3 food items
     * @private
     */
    #generateRandomOrder() {
        // Willekeurig aantal items (1-3)
        const arrayLength = Math.floor(Math.random() * 3) + 1
        
        // Vul array met random getallen tussen 1-5
        for(let i = 0; i < arrayLength; i++) {
            const randomNumber = Math.floor(Math.random() * 5) + 1
            this.#orderArray.push(randomNumber)
        }
    }

    /**
     * Get a copy of the order array (immutable)
     * @returns {number[]} Copy of the order array
     */
    getOrder() {
        return [...this.#orderArray] // Retourneer kopie voor immutability
    }

    /**
     * Get the number of items in this order
     * @returns {number} Number of items in the order
     */
    getLength() {
        return this.#orderArray.length
    }

    /**
     * Check if the order contains a specific food ID
     * @param {number} foodId - The food ID to check for
     * @returns {boolean} True if the order contains the food ID
     */
    contains(foodId) {
        return this.#orderArray.includes(foodId)
    }

    /**
     * Get a string representation of the order
     * @returns {string} String representation like "Order: 1, 2, 3"
     */
    toString() {
        return `Order: ${this.#orderArray.join(", ")}`
    }
}