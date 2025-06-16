import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../resources.js';
import { Player } from '../../player/player.js';

export class Cutscene_2 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de cutscene zodra de scene geladen wordt
        this.startCutscene2(engine)
    }

    // Deze functie bevat de cutscene functionaliteit
    startCutscene2(engine) {
        console.log("Start cutscene 2!");
    }
}