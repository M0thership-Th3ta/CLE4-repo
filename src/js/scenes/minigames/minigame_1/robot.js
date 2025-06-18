import { Actor, Vector, CollisionType, clamp, EasingFunctions } from "excalibur";
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
    this.#hook = null;
    this._isMoving = false;  // Private field met underscore
    this._isJumping = false; // Private field met underscore
    this.jumpCallback = null;
    this.animationStartTime = 0;
    this.currentAnimateHandler = null; // Track huidige animatie handler
  }

  // Private hook property
  #hook = null;
  /**
   * Initialiseer robot graphics en hook
   */  onInitialize(engine) {
    // Schakel gravity permanent uit voor robot
    this.body.useGravity = false;
    
    // Setup robot graphics (gebruik bestaande resource of fallback)
    if (Resources.Robot) {
      this.graphics.use(Resources.Robot.toSprite());
    }

    // Maak hook object
    this.#hook = new Hook(this);    this.scene.add(this.#hook);

    // Setup collision events
    this.on("collisionstart", (evt) => this.onCollision(evt));
  }
  
  /**
   * Spring naar specifieke x-positie met animatie (zonder actions systeem)
   */
  jumpToPosition(targetX, callback = null) {
    if (this._isJumping) return;

    // Stop vorige animatie als die er nog is (safety check)
    if (this.currentAnimateHandler) {
      this.scene.off("postupdate", this.currentAnimateHandler);
      this.currentAnimateHandler = null;
    }

    this._isJumping = true;
    this.jumpCallback = callback;
    
    // Stop alle beweging (gravity is al permanent uit)
    this.vel = new Vector(0, 0);
    
    const startX = this.pos.x;
    const startY = this.pos.y;
    const duration = 500; // 0.5 seconde
    this.animationStartTime = Date.now();
    
    // Animatie handler als class property voor betere cleanup
    this.currentAnimateHandler = () => {
      const elapsed = Date.now() - this.animationStartTime;
      const t = Math.min(elapsed / duration, 1);
      
      // EaseInOutQuad easing functie
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      
      this.pos.x = startX + (targetX - startX) * ease;
      this.pos.y = startY; // Y blijft constant
        if (t >= 1) {
        this.pos.x = targetX; // Exacte eindpositie
        this._isJumping = false;
        
        // Cleanup animatie handler
        this.scene.off("postupdate", this.currentAnimateHandler);
        this.currentAnimateHandler = null;
        
        if (this.jumpCallback) {
          this.jumpCallback();
          this.jumpCallback = null;
        }
      }
    };
    
    this.scene.on("postupdate", this.currentAnimateHandler);
  }  /**
   * Gebruik hook om fruit te pakken
   */  useHook() {
    if (this.#hook && !this.#hook.isActive() && !this._isJumping) {
      this.#hook.activate();
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
    // Beperk robot beweging tot scherm grenzen
    this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2);
    this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2);
    
    // Update hook positie
    if (this.#hook) {
      this.#hook.updatePosition();
    }
  }
  /**
   * Krijg hook object (read-only access)
   */
  getHook() {
    return this.#hook;
  }
  /**
   * Check of robot aan het bewegen is
   */
  get isMoving() {
    return this._isMoving;
  }

  /**
   * Check of robot aan het jumpen is
   */
  get isJumping() {
    return this._isJumping;
  }
}
