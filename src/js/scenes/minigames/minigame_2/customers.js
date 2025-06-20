import { Actor, Engine, Vector, CollisionType, Keys, Shape, RotationType } from "excalibur"
import { Resources } from '../../../resources.js'
import { Order } from "./order.js"

export class Customer extends Actor {
    sprite
    #givenFood = []
    #order
    #processedCollisions = new Set()
    #collidingFood = null

    constructor(pos, sprite) {
        super({
            pos,
            width: sprite.width,
            height: sprite.height,
            scale: new Vector(0.75, 0.75),
            collisionType: CollisionType.Fixed
        })
        this.sprite = sprite;
        this.#order = new Order()
    }

    // Deze functie wordt één keer aangeroepen wanneer de klant wordt toegevoegd
    onInitialize(engine) {
        // Debug log om te zien of de customer wordt geïnitialiseerd
        console.log("Customer initialized")

        // Zet de sprite van de klant
        this.graphics.use(this.sprite.toSprite())

        // Log de bestelling in de console
        console.log("Nieuwe bestelling:", this.#order.getOrder())
        
        // Collision detectie
        this.on('collisionstart', (evt) => {
            const other = evt.other.owner
            console.log("Collision detected with:", other)
            
            if(other && other.isInteractible) {
                this.#collidingFood = other
                console.log("Food collision started")
            }
        })

        this.on('collisionend', (evt) => {
            const other = evt.other.owner
            if(other === this.#collidingFood) {
                this.#collidingFood = null
                console.log("Food collision ended")
            }
        })
    }

    // Deze functie wordt elke frame uitgevoerd
    onPreUpdate(engine) {
        // Check voor Enter key release
        if(engine.input.keyboard.wasReleased(Keys.Enter)) {
            console.log("Enter released, colliding food:", this.#collidingFood)
            
            if(this.#collidingFood) {
                this.handleFoodDelivery(this.#collidingFood)
            }
        }
    }    handleFoodDelivery(foodActor) {
        if(!this.#processedCollisions.has(foodActor)) {
            this.#processedCollisions.add(foodActor)

            if(this.#givenFood.length < this.#order.getOrder().length) {
                this.#givenFood.push(foodActor.foodId)
                console.log(`Added food ${foodActor.foodId}, array now:`, this.#givenFood)
            }            // Check of het aantal gegeven food items gelijk is aan de lengte van de order
            if(this.#givenFood.length === this.#order.getOrder().length) {
                // Sorteer beide arrays zodat volgorde niet meer uitmaakt
                const givenSorted = [...this.#givenFood].sort();
                const orderSorted = [...this.#order.getOrder()].sort();

                if(JSON.stringify(givenSorted) === JSON.stringify(orderSorted)) {
                    console.log("Order correct! 🎉");
                    this.scene.engine.emit('orderComplete', { success: true, customer: this });
                    this.kill();
                } else {
                    console.log("Order fout! ❌", this.#givenFood, "vs", this.#order.getOrder());
                    this.#givenFood = []; // Reset voor nieuwe poging
                    this.#processedCollisions.clear(); // Reset collision tracking bij foute order
                }
            }
        }
    }

    // Haal de lijst met gegeven food op
    getGivenFood() {
        return this.#givenFood
    }

    // Getter voor de order van de klant
    getOrder() {
        // Geeft de order van deze klant terug
        return this.#order.getOrder()
    }

    // Reset de lijst (optioneel)
    resetGivenFood() {
        this.givenFood = []
    }
}