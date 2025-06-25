import { Scene, Vector } from "excalibur";
import { ScoreManager } from "./score_manager.js";
import { GameTimer } from "./game_timer.js";
import { InputManager } from "./input_manager.js";
import { Robot } from "./robot.js";
import { Tree } from "./tree.js";
import { Basket } from "./basket.js";
import { CollisionManager } from "./collision_manager.js";

/**
 * Minigame 1 - Fruit Grabber Game
 * De robot moet fruit uit bomen plukken en in de juiste manden gooien
 */
export class Minigame_1 extends Scene {
    constructor() {
        super();
        
        // Game managers
        this.scoreManager = null;
        this.gameTimer = null;
        this.inputManager = null;
        this.collisionManager = null;
        
        // Game objects
        this.robot = null;
        this.trees = [];
        this.baskets = [];
        
        // Game state
        this.isGameActive = false;
    }

    /**
     * Initialiseer de minigame scene
     */
    onInitialize(engine) {
        this.setupGameManagers();
        this.setupGameObjects(engine);
    }

    /**
     * Start het spel zodra de scene actief wordt
     */
    onActivate(engine) {
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
        this.robot = new Robot(new Vector(640, 650)); // Lager op het scherm
        
        // Maak 3 bomen zoals in de afbeelding
        this.createTrees();
        
        // Maak manden
        this.createBaskets();
        
        // Voeg objecten toe aan scene
        this.add(this.robot);
        this.trees.forEach(tree => this.add(tree));
        this.baskets.forEach(basket => this.add(basket));
    }

    /**
     * Maak 3 fruit bomen
     */
    createTrees() {
        // Drie bomen verdeeld over het scherm
        this.trees.push(new Tree(new Vector(300, 250))); // Links
        this.trees.push(new Tree(new Vector(640, 250))); // Midden
        this.trees.push(new Tree(new Vector(980, 250))); // Rechts
    }

    /**
     * Maak fruit manden
     */
    createBaskets() {
        // Drie manden voor verschillende fruit types - links lemon, midden passionfruit, rechts lime
        this.baskets.push(new Basket(new Vector(200, 600), 'lemon'));     // Links
        this.baskets.push(new Basket(new Vector(640, 600), 'passionfruit')); // Midden  
        this.baskets.push(new Basket(new Vector(1080, 600), 'lime'));    // Rechts
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
        this.collisionManager.update(this.robot, this.trees, this.baskets);
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