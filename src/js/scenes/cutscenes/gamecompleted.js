import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit } from "excalibur";
import { Resources } from '../../resources.js';
import { Shanty } from '../../player/shanty/shanty.js'
import { Restaurant } from '../locations/restaurant.js'

// Deze scene wordt getoond als de speler verliest in minigame 3
export class GameCompletedScene extends Scene {
    #player
    #triggerBar
    #overlapFrames = 0
    #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps
    #START_POS = new Vector(200, 300) // Startpositie van Shanty

    onInitialize(engine) {
        // Zwarte achtergrond met sprite
        const bgWidth = engine.drawWidth * 2
        const bgHeight = engine.drawHeight * 2
        const zwartAchtergrond = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: bgWidth,
            height: bgHeight,
            collisionType: CollisionType.PreventCollision,
            anchor: new Vector(0.5, 0.5)
        })
        // Gebruik zwartachtergrond.png als sprite
        const sprite = Resources.Zwartachtergrond?.toSprite?.() ?? new Rectangle({width: bgWidth, height: bgHeight, color: Color.Black})
        sprite.width = bgWidth
        sprite.height = bgHeight
        zwartAchtergrond.graphics.use(sprite)
        zwartAchtergrond.z = -100
        this.add(zwartAchtergrond)

        // Triggerbalk onderaan
        this.#triggerBar = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
            width: 200,
            height: 40,
            collisionType: CollisionType.Passive
        })
        this.#triggerBar.graphics.use(new Rectangle({
            width: 200,
            height: 40,
            color: Color.Red
        }))
        // Label toevoegen
        const terugLabel = new Label({
            text: 'Het restaurant',
            pos: new Vector(-89, -10),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size:28,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.#triggerBar.addChild(terugLabel)
        this.add(this.#triggerBar)

        // Shanty toevoegen
        this.#player = new Shanty(this.#START_POS.clone())
        this.add(this.#player)

        // Hoofdtekst: GAME OVER
        const gameCompletedLabel = new Label({
            text: 'GAME COMPLETED',
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight - 40),
            font: new Font({
                family: 'Arial',
                size: 64,
                unit: FontUnit.Px,
                color: Color.White,
                bold: true
            }),
            color: Color.White,
            anchor: new Vector(0.5, 0.5)
        })
        this.add(gameCompletedLabel)

        // Subtekst: zelfde breedte als restaurantscene_4
        const uitlegLabel = new Label({
            text: 'Je hebt alle zeeschildpadden geredt!   Ga terug naar het restaurant.',
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight + 30),
            font: new Font({
                family: 'Arial',
                size: 28,
                unit: FontUnit.Px,
                color: Color.White
            }),
            color: Color.White,
            anchor: new Vector(0.5, 0.5),
            maxWidth: 500 // Zelfde breedte als in restaurantscene_4
        })
        this.add(uitlegLabel)
    }

    onActivate(context) {
        // Zet Shanty altijd terug op haar originele startpositie
        if (this.#player) {
            this.#player.pos = this.#START_POS.clone()
            this.#player.vel = new Vector(0, 0)
            this.#player.acc = new Vector(0, 0)
            if (typeof this.#player.resetState === 'function') {
                // Optioneel: als Shanty een eigen resetState heeft
                this.#player.resetState()
            }
        }
        this.#overlapFrames = 0
    }

    onPostUpdate(engine, delta) {
        // Check overlap met triggerbalk via bounding box
        const isOverlapping = this.#isOverlapping(this.#player, this.#triggerBar)
        const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

        if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                // Verwijder eerst de oude scene volledig voordat je een nieuwe toevoegt
                engine.remove('minigame_3');
                engine.add('restaurant', new Restaurant());
                engine.goToScene('restaurant');
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
