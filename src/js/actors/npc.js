// actors/npc.js
import { Actor, CollisionType, Shape } from "excalibur"

export class NPC extends Actor {
    constructor(pos, name, collisionRadius = 40) {
        super({
            pos,
            collisionType: CollisionType.Passive
        })
        this.name = name
        this.collisionRadius = collisionRadius
    }

    onInitialize(engine) {
        this.collider.set(Shape.Circle(this.collisionRadius))
        this.setupGraphics()
        this.on('collisionstart', (evt) => this.onCollision(evt))
    }

    setupGraphics() {
        // Standaard geen graphics - subclasses moeten dit implementeren
        console.log(`${this.name}: setupGraphics() moet worden override door subclass`)
    }

    onCollision(evt) {
        console.log(`${this.name} collision met:`, evt.other.owner.constructor.name)
    }
}