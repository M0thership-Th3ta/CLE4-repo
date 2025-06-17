// actors/npc.js
import { Actor, CollisionType, Shape } from "excalibur"
import { Resources } from '../resources'

export class NPC extends Actor {
    constructor(pos, name, collisionRadius = 40) {        super({
            pos,
            // Verwijder width en height - we gebruiken een circle collider
            collisionType: CollisionType.Passive
        })
        this.name = name
        this.collisionRadius = collisionRadius
    }

    onInitialize(engine) {
        // Stel ronde collision shape in
        this.collider.set(Shape.Circle(this.collisionRadius))
        
        // Roep setupGraphics aan die door subclasses kan worden override
        this.setupGraphics()
        
        // Setup collision events voor dialoog triggers
        this.on('collisionstart', (evt) => this.onCollision(evt))
    }

    // Deze methode moet door subclasses worden override om graphics in te stellen
    setupGraphics() {
        // Standaard geen graphics - subclasses moeten dit implementeren
        console.log(`${this.name}: setupGraphics() moet worden override door subclass`)
    }

    // Base collision handler - kan worden override door subclasses
    onCollision(evt) {
        console.log(`${this.name} collision met:`, evt.other.owner.constructor.name)
    }
}