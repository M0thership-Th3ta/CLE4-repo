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
    }    /**
     * Generate order with exact number of unique food items (geen duplicaten)
     * @private
     */
    #generateOrder() {
        this.#orderArray = []
        const availableFoodIds = [1, 2, 3, 4, 5] // Alle beschikbare food ID's
        
        // Zorg ervoor dat de gewenste grootte niet groter is dan beschikbare items
        const maxSize = Math.min(this.#size, availableFoodIds.length)
        
        // Genereer exact het aantal unieke items dat gewenst is
        for (let i = 0; i < maxSize; i++) {
            // Kies random index uit beschikbare items
            const randomIndex = Math.floor(Math.random() * availableFoodIds.length)
            const selectedFoodId = availableFoodIds[randomIndex]
            
            // Voeg geselecteerd item toe aan order
            this.#orderArray.push(selectedFoodId)
            
            // Verwijder geselecteerd item uit beschikbare items om duplicaten te voorkomen
            availableFoodIds.splice(randomIndex, 1)
        }
        
        console.log(`Order gegenereerd met ${maxSize} unieke items:`, this.#orderArray)
    }/**
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
