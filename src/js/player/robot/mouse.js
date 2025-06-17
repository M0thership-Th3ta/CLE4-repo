import { Actor, CollisionType } from "excalibur"

export class Mouse extends Actor {
    isDragging = false

    constructor(){
        super({
            width: 16,
            height: 16,
            collisionType: CollisionType.Passive
        })
    }

    // Deze functie wordt één keer aangeroepen wanneer de pointer wordt toegevoegd
    onInitialize(engine) {
        // Setup graphics
        this.z = 1000

        // Luister naar pointermove events
        engine.input.pointers.primary.on('move', (evt) => {
            // Zet positie naar muispositie
            this.pos = evt.worldPos
            // Debug: toon pointerpositie
            console.log('Pointer positie (event):', this.pos.x, this.pos.y)
        })

        // Luister naar pointerdown events
        engine.input.pointers.primary.on('down', (evt) => {
            this.isDragging = true
            console.log('Pointer DOWN:', evt.worldPos.x, evt.worldPos.y)
        })

        // Luister naar pointerup events
        engine.input.pointers.primary.on('up', (evt) => {
            this.isDragging = false
            console.log('Pointer UP:', evt.worldPos.x, evt.worldPos.y)
        })
    }

    // Per-frame logic (optioneel)
    onPostUpdate(engine, delta) {
        // Je kunt hier logica toevoegen die afhankelijk is van #isDragging
        if (this.isDragging) {
            // Bijvoorbeeld: sleep een object mee
        }
    }
}