import { Actor, Scene, Label, Vector, Color, Font, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Pointer } from '../../../player/robot/pointer.js';
import { Background2 } from "./background_2.js";
import { Food } from "./actors/food.js";
import { Customer } from "./actors/customer.js";
import { Order } from "./actors/order.js";
import { OrderDisplay } from "./ui/order_display.js";
import { TimerDisplay } from "./ui/timer_display.js";
import { ScoreDisplay } from "./ui/score_display.js";
import { GameState } from "./managers/game_state.js";
import { InstructionScreen } from "./screens/instruction_screen.js";
import { SuccessScreen } from "./screens/success_screen.js";
import { FailScreen } from "./screens/fail_screen.js";

// Constanten voor betere leesbaarheid en onderhoud
const GAME_CONFIG = {
    TIMER_POS: { x: 1080, y: 50 },
    CUSTOMER_POS: new Vector(735, 220),
    FOOD_POSITIONS: {
        food1: new Vector(100, 100),
        food2: new Vector(300, 100), 
        food3: new Vector(200, 200),
        food4: new Vector(1050, 500),
        food5: new Vector(950, 500)
    },
    FOOD_SCALE: 0.8,
    ORDER_UPDATE_DELAY: 100,
    CUSTOMER_SPAWN_DELAY: 1000
};

export class Minigame_2 extends Scene {
    #orderDisplay
    #currentCustomer
    #timerDisplay
    #scoreDisplay
    #gameState = new GameState()
    #gameActive = true

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame2(engine)
        
        // Event listeners voor game flow
        this.engine.on('orderComplete', (evt) => {
            if(evt.success) {
                // Update game state
                this.#gameState.incrementOrder()
                
                // Update score display
                this.#scoreDisplay.updateScore(this.#gameState.getScore())
                
                // Check of game compleet is
                if (this.#gameState.isGameComplete()) {
                    console.log("Alle orders voltooid! Ga naar success screen")
                    engine.goToScene('minigame_2_success', { 
                        data: { 
                            finalScore: this.#gameState.getScore() 
                        } 
                    })
                } else {
                    // Spawn nieuwe customer na delay
                    setTimeout(() => this.spawnNewCustomer(), GAME_CONFIG.CUSTOMER_SPAWN_DELAY)
                }
            }
        })
        
        // Luister naar timeUp event van TimerDisplay
        this.engine.on('timeUp', () => {
            this.#gameActive = false;
            console.log("Game Over! Tijd is op!");
            engine.goToScene('minigame_2_fail', {
                data: {
                    finalScore: this.#gameState.getScore(),
                    ordersCompleted: this.#gameState.getOrdersCompleted()
                }
            })
        })
        
        // Luister naar foodDelivered event voor highlighting
        this.engine.on('foodDelivered', (evt) => {
            this.#orderDisplay.highlightDeliveredItem(evt.foodId)
        })
        
        // Luister naar orderReset event voor highlighting reset
        this.engine.on('orderReset', (evt) => {
            this.#orderDisplay.resetHighlights()
        })    }

    onInitialize(engine) {
        // Voeg debugknop toe: druk op D om een nieuwe customer te spawnen
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === 'd' || evt.key === 'D') {
                this.spawnNewCustomer()
                console.log('DEBUG: Nieuwe customer gespawned:', this.#currentCustomer?.getOrder?.())
            }
        })

        console.log("Minigame_2 geïnitialiseerd")
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame2(engine) {
        console.log("Start minigame 2!");
        
        // Voeg game elementen toe
        this.#addGameElements();
        this.#createTimer();
        this.#createScoreDisplay();
        this.#createOrderDisplay();
        this.#spawnInitialCustomer();
    }

    // Voegt basis game elementen toe (pointer, background, food items)
    #addGameElements() {
        const pointer = new Pointer(new Vector(200, 200));
        this.add(pointer);
        this.add(new Background2());
        
        // Voeg food items toe met constanten
        this.add(new Food(GAME_CONFIG.FOOD_POSITIONS.food1, Resources.Food1, 1));
        this.add(new Food(GAME_CONFIG.FOOD_POSITIONS.food2, Resources.Food2, 2));
        this.add(new Food(GAME_CONFIG.FOOD_POSITIONS.food3, Resources.Food3, 3));
        this.add(new Food(GAME_CONFIG.FOOD_POSITIONS.food4, Resources.Food4, 4, GAME_CONFIG.FOOD_SCALE));
        this.add(new Food(GAME_CONFIG.FOOD_POSITIONS.food5, Resources.Food5, 5, GAME_CONFIG.FOOD_SCALE));    }

    // Maakt de timer display aan
    #createTimer() {
        try {
            this.#timerDisplay = new TimerDisplay(new Vector(GAME_CONFIG.TIMER_POS.x, GAME_CONFIG.TIMER_POS.y));
            this.add(this.#timerDisplay);
            
            console.log("Timer succesvol toegevoegd");
        } catch (error) {
            console.error("Fout bij maken timer:", error);
        }
    }

    // Maakt de score display aan
    #createScoreDisplay() {
        try {
            this.#scoreDisplay = new ScoreDisplay(new Vector(50, 50));
            this.add(this.#scoreDisplay);
            
            console.log("Score display succesvol toegevoegd");
        } catch (error) {
            console.error("Fout bij maken score display:", error);
        }
    }

    // Maakt en toont de order display
    #createOrderDisplay() {
        this.#orderDisplay = new OrderDisplay();
        this.add(this.#orderDisplay);    }

    // Spawnt de eerste customer
    #spawnInitialCustomer() {
        const orderSize = this.#gameState.getCurrentOrderSize();
        this.#currentCustomer = new Customer(GAME_CONFIG.CUSTOMER_POS, Resources.Customer1, orderSize);
        this.add(this.#currentCustomer);

        // Update display met kleine delay voor initialisatie
        setTimeout(() => {
            this.#updateOrderDisplay();
        }, GAME_CONFIG.ORDER_UPDATE_DELAY);
        
        console.log(`Eerste customer gespawned met order size: ${orderSize}`);
    }

    // Update de order display als het bestaat
    #updateOrderDisplay() {
        if (this.#orderDisplay && this.#currentCustomer) {
            this.#orderDisplay.updateOrder(this.#currentCustomer.getOrder());
        }
    }

    spawnNewCustomer() {
        // Verwijder oude customer als die bestaat
        if (this.#currentCustomer) {
            this.remove(this.#currentCustomer);
        }

        // Bepaal beschikbare customer sprites met veilige resource checks
        const availableSprites = this.#getAvailableCustomerSprites();
        
        // Random pick een sprite
        const randomSprite = availableSprites[Math.floor(Math.random() * availableSprites.length)];
        
        // Gebruik GameState voor progressive difficulty
        const orderSize = this.#gameState.getCurrentOrderSize();
        
        // Maak nieuwe customer aan met progressive order size
        this.#currentCustomer = new Customer(GAME_CONFIG.CUSTOMER_POS, randomSprite, orderSize);
        this.add(this.#currentCustomer);
        
        // Update order display
        this.#updateOrderDisplay();
        
        console.log(`Nieuwe customer gespawned met order size: ${orderSize}`);
    }

    // Bepaalt welke customer sprites beschikbaar zijn met veilige checks
    #getAvailableCustomerSprites() {
        const sprites = [Resources.Customer1]; // Altijd beschikbaar
        
        // Veilige checks voor optionele resources
        if (Resources.Customer2) sprites.push(Resources.Customer2);
        if (Resources.Persona2) sprites.push(Resources.Persona2);
        if (Resources.Persona3) sprites.push(Resources.Persona3);
        
        return sprites;
    }

    onPreUpdate(engine, delta) {
        // Geen timer logic meer nodig - wordt afgehandeld door TimerDisplay
        // Game over wordt afgehandeld door timeUp event listener
    }
}