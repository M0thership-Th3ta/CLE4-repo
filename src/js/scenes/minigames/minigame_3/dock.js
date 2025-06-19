import { Actor, CollisionType, EdgeCollider, Shape, Vector } from "excalibur";
import { Resources } from "../../../resources";

export class Dock extends Actor {
    constructor(x, y, width, height) {

        super({
            pos: new Vector(x, y),
            width: width,
            height: height,
            collisionType: CollisionType.Fixed,
        });
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Dock.toSprite());
        this.scale = new Vector(1, 1);

        this.collider.set(Shape.Box(530, 5, Vector.Half, new Vector(0, 45)));
    }
}