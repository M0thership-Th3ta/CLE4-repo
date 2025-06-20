// Geen imports nodig - dit is een pure data class

/**
 * Represents a customer order with random food items
 * Generates 1-3 random food IDs (1-5) for the customer to order, or specific size if provided
 */
export class Order {
    #orderArray = []
    
    /**
     * Creates a new order
     * @param {number} [size] - Optional specific size for the order (1-4). If not provided, uses random 1-3.
     */
    constructor(size = null) {
        this.#generateRandomOrder(size)
    }    /**
     * Generate a random order with specified or random number of food items
     * @param {number|null} size - Specific size for the order, or null for random 1-3
     * @private
     */
    #generateRandomOrder(size = null) {
        // Bepaal aantal items: gebruik size parameter of random 1-3
        let arrayLength
        if (size !== null && typeof size === 'number' && size >= 1 && size <= 4) {
            arrayLength = size
        } else {
            // Fallback naar originele random logica (1-3)
            arrayLength = Math.floor(Math.random() * 3) + 1
        }
        
        // Vul array met random getallen tussen 1-5
        for(let i = 0; i < arrayLength; i++) {
            const randomNumber = Math.floor(Math.random() * 5) + 1
            this.#orderArray.push(randomNumber)
        }
        
        console.log(`Order gegenereerd met ${arrayLength} items:`, this.#orderArray)
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
    }    /**
     * Get a string representation of the order
     * @returns {string} String representation like "Order: 1, 2, 3"
     */
    toString() {
        return `Order: ${this.#orderArray.join(", ")}`
    }

    /**
     * Get debug information about the order
     * @returns {object} Debug info with size and items
     */
    getDebugInfo() {
        return {
            size: this.#orderArray.length,
            items: [...this.#orderArray],
            toString: this.toString()
        }
    }
}
