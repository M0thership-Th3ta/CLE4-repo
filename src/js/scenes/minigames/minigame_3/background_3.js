import { Actor, Vector } from "excalibur";
import { Resources } from "../../../resources";

export class Background3 extends Actor {
    constructor(x, y, screenWidth, screenHeight) {

        super({
            x, y,
            anchor: new Vector(0, 0),
            width: screenWidth,
            height: screenHeight,
            opacity: 0.7
        });

        this.graphics.use(Resources.Background3.toSprite());
    }
}