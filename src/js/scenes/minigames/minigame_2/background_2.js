import { Actor, Vector, Sprite } from "excalibur"
import { Resources } from '../../../resources.js'

export class Background2 extends Actor {
    #sprite

    onInitialize(engine){
        this.#sprite = new Sprite({
            image: Resources.BG2,
            sourceView: { x: 0, y: 0, width: engine.drawWidth, height: engine.drawWidth }
        })
        this.anchor = Vector.Zero
        this.graphics.use(this.#sprite)
    }
}