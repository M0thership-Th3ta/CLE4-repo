import { Actor, Vector, Color, Font, Text } from "excalibur"

export class OrderCounter extends Actor {
    #currentOrder = 1
    #totalOrders = 6
    #orderText

    constructor(pos = new Vector(100, 50)) { // Links boven positie
        super({
            pos,
            anchor: new Vector(0, 0.5), // Links uitlijnen
            z: 100 // Zorg dat counter bovenop wordt weergegeven
        })
        
        console.log('OrderCounter constructor aangeroepen met positie:', pos)
    }

    // Deze functie wordt één keer aangeroepen wanneer de counter wordt toegevoegd
    onInitialize(engine) {
        console.log('OrderCounter onInitialize aangeroepen')
        
        // Maak het order text aan
        this.#orderText = new Text({
            text: `Order ${this.#currentOrder}/${this.#totalOrders}`,
            font: new Font({
                family: 'Arial',
                size: 30, // Verkleind van 36 naar 30 (1/6 kleiner)
                color: Color.White
            })
        })
        
        // Voeg text toe aan graphics
        this.graphics.use(this.#orderText)
        
        console.log('Order counter text gemaakt:', this.#orderText)
        console.log('Order counter positie:', this.pos)
    }

    // Update de huidige order
    updateOrder(currentOrder) {
        this.#currentOrder = currentOrder + 1 // +1 omdat we bij 1 willen beginnen, niet 0
        
        if (this.#orderText) {
            this.#orderText.text = `Order ${this.#currentOrder}/${this.#totalOrders}`
        }
        
        console.log(`Order counter geüpdatet naar: ${this.#currentOrder}/${this.#totalOrders}`)
    }

    // Getter voor debug info
    getOrderInfo() {
        return {
            current: this.#currentOrder,
            total: this.#totalOrders
        }
    }
}
