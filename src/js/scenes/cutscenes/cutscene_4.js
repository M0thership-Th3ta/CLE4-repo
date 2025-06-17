import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/robot/player.js';

export class Cutscene_4 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de cutscene zodra de scene geladen wordt
        this.startCutscene4(engine)
    }

    // Deze functie bevat de cutscene functionaliteit
    startCutscene4(engine) {
        console.log("Start cutscene 4!");
    }
}