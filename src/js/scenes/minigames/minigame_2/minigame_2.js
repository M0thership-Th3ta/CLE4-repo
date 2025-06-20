import { Actor, Scene, Label, Vector, Color, Font, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Pointer } from '../../../player/robot/pointer.js';
import { Background2 } from "./background_2.js";
import { Food } from "./food.js";
import { Customer } from "./customers.js";
import { OrderDisplay } from "./order_display.js";

// Constanten voor betere leesbaarheid en onderhoud
const GAME_CONFIG = {
    START_TIME: 60,
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
    TIMER_FONT_SIZE: 32,
    TIMER_Z_INDEX: 100,
    ORDER_UPDATE_DELAY: 100,
    CUSTOMER_SPAWN_DELAY: 1000
};

export class Minigame_2 extends Scene {
    #orderDisplay
    #currentCustomer
    #timeRemaining = GAME_CONFIG.START_TIME
    #timerLabel
    #timerActor
    #gameActive = true

    constructor() {
        super()
    }    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame2(engine)
          this.engine.on('orderComplete', (evt) => {
            if(evt.success) {
                setTimeout(() => this.spawnNewCustomer(), GAME_CONFIG.CUSTOMER_SPAWN_DELAY)
            }
        })
    }

    onInitialize(engine) {
        // Voeg debugknop toe: druk op D om een nieuwe customer te spawnen
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === 'd' || evt.key === 'D') {
                this.spawnNewCustomer()
                console.log('DEBUG: Nieuwe customer gespawned:', this.#currentCustomer?.getOrder?.())
            }
        })
    }    // Deze functie bevat de minigame functionaliteit
    startMinigame2(engine) {
        console.log("Start minigame 2!");
        
        // Voeg game elementen toe
        this.#addGameElements();
        this.#createTimer();
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
        this.add(new Food(GAME_CONFIG.FOOD_POSITIONS.food5, Resources.Food5, 5, GAME_CONFIG.FOOD_SCALE));
    }

    // Maakt de timer aan met vaste positie
    #createTimer() {
        try {
            this.#timerActor = new Actor({
                pos: new Vector(GAME_CONFIG.TIMER_POS.x, GAME_CONFIG.TIMER_POS.y),
                z: GAME_CONFIG.TIMER_Z_INDEX
            });
            
            const timerFont = new Font({
                size: GAME_CONFIG.TIMER_FONT_SIZE,
                unit: FontUnit.Px,
                color: Color.Red
            });
            
            this.#timerLabel = new Label({
                text: `Tijd: ${this.#timeRemaining}`,
                pos: Vector.Zero,
                font: timerFont
            });
            
            this.#timerActor.addChild(this.#timerLabel);
            this.add(this.#timerActor);
            
            console.log("Timer succesvol toegevoegd");
        } catch (error) {
            console.error("Fout bij maken timer:", error);
        }
    }

    // Maakt en toont de order display
    #createOrderDisplay() {
        this.#orderDisplay = new OrderDisplay();
        this.add(this.#orderDisplay);
    }

    // Spawnt de eerste customer
    #spawnInitialCustomer() {
        this.#currentCustomer = new Customer(GAME_CONFIG.CUSTOMER_POS, Resources.Customer1);
        this.add(this.#currentCustomer);

        // Update display met kleine delay voor initialisatie
        setTimeout(() => {
            this.#updateOrderDisplay();
        }, GAME_CONFIG.ORDER_UPDATE_DELAY);
    }

    // Update de order display als het bestaat
    #updateOrderDisplay() {
        if (this.#orderDisplay && this.#currentCustomer) {
            this.#orderDisplay.updateOrder(this.#currentCustomer.getOrder());
        }
    }    spawnNewCustomer() {
        // Bepaal beschikbare customer sprites met veilige resource checks
        const availableSprites = this.#getAvailableCustomerSprites();
        
        // Random pick een sprite
        const randomSprite = availableSprites[Math.floor(Math.random() * availableSprites.length)];
        
        // Maak nieuwe customer aan
        this.#currentCustomer = new Customer(GAME_CONFIG.CUSTOMER_POS, randomSprite);
        this.add(this.#currentCustomer);
        
        // Update order display
        this.#updateOrderDisplay();
    }

    // Bepaalt welke customer sprites beschikbaar zijn met veilige checks
    #getAvailableCustomerSprites() {
        const sprites = [Resources.Customer1]; // Altijd beschikbaar
        
        // Veilige checks voor optionele resources
        if (Resources.Customer2) sprites.push(Resources.Customer2);
        if (Resources.Persona2) sprites.push(Resources.Persona2);
        if (Resources.Persona3) sprites.push(Resources.Persona3);
        
        return sprites;
    }    onPreUpdate(engine, delta) {
        // Stop timer updates als game niet meer actief is
        if (!this.#gameActive) return;

        // Trek delta/1000 af van #timeRemaining
        this.#timeRemaining -= delta / 1000;

        // Update timer display
        if (this.#timerLabel) {
            this.#timerLabel.text = `Tijd: ${Math.ceil(this.#timeRemaining)}`;
        }

        // Game over check
        if (this.#timeRemaining <= 0) {
            this.#gameActive = false;
            console.log("Game Over! Tijd is op!");
            // TODO: Voeg game over scene toe
        }
    }
}