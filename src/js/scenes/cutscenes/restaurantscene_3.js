import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit } from "excalibur";
import { Resources } from '../../resources.js';
import { Shanty } from '../../player/shanty/shanty.js';
import { Persona3 } from '../../actors/persona3.js';

export class Restaurantscene_3 extends Scene {
    #shanty
    #triggerBar
    #persona3
    #overlapFrames = 0
    #REQUIRED_FRAMES = 60 // 1 seconde bij 60fps

    onInitialize(engine) {
        // Achtergrond
        const restaurantBackground = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            width: engine.drawWidth,
            height: engine.drawHeight,
            collisionType: CollisionType.PreventCollision
        })
        restaurantBackground.graphics.use(Resources.RestaurantLayout.toSprite())
        this.add(restaurantBackground)

        // Voeg witte triggerbalk toe onderaan
        this.#triggerBar = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
            width: 200,
            height: 40,
            collisionType: CollisionType.Passive
        })
        this.#triggerBar.graphics.use(new Rectangle({
            width: 200,
            height: 40,
            color: Color.Green // Maak het balkje groen
        }))
        // Voeg Level 2 label toe
        const levelLabel = new Label({
            text: 'Level 2',
            pos: new Vector(-80, -10), // 80px naar links binnen de triggerbalk
            color: Color.Black,
            font: new Font({
                family: 'Arial',
                size: 24,
                unit: FontUnit.Px,
                color: Color.Black
            })
        })
        this.#triggerBar.addChild(levelLabel)
        this.add(this.#triggerBar)

        // Voeg Persona3 toe op vaste plek
        this.#persona3 = new Persona3(new Vector(600, 350))
        this.add(this.#persona3)

        // Voeg Shanty toe NA het balkje zodat ze er visueel overheen loopt
        this.#shanty = new Shanty(new Vector(200, 300))
        this.add(this.#shanty)
    }

    onPostUpdate(engine, delta) {
        // Check overlap met triggerbalk via bounding box
        const isOverlapping = this.#isOverlapping(this.#shanty, this.#triggerBar)
        const isStandingStill = Math.abs(this.#shanty.vel.x) < 1 && Math.abs(this.#shanty.vel.y) < 1

        if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                engine.goToScene('minigame_3')
            }
        } else {
            this.#overlapFrames = 0
        }
    }

    // Simpele AABB overlap check
    #isOverlapping(actorA, actorB) {
        return (
            actorA.pos.x + actorA.width / 2 > actorB.pos.x - actorB.width / 2 &&
            actorA.pos.x - actorA.width / 2 < actorB.pos.x + actorB.width / 2 &&
            actorA.pos.y + actorA.height / 2 > actorB.pos.y - actorB.height / 2 &&
            actorA.pos.y - actorA.height / 2 < actorB.pos.y + actorB.height / 2
        )
    }
}
