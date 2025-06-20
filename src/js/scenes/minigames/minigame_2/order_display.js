import { Actor, Vector, Label, Color, Font } from "excalibur"

export class OrderDisplay extends Actor {
    #orderLabel
    
    constructor() {
        super({
            pos: new Vector(50, 50), // Linkerbovenhoek
            anchor: Vector.Zero
        })
    }
    
    // Deze functie wordt één keer aangeroepen wanneer de OrderDisplay wordt toegevoegd
    // Zie het als het "klaarmaken" van de display voordat het spel begint
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
    
    // Deze functie update de getoonde order
    // Ontvangt een array met foodId's en toont deze als "Order: 1, 2, 3"
    updateOrder(orderArray) {
        // Check of de label bestaat voordat je de text wijzigt
        if (this.#orderLabel) {
            this.#orderLabel.text = "Order: " + orderArray.join(", ")
        }
    }
}
