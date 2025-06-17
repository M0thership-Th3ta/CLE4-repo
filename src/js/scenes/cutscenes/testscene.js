import { Actor, Scene, Label, Vector, Color, FontUnit, Keys, CollisionType } from "excalibur";
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/player.js';
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/player.js';
import { Restaurant } from '../locations/restaurant.js';
import { Shanty } from '../../player/shanty/shanty.js';
import { TestActor } from '../../actors/testactor.js';

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
    }    // Deze functie bevat de restaurant setup
    setupRestaurant(engine) {
        console.log("Start test cutscene!");        // Laad de restaurant achtergrond in deze scene
        const restaurantBackground = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
            width: engine.drawWidth,
            height: engine.drawHeight,
            collisionType: CollisionType.PreventCollision
        })
        restaurantBackground.graphics.use(Resources.RestaurantLayout.toSprite())
        this.add(restaurantBackground)        // Voeg Shanty toe aan de scene
        const shanty = new Shanty(new Vector(200, 300))
        this.add(shanty)

        // Voeg TestActor (Farmer) toe aan de scene
        const farmer = new TestActor(new Vector(400, 350))
        this.add(farmer)

        console.log("Restaurant layout geladen in testscene!")
        console.log("Shanty toegevoegd aan testscene!")
        console.log("TestActor (Farmer) toegevoegd aan testscene!")
    }
}