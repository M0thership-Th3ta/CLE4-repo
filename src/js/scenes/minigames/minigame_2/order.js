import { Actor, Engine, Vector, CollisionType, Keys, Shape, RotationType } from "excalibur"
import { Resources } from '../../../resources.js'

export class Order {
    #orderArray = []
    
    constructor() {
        // Willekeurig aantal items (1-3)
        const arrayLength = Math.floor(Math.random() * 3) + 1
        
        // Vul array met random getallen tussen 1-5
        for(let i = 0; i < arrayLength; i++) {
            const randomNumber = Math.floor(Math.random() * 5) + 1
            this.#orderArray.push(randomNumber)
        }
    }

    // Getter voor de order array
    getOrder() {
        return this.#orderArray
    }
}