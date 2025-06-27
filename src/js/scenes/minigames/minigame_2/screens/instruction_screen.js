import { Scene, Label, Vector, Color, Font, FontUnit, Keys, TextAlign } from "excalibur"
import { Resources } from "../../../../resources"
import { BackgroundMinigame2 } from "../background_minigame_2"

export class InstructionScreen extends Scene {
    #titleLabel
    #instructionLabels = []
    #controlsLabel
    #startLabel
    #backgroundRect
    
    // Properties voor robuuste input handling
    #keyboardEventHandler = null
    #hasSceneSwitched = false
    #lastInputTime = 0
    #inputCooldown = 200 // Milliseconden cooldown tussen inputs

    constructor() {
        super()
    }    // Deze functie wordt aangeroepen wanneer de scene wordt geïnitialiseerd
    onInitialize(engine) {
        // Voeg een achtergrondkleur toe voor betere leesbaarheid
        // this.backgroundColor = Color.fromRGB(30, 144, 255, 0.9) // Nice blue background
        const backgroundminigame2 = new BackgroundMinigame2()
        this.add(backgroundminigame2)

        // Initialiseer button state tracking voor controller
        this.aButtonWasPressed = false;
        this.bButtonWasPressed = false;
        
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
        
        console.log("Instruction screen geïnitialiseerd met verbeterde layout")
    }// Setup van robuuste input handling met event listeners
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
        
        // Registreer event listeners voor keyboard input
        engine.input.keyboard.on('press', this.#keyboardEventHandler)
        console.log("Event listeners geregistreerd voor keyboard input")
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
    }    // Maak de hoofdtitel aan
    #createTitle(engine) {
        this.#titleLabel = new Label({
            text: "Help in de snackbar!",
            pos: new Vector(280, 80),
            // color: Color.Yellow,
            font: Resources.PressStart2P.toFont({
                size: 40,
                color: Color.fromHex('#FFCF4A'),
                unit: FontUnit.Px,
            }),
        })
        this.add(this.#titleLabel)
    }    // Maak de instructie teksten aan
    #createInstructions(engine) {
        const instructions = [
            "🍴 Je gaat Zhiwen helpen in de snackbar!",
            "📋 Rechts bovenin staat de bestelling", 
            "🎮 Houdt A ingedrukt om producten op te pakken",
            "🚚 Sleep de producten naar de klant",
            "⌛ Je hebt 60 seconden de tijd!"
        ]

        // Bereken centrale positie voor instructies
        const startY = engine.halfDrawHeight - 160
        const lineSpacing = 60

        instructions.forEach((instruction, index) => {
            const label = new Label({
                text: instruction,
                pos: new Vector(300, startY + (index * lineSpacing)),
                // color: Color.White,
                font: Resources.PressStart2P.toFont({
                size: 15,
                color: Color.White,
                unit: FontUnit.Px,
            }),
            maxWidth: 700

            })
            
            this.#instructionLabels.push(label)
            this.add(label)
        })
    }    // Maak de controls uitleg aan
    #createControls(engine) {
        this.#controlsLabel = new Label({
            text: "🎮 L-Stick = Bewegen | A-knop = Pakken/Loslaten 🎮",
            pos: new Vector(310, 500),
            // color: Color.Cyan,
            font: Resources.PressStart2P.toFont({
                size: 14,
                color: Color.fromHex('#00008B'),
                unit: FontUnit.Px,
            }),
        })
        this.add(this.#controlsLabel)
    }    // Maak de start prompt aan - alleen controller input
    #createStartPrompt(engine) {
        this.#startLabel = new Label({
            text: "Druk Controller A of B om te beginnen",
            pos: new Vector(380, 550),
            // color: Color.Green,
            font: Resources.PressStart2P.toFont({
                size: 14,
                color: Color.fromHex('#006400'),
                unit: FontUnit.Px,
            }),
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
    }    // Wordt aangeroepen wanneer de scene actief wordt
    onActivate(context) {
        console.log("Instruction screen actief")
        // Reset scene switch status en input timing
        this.#hasSceneSwitched = false
        this.#lastInputTime = 0
        // Reset button states
        this.aButtonWasPressed = false
        this.bButtonWasPressed = false
    }    // Wordt aangeroepen wanneer de scene wordt verlaten - cleanup event listeners
    onDeactivate(context) {
        console.log("Instruction screen verlaten - cleanup event listeners")
        
        // Verwijder event listeners om memory leaks te voorkomen
        if (this.#keyboardEventHandler && this.engine?.input?.keyboard) {
            this.engine.input.keyboard.off('press', this.#keyboardEventHandler)
            console.log("Keyboard event listeners verwijderd")
        }
        
        // Reset properties en button states
        this.#keyboardEventHandler = null
        this.#hasSceneSwitched = false
        this.aButtonWasPressed = false
        this.bButtonWasPressed = false
    }

    // Controller input check elke frame - de juiste Excalibur manier
    update(engine, delta) {
        super.update(engine, delta);

        // Controller input met edge detection
        if (!this.#hasSceneSwitched) {
            const currentTime = Date.now();
            if (currentTime - this.#lastInputTime < this.#inputCooldown) {
                return;
            }
            
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            for (const gamepad of gamepads) {
                if (!gamepad) continue;
                
                // A knop (index 0) edge detection voor starten
                if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
                    if (!this.aButtonWasPressed) {
                        this.aButtonWasPressed = true;
                        console.log("Controller A button gedetecteerd");
                        this.#startMinigame(engine);
                    }
                } else {
                    this.aButtonWasPressed = false;
                }
                
                // B knop (index 1) edge detection als alternatief
                if (gamepad.buttons[1] && gamepad.buttons[1].pressed) {
                    if (!this.bButtonWasPressed) {
                        this.bButtonWasPressed = true;
                        console.log("Controller B button gedetecteerd");
                        this.#startMinigame(engine);
                    }
                } else {
                    this.bButtonWasPressed = false;
                }
            }
        }
    }
}
