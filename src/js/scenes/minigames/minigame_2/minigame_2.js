import { Scene, Vector } from "excalibur";
import { Resources } from '../../../resources.js';
import { Pointer } from '../../../player/robot/pointer.js';
import { Background2 } from "./background_2.js";
import { Food } from "./actors/food.js";
import { Customer } from "./actors/customer.js";
import { OrderDisplay } from "./ui/order_display.js";
import { TimerDisplay } from "./ui/timer_display.js";
import { OrderCounter } from "./ui/order_counter.js";
import { GameState } from "./managers/game_state.js";
import { InstructionScreen } from "./screens/instruction_screen.js";
import { SuccessScreen } from "./screens/success_screen.js";
import { GameCompletedScene } from "../../cutscenes/gamecompleted.js";

// Constanten voor betere leesbaarheid en onderhoud
const GAME_CONFIG = {
    ORDER_COUNTER_POS: { x: 87, y: 135 }, // Iets meer naar links (was 125)
    TIMER_POS: { x: 150, y: 95 }, // Meer naar rechts verplaatst (was 50)
    CUSTOMER_POS: new Vector(735, 183),    FOOD_POSITIONS: {
        food1: new Vector(275, 280), // Verplaatst naar aanrecht
        food2: new Vector(125, 270), // Verplaatst naar aanrecht
        food3: new Vector(450, 275), // Verplaatst naar aanrecht
        food4: new Vector(1100, 460),
        food5: new Vector(1200, 575)
    },
    FOOD_SCALE: 0.8,
    CUSTOMER_SCALE: 0.15, // 2x zo groot als de vorige 0.1 (nu 20% van origineel)
    ORDER_UPDATE_DELAY: 100,
    CUSTOMER_SPAWN_DELAY: 1000
};

export class Minigame_2 extends Scene {
    #orderDisplay
    #currentCustomer
    #timerDisplay
    #orderCounter
    #gameState = null // Initialiseer als null, maak pas aan bij onActivate
    #gameActive = true

    constructor() {
        super()
    }

    onActivate(engine) {
        // Verwijder alle oude event listeners om dubbele events te voorkomen
        this.engine.off('orderComplete')
        this.engine.off('timeUp')
        this.engine.off('foodDelivered')
        this.engine.off('orderReset')
        
        // Zorg ervoor dat er maar één GameState instance is
        if (!this.#gameState) {
            this.#gameState = new GameState()
        }
        
        // Hard reset de game state
        this.#gameState.reset()
        
        // Start de minigame
        this.startMinigame2(engine)
        
        // Event listeners voor game flow
        this.engine.on('orderComplete', (evt) => {
            if(evt.success) {
                // Update game state
                this.#gameState.incrementOrder()

                // Update order counter
                if (this.#orderCounter) {
                    this.#orderCounter.updateOrder(this.#gameState.getOrdersCompleted())
                }

                // Check of game compleet is
                if (this.#gameState.isGameComplete()) {
                    console.log("Alle orders voltooid! Ga naar success screen")
                    this.engine.goToScene('gamecompleted', { 
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
            this.engine.goToScene('minigame2_fail_screen', {
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
        console.log("Minigame_2 geïnitialiseerd")
        
        // Event listener voor debug toetsen
        engine.input.keyboard.on('press', (evt) => {
            // Voeg G-toets toe voor game state debug
            if (evt.key === 'g' || evt.key === 'G') {
                this.debugGameState()
            }
        })
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame2(engine) {
        console.log("Start minigame 2!");
        
        // Clear alle bestaande actors voor herstart
        this.clear()
        
        // Reset gameActive flag
        this.#gameActive = true
        
        // Voeg game elementen toe
        this.#addGameElements();
        this.#createTimer();
        this.#createOrderCounter();
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
        this.add(new Food(GAME_CONFIG.FOOD_POSITIONS.food5, Resources.Food5, 5, GAME_CONFIG.FOOD_SCALE));    }    // Maakt de timer display aan
    #createTimer() {
        try {
            console.log('=== TIMER CREATION START ===')
            this.#timerDisplay = new TimerDisplay(new Vector(GAME_CONFIG.TIMER_POS.x, GAME_CONFIG.TIMER_POS.y));
            this.add(this.#timerDisplay);
            
            console.log("Timer succesvol toegevoegd");
            console.log('Timer object:', this.#timerDisplay);
            
            // Debug: Check timer status na toevoegen
            setTimeout(() => {
                console.log('Timer debug info na toevoegen:', this.#timerDisplay.getDebugInfo());
                console.log('Timer in scene check:', this.actors.includes(this.#timerDisplay));            }, 100);
            
        } catch (error) {
            console.error("Fout bij maken timer:", error);
        }
    }

    // Maakt de order counter aan
    #createOrderCounter() {
        this.#orderCounter = new OrderCounter(new Vector(GAME_CONFIG.ORDER_COUNTER_POS.x, GAME_CONFIG.ORDER_COUNTER_POS.y));
        this.add(this.#orderCounter);
        
        // Zet de counter op de juiste startwaarde
        this.#orderCounter.updateOrder(0) // 0 omdat updateOrder +1 doet
    }

    // Maakt en toont de order display
    #createOrderDisplay() {
        this.#orderDisplay = new OrderDisplay();
        this.add(this.#orderDisplay);    }    // Spawnt de eerste customer
    #spawnInitialCustomer() {
        console.log(`=== SPAWN INITIAL CUSTOMER ===`)
        console.log(`Game state voor spawning:`, this.#gameState.getOrderProgressionInfo())
        
        // Bepaal beschikbare customer sprites
        const availableSprites = this.#getAvailableCustomerSprites();
        
        // Random pick een sprite voor de eerste customer ook
        const randomSprite = availableSprites[Math.floor(Math.random() * availableSprites.length)];
        
        const orderSize = this.#gameState.getCurrentOrderSize();
        this.#currentCustomer = new Customer(GAME_CONFIG.CUSTOMER_POS, randomSprite, orderSize, GAME_CONFIG.CUSTOMER_SCALE);
        this.add(this.#currentCustomer);

        // Update display met kleine delay voor initialisatie
        setTimeout(() => {
            this.#updateOrderDisplay();
        }, GAME_CONFIG.ORDER_UPDATE_DELAY);
        
        console.log(`Eerste customer gespawned met order size: ${orderSize}`)
    }

    // Update de order display als het bestaat
    #updateOrderDisplay() {
        if (this.#orderDisplay && this.#currentCustomer) {
            this.#orderDisplay.updateOrder(this.#currentCustomer.orderArray)
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
        this.#currentCustomer = new Customer(GAME_CONFIG.CUSTOMER_POS, randomSprite, orderSize, GAME_CONFIG.CUSTOMER_SCALE);
        this.add(this.#currentCustomer);
        
        // Update order display
        this.#updateOrderDisplay()
        
        console.log(`Nieuwe customer gespawned met order size: ${orderSize}`)
    }

    // Bepaalt welke customer sprites beschikbaar zijn met veilige checks
    #getAvailableCustomerSprites() {
        const sprites = [] // Lege array voor snackbar personages
        
        // Gebruik de 4 verschillende snackbar-personage sprites
        if (Resources.snackbar_personage1) sprites.push(Resources.snackbar_personage1)
        if (Resources.snackbar_personage2) sprites.push(Resources.snackbar_personage2)
        if (Resources.snackbar_personage3) sprites.push(Resources.snackbar_personage3)
        if (Resources.snackbar_personage4) sprites.push(Resources.snackbar_personage4)
        
        // Fallback naar Customer1 als geen snackbar sprites beschikbaar zijn
        if (sprites.length === 0) {
            sprites.push(Resources.Customer1)
        }
        
        return sprites
    }

    onPreUpdate(engine, delta) {
        // Geen timer logic meer nodig - wordt afgehandeld door TimerDisplay
        // Game over wordt afgehandeld door timeUp event listener
    }
}