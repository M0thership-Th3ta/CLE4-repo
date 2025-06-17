import { Actor, Scene, Vector } from "excalibur";
import { ScoreManager } from "./score_manager.js";
import { GameTimer } from "./game_timer.js";
import { InputManager } from "./input_manager.js";
import { Robot } from "./robot.js";
import { Tree } from "./tree.js";
import { Basket } from "./basket.js";
import { CollisionManager } from "./collision_manager.js";

/**
 * Hoofdklasse voor het Fruit Grabber minigame
 * Beheert alle game componenten en game flow
 */
export class FruitGrabberGame extends Actor {
  constructor() {
    super();
    
    // Game managers
    this.scoreManager = null;
    this.gameTimer = null;
    this.inputManager = null;
    this.collisionManager = null;
    
    // Game objects
    this.robot = null;
    this.tree = null;
    this.baskets = [];
    
    // Game state
    this.isGameActive = false;
  }

  /**
   * Initialiseer het fruit grabber spel
   */
  onInitialize(engine) {
    this.setupGameManagers();
    this.setupGameObjects(engine);
    this.startGame();
  }

  /**
   * Setup alle game managers
   */
  setupGameManagers() {
    this.scoreManager = new ScoreManager();
    this.gameTimer = new GameTimer(60); // 60 seconden game tijd
    this.inputManager = new InputManager();
    this.collisionManager = new CollisionManager();
  }

  /**
   * Setup alle game objecten
   */
  setupGameObjects(engine) {
    // Maak robot speler
    this.robot = new Robot(new Vector(640, 500));
    
    // Maak boom met fruit
    this.tree = new Tree(new Vector(640, 300));
    
    // Maak manden
    this.createBaskets();
    
    // Voeg objecten toe aan scene
    this.scene.add(this.robot);
    this.scene.add(this.tree);
    this.baskets.forEach(basket => this.scene.add(basket));
  }

  /**
   * Maak fruit manden
   */
  createBaskets() {
    // Drie manden voor verschillende fruit types
    this.baskets.push(new Basket(new Vector(200, 600), 'lime'));
    this.baskets.push(new Basket(new Vector(640, 600), 'lemon'));
    this.baskets.push(new Basket(new Vector(1080, 600), 'passionfruit'));
  }

  /**
   * Start het spel
   */
  startGame() {
    this.isGameActive = true;
    this.gameTimer.start();
  }

  /**
   * Update game logic elke frame
   */
  onPostUpdate(engine, delta) {
    if (!this.isGameActive) return;

    // Update alle managers
    this.inputManager.update(engine, this.robot);
    this.collisionManager.update(this.robot, this.tree, this.baskets);
    this.gameTimer.update(delta);
    
    // Check win/lose condities
    this.checkGameEnd();
  }

  /**
   * Check of het spel moet eindigen
   */
  checkGameEnd() {
    if (this.gameTimer.isTimeUp()) {
      this.endGame();
    }
  }

  /**
   * Eindig het spel
   */
  endGame() {
    this.isGameActive = false;
    console.log(`Game over! Final score: ${this.scoreManager.getScore()}`);
  }
}
