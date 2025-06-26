import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit, None } from "excalibur";
import { Resources } from '../../resources.js';
import { Minigame_3 } from '../minigames/minigame_3/minigame_3.js'
import { Shanty } from "../../player/shanty/shanty.js";
import { InstructionBackground } from "../minigames/minigame_3/instruction_background.js";


export class Instruction extends Scene {
    #player
    #triggerBar
    #overlapFrames = 0
    #REQUIRED_FRAMES = 120
    #START_POS = new Vector(200, 300)

    onInitialize(engine) {

        const backgroundInstruction = new InstructionBackground();
        this.add(backgroundInstruction);

        this.#triggerBar = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 180),
            width: 200,
            height: 40,
            collisionType: CollisionType.Passive
        })
        this.#triggerBar.graphics.use(new Rectangle({
            width: 200,
            height: 40,
            color: Color.Transparent
        }))

        const terugLabel = new Label({
            text: 'START',
            pos: new Vector(-75, 50),
            color: Color.fromHex('#FF3333'),
            font: Resources.PressStart2P.toFont({
                size: 32,
            })
        })
        this.#triggerBar.addChild(terugLabel)
        this.add(this.#triggerBar)

        this.#player = new Shanty(this.#START_POS.clone())
        this.add(this.#player)

        const gameOverLabel = new Label({
            text: 'Instructie',
            pos: new Vector(330, 150),
            font: Resources.PressStart2P.toFont({
                size: 66,
                color: Color.fromHex('#000000'),
                unit: FontUnit.Px,
            }),
            anchor: new Vector(0.5, 0.5)
        })
        this.add(gameOverLabel)

        const uitlegLabel = new Label({
            text: 'Breng de zeeschildpadden naar',
            pos: new Vector(360, 300),
            font: Resources.PressStart2P.toFont({
                size: 20,
                color: Color.fromHex('#2B2B2B'),
                unit: FontUnit.Px,
            }),
            anchor: new Vector(0.5, 0.5),
            maxWidth: 680
        })
        this.add(uitlegLabel)

        const uitlegLabel2a = new Label({
            text: 'Spring met ',
            pos: new Vector(480, 400),
            font: Resources.PressStart2P.toFont({
                size: 20,
                color: Color.White,
                unit: FontUnit.Px,
            }),
            anchor: new Vector(0, 0.5)
        });
        this.add(uitlegLabel2a);

        const uitlegLabel2b = new Label({
            text: 'A-Knop',
            pos: new Vector(700, 400),
            font: Resources.PressStart2P.toFont({
                size: 20,
                color: Color.fromHex('#FFCC00'),
                unit: FontUnit.Px,
            }),
            anchor: new Vector(0, 0.5)
        });
        this.add(uitlegLabel2b);

        const uitlegLabel3a = new Label({
            text: 'Beweeg met ',
            pos: new Vector(480, 430),
            font: Resources.PressStart2P.toFont({
                size: 20,
                color: Color.White,
                unit: FontUnit.Px,
            }),
            anchor: new Vector(0, 0.5)
        });
        this.add(uitlegLabel3a);

        const uitlegLabel3b = new Label({
            text: 'L-Stick',
            pos: new Vector(690, 430),
            font: Resources.PressStart2P.toFont({
                size: 20,
                color: Color.fromHex('#FFCC00'),
                unit: FontUnit.Px,
            }),
            anchor: new Vector(0, 0.5)
        });
        this.add(uitlegLabel3b);

        const uitlegLabel4 = new Label({
            text: 'de marien bioloog',
            pos: new Vector(480, 330),
            font: Resources.PressStart2P.toFont({
                size: 20,
                color: Color.fromHex('#005580'),
                unit: FontUnit.Px,
            }),
            anchor: new Vector(0.5, 0.5),
            maxWidth: 680
        })
        this.add(uitlegLabel4);
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
