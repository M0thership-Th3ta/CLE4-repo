import { Actor, Vector, CollisionType } from "excalibur";

/**
 * Basis fruit klasse - alle fruit types erven van deze klasse
 */
export class Fruit extends Actor {
  constructor(pos, fruitType) {
    super({
      pos,
      width: 30,
      height: 30,
      collisionType: CollisionType.Passive
    });
    
    this.fruitType = fruitType;
    this.isGrabbed = false;
    this.fallSpeed = 100;
  }

  /**
   * Initialiseer het fruit
   */
  onInitialize(engine) {
    // Setup graphics - moet worden geoverschreven door subklassen
    this.setupGraphics();
    
    // Event listeners
    this.on("collisionstart", (evt) => this.onCollision(evt));
  }

  /**
   * Setup graphics - moet worden geimplementeerd door subklassen
   */
  setupGraphics() {
    throw new Error("setupGraphics() moet worden geimplementeerd door subklasse");
  }

  /**
   * Handle collision met andere objecten
   */
  onCollision(evt) {
    console.log(`${this.fruitType} fruit collision detected`);
  }

  /**
   * Laat het fruit vallen
   */
  fall() {
    if (!this.isGrabbed) {
      this.vel = new Vector(0, this.fallSpeed);
    }
  }

  /**
   * Grab het fruit (stop met vallen)
   */
  grab() {
    this.isGrabbed = true;
    this.vel = new Vector(0, 0);
  }

  /**
   * Release het fruit (begin weer met vallen)
   */
  release() {
    this.isGrabbed = false;
    this.fall();
  }

  /**
   * Check of fruit buiten scherm is
   */
  isOffScreen(engine) {
    return this.pos.y > engine.drawHeight + 50;
  }
}
