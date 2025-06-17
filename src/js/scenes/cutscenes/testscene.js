import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/player.js';
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/player.js';
import { Restaurant } from '../locations/restaurant.js';

export class Testscene extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
        this.setupRestaurant(engine)
    }

    onActivate(engine) {
        // Deze functie wordt aangeroepen telkens als de scene actief wordt
        console.log("Testscene is nu actief")
    }

    // Deze functie bevat de restaurant setup
    setupRestaurant(engine) {
        console.log("Start test cutscene!");

        // Laad de restaurant achtergrond in deze scene
        const restaurantBackground = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            width: engine.drawWidth,
            height: engine.drawHeight
        })
        restaurantBackground.graphics.use(Resources.RestaurantLayout.toSprite())
        this.add(restaurantBackground)

        console.log("Restaurant layout geladen in testscene!")
    }
}