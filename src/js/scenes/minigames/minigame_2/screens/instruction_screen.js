import { Scene, Label, Vector, Color, Font, FontUnit, Keys } from "excalibur"

export class InstructionScreen extends Scene {
    #titleLabel
    #instructionLabels = []
    #controlsLabel
    #startLabel
    
    // Properties voor robuuste input handling
    #keyboardEventHandler = null
    #hasSceneSwitched = false
    #lastInputTime = 0
    #inputCooldown = 200 // Milliseconden cooldown tussen inputs

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
        
        // Setup robuuste input handling
        this.#setupInputHandling(engine)
        
        console.log("Instruction screen geïnitialiseerd met robuuste input handling")
    }

    // Setup van robuuste input handling met event listeners en fallback
    #setupInputHandling(engine) {
        // Maak een event handler functie die we later kunnen verwijderen
        this.#keyboardEventHandler = (evt) => {
            console.log("Keyboard event ontvangen:", evt.key, "Type:", evt.type)
            
            // Check of we recent al input hebben gehad (debounce)
            const currentTime = Date.now()
            if (currentTime - this.#lastInputTime < this.#inputCooldown) {
                console.log("Input genegeerd vanwege cooldown")
                return
            }
            
            // Check verschillende varianten van space en enter keys
            const isSpaceKey = evt.key === ' ' || 
                              evt.key === 'Space' || 
                              evt.key === Keys.Space ||
                              evt.code === 'Space'
            
            const isEnterKey = evt.key === 'Enter' || 
                              evt.key === Keys.Enter ||
                              evt.code === 'Enter'
            
            if (isSpaceKey || isEnterKey) {
                console.log("Geldige start key gedetecteerd:", evt.key)
                this.#startMinigame(engine)
            }
        }
        
        // Registreer event listeners voor zowel keydown als keypress
        // Dit zorgt voor betere compatibiliteit across browsers
        engine.input.keyboard.on('press', this.#keyboardEventHandler)
        console.log("Event listeners geregistreerd voor keyboard input")
        
        // Controller input check
        this._controllerCheckInterval = setInterval(() => {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            const gamepad = gamepads[0];
            
            if (gamepad && !this.#hasSceneSwitched) {
                const currentTime = Date.now();
                if (currentTime - this.#lastInputTime < this.#inputCooldown) {
                    return;
                }
                
                // A knop (index 0) of B knop (index 1) voor starten
                if ((gamepad.buttons[0] && gamepad.buttons[0].pressed) || 
                    (gamepad.buttons[1] && gamepad.buttons[1].pressed)) {
                    console.log("Controller start button gedetecteerd");
                    this.#startMinigame(engine);
                }
            }
        }, 100);
    }

    // Start minigame functie met dubbele input preventie
    #startMinigame(engine) {
        // Voorkom dubbele scene switches
        if (this.#hasSceneSwitched) {
            console.log("Scene switch al in progress - genegeerd")
            return
        }
        
        console.log("=== STARTING MINIGAME 2 ===")
        this.#hasSceneSwitched = true
        this.#lastInputTime = Date.now()
        
        // Schakel naar minigame_2 scene
        engine.goToScene('minigame_2')
        console.log("Scene switch naar minigame_2 uitgevoerd")
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
            text: "🎮 WASD/Controller = Bewegen | ENTER/A = Pakken/Loslaten 🎮",
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

    // Maak de start prompt aan - aangepast voor SPACE en ENTER
    #createStartPrompt(engine) {
        this.#startLabel = new Label({
            text: "Druk SPATIE/ENTER of Controller A/B om te beginnen",
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

    // Deze functie wordt elke frame uitgevoerd - fallback input handling
    onPreUpdate(engine, delta) {
        // Fallback input handling als event listeners falen
        // Check of we recent al input hebben gehad
        const currentTime = Date.now()
        if (currentTime - this.#lastInputTime < this.#inputCooldown) {
            return
        }
        
        // Check voor SPACE en ENTER met wasPressed (fallback methode)
        const spacePressed = engine.input.keyboard.wasPressed(Keys.Space)
        const enterPressed = engine.input.keyboard.wasPressed(Keys.Enter)
        
        if (spacePressed || enterPressed) {
            const keyName = spacePressed ? 'Space' : 'Enter'
            console.log(`Fallback input gedetecteerd: ${keyName}`)
            this.#startMinigame(engine)
        }
    }

    // Wordt aangeroepen wanneer de scene actief wordt
    onActivate(context) {
        console.log("Instruction screen actief")
        // Reset scene switch status en input timing
        this.#hasSceneSwitched = false
        this.#lastInputTime = 0
    }

    // Wordt aangeroepen wanneer de scene wordt verlaten - cleanup event listeners
    onDeactivate(context) {
        console.log("Instruction screen verlaten - cleanup event listeners")
        
        // Verwijder event listeners om memory leaks te voorkomen
        if (this.#keyboardEventHandler && this.engine?.input?.keyboard) {
            this.engine.input.keyboard.off('press', this.#keyboardEventHandler)
            console.log("Keyboard event listeners verwijderd")
        }
        
        // Stop controller check interval
        if (this._controllerCheckInterval) {
            clearInterval(this._controllerCheckInterval);
        }
        
        // Reset properties
        this.#keyboardEventHandler = null
        this.#hasSceneSwitched = false
    }
}
