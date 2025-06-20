import { Scene, Label, Vector, Color, Font, FontUnit, Keys, Rectangle } from "excalibur"

export class FailScreen extends Scene {
    #titleLabel
    #scoreLabel
    #ordersLabel
    #retryLabel
    #background
    #finalScore = 0
    #ordersCompleted = 0

    constructor() {
        super()
    }

    // Deze functie wordt aangeroepen wanneer de scene wordt geïnitialiseerd
    onInitialize(engine) {
        // Maak rode achtergrond aan
        this.#createBackground(engine)
        
        // Maak titel aan
        this.#createTitle(engine)
        
        // Maak score display aan
        this.#createScoreDisplay(engine)
        
        // Maak orders completed display aan
        this.#createOrdersDisplay(engine)
        
        // Maak retry knop aan
        this.#createRetryButton(engine)
        
        console.log("Fail screen geïnitialiseerd")
    }

    // Maak rode fail achtergrond aan
    #createBackground(engine) {
        this.#background = new Rectangle({
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: Color.fromHex('#B71C1C') // Donkerrood voor fail
        })
        
        // Positioneer in het midden van het scherm
        this.#background.pos = new Vector(engine.halfDrawWidth, engine.halfDrawHeight)
        this.add(this.#background)
    }

    // Maak de fail titel aan
    #createTitle(engine) {
        this.#titleLabel = new Label({
            text: "Tijd is Op!",
            pos: new Vector(engine.halfDrawWidth, 200),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 48,
                unit: FontUnit.Px
            })
        })
        this.add(this.#titleLabel)
    }

    // Maak de score display aan
    #createScoreDisplay(engine) {
        this.#scoreLabel = new Label({
            text: `Score: ${this.#finalScore}`,
            pos: new Vector(engine.halfDrawWidth, 280),
            color: Color.Yellow,
            font: new Font({
                family: 'Arial',
                size: 32,
                unit: FontUnit.Px
            })
        })
        this.add(this.#scoreLabel)
    }

    // Maak de orders completed display aan
    #createOrdersDisplay(engine) {
        this.#ordersLabel = new Label({
            text: `${this.#ordersCompleted}/7 Orders Voltooid`,
            pos: new Vector(engine.halfDrawWidth, 350),
            color: Color.Orange,
            font: new Font({
                family: 'Arial',
                size: 28,
                unit: FontUnit.Px
            })
        })
        this.add(this.#ordersLabel)
    }

    // Maak de retry knop aan
    #createRetryButton(engine) {
        this.#retryLabel = new Label({
            text: "🔄 Druk R voor Probeer Opnieuw",
            pos: new Vector(engine.halfDrawWidth, 450),
            color: Color.LightBlue,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px
            })
        })
        this.add(this.#retryLabel)
    }

    // Deze functie wordt elke frame uitgevoerd
    onPreUpdate(engine, delta) {
        // Luister naar R key voor retry
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            console.log("R ingedrukt - retry minigame!")
            engine.goToScene('minigame_2_instruction')
        }
    }

    // Wordt aangeroepen wanneer de scene actief wordt
    onActivate(context) {
        console.log("Fail screen actief")
        
        // Probeer game data op te halen uit verschillende sources
        if (context && context.data) {
            if (context.data.finalScore !== undefined) {
                this.#finalScore = context.data.finalScore
            }
            if (context.data.ordersCompleted !== undefined) {
                this.#ordersCompleted = context.data.ordersCompleted
            }
            this.#updateDisplays()
        } else if (this.engine.currentScene) {
            // Fallback naar engine properties
            if (this.engine.currentScene.finalScore !== undefined) {
                this.#finalScore = this.engine.currentScene.finalScore
            }
            if (this.engine.currentScene.ordersCompleted !== undefined) {
                this.#ordersCompleted = this.engine.currentScene.ordersCompleted
            }
            this.#updateDisplays()
        }
    }

    // Update alle displays met de huidige game data
    #updateDisplays() {
        this.#updateScoreDisplay()
        this.#updateOrdersDisplay()
    }

    // Update de score display
    #updateScoreDisplay() {
        if (this.#scoreLabel) {
            this.#scoreLabel.text = `Score: ${this.#finalScore}`
        }
    }

    // Update de orders display
    #updateOrdersDisplay() {
        if (this.#ordersLabel) {
            this.#ordersLabel.text = `${this.#ordersCompleted}/7 Orders Voltooid`
            console.log(`Fail screen toont: ${this.#ordersCompleted}/7 orders, score: ${this.#finalScore}`)
        }
    }

    // Publieke methods om game data in te stellen
    setGameData(score, ordersCompleted) {
        this.#finalScore = score
        this.#ordersCompleted = ordersCompleted
        this.#updateDisplays()
    }

    setFinalScore(score) {
        this.#finalScore = score
        this.#updateScoreDisplay()
    }

    setOrdersCompleted(orders) {
        this.#ordersCompleted = orders
        this.#updateOrdersDisplay()
    }

    // Wordt aangeroepen wanneer de scene wordt verlaten
    onDeactivate(context) {
        console.log("Fail screen verlaten")
    }
}
