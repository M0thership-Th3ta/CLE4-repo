import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/player.js';

export class Minigame_1 extends Scene {

    constructor() {
        super()
    }

    onInitialize(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame1(engine)
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame1(engine) {
        console.log("Start minigame 1!");
    }
}