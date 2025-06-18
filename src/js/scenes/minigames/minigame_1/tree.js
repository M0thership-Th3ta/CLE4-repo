import { Actor, Vector, CollisionType } from "excalibur"

// Klasse voor de boom in het fruitspel
export class Tree extends Actor {
    constructor(pos) {
        super({
            pos,
            width: 64,
            height: 128,
            collisionType: CollisionType.Fixed
        })
        
        this.fruits = [];
    }

    onInitialize(engine) {
        // Hier kan je een sprite toevoegen als je die hebt
        // this.graphics.use(Resources.Tree.toSprite())
    }
    
    /**
     * Geef alle fruit objecten terug
     */
    getFruits() {
        return this.fruits;
    }
    
    /**
     * Voeg fruit toe aan de boom
     */
    addFruit(fruit) {
        this.fruits.push(fruit);
    }
}
