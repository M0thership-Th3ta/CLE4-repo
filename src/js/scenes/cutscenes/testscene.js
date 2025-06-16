import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/player.js';

export class Testscene extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de cutscene zodra de scene geladen wordt
        this.startTestscene(engine)
    }

    // Deze functie bevat de cutscene functionaliteit
    startTestscene(engine) {
        console.log("Start test cutscene!");
    }
}