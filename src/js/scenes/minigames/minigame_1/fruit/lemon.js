import { Actor, Color } from "excalibur";
import { Fruit } from "./fruit.js";

/**
 * Lemon fruit klasse (geel fruit)
 */
export class Lemon extends Fruit {
  constructor(pos) {
    super(pos, 'lemon');
    
    // Lemon specifieke eigenschappen
    this.points = 15;
    this.color = Color.Yellow;
  }

  /**
   * Setup graphics voor lemon
   */
  setupGraphics() {
    // Tijdelijke graphics - gele cirkel
    this.graphics.use(this.color);
    
    // TODO: Vervang met echte sprite als beschikbaar
    // this.graphics.use(Resources.Lemon.toSprite());
  }

  /**
   * Handle collision specifiek voor lemon
   */
  onCollision(evt) {
    super.onCollision(evt);
    
    // Check of collision met juiste mand (lemon basket)
    if (evt.other.owner && evt.other.owner.basketType === 'lemon') {
      console.log("Lemon in juiste mand!");
      this.collectFruit();
    }
  }

  /**
   * Collect dit fruit (geef punten en verwijder)
   */
  collectFruit() {
    // Emit event voor score update
    this.scene.emit('fruitCollected', { 
      fruitType: this.fruitType, 
      points: this.points 
    });
    
    // Verwijder fruit van scene
    this.kill();
  }
}
