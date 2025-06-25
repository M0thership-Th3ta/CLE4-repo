import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit } from "excalibur";
import { Resources } from '../../resources.js';
import { Minigame_3 } from '../minigames/minigame_3/minigame_3.js'
import { Shanty } from "../../player/shanty/shanty.js";


export class Instruction extends Scene {
    #player
    #triggerBar
    #overlapFrames = 0
    #REQUIRED_FRAMES = 120
    #START_POS = new Vector(200, 300)

    onInitialize(engine) {
        const bgWidth = engine.drawWidth * 2
        const bgHeight = engine.drawHeight * 2
        const zwartAchtergrond = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: bgWidth,
            height: bgHeight,
            collisionType: CollisionType.PreventCollision,
            anchor: new Vector(0.5, 0.5)
        })
        const sprite = Resources.Zwartachtergrond?.toSprite?.() ?? new Rectangle({ width: bgWidth, height: bgHeight, color: Color.Black })
        sprite.width = bgWidth
        sprite.height = bgHeight
        zwartAchtergrond.graphics.use(sprite)
        zwartAchtergrond.z = -100
        this.add(zwartAchtergrond)

        this.#triggerBar = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
            width: 200,
            height: 40,
            collisionType: CollisionType.Passive
        })
        this.#triggerBar.graphics.use(new Rectangle({
            width: 150,
            height: 40,
            color: Color.Red
        }))

        const terugLabel = new Label({
            text: 'START',
            pos: new Vector(-50, -13),
            color: Color.White,
            font: new Font({
                family: 'Arial',
                size: 30,
                unit: FontUnit.Px,
                color: Color.White
            })
        })
        this.#triggerBar.addChild(terugLabel)
        this.add(this.#triggerBar)

        this.#player = new Shanty(this.#START_POS.clone())
        this.add(this.#player)

        const gameOverLabel = new Label({
            text: 'Instructie',
            pos: new Vector(500, 200),
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

        const uitlegLabel = new Label({
            text: 'Breng de zeeschildpadden één voor één naar de marien bioloog zodat hij ze weer naar de zee kunnen begeleiden om ze te redden!',
            pos: new Vector(350, 300),
            font: new Font({
                family: 'Arial',
                size: 27,
                unit: FontUnit.Px,
                color: Color.White
            }),
            color: Color.White,
            anchor: new Vector(0.5, 0.5),
            maxWidth: 700
        })
        this.add(uitlegLabel)
    }

    onActivate(context) {
        if (this.#player) {
            this.#player.pos = this.#START_POS.clone()
            this.#player.vel = new Vector(0, 0)
            this.#player.acc = new Vector(0, 0)
            if (typeof this.#player.resetState === 'function') {
                this.#player.resetState()
            }
        }
        this.#overlapFrames = 0
    }

    onPostUpdate(engine, delta) {
        const isOverlapping = this.#isOverlapping(this.#player, this.#triggerBar)
        const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

        if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                engine.remove('restaurantscene_3')
                engine.add('minigame_3', new Minigame_3())
                engine.goToScene('minigame_3')

            }
        } else {
            this.#overlapFrames = 0
        }
    }

    #isOverlapping(actorA, actorB) {
        return (
            actorA.pos.x + actorA.width / 2 > actorB.pos.x - actorB.width / 2 &&
            actorA.pos.x - actorA.width / 2 < actorB.pos.x + actorB.width / 2 &&
            actorA.pos.y + actorA.height / 2 > actorB.pos.y - actorB.height / 2 &&
            actorA.pos.y - actorA.height / 2 < actorB.pos.y + actorB.height / 2
        )
    }
}
