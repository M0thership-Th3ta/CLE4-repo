import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from '../../../../resources.js'

export class Food extends Actor {
    // Expliciete property declaraties voor duidelijkheid
    isInteractible = true
    foodId
    sprite
    customScale

    constructor(pos, sprite, foodId, customScale = 0.5) {
        super({
            pos,
            width: sprite.width,
            height: sprite.height,
            scale: new Vector(customScale, customScale),
            collisionType: CollisionType.Passive
        })
        
        // Eigenschappen toekennen
        this.sprite = sprite
        this.foodId = foodId
        this.customScale = customScale
    }

    // Deze functie wordt één keer aangeroepen wanneer het food item wordt toegevoegd
    onInitialize(engine) {
        // Zet de sprite van het food item
        this.graphics.use(this.sprite.toSprite())
    }

    // Maak een nieuwe instantie met dezelfde eigenschappen
    clone() {
        return new Food(this.pos.clone(), this.sprite, this.foodId, this.customScale)
    }

    // Static factory method als alternatief voor clone
    static fromFood(food) {
        return new Food(food.pos.clone(), food.sprite, food.foodId, food.customScale)
    }
}
