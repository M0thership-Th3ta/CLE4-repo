import { Actor, Vector, CollisionType, clamp } from "excalibur";
import { Resources } from '../../../resources.js';
import { Hook } from "./hook.js";

/**
 * Robot speler die tussen manden beweegt en fruit kan pakken
 */
export class Robot extends Actor {  constructor(pos) {
    super({
      pos,
      width: 64,
      height: 64,
      collisionType: CollisionType.Fixed
    });

    this.speed = 200;
    this.hook = null;
    this.isMoving = false;
  }

  /**
   * Initialiseer robot graphics en hook
   */
  onInitialize(engine) {
    // Zet physics instellingen voor robot
    if (this.body) {
        this.body.gravityScale = 0;  // Negeert engine gravity
        this.body.fixedRotation = true;  // Voorkomt rotatie
    }

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
  }

  /**
   * Update robot logica elke frame
   */  onPostUpdate(engine, delta) {
    // Debug: Log velocity en acceleration
    if (engine.currentFrameNumber % 60 === 0) { // Elke seconde
        console.log('=== ROBOT MOVEMENT DEBUG ===');
        console.log('Robot velocity:', this.vel);
        console.log('Robot acceleration:', this.acc);
        console.log('Robot positie:', this.pos);
        console.log('Is robot body sleeping?:', this.body?.sleeping);
    }
    // Beperk robot beweging tot scherm grenzen
    this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2);
    if (typeof engine.drawHeight === 'undefined' || isNaN(engine.drawHeight)) {
        this.pos.y = clamp(this.pos.y, 600, 720 - this.height / 2);
    } else {
        this.pos.y = clamp(this.pos.y, 600, engine.drawHeight - this.height / 2);
    }
    if (isNaN(this.pos.y)) {
        this.pos.y = 650; // Fallback naar veilige waarde
    }
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
  }  /**
   * Laat robot naar specifieke positie springen met animatie
   */
  jumpToPosition(targetX, targetY) {
    if (isNaN(targetX) || isNaN(targetY)) {
        return;
    }
    this.vel = Vector.Zero;
    this.actions.clearActions();
    this.actions.moveTo(targetX, targetY, 300);
  }
}
