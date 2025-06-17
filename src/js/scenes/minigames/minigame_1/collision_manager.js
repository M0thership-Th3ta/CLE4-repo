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
  update(robot, tree, baskets) {
    this.checkHookFruitCollisions(robot.getHook(), tree);
    this.checkRobotBasketCollisions(robot, baskets);
  }

  /**
   * Check collisions tussen hook en fruit op boom
   */
  checkHookFruitCollisions(hook, tree) {
    if (!hook || !hook.isExtending) return;

    const fruits = tree.getFruits();
    
    fruits.forEach(fruit => {
      if (fruit.visible && this.isColliding(hook, fruit)) {
        if (!this.activeCollisions.has(fruit.id)) {
          this.activeCollisions.add(fruit.id);
          hook.grabFruit(fruit);
        }
      }
    });
  }

  /**
   * Check collisions tussen robot en manden
   */
  checkRobotBasketCollisions(robot, baskets) {
    baskets.forEach(basket => {
      if (this.isColliding(robot, basket)) {
        // Collision wordt behandeld door basket zelf
      }
    });
  }

  /**
   * Check of twee actors botsen
   */
  isColliding(actor1, actor2) {
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
