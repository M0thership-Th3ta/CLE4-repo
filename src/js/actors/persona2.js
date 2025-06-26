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
        const scaleX = 110 / sprite.image.width
        const scaleY = 110 / sprite.image.height
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
                
                'Zhiwen: "Shanty! Aiya—familiebruiloft vandaag. Kun jij op de winkel passen? Slechts één dag!"',
                'Shanty: "Laat me raden: Tante Lilis ‘verplichte gezelligheid’ evenement?"',
                'Zhiwen: "Zes uur durende ceremonie.',
                'Zhiwen: Zes uur!!!!!',
                'Zhiwen: laat Clippy alsjeblieft niet bij de Manegtron in de buurt komen."'
            ]);
        }
    }
}