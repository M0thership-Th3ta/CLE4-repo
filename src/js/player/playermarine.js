import { Actor, CollisionType, DegreeOfFreedom, Shape, Side, Vector } from "excalibur"
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
    hasTurtle = false;

    constructor(leftKey, rightKey, upKey, downKey, startPos) {

        super({
            pos: startPos,
            scale: new Vector(0.7, 0.7),
            collisionType: CollisionType.Active,
            collider: Shape.Box(100, 80, Vector.Half, new Vector(0, -8)),
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

    }    onPreUpdate(engine) {
        let xspeed = 0;

        // Keyboard input
        if (engine.input.keyboard.isHeld(this.leftKey)) {
            xspeed = -this.speed;
        }
        if (engine.input.keyboard.isHeld(this.rightKey)) {
            xspeed = this.speed;
        }

        if (engine.input.keyboard.wasPressed(this.upKey) && this.isGrounded) {
            // Speel jumpsound
            if (Resources.JumpSound ) {
                Resources.JumpSound.play(1).catch(e => console.error('Kon jumpsound niet afspelen:', e));
            }
            this.vel.y = -480;
            this.isGrounded = false;
        }

        // Controller input - check elke frame
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (const gamepad of gamepads) {
            if (!gamepad) continue;
            
            // Linker stick horizontaal bewegen (deadzone van 0.2)
            const leftStickX = gamepad.axes[0] || 0;
            if (Math.abs(leftStickX) > 0.2) {
                xspeed = leftStickX * this.speed;
            }
            
            // A knop (index 0) voor springen - Xbox A of PlayStation X
            if (gamepad.buttons[0] && gamepad.buttons[0].pressed && this.isGrounded) {
                this.vel.y = -480;
                this.isGrounded = false;
            }
        }

        this.vel.x = xspeed;

        if (this.pos.y > 720) {
            this.engine.currentScene.gameOver();
        }

        if (this.pos.x < this.width / 2) this.pos.x = this.width / 2;
        if (this.pos.x > engine.drawWidth - this.width / 2) this.pos.x = engine.drawWidth - this.width / 2;
        if (this.pos.y < this.height / 2) this.pos.y = this.height / 2;
        if (this.pos.y > engine.drawHeight - this.height / 2) this.pos.y = engine.drawHeight - this.height / 2;

    }

    handleCollision(event) {

        if (event.other.owner instanceof Turtle) {
            if (!this.hasTurtle) {
                // Speel ting sound af bij oppakken turtle
                if (Resources.TingSound) {
                    Resources.TingSound.play(1).catch(e => console.error('Kon ting sound niet afspelen:', e));
                }
                event.other.owner.hit();
                this.graphics.use(Resources.RobotWithTurtle.toSprite());
                this.scale = new Vector(0.7, 0.7);
                this.collider.set(Shape.Box(100, 100, Vector.Half, new Vector(0, 5)));
                this.hasTurtle = true;
            }
        }

        if (event.other.owner instanceof MarineBiologist) {
            event.other.owner.hit();

            if (this.hasTurtle) {
                // Speel correct answer geluid af
                // Debug: log voor play()
                console.log('trying to play', Resources.CorrectAnswer, );
                if (Resources.CorrectAnswer) {
                    Resources.CorrectAnswer.play(1)
                        .catch(e => console.error('Kon geluid niet afspelen:', e));
                }
                this.engine.currentScene.collectedTurtles++;
                this.engine.currentScene.amountTracker.amount++;
                if (this.engine.currentScene.minigame3UI) {
                    this.engine.currentScene.minigame3UI.updateAmount(this.engine.currentScene.amountTracker.amount);
                }
                this.graphics.use(Resources.Player.toSprite());
                this.scale = new Vector(0.7, 0.7);
                this.collider.set(Shape.Box(100, 80, Vector.Half, new Vector(0, -8)));
                this.hasTurtle = false;


                if (this.engine.currentScene.collectedTurtles >= this.engine.currentScene.totalTurtles) {
                    this.engine.currentScene.gameCompleted();
                }
            }
        }

        if (event.other.owner instanceof Sea) {
            this.engine.currentScene.gameOver();
        }

    }
}