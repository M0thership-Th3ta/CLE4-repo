import { Scene } from "excalibur";
import { FruitGrabberGame } from "./fruit_grabber_game.js";

export class Minigame_1 extends Scene {
    constructor() {
        super();
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame1(engine);
    }    // Deze functie bevat de minigame functionaliteit
    startMinigame1(engine) {
        // Voeg het FruitGrabberGame toe aan de scene
        const fruitGrabberGame = new FruitGrabberGame();
        this.add(fruitGrabberGame);
    }
}