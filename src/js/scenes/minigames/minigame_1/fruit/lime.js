import { Actor, Color } from "excalibur";
import { Fruit } from "./fruit.js";

/**
 * Lime fruit klasse (groen fruit)
 */
export class Lime extends Fruit {
  constructor(pos) {
    super(pos, 'lime');
    
    // Lime specifieke eigenschappen
    this.points = 10;
    this.color = Color.Green;
  }

  /**
   * Setup graphics voor lime
   */
  setupGraphics() {
    // Tijdelijke graphics - groene cirkel
    this.graphics.use(this.color);
    
    // TODO: Vervang met echte sprite als beschikbaar
    // this.graphics.use(Resources.Lime.toSprite());
  }

  /**
   * Handle collision specifiek voor lime
   */
  onCollision(evt) {
    super.onCollision(evt);
    
    // Check of collision met juiste mand (lime basket)
    if (evt.other.owner && evt.other.owner.basketType === 'lime') {
      console.log("Lime in juiste mand!");
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
