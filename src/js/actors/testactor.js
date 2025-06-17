import { Vector } from "excalibur"
import { NPC } from './npc.js'
import { Resources } from '../resources.js'

export class TestActor extends NPC {    constructor(pos) {
        // Geef collision radius door aan parent constructor
        super(pos, "Farmer", 40) // 40 pixels radius voor ronde collision
    }

    // Override de setupGraphics methode om Farmer sprite te gebruiken
    setupGraphics() {
        // Gebruik de Farmer resource voor de graphics en maak deze kleiner
        const sprite = Resources.Farmer.toSprite()
        sprite.scale = new Vector(0.15, 0.15) // Maak sprite 15% van originele grootte
        this.graphics.use(sprite)
        
        // Collision wordt nu automatisch ingesteld door parent class NPC
    }

    // Override dialogue area methoden voor specifieke Farmer gedrag
    onDialogueAreaEnter(evt) {
        console.log(`${this.name}: "Hallo daar! Kom je wat fruit kopen?"`)
        // Hier kan later specifieke Farmer dialoog worden toegevoegd
    }

    onDialogueAreaExit(evt) {
        console.log(`${this.name}: "Tot ziens!"`)
        // Hier kan later Farmer dialoog cleanup worden toegevoegd
    }
}