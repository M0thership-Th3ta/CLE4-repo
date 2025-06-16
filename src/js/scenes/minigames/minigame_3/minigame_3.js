import { Scene} from "excalibur";
import { Background3 } from "./background_3.js";
import { Platform } from "./platform.js";
import { Turtle } from "./turtle.js";

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

        this.add(new Platform(150, 700));
        this.add(new Platform(1100, 700));
        this.add(new Platform(180, 200));

        this.add(new Platform(400, 600));
        this.add(new Platform(750, 600));

        this.add(new Platform(90, 470));
        this.add(new Platform(1050, 470));

        this.add(new Platform(650, 340));
        this.add(new Platform(1250, 340));

        this.add(new Platform(950, 220));
        this.add(new Platform(600, 120));

        for (let i = 0; i < 5; i++) {
            // @ts-ignore
            const platforms = this.isCurrentScene.actors.filter(actor => actor instanceof Platform);

            const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

            const turtleX = randomPlatform.pos.x + (Math.random() * (randomPlatform.width - 30));
            const turtleY = randomPlatform.pos.y - 55;

            const turtle = new Turtle(turtleX, turtleY);
            this.add(turtle);
        }

    }
}