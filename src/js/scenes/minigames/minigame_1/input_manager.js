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
    // Basket posities (3 baskets) - moet overeenkomen met FruitGrabberGame
    this.basketPositions = [200, 640, 1080]; // x-coördinaten van de 3 baskets
    this.currentBasket = 1; // Start bij basket 2 (midden, index 1)
    this.controllerInputCooldown = 0; // Voor controller input debouncing
  }

  /**
   * Update input handling elke frame
   */
  update(engine, robot) {
    this.handleMovement(engine, robot);
    this.handleActions(engine, robot);
    this.handleControllerInput(engine, robot);
  }
  
  /**
   * Handle controller input voor movement en actions
   */
  handleControllerInput(engine, robot) {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gamepad = gamepads[0];
    
    if (gamepad) {
      // D-pad of linker stick horizontaal voor basket switching
      const leftStickX = gamepad.axes[0] || 0;
      
      // D-pad knoppen - links is meestal index 14, rechts is index 15
      const dpadLeft = gamepad.buttons[14] && gamepad.buttons[14].pressed;
      const dpadRight = gamepad.buttons[15] && gamepad.buttons[15].pressed;
      
      // Linker stick deadzone check
      const stickLeft = leftStickX < -0.5;
      const stickRight = leftStickX > 0.5;
      
      // Debounce mechanisme om herhaalde inputs te voorkomen
      if (!this.controllerInputCooldown) {
        if (dpadLeft || stickLeft) {
          this.jumpToBasket(robot, -1);
          this.controllerInputCooldown = 20; // 20 frames cooldown
        } else if (dpadRight || stickRight) {
          this.jumpToBasket(robot, 1);
          this.controllerInputCooldown = 20;
        }
        
        // A knop (index 0) voor hook action - Xbox A of PlayStation X
        if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
          robot.useHook();
          this.controllerInputCooldown = 10; // Korte cooldown voor hook
        }
      }
      
      // Verlaag cooldown timer
      if (this.controllerInputCooldown > 0) {
        this.controllerInputCooldown--;
      }
    }
  }

  /**
   * Behandel robot beweging - nu met basket jumping
   */
  handleMovement(engine, robot) {
    // Check voor basket jumps (alleen bij wasPressed, niet isHeld)
    if (engine.input.keyboard.wasPressed(this.keys.left)) {
      this.jumpToBasket(robot, -1); // Spring naar links
    }

    if (engine.input.keyboard.wasPressed(this.keys.right)) {
      this.jumpToBasket(robot, 1); // Spring naar rechts
    }
  }

  /**
   * Spring naar een andere basket
   */
  jumpToBasket(robot, direction) {
    // Check of movement mogelijk is vanaf huidige basket
    if (!this.canMoveToBasket(direction)) {
      console.log("Kan niet verder in deze richting");
      return;
    }    // Bereken nieuwe basket index
    const newBasketIndex = this.currentBasket + direction;
    const targetX = this.basketPositions[newBasketIndex];
    const targetY = 650; // Robot positie onder de baskets

    console.log(`Spring naar basket ${newBasketIndex + 1} op positie: x=${targetX}, y=${targetY}`);

    // Spring naar nieuwe positie (alleen numerieke waarden!)
    robot.jumpToPosition(targetX, targetY);
    
    // Update basket index na de sprong
    this.currentBasket = newBasketIndex;
    console.log(`Robot is nu bij basket ${this.currentBasket + 1}`);
  }

  /**
   * Check of robot naar bepaalde richting kan bewegen
   */
  canMoveToBasket(direction) {
    const newBasketIndex = this.currentBasket + direction;
    
    // Basket 1 (index 0): alleen naar rechts
    if (this.currentBasket === 0 && direction === -1) {
      return false;
    }
    
    // Basket 3 (index 2): alleen naar links  
    if (this.currentBasket === 2 && direction === 1) {
      return false;
    }
    
    // Check of nieuwe index geldig is
    return newBasketIndex >= 0 && newBasketIndex < this.basketPositions.length;
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

  /**
   * Krijg huidige basket nummer (1-3)
   */
  getCurrentBasketNumber() {
    return this.currentBasket + 1;
  }

  /**
   * Krijg huidige basket positie
   */
  getCurrentBasketPosition() {
    return this.basketPositions[this.currentBasket];
  }

  /**
   * Zet robot bij specifieke basket
   */
  setCurrentBasket(basketIndex) {
    if (basketIndex >= 0 && basketIndex < this.basketPositions.length) {
      this.currentBasket = basketIndex;
    }
  }
}
