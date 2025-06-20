import { Actor, CollisionType, DegreeOfFreedom, Engine, Shape, Side, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { Turtle } from "../scenes/minigames/minigame_3/turtle.js";
import { MarineBiologist } from "../actors/marine_biologist.js";
import { Sea } from "../scenes/minigames/minigame_3/sea.js";

export class Player extends Actor {

    leftKey;
    rightKey;
    upKey;
    downKey;

    amount = 0;
    isGrounded = false;
    speed = 200;
    hasTurtle = false; // Voeg hasTurtle flag toe

    constructor(leftKey, rightKey, upKey, downKey, startPos) {

        super({
            pos: startPos,
            scale: new Vector(0.5, 0.5),
            collisionType: CollisionType.Active,
            collider: Shape.Box(100, 150, Vector.Half, new Vector(0, 10)),
        });

        this.graphics.use(Resources.Player.toSprite());

        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey;
        this.downKey = downKey;
    }

    onInitialize(engine) {
        this.engine = engine;
        this.body.useGravity = true;
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);

        this.on("collisionstart", (event) => {
            this.handleCollision(event);

            if (event.side === Side.Bottom) {
                this.isGrounded = true;
            }
        });

        this.on("collisionend", (event) => {
            if (event.side === Side.Bottom) {
                this.isGrounded = false;
            }
        });

    }

    onPreUpdate(engine) {
        let xspeed = 0;

        if (engine.input.keyboard.isHeld(this.leftKey)) {
            xspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.rightKey)) {
            xspeed = this.speed;
        }

        if (engine.input.keyboard.wasPressed(this.upKey) && this.isGrounded) {
            this.vel.y = -480;
            this.isGrounded = false;
        }

        this.vel.x = xspeed;

    }

    handleCollision(event) {

        if (event.other.owner instanceof Turtle) {
            if (!this.hasTurtle) {
                event.other.owner.hit();
                this.graphics.use(Resources.RobotWithTurtle.toSprite());
                this.scale = new Vector(0.60, 0.60);
                this.hasTurtle = true; // Zet hasTurtle op true
            }
        }

        if (event.other.owner instanceof MarineBiologist) {
            event.other.owner.hit();

            if (this.hasTurtle) { // Alleen als robot een turtle heeft
                const scene = this.engine.currentScene;
                scene.collectedTurtles++;
                scene.amountTracker.amount++;
                if (scene.minigame3UI) {
                    scene.minigame3UI.updateAmount(scene.amountTracker.amount);
                }
                this.graphics.use(Resources.Player.toSprite());
                this.scale = new Vector(0.5, 0.5);
                this.hasTurtle = false; // Zet terug op false

                if (scene.collectedTurtles >= scene.totalTurtles) {
                    scene.gameCompleted();
                }
            }
        }
    }
}