import { Actor, Vector, CollisionType, Rectangle, Color } from "excalibur";

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
  }  /**
   * Initialiseer hook graphics en collision
   */
  onInitialize(engine) {
    // Setup graphics
    this.updateGraphics();
    
    // Setup collision events
    this.on("collisionstart", (evt) => this.onCollision(evt));
  }

  /**
   * Update graphics van de hook
   */
  updateGraphics() {
    // Voor nu gebruiken we gewoon een simpele rechthoek voor de hook
    // Later kunnen we dit uitbreiden met een touw visual
    const hookRect = new Rectangle({
      width: this.width,
      height: this.height,
      color: Color.fromHex("#8B4513")
    });
    
    this.graphics.use(hookRect);
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
  }  /**
   * Update hook logica elke frame
   */
  onPostUpdate(engine, delta) {
    let shouldUpdate = false;

    if (this.isExtending) {
      this.extend(delta);
      shouldUpdate = true;
    } else if (this.isRetracting) {
      this.retract(delta);
      shouldUpdate = true;
    }

    // Update graphics alleen als er verandering is
    if (shouldUpdate) {
      this.updateGraphics();
    }
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
