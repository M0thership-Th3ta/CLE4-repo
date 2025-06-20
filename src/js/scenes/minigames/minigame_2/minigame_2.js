import { Actor, Scene, Label, Vector, Color, FontUnit, Keys } from "excalibur";
import { Resources, ResourceLoader } from '../../../resources.js';
import { Pointer } from '../../../player/robot/pointer.js';
import { Background2 } from "./background_2.js";
import { Food } from "./food.js";
import { Customer } from "./customers.js";
import { OrderDisplay } from "./order_display.js";

export class Minigame_2 extends Scene {
    #orderDisplay
    #currentCustomer

    constructor() {
        super()
    }

    onActivate(engine) {
        // Start de minigame zodra de scene geladen wordt
        this.startMinigame2(engine)
    }

    onInitialize(engine) {
        // Voeg debugknop toe: druk op D om een nieuwe customer te spawnen
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === 'd' || evt.key === 'D') {
                this.spawnNewCustomer()
                console.log('DEBUG: Nieuwe customer gespawned:', this.#currentCustomer?.getOrder?.())
            }
        })
    }

    // Deze functie bevat de minigame functionaliteit
    startMinigame2(engine) {
        console.log("Start minigame 2!");
        const pointer = new Pointer(new Vector(200,200))
        this.add(pointer)
        this.add(new Background2());        this.add(new Food(new Vector(100, 100), Resources.Food1, 1));
        this.add(new Food(new Vector(300, 100), Resources.Food2, 2));
        this.add(new Food(new Vector(200, 200), Resources.Food3, 3));
        // Voeg food items 4 en 5 toe met grotere scale
        this.add(new Food(new Vector(1050, 500), Resources.Food4, 4, 0.8));
        this.add(new Food(new Vector(950, 500), Resources.Food5, 5, 0.8));        // Maak en voeg OrderDisplay toe
        this.#orderDisplay = new OrderDisplay();
        this.add(this.#orderDisplay);

        // Maak en sla huidige customer op
        this.#currentCustomer = new Customer(new Vector(735, 220), Resources.Customer1);
        this.add(this.#currentCustomer);

        // Update display met order van huidige customer NA toevoegen (met kleine delay)
        setTimeout(() => {
            if (this.#orderDisplay && this.#currentCustomer) {
                this.#orderDisplay.updateOrder(this.#currentCustomer.getOrder());
            }
        }, 100);
    }

    spawnNewCustomer() {
        // Maak nieuwe customer aan op vaste positie
        const newCustomer = new Customer(new Vector(735, 220), Resources.Customer1)
        this.add(newCustomer)
        this.#currentCustomer = newCustomer
        // Update order display met nieuwe order
        if (this.#orderDisplay && this.#currentCustomer) {
            this.#orderDisplay.updateOrder(this.#currentCustomer.getOrder())
        }
    }
}