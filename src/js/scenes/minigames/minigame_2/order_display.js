import { Actor, Vector, Label, Color, Font } from "excalibur"

export class OrderDisplay extends Actor {
    #orderLabel
    
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
        this.#orderLabel = new Label({
            text: "Order: ",
            pos: Vector.Zero,
            font: new Font({
                size: 24,
                color: Color.White
            })
        })
        this.addChild(this.#orderLabel)
    }
    
    /**
     * Update de getoonde order
     * @param {number[]} orderArray - Array met foodId's die de order vormen
     */
    updateOrder(orderArray) {
        // Defensieve checks voor robuustheid
        if (!this.#orderLabel) {
            console.warn("OrderDisplay: Label not initialized yet")
            return
        }
        
        if (!Array.isArray(orderArray)) {
            console.warn("OrderDisplay: orderArray must be an array, got:", typeof orderArray)
            return
        }
        
        // Update de tekst met de nieuwe order
        this.#orderLabel.text = "Order: " + orderArray.join(", ")
    }
    
    /**
     * Reset the display to show no order
     */
    clearOrder() {
        if (this.#orderLabel) {
            this.#orderLabel.text = "Order: "
        }
    }
    
    /**
     * Check if the display is ready for updates
     * @returns {boolean} True if the label is initialized
     */
    isReady() {
        return !!this.#orderLabel
    }
}
