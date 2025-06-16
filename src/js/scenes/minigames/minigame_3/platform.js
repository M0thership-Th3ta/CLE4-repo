import { Actor, CollisionType, Resource, Shape, Vector } from "excalibur";
import { Resources } from "../../../resources";

export class Platform extends Actor {
    constructor(x, y, width, height) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed,
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Platform.toSprite());
        this.scale = new Vector(0.5, 0.35);
        this.collider.set(Shape.Box(500, 100, Vector.Half, new Vector(0, -15)));
    }
}