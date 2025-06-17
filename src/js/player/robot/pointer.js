import { Actor, CollisionType } from "excalibur"

export class Pointer extends Actor {
    constructor(){
        super({
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive
        })
    }
}