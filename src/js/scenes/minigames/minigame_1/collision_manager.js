/**
 * Beheert collision detection tussen hook en fruit
 */
export class CollisionManager {
  constructor() {
    this.activeCollisions = new Set();
  }
  /**
   * Update collision detection elke frame
   */
  update(robot, trees, baskets) {
    this.checkHookFruitCollisions(robot.getHook(), trees);
    this.checkRobotBasketCollisions(robot, baskets);
  }  /**
   * Check collisions tussen hook en fruit op bomen
   */
  checkHookFruitCollisions(hook, trees) {
    if (!hook || !hook.isExtending || !trees || trees.length === 0) return;

    trees.forEach(tree => {
      if (!tree) return;
      
      // Check of tree getFruits methode heeft
      if (typeof tree.getFruits !== 'function') return;

      const fruits = tree.getFruits();
      
      fruits.forEach(fruit => {
        if (fruit.visible && this.isColliding(hook, fruit)) {
          if (!this.activeCollisions.has(fruit.id)) {
            this.activeCollisions.add(fruit.id);
            hook.grabFruit(fruit);
          }
        }
      });
    });
  }
  /**
   * Check collisions tussen robot en manden
   */
  checkRobotBasketCollisions(robot, baskets) {
    // Controleer of robot en baskets bestaan
    if (!robot || !baskets) {
      return;
    }

    baskets.forEach(basket => {
      // Controleer of basket bestaat voordat we collision checken
      if (basket && this.isColliding(robot, basket)) {
        // Collision wordt behandeld door basket zelf
        console.log("Robot raakt basket!");
      }
    });
  }

  /**
   * Check of twee actors botsen
   */
  isColliding(actor1, actor2) {
    // Controleer of beide actors bestaan en bounds hebben
    if (!actor1 || !actor2 || !actor1.body || !actor2.body || 
        !actor1.body.collisionArea || !actor2.body.collisionArea) {
      return false;
    }

    const bounds1 = actor1.body.collisionArea.bounds;
    const bounds2 = actor2.body.collisionArea.bounds;
    
    return bounds1.left < bounds2.right &&
           bounds1.right > bounds2.left &&
           bounds1.top < bounds2.bottom &&
           bounds1.bottom > bounds2.top;
  }

  /**
   * Verwijder collision uit actieve set
   */
  removeCollision(fruitId) {
    this.activeCollisions.delete(fruitId);
  }

  /**
   * Reset alle actieve collisions
   */
  reset() {
    this.activeCollisions.clear();
  }
}
