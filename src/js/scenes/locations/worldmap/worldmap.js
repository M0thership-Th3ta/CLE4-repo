import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/robot/player.js';

export class WorldMap extends Scene {

    

    constructor() {
        super();
        
    }

    onActivate(engine) {
        
        this.startWorldmap(engine)
          // Maak de achtergrond voor de wereldkaart, gecentreerd op het scherm
        const background = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            width: engine.drawWidth,
            height: engine.drawHeight,
            collisionType: CollisionType.PreventCollision
        })

          // Koppel de sprite aan de actor
        background.graphics.use(Resources.WorldMap.toSprite())

        // Voeg de achtergrond toe aan de scene
        this.add(background)

    
            
        // Maak de speler aan

        
       
    }
    // Deze functie wordt aangeroepen wanneer de scene actief wordt
    onActivate() {
        console.log("WorldMap scene is nu actief")
    }

    // Deze functie wordt aangeroepen wanneer we de scene verlaten
    onDeactivate() {
        console.log("WorldMap scene wordt verlaten")
    }
    
}
