import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit } from "excalibur";
import { Resources } from '../../resources.js';
import { Player } from '../../player/robot/player.js';
import { Shanty } from '../../player/shanty/shanty.js'
import { Minigame_3 } from '../minigames/minigame_3/minigame_3.js'

// Deze scene wordt getoond als de speler verliest in minigame 3
export class GameOverScene extends Scene {
    #player
    #triggerBar
    #overlapFrames = 0
    #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

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
            text: 'Opnieuw proberen',
            pos: new Vector(-89, -10),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 20,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.#triggerBar.addChild(terugLabel)
        this.add(this.#triggerBar)

        // Shanty toevoegen
        this.#player = new Shanty(new Vector(200, 300))
        this.add(this.#player)

        // Hoofdtekst: GAME OVER
        const gameOverLabel = new Label({
            text: 'GAME OVER',
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
        this.add(gameOverLabel)

        // Subtekst: zelfde breedte als restaurantscene_4
        const uitlegLabel = new Label({
            text: 'Je hebt verloren! Ga naar de rode balk om opnieuw te proberen.',
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

    onPostUpdate(engine, delta) {
        // Check overlap met triggerbalk via bounding box
        const isOverlapping = this.#isOverlapping(this.#player, this.#triggerBar)
        const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

        if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                // Verwijder eerst de oude scene volledig voordat je een nieuwe toevoegt
                engine.remove('minigame_3');
                engine.add('minigame_3', new Minigame_3());
                engine.goToScene('minigame_3');
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
