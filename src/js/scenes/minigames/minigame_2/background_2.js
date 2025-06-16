import { Actor, Vector } from "excalibur"
import { Resources } from '../../../resources.js'

export class Background2 extends Actor {
    constructor(){
        super()
        this.graphics.use(Resources.BG2.toSprite())
        this.anchor = Vector.Zero
        this.pos = new Vector(0, 0)
    }
}