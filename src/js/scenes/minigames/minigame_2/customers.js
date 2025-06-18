import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from '../../../resources.js'

export class Customer extends Actor {
    sprite

    constructor(pos, sprite) {
        super({
            pos,
            width: sprite.width,
            height: sprite.height,
            scale: new Vector(0.75, 0.75),
            collisionType: CollisionType.Passive
        })
        this.sprite = sprite
    }

    // Deze functie wordt één keer aangeroepen wanneer de klant wordt toegevoegd
    onInitialize(engine) {
        // Zet de sprite van de klant
        this.graphics.use(this.sprite.toSprite())
    }
}