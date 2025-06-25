import { Scene, Actor, Vector, CollisionType, Rectangle, Color } from 'excalibur'
import { Resources } from '../../resources.js'

// Exporteer de juiste scene class zodat deze gebruikt kan worden in andere modules
export class TestScene extends Scene {
    #player
    #worldMapTrigger
    #overlapFrames = 0
    #REQUIRED_FRAMES = 60 // 1 seconde bij 60fps

    // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
    onInitialize(engine) {
        // Maak speler aan en voeg toe aan scene
        this.#player = new Actor({
            name: 'player',
            pos: new Vector(engine.halfDrawWidth, 200),
            width: 32,
            height: 32,
            collisionType: CollisionType.Passive
        })
        this.#player.graphics.use(Resources.Persona1.toSprite())
        this.add(this.#player)

        // Maak triggerblok aan en voeg toe aan scene
        this.#worldMapTrigger = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
            width: 120,
            height: 40,
            collisionType: CollisionType.Passive
        })
        this.#worldMapTrigger.graphics.use(new Rectangle({
            width: 120,
            height: 40,
            color: Color.White
        }))
        this.add(this.#worldMapTrigger)
    }

    // Deze functie wordt elke frame aangeroepen
    onPostUpdate(engine, delta) {
        // Check overlap met triggerblok via bounding box
        if (this.#player && this.#worldMapTrigger) {
            const isOverlapping = this.#isOverlapping(this.#player, this.#worldMapTrigger)
            // Controleer of speler stilstaat
            const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

            if (isOverlapping && isStandingStill) {
                this.#overlapFrames++
                // Ga naar worldmap als speler 1 seconde stilstaat op het blok
                if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                    // Speel correct answer geluid af
                    Resources.CorrectAnswer.play()
                    engine.goToScene('worldmap')
                }
            } else {
                this.#overlapFrames = 0
            }
        }
    }

    // Simpele AABB overlap check
    #isOverlapping(actorA, actorB) {
        // Controleer of beide actors bestaan
        if (!actorA || !actorB) return false
        return (
            actorA.pos.x + actorA.width / 2 > actorB.pos.x - actorB.width / 2 &&
            actorA.pos.x - actorA.width / 2 < actorB.pos.x + actorB.width / 2 &&
            actorA.pos.y + actorA.height / 2 > actorB.pos.y - actorB.height / 2 &&
            actorA.pos.y - actorA.height / 2 < actorB.pos.y + actorB.height / 2
        )
    }
}