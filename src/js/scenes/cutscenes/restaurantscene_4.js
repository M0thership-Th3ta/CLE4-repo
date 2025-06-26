import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit } from "excalibur";
import { Resources } from '../../resources.js';
import { Shanty } from '../../player/shanty/shanty.js';

export class Restaurantscene_4 extends Scene {
    #shanty
    #triggerBar
    #overlapFrames = 0
    #REQUIRED_FRAMES = 60 // 1 seconde bij 60fps

    onInitialize(engine) {
        // Zwarte achtergrond (extra breed en hoog voor volledige dekking)
        const bgWidth = engine.drawWidth * 2
        const bgHeight = engine.drawHeight * 2
        const zwartAchtergrond = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: bgWidth,
            height: bgHeight,
            collisionType: CollisionType.PreventCollision,
            anchor: new Vector(0.5, 0.5)
        })
        const sprite = Resources.Zwartachtergrond.toSprite()
        sprite.width = bgWidth
        sprite.height = bgHeight
        zwartAchtergrond.graphics.use(sprite)
        zwartAchtergrond.z = -100 // Zorg dat de achtergrond altijd achter alles staat
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
            color: Color.Green
        }))
        // Label toevoegen
        const levelLabel = new Label({
            text: 'Terug naar het begin',
            pos: new Vector(-89, -5), // 80px naar links binnen de triggerbalk
            // color: Color.White,
            // font: new Font({
            //     family: 'Arial',
            //     size: 20,
            //     unit: FontUnit.Px,
            //     color: Color.White
            // })
            font: Resources.PressStart2P.toFont({
                size: 9,
                color: Color.fromHex('#00008B'),
                unit: FontUnit.Px,
            }),
        })
        this.#triggerBar.addChild(levelLabel)
        this.add(this.#triggerBar)

        // Shanty toevoegen
        this.#shanty = new Shanty(new Vector(200, 300))
        this.add(this.#shanty)

        // Hoofdtekst: HET EINDE
        const eindLabel = new Label({
            text: 'HET EINDE',
            pos: new Vector(engine.halfDrawWidth - 200, engine.halfDrawHeight - 60), // 250px naar links
            // font: new Font({
            //     family: 'Arial',
            //     size: 64,
            //     unit: FontUnit.Px,
            //     color: Color.White,
            //     bold: true
            // }),
            font: Resources.PressStart2P.toFont({
                size: 45,
                color: Color.White,
                unit: FontUnit.Px,
            }),
            color: Color.White,
            anchor: new Vector(0.5, 0.5)
        })
        this.add(eindLabel)

        // Subtekst: dankje wel voor het spelen, ik hoop dat je iets hebt geleerd
        const dankLabel = new Label({
            text: 'Dank je wel voor het spelen, ik hoop dat je iets hebt geleerd',
            pos: new Vector(engine.halfDrawWidth - 250, engine.halfDrawHeight + 30), // 250px naar links
            // font: new Font({
            //     family: 'Arial',
            //     size: 28,
            //     unit: FontUnit.Px,
            //     color: Color.White
            // }),
            font: Resources.PressStart2P.toFont({
                size: 15,
                color: Color.White,
                unit: FontUnit.Px,
            }),
            color: Color.White,
            anchor: new Vector(0.5, 0.5),
            maxWidth: 560
        })
        this.add(dankLabel)
    }

    onPostUpdate(engine, delta) {
        // Check overlap met triggerbalk via bounding box
        const isOverlapping = this.#isOverlapping(this.#shanty, this.#triggerBar)
        const isStandingStill = Math.abs(this.#shanty.vel.x) < 1 && Math.abs(this.#shanty.vel.y) < 1

        if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {

                // engine.goToScene('startscene');
                window.location.reload();
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
