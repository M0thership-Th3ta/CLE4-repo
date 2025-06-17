import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from '../../../resources.js'

export class Food extends Actor {
    // Geef aan dat dit object interactable is
    isInteractible = true

    constructor(pos, resource) {
        super({
            resource,
            pos,
            width: 32,
            height: 32,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Active
        })
    }

    // Deze functie wordt één keer aangeroepen wanneer het food item wordt toegevoegd
    onInitialize(engine) {
        // Zet de sprite van het food item
        this.graphics.use(this.resource.toSprite())
    }
}