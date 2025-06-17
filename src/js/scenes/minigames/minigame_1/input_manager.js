import { Keys } from "excalibur";

/**
 * Beheert keyboard input voor robot beweging en hook acties
 */
export class InputManager {
  constructor() {
    this.keys = {
      left: Keys.ArrowLeft,
      right: Keys.ArrowRight,
      action: Keys.Space
    };
  }

  /**
   * Update input handling elke frame
   */
  update(engine, robot) {
    this.handleMovement(engine, robot);
    this.handleActions(engine, robot);
  }

  /**
   * Behandel robot beweging
   */
  handleMovement(engine, robot) {
    let xSpeed = 0;

    if (engine.input.keyboard.isHeld(this.keys.left)) {
      xSpeed = -robot.speed;
    }

    if (engine.input.keyboard.isHeld(this.keys.right)) {
      xSpeed = robot.speed;
    }

    robot.setMovement(xSpeed);
  }

  /**
   * Behandel actie inputs (hook gebruiken)
   */
  handleActions(engine, robot) {
    if (engine.input.keyboard.wasPressed(this.keys.action)) {
      robot.useHook();
    }
  }

  /**
   * Check of een specifieke toets wordt ingedrukt
   */
  isKeyPressed(engine, key) {
    return engine.input.keyboard.wasPressed(key);
  }

  /**
   * Check of een specifieke toets wordt ingehouden
   */
  isKeyHeld(engine, key) {
    return engine.input.keyboard.isHeld(key);
  }
}
