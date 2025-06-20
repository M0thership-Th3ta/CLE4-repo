// import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
// import { Resources, ResourceLoader } from '../../resources.js';
// import { Player } from '../../player/robot/player.js';

// export class Restaurantscene_1 extends Scene {

//     constructor() {
//         super()
//     }

//     onActivate(engine) {
//         // Start de restaurant scene zodra de scene geladen wordt
//         this.startRestaurantscene1(engine)
//     }

//     // Deze functie bevat de restaurant scene functionaliteit
//     startRestaurantscene1(engine) {
//         console.log("Start restaurant scene 1!");
//     }
// }


import { Actor, Scene, Vector, CollisionType, Color, Rectangle } from "excalibur"
import { Resources } from '../../resources.js'
import { Shanty } from '../../player/shanty/shanty.js'
import { TestActor } from '../../actors/testactor.js'

export class Restaurantscene_1 extends Scene {
    #dialogueBar
    #farmerImage
    #shanty
    #farmer
    #showDialogue = false

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

        // Voeg Shanty toe
        this.#shanty = new Shanty(new Vector(200, 300))
        this.add(this.#shanty)

        // Voeg Farmer toe
        this.#farmer = new TestActor(new Vector(400, 350))
        this.add(this.#farmer)

        // Maak de dialoogbalk (onzichtbaar bij start, max breedte scherm)
        this.#dialogueBar = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
            width: engine.drawWidth,
            height: 80,
            collisionType: CollisionType.PreventCollision
        })
        this.#dialogueBar.graphics.use(new Rectangle({
            width: engine.drawWidth,
            height: 80,
            color: Color.White
        }))
        this.#dialogueBar.visible = false
        this.add(this.#dialogueBar)

        // Maak de Farmer-afbeelding (onzichtbaar bij start, schaal mee met dialoogbalk)
        this.#farmerImage = new Actor({
            pos: new Vector(engine.drawWidth - 60, engine.drawHeight - 40), // rechts in de balk
            width: 64,
            height: 64,
            collisionType: CollisionType.PreventCollision
        })
        const farmerSprite = Resources.Farmer.toSprite()
        farmerSprite.scale = new Vector(0.18, 0.18) // iets groter voor de balk
        this.#farmerImage.graphics.use(farmerSprite)
        this.#farmerImage.visible = false
        this.add(this.#farmerImage)

        // Collision event: zet een flag als Shanty de Farmer raakt
        this.#shanty.on('collisionstart', (evt) => {
            if (evt.other.owner === this.#farmer) {
                this.#showDialogue = true
            }
        })
        this.#shanty.on('collisionend', (evt) => {
            if (evt.other === this.#farmer) {
                this.#showDialogue = false
            }
        })
    }

    onPreUpdate(engine) {
        // Zet standaard altijd onzichtbaar
        if (this.#dialogueBar) this.#dialogueBar.visible = false
        if (this.#farmerImage) this.#farmerImage.visible = false
        // Alleen zichtbaar maken als er een collision is
        if (this.#showDialogue) {
            if (this.#dialogueBar) this.#dialogueBar.visible = true
            if (this.#farmerImage) this.#farmerImage.visible = true
        }
    }

    onActivate(engine) {
        // Zorg dat de dialoogbalk en farmer-image altijd onzichtbaar zijn bij activeren
        if (this.#dialogueBar) this.#dialogueBar.visible = false
        if (this.#farmerImage) this.#farmerImage.visible = false
        this.#showDialogue = false
    }
}