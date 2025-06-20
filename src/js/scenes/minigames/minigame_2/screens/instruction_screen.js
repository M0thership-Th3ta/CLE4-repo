import { Scene, Label, Vector, Color, Font, FontUnit, Keys } from "excalibur"

export class InstructionScreen extends Scene {
    #titleLabel
    #instructionLabels = []
    #controlsLabel
    #startLabel

    constructor() {
        super()
    }

    // Deze functie wordt aangeroepen wanneer de scene wordt geïnitialiseerd
    onInitialize(engine) {
        // Maak titel aan
        this.#createTitle(engine)
        
        // Maak instructie teksten aan
        this.#createInstructions(engine)
        
        // Maak controls tekst aan
        this.#createControls(engine)
        
        // Maak start prompt aan
        this.#createStartPrompt(engine)
        
        console.log("Instruction screen geïnitialiseerd")
    }

    // Maak de hoofdtitel aan
    #createTitle(engine) {
        this.#titleLabel = new Label({
            text: "Restaurant Rush!",
            pos: new Vector(engine.halfDrawWidth, 100),
            color: Color.Yellow,
            font: new Font({
                family: 'Arial',
                size: 48,
                unit: FontUnit.Px
            })
        })
        this.add(this.#titleLabel)
    }

    // Maak de instructie teksten aan
    #createInstructions(engine) {
        const instructions = [
            "Lever bestellingen af door food items te slepen",
            "Gebruik WASD om te bewegen, Enter om te pakken/loslaten", 
            "Match de exacte volgorde!"
        ]

        // Startpositie voor instructies
        let yPos = 250
        const lineSpacing = 40

        instructions.forEach((instruction, index) => {
            const label = new Label({
                text: instruction,
                pos: new Vector(engine.halfDrawWidth, yPos + (index * lineSpacing)),
                color: Color.White,
                font: new Font({
                    family: 'Arial',
                    size: 24,
                    unit: FontUnit.Px
                })
            })
            
            this.#instructionLabels.push(label)
            this.add(label)
        })
    }

    // Maak de controls uitleg aan
    #createControls(engine) {
        this.#controlsLabel = new Label({
            text: "🎮 WASD = Bewegen | ENTER = Pakken/Loslaten 🎮",
            pos: new Vector(engine.halfDrawWidth, 400),
            color: Color.Cyan,
            font: new Font({
                family: 'Arial',
                size: 20,
                unit: FontUnit.Px
            })
        })
        this.add(this.#controlsLabel)
    }

    // Maak de start prompt aan
    #createStartPrompt(engine) {
        this.#startLabel = new Label({
            text: "Druk SPATIE om te beginnen",
            pos: new Vector(engine.halfDrawWidth, 550),
            color: Color.Green,
            font: new Font({
                family: 'Arial',
                size: 28,
                unit: FontUnit.Px
            })
        })
        this.add(this.#startLabel)
    }

    // Deze functie wordt elke frame uitgevoerd
    onPreUpdate(engine, delta) {
        // Luister naar spacebar om naar de minigame te gaan
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            console.log("Spacebar ingedrukt - start minigame!")
            engine.goToScene('minigame_2')
        }
    }

    // Wordt aangeroepen wanneer de scene actief wordt
    onActivate(context) {
        console.log("Instruction screen actief")
    }

    // Wordt aangeroepen wanneer de scene wordt verlaten  
    onDeactivate(context) {
        console.log("Instruction screen verlaten")
    }
}
