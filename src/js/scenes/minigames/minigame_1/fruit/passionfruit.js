import { Actor, Color } from "excalibur";
import { Fruit } from "./fruit.js";

/**
 * Passionfruit fruit klasse (paars/oranje fruit)
 */
export class Passionfruit extends Fruit {
  constructor(pos) {
    super(pos, 'passionfruit');
    
    // Passionfruit specifieke eigenschappen
    this.points = 20;
    this.color = Color.fromHex('#8B4513'); // Bruinoranje kleur voor passionfruit
  }

  /**
   * Setup graphics voor passionfruit
   */
  setupGraphics() {
    // Tijdelijke graphics - bruinoranje cirkel
    this.graphics.use(this.color);
    
    // TODO: Vervang met echte sprite als beschikbaar
    // this.graphics.use(Resources.Passionfruit.toSprite());
  }

  /**
   * Handle collision specifiek voor passionfruit
   */
  onCollision(evt) {
    super.onCollision(evt);
    
    // Check of collision met juiste mand (passionfruit basket)
    if (evt.other.owner && evt.other.owner.basketType === 'passionfruit') {
      console.log("Passionfruit in juiste mand!");
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
