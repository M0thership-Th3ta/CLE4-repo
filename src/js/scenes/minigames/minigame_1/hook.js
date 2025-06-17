import { Actor, Vector, CollisionType } from "excalibur";

/**
 * Hook die aan robot hangt en kan uitsteken om fruit te pakken
 */
export class Hook extends Actor {
  constructor(robot) {
    super({
      pos: robot.pos.clone(),
      width: 8,
      height: 32,
      collisionType: CollisionType.Active
    });

    this.robot = robot;
    this.originalLength = 32;
    this.maxLength = 200;
    this.extendSpeed = 300;
    this.retractSpeed = 400;
    
    // Hook states
    this.isExtending = false;
    this.isRetracting = false;
    this.currentLength = this.originalLength;
    this.grabbedFruit = null;
  }

  /**
   * Initialiseer hook graphics en collision
   */
  onInitialize(engine) {
    // Setup basic hook graphics (simpele rechthoek)
    this.graphics.use(this.graphics.rect(this.width, this.height, { color: "#8B4513" }));
    
    // Setup collision events
    this.on("collisionstart", (evt) => this.onCollision(evt));
  }

  /**
   * Activeer hook om fruit te pakken
   */
  activate() {
    if (!this.isExtending && !this.isRetracting) {
      this.isExtending = true;
    }
  }

  /**
   * Check of hook actief is (extending of retracting)
   */
  isActive() {
    return this.isExtending || this.isRetracting;
  }

  /**
   * Update hook positie relatief tot robot
   */
  updatePosition() {
    this.pos.x = this.robot.pos.x;
    this.pos.y = this.robot.pos.y - this.currentLength / 2;
  }

  /**
   * Behandel collision met fruit
   */
  onCollision(evt) {
    const other = evt.other.owner;
    
    // Check of we fruit raken tijdens extending
    if (this.isExtending && other.constructor.name.includes('Fruit')) {
      this.grabFruit(other);
    }
  }

  /**
   * Pak fruit vast en start retracting
   */
  grabFruit(fruit) {
    this.grabbedFruit = fruit;
    this.isExtending = false;
    this.isRetracting = true;
    
    // Verberg fruit of maak het onderdeel van hook
    fruit.visible = false;
  }

  /**
   * Update hook logica elke frame
   */
  onPostUpdate(engine, delta) {
    if (this.isExtending) {
      this.extend(delta);
    } else if (this.isRetracting) {
      this.retract(delta);
    }

    // Update graphics hoogte
    this.graphics.use(this.graphics.rect(this.width, this.currentLength, { color: "#8B4513" }));
  }

  /**
   * Strek hook uit
   */
  extend(delta) {
    this.currentLength += this.extendSpeed * (delta / 1000);
    
    if (this.currentLength >= this.maxLength) {
      this.currentLength = this.maxLength;
      this.isExtending = false;
      this.isRetracting = true;
    }
  }

  /**
   * Trek hook terug
   */
  retract(delta) {
    this.currentLength -= this.retractSpeed * (delta / 1000);
    
    if (this.currentLength <= this.originalLength) {
      this.currentLength = this.originalLength;
      this.isRetracting = false;
      
      // Als we fruit hebben, lever het af
      if (this.grabbedFruit) {
        this.deliverFruit();
      }
    }
  }

  /**
   * Lever fruit af aan robot
   */
  deliverFruit() {
    if (this.grabbedFruit) {
      // Trigger fruit delivery event
      console.log("Fruit delivered:", this.grabbedFruit.fruitType);
      this.grabbedFruit = null;
    }
  }
}
