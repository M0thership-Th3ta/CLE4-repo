import { Actor, CollisionType, clamp, Keys, Vector } from "excalibur"
import { Resources } from "../../resources.js"

export class Pointer extends Actor {
    #heldItem = null
    #speed = 300
    #isHolding = false

    constructor(pos) {
        super({
            pos,
            width: 32,
            height: 32,
            collisionType: CollisionType.Passive
        })
    }

    // Deze functie wordt één keer aangeroepen wanneer de pointer wordt toegevoegd
    onInitialize(engine) {
        // Setup graphics en collision
        this.graphics.use(Resources.Pointer.toSprite())
        this.z = 1000

        // Initialiseer button state tracking voor controller
        this.aButtonWasPressed = false

        // Event listeners voor toetsenbord
        engine.input.keyboard.on('hold', (evt) => {
            if (evt.key === Keys.Enter) {
                this.#isHolding = true
            }
        })
        engine.input.keyboard.on('release', (evt) => {
            if (evt.key === Keys.Enter) {
                this.#isHolding = false
                this.dropItem()
            }
        })
    }    // Per-frame logica voor beweging en item vasthouden
    onPostUpdate(engine, delta) {
        let xspeed = 0
        let yspeed = 0

        // WASD besturing
        if (engine.input.keyboard.isHeld(Keys.A)) xspeed = -this.#speed
        if (engine.input.keyboard.isHeld(Keys.D)) xspeed = this.#speed
        if (engine.input.keyboard.isHeld(Keys.W)) yspeed = -this.#speed
        if (engine.input.keyboard.isHeld(Keys.S)) yspeed = this.#speed

        // Controller besturing - check elke frame
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (const gamepad of gamepads) {
            if (!gamepad) continue;
            
            // Linker stick beweging (deadzone van 0.2)
            const leftStickX = gamepad.axes[0] || 0;
            const leftStickY = gamepad.axes[1] || 0;
            
            if (Math.abs(leftStickX) > 0.2) {
                xspeed = leftStickX * this.#speed;
            }
            if (Math.abs(leftStickY) > 0.2) {
                yspeed = leftStickY * this.#speed;
            }
              // A knop (index 0) voor pakken/loslaten - MET RELEASE DETECTION
            if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
                // Knop is ingedrukt - start holding (zoals keyboard hold)
                if (!this.aButtonWasPressed) {
                    this.aButtonWasPressed = true;
                    this.#isHolding = true;
                }
            } else {
                // Knop is losgelaten - stop holding en drop item (zoals keyboard release)
                if (this.aButtonWasPressed) {
                    this.aButtonWasPressed = false;
                    this.#isHolding = false;
                    this.dropItem();
                }
            }
        }

        this.vel = new Vector(xspeed, yspeed)

        // Beweging beperken tot scherm
        this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2)
        this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2)

        // Als we een item vasthouden, beweegt het mee met de pointer
        if (this.#heldItem) {
            this.#heldItem.pos.x = this.pos.x
            this.#heldItem.pos.y = this.pos.y
        }

        // Check handmatig op overlap met food items als Enter wordt vastgehouden en er nog geen item wordt vastgehouden
        if (this.#isHolding && !this.#heldItem) {
            // Zoek alle actors in de scene die isInteractible zijn
            const interactibles = engine.currentScene.actors.filter(
                actor => actor.isInteractible === true && actor !== this
            )
            for (const item of interactibles) {
                if (this.collidesWith(item)) {
                    this.pickUpItem(item)
                    break
                }
            }
        }
    }    // Controleer overlap tussen twee actors (AABB) - rekening houdend met scale
    collidesWith(other) {
        const otherWidth = (other.width || 32) * (other.scale?.x || 1)
        const otherHeight = (other.height || 32) * (other.scale?.y || 1)
        
        return (
            this.pos.x + this.width / 2 > other.pos.x - otherWidth / 2 &&
            this.pos.x - this.width / 2 < other.pos.x + otherWidth / 2 &&
            this.pos.y + this.height / 2 > other.pos.y - otherHeight / 2 &&
            this.pos.y - this.height / 2 < other.pos.y + otherHeight / 2
        )    }
    
    // Pak een item op
    pickUpItem(item) {
        if (this.#heldItem) return
        
        // Zet het item als vastgehouden
        // Controleer of het item een clone-methode heeft
        if (typeof item.clone === 'function') {
            // Maak een duplicaat via de clone-methode
            this.#heldItem = item.clone()
            this.#heldItem.pos = this.pos.clone()
            this.#heldItem.z = 100

            this.scene.add(this.#heldItem)
        }

        this.#heldItem.collisionType = CollisionType.PreventCollision
        this.#heldItem.z = this.z - 1
    }

    // Laat het item los
    dropItem() {
        if (this.#heldItem) {
            this.#heldItem.collisionType = CollisionType.Active
            this.#heldItem.kill()
            this.#heldItem = null
        }
    }
}