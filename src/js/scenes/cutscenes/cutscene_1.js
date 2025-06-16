import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/player.js';

export class Cutscene_1 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de cutscene zodra de scene geladen wordt
        this.startCutscene1(engine)
    }

    // Deze functie bevat de cutscene functionaliteit
    startCutscene1(engine) {
        console.log("Start cutscene 1!");
    }
}