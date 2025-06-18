import { Actor, Vector, CollisionType, Rectangle, Color } from "excalibur";
import { Resources } from '../../../resources.js';

/**
 * Mand voor het verzamelen van specifieke fruit types
 */
export class Basket extends Actor {
  constructor(pos, fruitType) {
    super({
      pos,
      width: 80,
      height: 60,
      collisionType: CollisionType.Fixed
    });

    this.fruitType = fruitType; // 'lime', 'lemon', 'passionfruit'
    this.collectedFruit = [];
    this.maxCapacity = 10;
  }

  /**
   * Initialiseer mand graphics
   */
  onInitialize(engine) {
    // Setup mand graphics gebaseerd op fruit type
    this.setupGraphics();
    
    // Setup collision events
    this.on("collisionstart", (evt) => this.onCollision(evt));
  }
  /**
   * Setup graphics gebaseerd op fruit type
   */
  setupGraphics() {
    // Gebruik specifieke mand graphics voor elk fruit type
    switch (this.fruitType) {
      case 'lime':
        if (Resources.BasketMango) {
          this.graphics.use(Resources.BasketMango.toSprite());
        } else {
          const limeBasket = new Rectangle({
            width: this.width,
            height: this.height,
            color: Color.fromHex("#90EE90")
          });
          this.graphics.use(limeBasket);
        }
        break;
      case 'lemon':
        if (Resources.BasketOrange) {
          this.graphics.use(Resources.BasketOrange.toSprite());
        } else {
          const lemonBasket = new Rectangle({
            width: this.width,
            height: this.height,
            color: Color.fromHex("#FFFF00")
          });
          this.graphics.use(lemonBasket);
        }
        break;      case 'passionfruit':
        if (Resources.BasketPapaya) {
          this.graphics.use(Resources.BasketPapaya.toSprite());
        } else {
          const passionBasket = new Rectangle({
            width: this.width,
            height: this.height,
            color: Color.fromHex("#800080")
          });
          this.graphics.use(passionBasket);
        }
        break;
      default:
        const defaultBasket = new Rectangle({
          width: this.width,
          height: this.height,
          color: Color.fromHex("#8B4513")
        });
        this.graphics.use(defaultBasket);
    }
  }

  /**
   * Behandel collision met fruit of robot
   */
  onCollision(evt) {
    const other = evt.other.owner;
    
    // Check collision met robot die fruit heeft
    if (other.constructor.name === 'Robot') {
      this.checkFruitDelivery(other);
    }
  }

  /**
   * Check of robot fruit kan afleveren
   */
  checkFruitDelivery(robot) {
    const hook = robot.getHook();
    
    if (hook && hook.grabbedFruit) {
      const fruit = hook.grabbedFruit;
      
      if (this.canAcceptFruit(fruit)) {
        this.acceptFruit(fruit);
        hook.grabbedFruit = null;
      } else {
        this.rejectFruit(fruit);
      }
    }
  }

  /**
   * Check of mand dit fruit type kan accepteren
   */
  canAcceptFruit(fruit) {
    return fruit.fruitType === this.fruitType && 
           this.collectedFruit.length < this.maxCapacity;
  }

  /**
   * Accepteer fruit in mand
   */
  acceptFruit(fruit) {
    this.collectedFruit.push(fruit);
    console.log(`${this.fruitType} basket: fruit accepted! (${this.collectedFruit.length}/${this.maxCapacity})`);
    
    // Trigger score event
    this.scene.engine.emit('fruitAccepted', { fruitType: this.fruitType });
  }

  /**
   * Weiger fruit (verkeerd type of vol)
   */
  rejectFruit(fruit) {
    console.log(`${this.fruitType} basket: fruit rejected!`);
    
    // Trigger penalty event
    this.scene.engine.emit('fruitRejected', { fruitType: fruit.fruitType });
  }

  /**
   * Check of mand vol is
   */
  isFull() {
    return this.collectedFruit.length >= this.maxCapacity;
  }

  /**
   * Krijg aantal verzamelde fruit
   */
  getCollectedCount() {
    return this.collectedFruit.length;
  }

  /**
   * Reset mand (leeg maken)
   */
  reset() {
    this.collectedFruit = [];
  }
}
