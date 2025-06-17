import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/robot/player.js';

export class Restaurantscene_3 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de restaurant scene zodra de scene geladen wordt
        this.startRestaurantscene3(engine)
    }

    // Deze functie bevat de restaurant scene functionaliteit
    startRestaurantscene3(engine) {
        console.log("Start restaurant scene 3!");
    }
}
