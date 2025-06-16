import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/player.js';

export class Minigame_2 extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame2(engine)
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame2(engine) {
        console.log("Start minigame 2!");
    }
}