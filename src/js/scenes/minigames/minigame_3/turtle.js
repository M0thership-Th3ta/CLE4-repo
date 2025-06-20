import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "../../../resources";

export class Turtle extends Actor {
    constructor(x, y, width, height) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Passive,
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Turtle.toSprite());
        this.scale = new Vector(0.20, 0.20);
        this.collider.set(Shape.Box(200, 200, Vector.Half, new Vector(0, 0)));

    }

    hit() {
        this.kill();
    }
}


