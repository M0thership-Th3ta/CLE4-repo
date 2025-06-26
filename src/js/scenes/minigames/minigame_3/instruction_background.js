import { Actor, Vector } from "excalibur";
import { Resources } from "../../../resources";

export class InstructionBackground extends Actor {
    constructor() {

        super({

            pos: new Vector(640, 360),
            width: 1280,
            height: 720,
            opacity: 0.7
        });

        const sprite = Resources.InstructionBackground.toSprite();
        sprite.destSize = {width: 1280, height: 720};
        this.graphics.use(sprite);
    }
}