import { Actor, Vector, Color, Font, Text } from "excalibur"

export class ScoreDisplay extends Actor {
    #scoreText

    constructor(pos = new Vector(50, 50)) {
        super({
            pos,
            anchor: new Vector(0, 0.5),
            z: 100 // Zorg dat score bovenop wordt weergegeven
        })
        
        console.log('ScoreDisplay constructor aangeroepen')
    }    // Deze functie wordt één keer aangeroepen wanneer de score display wordt toegevoegd
    onInitialize(engine) {
        console.log('ScoreDisplay onInitialize aangeroepen')
        
        // Maak het score text aan met Text graphic (niet Label!)
        this.#scoreText = new Text({
            text: "Score: 0",
            font: new Font({
                family: 'Arial',
                size: 24,
                color: Color.White
            })
        })
        
        // Voeg text direct toe aan graphics
        this.graphics.use(this.#scoreText)
        
        console.log('Score text gemaakt:', this.#scoreText)
        console.log('Score positie:', this.pos)
    }    /**
     * Update de weergegeven score
     * @param {number} score - De nieuwe score om weer te geven
     */
    updateScore(score) {
        console.log('Score update naar:', score)
        if (this.#scoreText) {
            this.#scoreText.text = `Score: ${score}`
        }
    }

    /**
     * Reset de score display naar 0
     */
    resetScore() {
        this.updateScore(0)
    }    /**
     * Krijg de huidige score tekst (voor debugging)
     * @returns {string} De huidige score tekst
     */
    getCurrentText() {
        return this.#scoreText ? this.#scoreText.text : "Score: 0"
    }

    /**
     * Reset de score display naar 0
     */
    reset() {
        console.log('Score reset naar 0')
        this.updateScore(0)
    }
}
