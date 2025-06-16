// actors/npc.js
import { Actor, Vector, CollisionType, Animation } from "excalibur"
import { Resources } from '../resources'

export class NPC extends Actor {
    #walkAnimation
    #isWalking = false

    constructor(pos, name) {
        super({
            pos,
            width: 32,
            height: 64,
            collisionType: CollisionType.PreventCollision
        })
        this.name = name
    }

    onInitialize(engine) {
        // Maak walking animation van spritesheet
        this.#walkAnimation = Animation.fromSpriteSheet(
            Resources.NpcSprite.toSpriteSheet(4, 4), // 4x4 grid
            [0, 1, 2, 3], // Frame indices voor walking
            100 // Snelheid in ms
        )
        
        this.graphics.add('walk', this.#walkAnimation)
        this.graphics.add('idle', Resources.NpcSprite.toSprite())
    }

    // Deze methode start het lopen naar een target positie
    walkTo(targetPos, speed = 50) {
        this.#isWalking = true
        this.graphics.use('walk')
        
        // Bereken direction vector
        const direction = targetPos.sub(this.pos).normalize()
        this.vel = direction.scale(speed)
        
        return new Promise(resolve => {
            // Check of we bij target zijn aangekomen
            const checkArrival = () => {
                if (this.pos.distance(targetPos) < 10) {
                    this.stopWalking()
                    resolve()
                } else {
                    setTimeout(checkArrival, 16) // Check elke frame
                }
            }
            checkArrival()
        })
    }

    stopWalking() {
        this.#isWalking = false
        this.vel = Vector.Zero
        this.graphics.use('idle')
    }
}