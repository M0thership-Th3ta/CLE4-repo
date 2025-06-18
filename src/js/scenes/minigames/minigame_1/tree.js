import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from "../../../resources.js"

// Klasse voor de boom in het fruitspel
export class Tree extends Actor {    constructor(pos) {
        super({
            pos,
            width: 200,
            height: 300
        })
        
        this.fruits = [];
    }

    onInitialize(engine) {
        // Voeg tree sprite toe en maak deze 6x groter
        const sprite = Resources.Tree.toSprite();
        sprite.scale = new Vector(6, 6); // Maak 6x groter
        this.graphics.use(sprite);
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
