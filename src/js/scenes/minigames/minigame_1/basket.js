import { Actor, Vector, CollisionType, Rectangle, Color, GraphicsGroup } from "excalibur";
import { Resources } from '../../../resources.js';

/**
 * Mand voor het verzamelen van specifieke fruit types
 */
export class Basket extends Actor {  constructor(pos, fruitType) {
    super({
      pos,
      width: 120,
      height: 100,
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
  }  /**
   * Setup graphics gebaseerd op fruit type
   */
  setupGraphics() {
    // Maak basket sprite
    const basketSprite = Resources.Basket.toSprite();
    basketSprite.scale = new Vector(2, 2); // Maak basket groter
    
    // Maak fruit sprite bovenop de basket
    let fruitSprite;
    switch (this.fruitType) {
      case 'lime':
        fruitSprite = Resources.Lime.toSprite();
        break;
      case 'lemon':
        fruitSprite = Resources.Lemon.toSprite();
        break;
      case 'passionfruit':
        fruitSprite = Resources.Passionfruit.toSprite();
        break;
      default:
        fruitSprite = Resources.Lemon.toSprite();
    }    // Schaal fruit sprite kleiner voor badge effect
    fruitSprite.scale = new Vector(0.8, 0.8);
    
    // Positioneer fruit als badge op de voorkant van de basket (gecentreerd)
    fruitSprite.offset = new Vector(0, -5);
    
    // Combineer basket en fruit in een graphics group
    const group = new GraphicsGroup({
      members: [
        { graphic: basketSprite, offset: Vector.Zero },
        { graphic: fruitSprite, offset: new Vector(0, -5) }
      ]
    });
    
    this.graphics.use(group);
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
