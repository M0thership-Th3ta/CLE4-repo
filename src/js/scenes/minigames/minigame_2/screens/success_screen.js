import { Scene, Label, Vector, Color, Font, FontUnit, Keys, Rectangle } from "excalibur"

export class SuccessScreen extends Scene {
    #titleLabel
    #scoreLabel
    #ordersLabel
    #playAgainLabel
    #continueLabel
    #background
    #finalScore = 0

    constructor() {
        super()
    }

    // Deze functie wordt aangeroepen wanneer de scene wordt geïnitialiseerd
    onInitialize(engine) {
        // Maak groene achtergrond aan
        this.#createBackground(engine)
        
        // Maak titel aan
        this.#createTitle(engine)
        
        // Maak score display aan
        this.#createScoreDisplay(engine)
        
        // Maak orders completed display aan
        this.#createOrdersDisplay(engine)
        
        // Maak knoppen aan
        this.#createButtons(engine)
        
        console.log("Success screen geïnitialiseerd")
    }

    // Maak groene success achtergrond aan
    #createBackground(engine) {
        this.#background = new Rectangle({
            width: engine.drawWidth,
            height: engine.drawHeight,
            color: Color.fromHex('#2E7D32') // Donkergroen voor success
        })
        
        // Positioneer in het midden van het scherm
        this.#background.pos = new Vector(engine.halfDrawWidth, engine.halfDrawHeight)
        this.add(this.#background)
    }

    // Maak de success titel aan
    #createTitle(engine) {
        this.#titleLabel = new Label({
            text: "Geweldig Gedaan!",
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
            text: `Finale Score: ${this.#finalScore}`,
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
            text: "7/7 Orders Voltooid!",
            pos: new Vector(engine.halfDrawWidth, 350),
            color: Color.Cyan,
            font: new Font({
                family: 'Arial',
                size: 28,
                unit: FontUnit.Px
            })
        })
        this.add(this.#ordersLabel)
    }

    // Maak de navigatie knoppen aan
    #createButtons(engine) {
        // Opnieuw spelen knop
        this.#playAgainLabel = new Label({
            text: "🔄 Druk R/Y voor Opnieuw",
            pos: new Vector(engine.halfDrawWidth, 450),
            color: Color.Orange,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px
            })
        })
        this.add(this.#playAgainLabel)

        // Verder gaan knop
        this.#continueLabel = new Label({
            text: "➡️ Druk SPATIE/A voor Verder",
            pos: new Vector(engine.halfDrawWidth, 520),
            color: Color.LightGreen,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px
            })
        })
        this.add(this.#continueLabel)
    }    // Deze functie wordt elke frame uitgevoerd
    onPreUpdate(engine, delta) {
        // Keyboard input
        // Luister naar R key voor opnieuw spelen
        if (engine.input.keyboard.wasPressed(Keys.R)) {
            console.log("R ingedrukt - restart minigame!")
            engine.goToScene('minigame_2_instruction')
        }

        // Luister naar spacebar voor verder gaan
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            console.log("Spacebar ingedrukt - ga verder naar restaurant scene!")
            engine.goToScene('restaurantscene_3')
        }
        
        // Controller input - check elke frame
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (const gamepad of gamepads) {
            if (!gamepad) continue;
            
            // Y knop (index 3) voor restart - Xbox Y of PlayStation Triangle
            if (gamepad.buttons[3] && gamepad.buttons[3].pressed) {
                console.log("Controller Y/Triangle - restart minigame!");
                engine.goToScene('minigame_2_instruction');
            }
            
            // A knop (index 0) voor verder gaan - Xbox A of PlayStation X
            if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
                console.log("Controller A/X - ga verder naar restaurant scene!");
                engine.goToScene('restaurantscene_3');
            }
        }
    }

    // Wordt aangeroepen wanneer de scene actief wordt
    onActivate(context) {
        console.log("Success screen actief")
        
        // Probeer finale score op te halen uit de engine data
        if (context && context.data && context.data.finalScore !== undefined) {
            this.#finalScore = context.data.finalScore
            this.#updateScoreDisplay()
        } else if (this.engine.currentScene && this.engine.currentScene.finalScore !== undefined) {
            this.#finalScore = this.engine.currentScene.finalScore
            this.#updateScoreDisplay()
        }
    }

    // Update de score display met de finale score
    #updateScoreDisplay() {
        if (this.#scoreLabel) {
            this.#scoreLabel.text = `Finale Score: ${this.#finalScore}`
            console.log(`Success screen toont finale score: ${this.#finalScore}`)
        }
    }

    // Publieke method om score in te stellen
    setFinalScore(score) {
        this.#finalScore = score
        this.#updateScoreDisplay()
    }

    // Wordt aangeroepen wanneer de scene wordt verlaten
    onDeactivate(context) {
        console.log("Success screen verlaten")
    }
}
