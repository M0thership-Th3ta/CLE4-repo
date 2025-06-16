import { Scene, Actor, Vector, CollisionType, Color } from 'excalibur'
import { Resources } from '../../resources.js'

export class Restaurant extends Scene {
    constructor() {
        super()
    }

    // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
    // Hier maken we de achtergrond en muren aan
    onInitialize(engine) {
        // Voeg de restaurant layout toe als achtergrond
        const restaurantBackground = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            width: engine.drawWidth,
            height: engine.drawHeight
        })
        restaurantBackground.graphics.use(Resources.RestaurantLayout.toSprite())
        this.add(restaurantBackground)

        // Maak een onzichtbare muur waar je niet doorheen kan
        const wall = new Actor({
            pos: new Vector(400, 300),  // Positie van de muur
            width: 100,                 // Breedte van de muur
            height: 200,                // Hoogte van de muur
            collisionType: CollisionType.Fixed  // Fixed betekent dat het niet beweegt
        })
          // Maak de muur zichtbaar met een kleur (optioneel, voor debugging)
        wall.graphics.use(Color.Red)
        this.add(wall)
    }

    // Deze functie wordt aangeroepen wanneer de scene actief wordt
    onActivate() {
        console.log("Restaurant scene is nu actief")
    }

    // Deze functie wordt aangeroepen wanneer we de scene verlaten
    onDeactivate() {
        console.log("Restaurant scene wordt verlaten")
    }
}