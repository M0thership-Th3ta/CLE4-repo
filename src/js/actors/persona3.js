import { Vector, Shape } from "excalibur"
import { NPC } from './npc.js'
import { Resources } from '../resources.js'

export class Persona3 extends NPC {
    constructor(pos) {
        // Geef collision radius door aan parent constructor
        super(pos, "Persona3", 40) // 40 pixels radius voor ronde collision
    }

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
}
