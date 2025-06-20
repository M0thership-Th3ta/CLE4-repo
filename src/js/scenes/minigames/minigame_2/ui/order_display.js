import { Actor, Vector, Label, Color, Font } from "excalibur"

export class OrderDisplay extends Actor {
    #orderLabels = []
    #deliveredItems = []
    #currentOrder = [] // Bewaar de huidige order voor highlighting logic
    
    /**
     * Creates a new OrderDisplay for showing customer orders
     * @param {Vector} pos - Position for the display (default: top-left corner)
     */
    constructor(pos = new Vector(50, 50)) {
        super({
            pos, // Gebruik parameter voor flexibele positionering
            anchor: Vector.Zero
        })
    }
      /**
     * Deze functie wordt één keer aangeroepen wanneer de OrderDisplay wordt toegevoegd
     * Zie het als het "klaarmaken" van de display voordat het spel begint
     */
    onInitialize(engine) {
        // Start met een lege array - labels worden dynamisch aangemaakt in updateOrder
        console.log("OrderDisplay geïnitialiseerd")
    }    /**
     * Update de getoonde order met meerdere labels
     * @param {number[]} orderArray - Array met foodId's die de order vormen
     */
    updateOrder(orderArray) {
        // Defensieve checks voor robuustheid
        if (!Array.isArray(orderArray)) {
            console.warn("OrderDisplay: orderArray must be an array, got:", typeof orderArray)
            return
        }

        // Verwijder alle oude labels en reset delivery tracking
        this.#clearLabels()
        this.#currentOrder = [...orderArray] // Bewaar kopie van de order
        this.#deliveredItems = new Array(orderArray.length).fill(false) // Reset delivery status

        // Maak nieuwe labels voor elk item in de order
        orderArray.forEach((foodId, index) => {
            const label = new Label({
                text: `${foodId}`,
                pos: new Vector(index * 50, 0), // 50px spacing tussen labels
                font: new Font({
                    size: 24,
                    color: Color.White
                })
            })
            
            // Voeg label toe aan de array en als child
            this.#orderLabels.push(label)
            this.addChild(label)
        })

        console.log(`OrderDisplay updated met ${orderArray.length} items:`, orderArray)
    }    /**
     * Verwijder alle huidige order labels
     * @private
     */
    #clearLabels() {
        // Verwijder alle labels als children en clear de array
        this.#orderLabels.forEach(label => {
            this.removeChild(label)
        })
        this.#orderLabels = []
        this.#deliveredItems = []
        this.#currentOrder = []
    }

    /**
     * Highlight een geleverd item in de order
     * @param {number} foodId - Het foodId dat geleverd werd
     */
    highlightDeliveredItem(foodId) {
        // Vind eerste index waar orderArray[i] === foodId EN deliveredItems[i] !== true
        for (let i = 0; i < this.#currentOrder.length; i++) {
            if (this.#currentOrder[i] === foodId && !this.#deliveredItems[i]) {
                // Markeer als geleverd
                this.#deliveredItems[i] = true
                
                // Maak label groen
                if (this.#orderLabels[i]) {
                    this.#orderLabels[i].font.color = Color.Green
                    console.log(`OrderDisplay: Item ${foodId} op index ${i} groen gemaakt`)
                }
                return // Stop na de eerste match
            }
        }
        
        console.warn(`OrderDisplay: Geen niet-geleverd item gevonden voor foodId ${foodId}`)
    }
      /**
     * Reset the display to show no order
     */
    clearOrder() {
        this.#clearLabels()
        console.log("OrderDisplay cleared")
    }

    /**
     * Check if the display is ready for updates
     * @returns {boolean} True if the display is initialized
     */
    isReady() {
        return true // Altijd ready sinds we dynamisch labels maken
    }    /**
     * Reset alle highlights en delivery tracking
     */
    resetHighlights() {
        // Reset alle label kleuren naar wit
        this.#orderLabels.forEach(label => {
            label.font.color = Color.White
        })
        
        // Reset delivery tracking
        this.#deliveredItems.fill(false)
        
        console.log("OrderDisplay: Alle highlights gereset")
    }

    /**
     * Highlight een specifiek item in de order (legacy method)
     * @param {number} index - Index van het item om te highlighten
     * @param {Color} color - Kleur voor de highlight
     */
    highlightItem(index, color = Color.Green) {
        if (index >= 0 && index < this.#orderLabels.length) {
            this.#orderLabels[index].font.color = color
        }
    }

    /**
     * Get het aantal items dat al geleverd is
     * @returns {number} Aantal geleverde items
     */
    getDeliveredCount() {
        return this.#deliveredItems.filter(delivered => delivered).length
    }

    /**
     * Check of alle items geleverd zijn
     * @returns {boolean} True als alle items geleverd zijn
     */
    isOrderComplete() {
        return this.#deliveredItems.length > 0 && this.#deliveredItems.every(delivered => delivered)
    }
}
