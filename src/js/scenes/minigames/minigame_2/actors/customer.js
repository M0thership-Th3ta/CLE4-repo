import { Actor, Engine, Vector, CollisionType, Keys } from "excalibur"
import { Resources } from '../../../../resources.js'
import { Order } from "./order.js"

// Constanten voor event strings om magic strings te vermijden
const COLLISION_START = "collisionstart";
const COLLISION_END = "collisionend";

export class Customer extends Actor {
    sprite
    #givenFood = []
    #order
    #processedCollisions = new Set()
    #collidingFood = null
    #orderCompleted = false // Flag om dubbele orderComplete events te voorkomen

    constructor(pos, sprite, orderSize = 1, scale = 0.75) {
        super({
            pos,
            width: sprite.width,
            height: sprite.height,
            scale: new Vector(scale, scale),
            collisionType: CollisionType.Fixed
        })
        this.sprite = sprite;
        
        // Genereer order met gewenste grootte
        this.#order = new Order(orderSize)
        
        console.log('Customer aangemaakt met order size:', orderSize)
    }

    // Deze functie wordt één keer aangeroepen wanneer de klant wordt toegevoegd
    onInitialize(engine) {
        console.log("Customer initialized")
        this.graphics.use(this.sprite.toSprite())
        console.log("Nieuwe bestelling:", this.#order.getOrder())

        // Initialiseer button state tracking voor controller
        this.aButtonWasPressed = false;

        // Event listeners met private methods voor betere encapsulation
        this.on(COLLISION_START, (evt) => this.#onCollisionStart(evt));
        this.on(COLLISION_END, (evt) => this.#onCollisionEnd(evt));
    }    // Deze functie wordt elke frame uitgevoerd
    onPreUpdate(engine) {
        // Keyboard input
        if (engine.input.keyboard.wasReleased(Keys.Enter) && this.#collidingFood) {
            this.#handleFoodDelivery(this.#collidingFood)
        }
        
        // Controller input - MET RELEASE DETECTION (net zoals keyboard wasReleased)
        if (this.#collidingFood) {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            for (const gamepad of gamepads) {
                if (!gamepad) continue;
                
                // A knop (index 0) - release detection voor food delivery
                if (gamepad.buttons[0] && gamepad.buttons[0].pressed) {
                    // Knop is ingedrukt - markeer alleen
                    this.aButtonWasPressed = true;
                } else {
                    // Knop is losgelaten - nu pas food delivery (net zoals keyboard wasReleased)
                    if (this.aButtonWasPressed) {
                        this.aButtonWasPressed = false;
                        this.#handleFoodDelivery(this.#collidingFood);
                    }
                }
            }
        }
    }

    // Private method voor collision start handling
    #onCollisionStart(evt) {
        const other = evt.other.owner
        console.log("Collision detected with:", other)
        
        if (other && other.isInteractible) {
            this.#collidingFood = other
            console.log("Food collision started")
        }
    }

    // Private method voor collision end handling
    #onCollisionEnd(evt) {
        const other = evt.other.owner
        if (other === this.#collidingFood) {
            this.#collidingFood = null
            console.log("Food collision ended")
        }
    }    // Private method voor food delivery logic
    #handleFoodDelivery(foodActor) {
        if (this.#processedCollisions.has(foodActor)) return;
        this.#processedCollisions.add(foodActor);

        const orderList = this.#order.getOrder();

        if (this.#givenFood.length < orderList.length) {
            this.#givenFood.push(foodActor.foodId);
            console.log(`Added food ${foodActor.foodId}, array now:`, this.#givenFood)
            
            // Emit foodDelivered event voor OrderDisplay highlighting
            this.scene.engine.emit('foodDelivered', { 
                foodId: foodActor.foodId,
                customer: this
            })
        }

        // Check of order compleet is (maar alleen als niet al voltooid)
        if (!this.#orderCompleted && this.#givenFood.length === orderList.length) {
            if (Customer.#arraysEqual(this.#givenFood, orderList)) {
                console.log("Order correct! 🎉");
                
                // Markeer als voltooid om dubbele events te voorkomen
                this.#orderCompleted = true;
                
                this.scene.engine.emit('orderComplete', { success: true, customer: this });
                this.kill();
            } else {
                console.log("Order fout! ❌", this.#givenFood, "vs", orderList);
                this.#resetGivenFood();
            }
        }
    }

    // Static helper method voor array vergelijking (sorteerde arrays)
    static #arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = [...a].sort();
        const sortedB = [...b].sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }    // Private method voor het resetten van given food state
    #resetGivenFood() {
        this.#givenFood = [];
        this.#processedCollisions.clear();
        
        // Emit orderReset event voor OrderDisplay om highlights te resetten
        this.scene.engine.emit('orderReset', { customer: this })
        console.log("Order gereset - highlights worden gecleared")
    }

    // Publieke getters - retourneren kopieën om mutaties van buitenaf te voorkomen
    getGivenFood() {
        return [...this.#givenFood] // Retourneer kopie
    }    getOrder() {
        return this.#order.getOrder()
    }

    // Getter voor orderArray compatibiliteit met minigame_2.js
    get orderArray() {
        return this.#order.orderArray
    }

    // Publieke method voor resetten (gebruikt private implementation)
    resetGivenFood() {
        this.#resetGivenFood()
    }
}
