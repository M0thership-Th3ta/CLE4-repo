import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/robot/player.js';
import { Mouse } from '../../../player/robot/mouse.js';
import { Background1 } from "./background_1.js";

export class Minigame_1 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame1(engine)
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame1(engine) {
        console.log("Start minigame 1!");
        this.add(new Background1());
    }
}