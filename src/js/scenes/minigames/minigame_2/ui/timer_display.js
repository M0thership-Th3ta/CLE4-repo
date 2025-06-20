import { Actor, Label, Vector, Color, Font, FontUnit } from "excalibur"

export class TimerDisplay extends Actor {
    #timeRemaining = 60
    #timerLabel

    constructor(pos = new Vector(1080, 50)) {
        super({
            pos,
            z: 100 // Zorg dat timer bovenop wordt weergegeven
        })
    }

    // Deze functie wordt één keer aangeroepen wanneer de timer wordt toegevoegd
    onInitialize(engine) {
        // Maak het timer label aan
        this.#timerLabel = new Label({
            text: `Tijd: ${this.#timeRemaining}`,
            pos: Vector.Zero, // Relatief ten opzichte van de actor positie
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 32,
                unit: FontUnit.Px
            })
        })
        
        // Voeg het label toe aan de actor
        this.graphics.use(this.#timerLabel)
    }

    // Deze functie wordt elke frame uitgevoerd
    onPreUpdate(engine, delta) {
        // Tel de tijd af (delta is in milliseconden, dus delen door 1000 voor seconden)
        this.#timeRemaining -= delta / 1000

        // Update het label met de nieuwe tijd
        this.#timerLabel.text = `Tijd: ${Math.ceil(this.#timeRemaining)}`

        // Check of de tijd op is
        if (this.#timeRemaining <= 0) {
            this.#timeRemaining = 0
            this.#timerLabel.text = "Tijd: 0"
            
            // Emit het timeUp event naar de engine
            engine.emit('timeUp')
        }
    }

    // Publieke getter voor de resterende tijd
    getTimeRemaining() {
        return this.#timeRemaining
    }

    // Publieke method om de timer te resetten
    resetTimer(newTime = 60) {
        this.#timeRemaining = newTime
        if (this.#timerLabel) {
            this.#timerLabel.text = `Tijd: ${this.#timeRemaining}`
        }
    }
}
