import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Pointer } from '../../../player/robot/pointer.js';
import { Background2 } from "./background_2.js";
import { Food } from "./food.js";
import { Customer } from "./customers.js";

export class Minigame_2 extends Scene {
    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame2(engine)
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame2(engine) {
        console.log("Start minigame 2!");
        const pointer = new Pointer(new Vector(200,200))
        this.add(pointer)
        this.add(new Background2());        this.add(new Food(new Vector(100, 100), Resources.Food1, 1));
        this.add(new Food(new Vector(300, 100), Resources.Food2, 2));
        this.add(new Food(new Vector(200, 200), Resources.Food3, 3));
        // Voeg food items 4 en 5 toe met grotere scale
        this.add(new Food(new Vector(400, 100), Resources.Food4, 4, 0.8));
        this.add(new Food(new Vector(500, 100), Resources.Food5, 5, 0.8));
        this.add(new Customer(new Vector(735, 220), Resources.Customer1));
    }
}