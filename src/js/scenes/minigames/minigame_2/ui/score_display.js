import { Actor, Label, Vector, Color, Font, FontUnit } from "excalibur"

export class ScoreDisplay extends Actor {
    #scoreLabel

    constructor(pos = new Vector(50, 100)) {
        super({
            pos,
            z: 100 // Zorg dat score bovenop wordt weergegeven
        })
    }

    // Deze functie wordt één keer aangeroepen wanneer de score display wordt toegevoegd
    onInitialize(engine) {
        // Maak het score label aan
        this.#scoreLabel = new Label({
            text: "Score: 0",
            pos: Vector.Zero, // Relatief ten opzichte van de actor positie
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px
            })
        })
        
        // Voeg het label toe aan de actor
        this.graphics.use(this.#scoreLabel)
    }

    /**
     * Update de weergegeven score
     * @param {number} score - De nieuwe score om weer te geven
     */
    updateScore(score) {
        if (this.#scoreLabel) {
            this.#scoreLabel.text = `Score: ${score}`
        }
    }

    /**
     * Reset de score display naar 0
     */
    resetScore() {
        this.updateScore(0)
    }

    /**
     * Krijg de huidige score tekst (voor debugging)
     * @returns {string} De huidige score tekst
     */
    getCurrentText() {
        return this.#scoreLabel ? this.#scoreLabel.text : "Score: 0"
    }
}
