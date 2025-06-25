import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit } from "excalibur";
import { Resources } from '../../../../resources.js';
import { Shanty } from '../../../../player/shanty/shanty.js'
import { Minigame_2 } from '../../minigame_2/minigame_2.js'


export class Minigame2FailScreen extends Scene {
    #player
    #triggerBar
    #overlapFrames = 0
    #REQUIRED_FRAMES = 60
    #START_POS = new Vector(200, 300)
    #lastMinigame = 'minigame_3'

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
            width: 200,
            height: 40,
            color: Color.Red
        }))

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

        this.#player = new Shanty(this.#START_POS.clone())
        this.add(this.#player)

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
            maxWidth: 500
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
        
        if (context && context.data && context.data.lastMinigame) {
        this.#lastMinigame = context.data.lastMinigame
    }
        this.#overlapFrames = 0
    }

    onPostUpdate(engine, delta) {
        const isOverlapping = this.#isOverlapping(this.#player, this.#triggerBar)
        const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

       if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                // Altijd minigame_2 opnieuw starten
                engine.remove('minigame_2')
                engine.add('minigame_2', new Minigame_2())
                engine.goToScene('minigame_2', { data: { lastMinigame: 'minigame_2' } })
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
