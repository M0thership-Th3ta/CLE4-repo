import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Player } from '../../../player/robot/player.js';
import { Mouse } from '../../../player/robot/mouse.js';
import { Background2 } from "./background_2.js";
import { Food1, Food2, Food3 } from "./food.js";

export class Minigame_2 extends Scene {

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame2(engine)
    }

    onInitialize(engine) {
    const mousePointer = new Mouse()
    this.add(mousePointer)
}

    // Deze functie bevat de minigame functionaliteit
    startMinigame2(engine) {
        console.log("Start minigame 2!");
        this.add(new Background2());
        this.add(new Food1());
        this.add(new Food2());
        this.add(new Food3());
    }
}