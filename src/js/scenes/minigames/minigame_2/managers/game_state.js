/**
 * Centrale game state management voor minigame 2
 * Houdt bij: score, voltooide orders, en moeilijkheidsgraad
 */
export class GameState {
    #score = 0
    #ordersCompleted = 0
    #totalOrders = 6/**
     * Verhoog het aantal voltooide orders en update de score
     * Score wordt berekend op basis van huidige moeilijkheidsgraad
     */
    incrementOrder() {
        console.log(`=== ORDER COMPLETION DEBUG ===`)
        console.log(`Voor increment: ordersCompleted = ${this.#ordersCompleted}`)
        console.log(`Huidige order size was: ${this.getCurrentOrderSize()}`)
        
        this.#ordersCompleted++
        this.#score += 100
          console.log(`Na increment: ordersCompleted = ${this.#ordersCompleted}`)
        console.log(`Volgende order size wordt: ${this.getCurrentOrderSize()}`)
        console.log(`Order ${this.#ordersCompleted}/${this.#totalOrders} voltooid! Score: ${this.#score}`)
        console.log(`Progression info:`, this.getOrderProgressionInfo())
    }

    /**
     * Check of alle orders zijn voltooid
     * @returns {boolean} True als het spel compleet is
     */
    isGameComplete() {
        return this.#ordersCompleted >= this.#totalOrders
    }    /**
     * Bepaal het aantal items voor de huidige order op basis van progressie
     * @returns {number} Aantal items (1-3) voor de volgende order
     */
    getCurrentOrderSize() {
        // Logic voor difficulty progression:
        // 2x orders met 1 item (orders 0-1)
        if (this.#ordersCompleted < 2) return 1
        
        // 2x orders met 2 items (orders 2-3)
        if (this.#ordersCompleted < 4) return 2
        
        // 2x orders met 3 items (orders 4-5)
        return 3
    }    /**
     * Debug methode om order progressie te tonen
     */
    getOrderProgressionInfo() {
        const progression = [
            "Order 1: 1 item",
            "Order 2: 1 item", 
            "Order 3: 2 items",
            "Order 4: 2 items",
            "Order 5: 3 items", 
            "Order 6: 3 items"
        ]
        
        return {
            currentOrder: this.#ordersCompleted + 1,
            expectedSize: this.getCurrentOrderSize(),
            description: progression[this.#ordersCompleted] || "Game compleet",
            progression: progression
        }
    }

    /**
     * Publieke getters voor read-only toegang tot game state
     */
    getScore() {
        return this.#score
    }

    getOrdersCompleted() {
        return this.#ordersCompleted
    }

    getTotalOrders() {
        return this.#totalOrders
    }

    /**
     * Krijg de huidige difficulty level (1-4) voor display doeleinden
     * @returns {number} Huidige difficulty level
     */
    getCurrentDifficulty() {
        return this.getCurrentOrderSize()
    }

    /**
     * Reset de game state naar beginwaarden
     * Handig voor restart functionaliteit
     */
    reset() {
        this.#score = 0
        this.#ordersCompleted = 0
    }

    /**
     * Get progress percentage voor UI weergave
     * @returns {number} Percentage voltooid (0-100)
     */
    getProgressPercentage() {
        return Math.round((this.#ordersCompleted / this.#totalOrders) * 100)
    }

    /**
     * Debug method om huidige state te loggen
     */
    logState() {
        console.log({
            score: this.#score,
            ordersCompleted: this.#ordersCompleted,
            totalOrders: this.#totalOrders,
            currentOrderSize: this.getCurrentOrderSize(),
            progress: this.getProgressPercentage() + "%",
            gameComplete: this.isGameComplete()
        })
    }
}
