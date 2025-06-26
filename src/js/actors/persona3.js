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
        const scaleX = 150 / sprite.image.width
        const scaleY = 150 / sprite.image.height
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
                "Shanty: Wow. Je ziet eruit alsof je de zon hebt proberen te knuffelen. Wat is er gebeurd?",
                "Miles: Schildpadden-noodgeval. Door het nieuwe resort is een deel van het strand afgesloten!",
                "Miles: Daardoor zijn er schildpadden gestrand aan de rotskant van het strand.",
                "Miles: Ik moet ze terug naar het water brengen.",
                "Shanty: Kan ik ergens mee helpen?",
                "Miles: Ik moet over het drijvende puin heen, maar ik ben niet zo lenig.",
                "Miles: Misschien kan jouw kleine robot helpen om over het drijvende puin te komen! Hij is wendbaar, en ik begeleid hem vanaf de kant. Alsjeblieft?"
            ]);
        }
    }

    // Setters om dependencies te injecteren
    setShanty(shanty) { this.#shanty = shanty }
    setDialogSystem(dialogSystem) { this.#dialogSystem = dialogSystem }
}
