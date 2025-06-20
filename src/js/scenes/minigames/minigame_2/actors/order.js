// Geen imports nodig - dit is een pure data class

/**
 * Represents a customer order with specific number of food items
 * Generates exact number of random food IDs (1-5) based on desiredSize parameter
 */
export class Order {
    #orderArray = []
    #size
    
    /**
     * Creates a new order with specific size
     * @param {number} desiredSize - Exact number of items for this order (1-4)
     */
    constructor(desiredSize = 1) {
        this.#size = desiredSize
        this.#generateOrder()
    }

    /**
     * Generate order with exact number of food items
     * @private
     */
    #generateOrder() {
        this.#orderArray = []
        
        // Genereer exact het aantal items dat gewenst is
        for (let i = 0; i < this.#size; i++) {
            // Random food ID tussen 1 en 5
            const randomFoodId = Math.floor(Math.random() * 5) + 1
            this.#orderArray.push(randomFoodId)
        }
        
        console.log(`Order gegenereerd met ${this.#size} items:`, this.#orderArray)
    }    /**
     * Get a copy of the order array (immutable)
     * @returns {number[]} Copy of the order array
     */
    getOrder() {
        return [...this.#orderArray] // Retourneer kopie voor immutability
    }

    /**
     * Get a copy of the order array using getter syntax
     * @returns {number[]} Copy of the order array
     */
    get orderArray() {
        return [...this.#orderArray]
    }

    /**
     * Get the exact size of this order
     * @returns {number} Number of items in the order
     */
    get size() {
        return this.#size
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
