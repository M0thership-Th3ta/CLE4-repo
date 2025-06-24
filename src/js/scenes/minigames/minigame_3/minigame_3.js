import { Keys, Scene, Vector } from "excalibur";
import { Background3 } from "./background_3.js";
import { Platform } from "./platform.js";
import { Turtle } from "./turtle.js";
import { Dock } from "./dock.js";
import { Sea } from "./sea.js";
import { Player } from "../../../player/playermarine.js";
import { Minigame3UI } from "./minigame_3_UI.js";
import { MarineBiologist } from "../../../actors/marine_biologist.js";

export class Minigame_3 extends Scene {

    minigame3UI;

    constructor() {

        super();

        this.amountTracker = this.amountTracker ?? { amount: 0 };
        this.amountTurtles = (localStorage.getItem(`amountTurtles`)) || 5;
    }

    onActivate(engine) {
        this.gameHasEnded = false;
        this.collectedTurtles = 0;
        this.totalTurtles = 5;
        this.amountTracker = { amount: 0 };
        this.amountTurtles = 5;

        this.input.keyboard.off('press');

        this.startMinigame3(engine)
    }

    startMinigame3(engine) {
        console.log("Start minigame 3!");

        const background3 = new Background3();
        this.add(background3);

        this.add(new Sea());

        this.add(new Dock(280, 600));

        const marineBiologist = new MarineBiologist(new Vector(450, 590));
        this.add(marineBiologist);

        this.add(new Platform(150, 200));
        this.add(new Platform(250, 450));
        this.add(new Platform(320, 80));
        this.add(new Platform(420, 320));
        this.add(new Platform(600, 530));
        this.add(new Platform(680, 200));
        this.add(new Platform(900, 400));
        this.add(new Platform(1150, 280));
        this.add(new Platform(1000, 150));

        const player = new Player(
            Keys.Left,
            Keys.Right,
            Keys.Up,
            Keys.Down,
            new Vector(120, 550),
        );
        this.add(player);

        this.add(new Turtle(160, 160));
        this.add(new Turtle(440, 280));
        this.add(new Turtle(860, 360));
        this.add(new Turtle(1150, 240));
        this.add(new Turtle(350, 40));

        const minigame3UI = new Minigame3UI(
            player,
            this.amountTracker
        );
        this.add(minigame3UI);
        this.minigame3UI = minigame3UI;
    }

    gameCompleted() {

        if (this.gameHasEnded) return;
        this.gameHasEnded = true;
        console.log("Game Completed");
        this.engine.goToScene('restaurantscene_4');
    }

    gameOver() {
        if (this.gameHasEnded) return;
        this.gameHasEnded = true;
        console.log("Game Over,");
        this.engine.goToScene('gameover');
    }

}