import { Vector, Shape } from "excalibur"
import { NPC } from './npc.js'
import { Resources } from '../resources.js'
import { DialogSystem } from '../dialog.js'
import { Shanty } from '../player/shanty/shanty.js'

export class Persona2 extends NPC {
    constructor(pos) {
        // Geef collision radius door aan parent constructor
        super(pos, "Persona2", 40) // 40 pixels radius voor ronde collision
        // Stel collider en grootte in onInitialize
    }

    #shanty
    #dialogSystem

    // Deze functie wordt één keer aangeroepen wanneer Persona2 wordt toegevoegd aan de scene
    onInitialize(engine) {
        // Zoek de Shanty speler in de scene
        this.#shanty = engine.currentScene.actors.find(actor => actor instanceof Shanty)
        // Haal het dialoogsysteem op uit de scene of engine
        this.#dialogSystem = engine.currentScene.dialogSystem // Pas aan als je dialogSystem anders opslaat
        this.setupGraphics()
    }

    // Override de setupGraphics methode om Persona2 sprite te gebruiken
    setupGraphics() {
        // Gebruik de Persona2 resource voor de graphics en maak deze even groot als Shanty
        const sprite = Resources.Persona2.toSprite()
        // Bepaal de juiste schaalfactor zodat de afbeelding 80x80 wordt
        const scaleX = 80 / sprite.image.width
        const scaleY = 80 / sprite.image.height
        sprite.scale = new Vector(scaleX, scaleY)
        this.graphics.use(sprite)
        // Stel een vierkante collider in van 80x80 (zoals Shanty)
        this.collider.set(Shape.Box(80, 80))
    }

    // Optioneel: eigen collision gedrag
    onCollision(evt) {
        // Log overlap met Shanty
        if (evt.other.owner && evt.other.owner.constructor && evt.other.owner.constructor.name === "Shanty") {
            // console.log("Shanty overlapt met Persona2!") // Verwijder console.log voor productie
        }
    }

    // Deze functie wordt elke frame aangeroepen
    onPostUpdate(engine, delta) {
        // Controleer of Shanty en dialogSystem beschikbaar zijn
        if (!this.#shanty || !this.#dialogSystem) return

        // Bereken afstand tussen Persona2 en Shanty
        const distance = this.pos.distance(this.#shanty.pos)
        if (distance < 100 && !this.#dialogSystem.isDialogActive) {
            this.#dialogSystem.showDialog([
    
    "Shanty: (smiling) Hey there, Hildo. You look like you've been wrestling with the fields all morning. Everything alright?",
    "Hildo: (chuckling weakly) Ah, just the usual. Though, gotta admit, it's been a bit tougher since Jonny went and broke his arm.",
    "Shanty: (concerned) Oh no! That's awful. How's he holding up?",
    "Hildo: Doc says he'll heal fine... *flexes arm* ...but farming don't stop for broken bones. So this old man's picking up the slack.",
    "Shanty: (folding arms) Hildo, you can't do everything by yourself. Let me help - I can pull weeds or feed the animals at least.",
    "Hildo: (raising eyebrow) You'd do that? Farming's dirty work, Shanty.",
    "Shanty: (grinning) I've handled messier things in this kitchen. What's the point of a town if we don't help each other?",
    "Hildo: (soft smile) Heh. Your grandpa would've said the same. Alright, just don't blame me if you're sore tomorrow.",
    "Shanty: *laughs* Deal! Consider me your temporary farmhand!",
    "MISSION UNLOCKED: Helping Hands - Assist Hildo with farm chores while Jonny recovers!"
]);
        }
    }
}