import { Actor } from "excalibur"

export class Mouse extends Actor {
    constructor(){
        super()
        this.pos.x = 0
        this.pos.y = 0
        this.events.on("pointermove", (e) => this.mouseMove(e))
    }
    mouseMove(e) {
        console.log("Mouse moved!")
        console.log(e.worldPos.x, e.worldPos.y)
        this.pos.x = e.worldPos.x
        this.pos.y = e.worldPos.y
    }

}