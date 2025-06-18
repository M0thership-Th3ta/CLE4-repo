import { Keys, Scene, Vector } from "excalibur";
import { Background3 } from "./background_3.js";
import { Platform } from "./platform.js";
import { Turtle } from "./turtle.js";
import { Dock } from "./dock.js";
import { Sea } from "./sea.js";
import { Player } from "../../../player/player.js";

export class Minigame_3 extends Scene {

    constructor() {

        super();
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame3(engine)
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame3(engine) {
        console.log("Start minigame 3!");

        const background3 = new Background3();
        this.add(background3);

        this.add(new Sea(1000, 600));

        this.add(new Dock(280, 600));

        this.add(new Platform(150, 200));
        this.add(new Platform(250, 450));
        this.add(new Platform(320, 80));
        this.add(new Platform(420, 320));
        this.add(new Platform(600, 500));
        this.add(new Platform(680, 200));
        this.add(new Platform(900, 400));
        this.add(new Platform(1150, 280));
        this.add(new Platform(1000, 100));

        const player = new Player(
            Keys.Left,
            Keys.Right,
            Keys.Up,
            Keys.Down,
            new Vector(220, 400),
        );
        this.add(player);

        for (let i = 0; i < 5; i++) {
            // Fix: gebruik this.actors in plaats van this.isCurrentScene.actors
            const platforms = this.actors.filter(actor => actor instanceof Platform);

            const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

            const turtleX = randomPlatform.pos.x + (Math.random() * (randomPlatform.width - 35));
            const turtleY = randomPlatform.pos.y - 45;

            const turtle = new Turtle(turtleX, turtleY);
            this.add(turtle);
        }

    }
}