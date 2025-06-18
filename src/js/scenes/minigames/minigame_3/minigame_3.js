import { Color, Font, Keys, Label, Scene, TextAlign, Vector } from "excalibur";
import { Background3 } from "./background_3.js";
import { Platform } from "./platform.js";
import { Turtle } from "./turtle.js";
import { Dock } from "./dock.js";
import { Sea } from "./sea.js";
import { Player } from "../../../player/player.js";
import { AmountManager } from "./amount_manager.js";

export class Minigame_3 extends Scene {

    amountManager;
    totalTurtles = 5; // Aantal schildpadden in deze minigame
    collectedTurtles = 0; // Aantal verzamelde schildpadden
    amountTracker;

    constructor() {

        super();

        this.amountTracker = this.amountTracker ?? {amount: 0};
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
            this.totalTurtles++;
        }

        const amountManager = new AmountManager(
            this.amountTracker
        );
        this.add(amountManager);

    }

    gameCompleted() {
        this.gameHasEnded = true;
        console.log("Minigame 3 voltooid!");

        const gameCompletedlabel = new Label({
            text: "Minigame 3 voltooid!",
            pos: new Vector(400, 300),
            font: new Font({
                family: "Arial",
                size: 32,
                color: Color.White,
                textAlign: TextAlign.Center,
            }),
            anchor: Vector.Half,
        });

        this.add(gameCompletedlabel);
    }
}