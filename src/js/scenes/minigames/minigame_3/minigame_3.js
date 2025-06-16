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

        this.add(new Platform());
        this.add(new Platform());

        this.add(new Platform());
        this.add(new Platform());

        this.add(new Platform());
        this.add(new Platform());

        this.add(new Platform());
        this.add(new Platform());

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