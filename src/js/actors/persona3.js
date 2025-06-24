import { Vector, Shape } from "excalibur"
import { NPC } from './npc.js'
import { Resources } from '../resources.js'
import { DialogSystem } from '../dialog.js'
import { Shanty } from '../player/shanty/shanty.js'

export class Persona3 extends NPC {
    constructor(pos) {
        // Geef collision radius door aan parent constructor
        super(pos, "Persona3", 40) // 40 pixels radius voor ronde collision
    }

     #shanty
    #dialogSystem

    // Override de setupGraphics methode om Persona3 sprite te gebruiken
    setupGraphics() {
        // Gebruik de Persona3 resource voor de graphics en maak deze even groot als Shanty
        const sprite = Resources.Persona3.toSprite()
        const scaleX = 80 / sprite.image.width
        const scaleY = 80 / sprite.image.height
        sprite.scale = new Vector(scaleX, scaleY)
        this.graphics.use(sprite)
        // Stel een vierkante collider in van 80x80 (zoals Shanty)
        this.collider.set(Shape.Box(80, 80))
    }

    // Optioneel: eigen collision gedrag
    onCollision(evt) {
        // Log overlap met Shanty
        if (evt.other.owner && evt.other.owner.constructor && evt.other.owner.constructor.name === "Shanty") {
            console.log("Shanty overlapt met Persona3!")
        }
    }

     onPostUpdate(engine, delta) {
        // Controleer of Shanty en dialogSystem beschikbaar zijn
        if (!this.#shanty || !this.#dialogSystem) return

        // Bereken afstand tussen Persona3 en Shanty
        const distance = this.pos.distance(this.#shanty.pos)
        if (distance < 100 && !this.#dialogSystem.isDialogActive) {
       this.#dialogSystem.showDialog([
    "Shanty: Whoa. You look like you tried to hug a jet engine. What's up?",
    "Miles: Turtle emergency. Storm last night washed hatchlings onto those broken docks by the cliffs—they're stranded!",
    "Shanty: And let me guess... you want Clippy to play tightrope walker over shark bait?",
    "Miles: Just across the floating debris! He's nimble, and I'll guide him from shore. Please?"
]);
        }
    }

    // Setters om dependencies te injecteren
    setShanty(shanty) { this.#shanty = shanty }
    setDialogSystem(dialogSystem) { this.#dialogSystem = dialogSystem }
}
