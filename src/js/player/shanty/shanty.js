import { Actor, Vector, CollisionType, Keys, clamp, Shape } from 'excalibur'
import { Resources } from '../../resources.js'

export class Shanty extends Actor {
    constructor(pos) {
        super({
            pos,
            width: 80, // Nog grotere collision box
            height: 80, // Nog grotere collision box
            collisionType: CollisionType.Passive
        })
        // Bewegingssnelheid configureren
        this.speed = 200
    }

    onInitialize(engine) {
        // Laad de sprite uit resources en schaal deze naar gewenste grootte
        const sprite = Resources.Shanty.toSprite()
        sprite.scale = new Vector(0.30, 0.30) // Maak sprite 10% van originele grootte
        this.graphics.use(sprite)
        // Stel een grotere vierkante collider in
        this.collider.set(Shape.Box(80, 80)) // Vierkant van 80x80 pixels
        // Voeg collision event toe
        this.on('collisionstart', (evt) => this.hitSomething(evt))
        // Deze functie wordt één keer aangeroepen wanneer Shanty wordt toegevoegd
        console.log("Shanty geïnitialiseerd!")
    }

    onPreUpdate(engine, delta) {
        // Beweeg Shanty met pijltjestoetsen
        this.handleMovement(engine)
        // Houd Shanty binnen het scherm
        this.clampToScreen(engine)
    }    // Behandel input voor beweging
    handleMovement(engine) {
        let xspeed = 0
        let yspeed = 0
        
        // Keyboard input
        if (engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -this.speed
        }
        if (engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = this.speed
        }
        if (engine.input.keyboard.isHeld(Keys.Up)) {
            yspeed = -this.speed
        }
        if (engine.input.keyboard.isHeld(Keys.Down)) {
            yspeed = this.speed
        }
        
        // Controller input - check elke frame
        const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
        for (const gamepad of gamepads) {
            if (!gamepad) continue;
            
            // Linker stick beweging (deadzone van 0.2)
            const leftStickX = gamepad.axes[0] || 0;
            const leftStickY = gamepad.axes[1] || 0;
            
            if (Math.abs(leftStickX) > 0.2) {
                xspeed = leftStickX * this.speed;
            }
            if (Math.abs(leftStickY) > 0.2) {
                yspeed = leftStickY * this.speed;
            }
        }
        
        this.vel = new Vector(xspeed, yspeed)
    }

    // Houd Shanty binnen het scherm
    clampToScreen(engine) {
        this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2)
        this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2)
    }

    // Collision event handler
    hitSomething(event) {
        // Deze functie wordt aangeroepen bij een botsing
        console.log("Shanty botst tegen:", event.other.owner)
    }
}