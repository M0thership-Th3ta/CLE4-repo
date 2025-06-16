import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/player.js';

export class Minigame_3 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame3(engine)
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame3(engine) {
        console.log("Start minigame 3!");
    }
}