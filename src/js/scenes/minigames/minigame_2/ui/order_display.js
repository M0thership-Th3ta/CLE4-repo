import { Actor, Vector, Label, Color, Font } from "excalibur"
import { Resources } from "../../../../resources.js"

export class OrderDisplay extends Actor {
    #orderSprites = [] // Verander van labels naar sprites
    #deliveredItems = []
    #currentOrder = [] // Bewaar de huidige order voor highlighting logic
      /**
     * Creates a new OrderDisplay for showing customer orders
     * @param {Vector} pos - Position for the display (default: top-left corner)
     */
    constructor(pos = new Vector(1050, 100)) {
        super({
            pos, // Gebruik parameter voor flexibele positionering
            anchor: Vector.Zero
        })
    }    /**
     * Deze functie wordt één keer aangeroepen wanneer de OrderDisplay wordt toegevoegd
     * Zie het als het "klaarmaken" van de display voordat het spel begint
     */
    onInitialize(engine) {
        // Start met een lege array - sprites worden dynamisch aangemaakt in updateOrder
        console.log("OrderDisplay geïnitialiseerd")
    }

    /**
     * Map foodId naar de juiste sprite resource
     * @param {number} foodId - Het foodId om naar sprite te mappen
     * @returns {ImageSource} De sprite resource voor het food item
     */
    #getFoodSprite(foodId) {
        switch(foodId) {
            case 1: return Resources.Food1
            case 2: return Resources.Food2  
            case 3: return Resources.Food3
            case 4: return Resources.Food4
            case 5: return Resources.Food5
            default: 
                console.warn(`OrderDisplay: Onbekende foodId ${foodId}, gebruik fallback`)
                return Resources.Food1
        }
    }    /**
     * Update de getoonde order met meerdere sprite afbeeldingen
     * @param {number[]} orderArray - Array met foodId's die de order vormen
     */
    updateOrder(orderArray) {
        // Defensieve checks voor robuustheid
        if (!Array.isArray(orderArray)) {
            console.warn("OrderDisplay: orderArray must be an array, got:", typeof orderArray)
            return
        }

        // Verwijder alle oude sprites en reset delivery tracking
        this.#clearSprites()
        this.#currentOrder = [...orderArray] // Bewaar kopie van de order
        this.#deliveredItems = new Array(orderArray.length).fill(false) // Reset delivery status        // Maak nieuwe sprite actors voor elk item in de order
        orderArray.forEach((foodId, index) => {
            const sprite = this.#getFoodSprite(foodId)
            
            // Maak een kleine sprite actor voor de order display
            const spriteActor = new Actor({
                pos: new Vector(index * 60, 0), // 60px spacing tussen sprites
                width: 40, // Kleine sprite grootte
                height: 40,
                scale: new Vector(0.4, 0.4), // Kleine schaal voor display
                anchor: Vector.Zero
            })
            
            // Zet de sprite graphics in de onInitialize van de sprite actor
            spriteActor.onInitialize = () => {
                spriteActor.graphics.use(sprite.toSprite())
            }
            
            // Voeg sprite toe als child actor
            this.#orderSprites.push(spriteActor)
            this.addChild(spriteActor)
        })

        console.log(`OrderDisplay updated met ${orderArray.length} items:`, orderArray)
    }    /**
     * Verwijder alle huidige order sprites
     * @private
     */
    #clearSprites() {
        // Verwijder alle sprites als children en clear de array
        this.#orderSprites.forEach(spriteActor => {
            this.removeChild(spriteActor)
        })
        this.#orderSprites = []
        this.#deliveredItems = []
        this.#currentOrder = []
    }    /**
     * Highlight een geleverd item in de order met een groen overlay
     * @param {number} foodId - Het foodId dat geleverd werd
     */
    highlightDeliveredItem(foodId) {
        // Vind eerste index waar orderArray[i] === foodId EN deliveredItems[i] !== true
        for (let i = 0; i < this.#currentOrder.length; i++) {
            if (this.#currentOrder[i] === foodId && !this.#deliveredItems[i]) {
                // Markeer als geleverd
                this.#deliveredItems[i] = true
                // Voeg groen overlay toe aan de sprite
                if (this.#orderSprites[i]) {
                    this.#orderSprites[i].graphics.opacity = 0.6 // Maak iets transparant
                    console.log(`OrderDisplay: Item ${foodId} op index ${i} highlighted`)
                }
                // Speel correctanswer.mp3 op zachter volume bij deels goed
                if (Resources.CorrectAnswer ) {
                    Resources.CorrectAnswer.play(0.4).catch(e => {})
                }
                // Check of nu alles compleet is
                if (this.#deliveredItems.every(v => v)) {
                    // Speel correctanswer.mp3 op vol volume bij complete order
                    if (Resources.CorrectAnswer ) {
                        Resources.CorrectAnswer.play(1).catch(e => {})
                    }
                }
                return // Stop na de eerste match
            }
        }
        console.warn(`OrderDisplay: Geen niet-geleverd item gevonden voor foodId ${foodId}`)
        // Speel errorsound af als het item niet in de order past
        if (Resources.ErrorSound) {
            Resources.ErrorSound.play(1).catch(e => {})
        }
    }/**
     * Reset the display to show no order
     */
    clearOrder() {
        this.#clearSprites()
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
        // Reset alle sprite opacity naar normaal
        this.#orderSprites.forEach(spriteActor => {
            spriteActor.graphics.opacity = 1.0
        })
        
        // Reset delivery tracking
        this.#deliveredItems.fill(false)
        
        console.log("OrderDisplay: Alle highlights gereset")
    }    /**
     * Highlight een specifiek item in de order (legacy method)
     * @param {number} index - Index van het item om te highlighten
     * @param {number} opacity - Opacity voor de highlight (0.0 - 1.0)
     */
    highlightItem(index, opacity = 0.6) {
        if (index >= 0 && index < this.#orderSprites.length) {
            this.#orderSprites[index].graphics.opacity = opacity
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
