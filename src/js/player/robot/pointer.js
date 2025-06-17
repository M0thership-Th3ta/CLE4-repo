import { Actor, CollisionType, clamp, Keys, Vector } from "excalibur"
import { Resources } from "../../resources.js"

export class Pointer extends Actor {
    #heldItem = null
    #speed = 250
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
    }

    // Per-frame logica voor beweging en item vasthouden
    onPostUpdate(engine, delta) {
        let xspeed = 0
        let yspeed = 0

        // WASD besturing
        if (engine.input.keyboard.isHeld(Keys.A)) xspeed = -this.#speed
        if (engine.input.keyboard.isHeld(Keys.D)) xspeed = this.#speed
        if (engine.input.keyboard.isHeld(Keys.W)) yspeed = -this.#speed
        if (engine.input.keyboard.isHeld(Keys.S)) yspeed = this.#speed

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
    }

    // Controleer overlap tussen twee actors (AABB)
    collidesWith(other) {
        return (
            this.pos.x + this.width / 2 > other.pos.x - other.width / 2 &&
            this.pos.x - this.width / 2 < other.pos.x + other.width / 2 &&
            this.pos.y + this.height / 2 > other.pos.y - other.height / 2 &&
            this.pos.y - this.height / 2 < other.pos.y + other.height / 2
        )
    }

    // Pak een item op
    pickUpItem(item) {
        // Zet het item als vastgehouden
        this.#heldItem = item
        item.collisionType = CollisionType.PreventCollision
    }

    // Laat het item los
    dropItem() {
        if (this.#heldItem) {
            this.#heldItem.collisionType = CollisionType.Active
            this.#heldItem = null
        }
    }
}