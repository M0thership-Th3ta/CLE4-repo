import { Actor, Vector, CollisionType, clamp } from "excalibur";
import { Resources } from '../../../resources.js';
import { Hook } from "./hook.js";

/**
 * Robot speler die tussen manden beweegt en fruit kan pakken
 */
export class Robot extends Actor {
  constructor(pos) {
    super({
      pos,
      width: 64,
      height: 64,
      collisionType: CollisionType.Active
    });

    this.speed = 200;
    this.hook = null;
    this.isMoving = false;
  }

  /**
   * Initialiseer robot graphics en hook
   */
  onInitialize(engine) {
    // Setup robot graphics (gebruik bestaande resource of fallback)
    if (Resources.Robot) {
      this.graphics.use(Resources.Robot.toSprite());
    }

    // Maak hook object
    this.hook = new Hook(this);
    this.scene.add(this.hook);

    // Setup collision events
    this.on("collisionstart", (evt) => this.onCollision(evt));
  }

  /**
   * Zet robot beweging
   */
  setMovement(xSpeed) {
    this.vel = new Vector(xSpeed, 0);
    this.isMoving = xSpeed !== 0;
  }

  /**
   * Gebruik hook om fruit te pakken
   */
  useHook() {
    if (this.hook && !this.hook.isActive()) {
      this.hook.activate();
    }
  }

  /**
   * Behandel collision events
   */
  onCollision(evt) {
    // Collision met manden of andere objecten
    console.log("Robot collision with:", evt.other.owner.constructor.name);
  }

  /**
   * Update robot logica elke frame
   */
  onPostUpdate(engine, delta) {
    // Beperk robot beweging tot scherm grenzen
    this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2);
    
    // Update hook positie
    if (this.hook) {
      this.hook.updatePosition();
    }
  }

  /**
   * Krijg hook object
   */
  getHook() {
    return this.hook;
  }

  /**
   * Check of robot aan het bewegen is
   */
  getIsMoving() {
    return this.isMoving;
  }
}
