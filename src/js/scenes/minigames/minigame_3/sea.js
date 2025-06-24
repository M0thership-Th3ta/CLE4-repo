import { Actor, CollisionType, Shape, Vector } from "excalibur";
import { Resources } from "../../../resources";

export class Sea extends Actor {
    constructor() {

        super({
            pos: new Vector(800, 650),
            width: 1280,
            height: 720,
            collisionType: CollisionType.Fixed,

        });

        const sprite = Resources.Sea.toSprite();
        sprite.destSize = {width: 1800, height: 180};
        this.graphics.use(sprite);
    }

    onInitialize(engine) {
        this.collider.set(Shape.Box(650, 120, Vector.Half, new Vector(160, -10)));
    }

    hit() {
        this.actions.blink(this.width, this.height);
    }
}