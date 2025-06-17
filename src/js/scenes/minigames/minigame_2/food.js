import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from '../../../resources.js'

export class Food1 extends Actor {
    // Geef aan dat dit object interactable is
    isInteractible = true

    constructor(pos) {
        super({
            pos,
            width: Resources.Food1.width,
            height: Resources.Food1.height,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Active
        })
    }

    // Deze functie wordt één keer aangeroepen wanneer het food item wordt toegevoegd
    onInitialize(engine) {
        // Zet de sprite van het food item
        this.graphics.use(Resources.Food1.toSprite())
    }
}

export class Food2 extends Actor {
    // Geef aan dat dit object interactable is
    isInteractible = true

    constructor(pos) {
        super({
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
        this.graphics.use(Resources.Food2.toSprite())
    }
}

export class Food3 extends Actor {
    // Geef aan dat dit object interactable is
    isInteractible = true

    constructor(pos) {
        super({
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
        this.graphics.use(Resources.Food3.toSprite())
    }
}