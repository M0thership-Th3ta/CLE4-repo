import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/player.js';

export class Cutscene_3 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de cutscene zodra de scene geladen wordt
        this.startCutscene3(engine)
    }

    // Deze functie bevat de cutscene functionaliteit
    startCutscene3(engine) {
        console.log("Start cutscene 3!");
    }
}