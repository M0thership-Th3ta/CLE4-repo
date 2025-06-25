import { Actor, Vector, Color, Font, Text } from "excalibur"

export class TimerDisplay extends Actor {
    #timeRemaining = 60
    #timerText

    constructor(pos = new Vector(1250, 50)) { // Aangepast naar nieuwe positie
        super({
            pos,
            anchor: new Vector(0.5, 0.5),
            z: 100 // Zorg dat timer bovenop wordt weergegeven
        })
        
        // Debug: Log constructor
        console.log('TimerDisplay constructor aangeroepen met positie:', pos)
    }// Deze functie wordt één keer aangeroepen wanneer de timer wordt toegevoegd
    onInitialize(engine) {
        console.log('TimerDisplay onInitialize aangeroepen')
          // Maak het timer text aan met Text graphic (niet Label!)
        this.#timerText = new Text({
            text: `Tijd: ${this.#timeRemaining}s`,
            font: new Font({
                family: 'Arial',
                size: 36, // Vergroot van 24 naar 36
                color: Color.White
            })
        })
        
        // Voeg text direct toe aan graphics
        this.graphics.use(this.#timerText)
        
        // Debug: Check of text correct is toegevoegd
        console.log('Timer text gemaakt:', this.#timerText)
        console.log('Timer positie:', this.pos)
        console.log('Timer zichtbaarheid:', this.graphics.visible)
        console.log('Timer z-index:', this.z)
    }    // Deze functie wordt elke frame uitgevoerd
    onPreUpdate(engine, delta) {
        // Tel de tijd af (delta is in milliseconden, dus delen door 1000 voor seconden)
        this.#timeRemaining -= delta / 1000

        // Debug: Log timer update (maar niet elke frame)
        if (Math.floor(this.#timeRemaining) !== Math.floor(this.#timeRemaining + delta / 1000)) {
            console.log('Timer update:', Math.floor(this.#timeRemaining))
        }

        // Update het text met de nieuwe tijd
        if (this.#timerText) {
            this.#timerText.text = `Tijd: ${Math.max(0, Math.floor(this.#timeRemaining))}s`
        }

        // Check of de tijd op is
        if (this.#timeRemaining <= 0) {
            this.#timeRemaining = 0
            if (this.#timerText) {
                this.#timerText.text = "Tijd: 0s"
            }
            
            console.log('Timer bereikt 0 - emit timeUp event')
            // Emit het timeUp event naar de engine
            engine.emit('timeUp')
        }
    }

    // Publieke getter voor de resterende tijd
    getTimeRemaining() {
        return this.#timeRemaining
    }    // Publieke method om de timer te resetten
    resetTimer(newTime = 60) {
        console.log('Timer reset naar', newTime, 'seconden')
        this.#timeRemaining = newTime
        if (this.#timerText) {
            this.#timerText.text = `Tijd: ${this.#timeRemaining}s`
        }
    }

    // Debug methode om timer status te checken
    getDebugInfo() {
        return {
            timeRemaining: this.#timeRemaining,
            position: this.pos,
            visible: this.graphics.visible,
            inScene: !!this.scene,
            textContent: this.#timerText?.text,
            zIndex: this.z
        }
    }
}
