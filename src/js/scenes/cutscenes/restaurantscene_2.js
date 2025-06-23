import { Actor, Scene, Vector, CollisionType, Color, Rectangle, clamp, Keys, Label, Font, FontUnit } from "excalibur";
import { Resources } from '../../resources.js';
import { Shanty } from '../../player/shanty/shanty.js';
import { Persona2 } from '../../actors/persona2.js';
import { DialogSystem } from '../../dialog.js'

export class Restaurantscene_2 extends Scene {
    #shanty
    #triggerBar
    #persona2
    #overlapFrames = 0
    #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps
    #dialogSystem
    #hasTalkedToPersona2 = false

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
        // Voeg Level 1 label toe
        const levelLabel = new Label({
            text: 'Level 1',
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

        // Voeg Persona2 toe op vaste plek
        this.#persona2 = new Persona2(new Vector(600, 350))
        this.add(this.#persona2)

        // Voeg Shanty toe NA het balkje zodat ze er visueel overheen loopt
        this.#shanty = new Shanty(new Vector(200, 300))
        this.add(this.#shanty)

        //////////////////////////////////////////////////////Maak dialogSystem aan en voeg toe aan scene
        this.#dialogSystem = new DialogSystem(engine)
        this.add(this.#dialogSystem.dialogBox)
        this.add(this.#dialogSystem.textActor)

        /////////////////////////////////////////////////////// Voeg event listener toe voor dialog input
        engine.input.keyboard.on('press', (evt) => {
            if ((evt.key === Keys.Z || evt.key === Keys.Space) && this.#dialogSystem.isDialogActive) {
                this.#dialogSystem.nextLine()
                console.log("Next dialog line")
            }
        })
    }

    onPostUpdate(engine, delta) {
        // Check overlap met triggerbalk via bounding box
        const isOverlapping = this.#isOverlapping(this.#shanty, this.#triggerBar)
        const isStandingStill = Math.abs(this.#shanty.vel.x) < 1 && Math.abs(this.#shanty.vel.y) < 1

        if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                engine.goToScene('minigame_2_instruction')
            }
        } else {
            this.#overlapFrames = 0
        }

        /////////////////////////////////////////////////////////// Check of Shanty dicht bij Persona2 is
        const distance = this.#shanty.pos.distance(this.#persona2.pos)
        if (distance < 100 && !this.#dialogSystem.isDialogActive) {
            this.#dialogSystem.showDialog([
                "Welkom in het restaurant!",
                "Praat met de chef voor je eerste opdracht."
            ])
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
