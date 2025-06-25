import { Actor, Scene, Vector, CollisionType, Color, Rectangle, Label, Font, FontUnit, Keys } from "excalibur";
import { Resources } from '../../resources.js';
import { Shanty } from '../../player/shanty/shanty.js';
import { Persona3 } from '../../actors/persona3.js';
import { DialogSystem } from '../../dialog.js';

export class Restaurantscene_3 extends Scene {    #shanty
    #triggerBar
    #persona3
    #overlapFrames = 0
    #REQUIRED_FRAMES = 60 // 1 seconde bij 60fps
    #dialogKeyHandler

    onInitialize(engine) {
        // Initialiseer button state tracking voor controller
        this.aButtonWasPressed = false;
        this.bButtonWasPressed = false;
        
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

        //////////////////////////////////////////////// Maak dialogSystem aan en voeg toe aan scene
        this.dialogSystem = new DialogSystem(engine)
        this.add(this.dialogSystem.dialogBox)
        this.add(this.dialogSystem.textActor)

        // Koppel shanty en dialogSystem aan persona3
        if (this.#persona3.setShanty && this.#persona3.setDialogSystem) {
            this.#persona3.setShanty(this.#shanty)
            this.#persona3.setDialogSystem(this.dialogSystem)
        }        //////////////////////////////////// Sla de handler op zodat we hem later kunnen verwijderen
        this.#dialogKeyHandler = (evt) => {
            if ((evt.key === Keys.Z || evt.key === Keys.Space) && this.dialogSystem.isDialogActive) {
                this.dialogSystem.nextLine()
                console.log("Next dialog line")
            }
        }
        engine.input.keyboard.on('press', this.#dialogKeyHandler)
    }    update(engine, delta) {
        super.update(engine, delta);

        // Controller input voor dialog - check elke frame met edge detection
        if (this.dialogSystem.isDialogActive) {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            for (const gamepad of gamepads) {
                if (!gamepad) continue;
                
                // A knop (index 0) edge detection voor dialog voortzetten
                if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
                    if (!this.aButtonWasPressed) {
                        this.aButtonWasPressed = true;
                        this.dialogSystem.nextLine();
                        console.log("Next dialog line (controller A)");
                    }
                } else {
                    this.aButtonWasPressed = false;
                }
                
                // B knop (index 1) edge detection als alternatief
                if (gamepad.buttons[1] && gamepad.buttons[1].pressed) {
                    if (!this.bButtonWasPressed) {
                        this.bButtonWasPressed = true;
                        this.dialogSystem.nextLine();
                        console.log("Next dialog line (controller B)");
                    }
                } else {
                    this.bButtonWasPressed = false;
                }
            }
        }
    }    onDeactivate() {
        // Reset button state bij verlaten scene
        this.aButtonWasPressed = false;
        this.bButtonWasPressed = false;
        
        if (this.#dialogKeyHandler) {
            this.engine.input.keyboard.off('press', this.#dialogKeyHandler)
        }
    }

    onPostUpdate(engine, delta) {
        // Check overlap met triggerbalk via bounding box
        const isOverlapping = this.#isOverlapping(this.#shanty, this.#triggerBar)
        const isStandingStill = Math.abs(this.#shanty.vel.x) < 1 && Math.abs(this.#shanty.vel.y) < 1

        if (isOverlapping && isStandingStill) {
            this.#overlapFrames++
            if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                engine.goToScene('minigame_3_instruction')
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
