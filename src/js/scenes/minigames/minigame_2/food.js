import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from '../../../resources.js'

export class Food extends Actor {
    sprite
    isInteractible = true

    constructor(pos, sprite) {
        super({
            pos,
            width: sprite.width,
            height: sprite.height,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Passive
        })
        this.sprite = sprite
    }

    // Deze functie wordt één keer aangeroepen wanneer het food item wordt toegevoegd
    onInitialize(engine) {
        // Zet de sprite van het food item
        this.graphics.use(this.sprite.toSprite())
    }

    clone() {
        // Maak een nieuwe instantie met dezelfde eigenschappen
        const copy = new Food(this.pos.clone(), this.sprite)
        // Kopieer hier eventueel meer eigenschappen indien nodig
        return copy
    }
}