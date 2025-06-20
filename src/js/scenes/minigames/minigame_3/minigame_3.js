import { Color, Font, Keys, Label, Scene, TextAlign, Vector } from "excalibur";
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
    totalTurtles = 0;
    collectedTurtles = 0;
    amountTracker;
    gameHasEnded = false;

    constructor() {

        super();

        this.amountTracker = this.amountTracker ?? { amount: 0 };
        this.amountTurtles = (localStorage.getItem(`amountTurtles`)) || 5;
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

        for (let i = 0; i < 5; i++) {
            // Fix: gebruik this.actors in plaats van this.isCurrentScene.actors
            const platforms = this.actors.filter(actor => actor instanceof Platform);

            const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

            const turtleX = randomPlatform.pos.x + (Math.random() * (randomPlatform.width));
            const turtleY = randomPlatform.pos.y - 45;

            const turtle = new Turtle(turtleX, turtleY);

            this.add(turtle);
            this.totalTurtles++;
        }

        const minigame3UI = new Minigame3UI(
            player,
            this.amountTracker
        );
        this.add(minigame3UI);
        this.minigame3UI = minigame3UI; // Koppel UI aan scene zodat Player hem kan vinden
        // Zet direct het juiste aantal in de UI
        this.minigame3UI.updateAmount(this.collectedTurtles);
    }

    gameCompleted() {
        this.gameHasEnded = true;
        console.log("Minigame 3 voltooid!");

        const gameCompletedlabel = new Label({
            text: "Minigame 3 voltooid!",
            pos: new Vector(600, 400),
            font: new Font({
                family: "Arial",
                size: 50,
                color: Color.White,
                textAlign: TextAlign.Center,
            }),
            anchor: Vector.Half,
        });

        const goBackLabel = new Label({
            text: "Press Esc to Exit",
            pos: new Vector(600, 500),
            font: new Font({
                family: "Arial",
                size: 50,
                color: Color.White,
                textAlign: TextAlign.Center
            }),
            anchor: Vector.Half
        });

        this.add(gameCompletedlabel);
        this.add(goBackLabel);

        this.input.keyboard.on("press", (evt) => {
            if (evt.key === Keys.Esc) {
                window.location.reload();
            }
        });
    }

    gameOver() {
        this.gamehasEnded = true;
        console.log("Game Over");

        const gameOverLabel = new Label({
            text: "Game Over",
            pos: new Vector(300, 400),
            font: new Font({
                family: "Arial",
                size: 100,
                color: Color.White,
                textAlign: TextAlign.Center
            }),
            anchor: Vector.Half
        })

        const restartLabel = new Label({
            text: "Press Space to Restart",
            pos: new Vector(200, 500),
            font: new Font({
                family: "Arial",
                size: 50,
                color: Color.White,
                textAlign: TextAlign.Center
            }),
            anchor: Vector.Half
        })

        this.add(gameOverLabel);
        this.add(restartLabel);

        this.input.keyboard.on("press", (evt) => {
            if (evt.key === Keys.Space) {
                window.location.reload();
            }
        });
    }

}