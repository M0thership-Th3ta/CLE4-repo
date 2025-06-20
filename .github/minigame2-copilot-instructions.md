# Restaurant Minigame 2 - Implementation Instructions

## Context
Je werkt aan een restaurant minigame waarbij:
- Customers komen binnen met een random order (1-3 items met foodId's 1-5)
- De speler gebruikt WASD + Enter om food items naar customers te slepen
- Orders moeten exact matchen (volgorde belangrijk!)

## Bestaande Files
```
minigame_2/
├── background_2.js  # Achtergrond sprite
├── customers.js     # Customer class met order tracking
├── food.js         # Food items die gesleept kunnen worden
├── minigame_2.js   # Main scene
└── order.js        # Random order generator
```

## Implementatie Stappen

### STAP 1: Fix Order Validatie ✅
**File:** `customers.js`

**Aanpassing in `handleFoodDelivery()`:**
```javascript
// Vervang de huidige check met:
if(this.#givenFood.length === this.#order.getOrder().length) {
    // Check of arrays exact gelijk zijn (volgorde matters!)
    if(JSON.stringify(this.#givenFood) === JSON.stringify(this.#order.getOrder())) {
        console.log("Order correct! 🎉")
        this.engine.emit('orderComplete', { success: true })
        this.kill()
    } else {
        console.log("Order fout! ❌", this.#givenFood, "vs", this.#order.getOrder())
        this.#givenFood = [] // Reset voor nieuwe poging
        this.#processedCollisions.clear()
    }
}
```

**Let op:** 
- Orders kunnen duplicates bevatten: [1,1,2]
- Volgorde is belangrijk!
- Reset collision tracking bij foute order

### STAP 2: Voeg Ontbrekende Food Items Toe 🍔
**File:** `minigame_2.js`

In `startMinigame2()`:
```javascript
// Voeg food items 4 en 5 toe
this.add(new Food(new Vector(400, 100), Resources.Food4, 4));
this.add(new Food(new Vector(500, 100), Resources.Food5, 5));
```

**Check eerst:** Bestaan `Resources.Food4` en `Resources.Food5` in `resources.js`?

### STAP 3: Visuele Order Display 📋
**Nieuwe file:** `order_display.js`

```javascript
import { Actor, Vector, Label, Color, FontUnit } from "excalibur"

export class OrderDisplay extends Actor {
    #orderLabel
    
    constructor() {
        super({
            pos: new Vector(50, 50), // Linkerbovenhoek
            anchor: Vector.Zero
        })
    }
    
    onInitialize(engine) {
        this.#orderLabel = new Label({
            text: "Order: ",
            font: {
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            }
        })
        this.graphics.use(this.#orderLabel)
    }
    
    updateOrder(orderArray) {
        // Toon order als "Order: 1, 2, 3"
        this.#orderLabel.text = "Order: " + orderArray.join(", ")
    }
}
```

**In `minigame_2.js`:** Voeg display toe en update bij nieuwe customer

### STAP 4: Customer Respawn Systeem 🔄
**File:** `minigame_2.js`

```javascript
export class Minigame_2 extends Scene {
    #orderDisplay
    #customerCount = 0
    
    onInitialize(engine) {
        // Luister naar order complete events
        engine.on('orderComplete', (evt) => {
            if(evt.success) {
                this.spawnNewCustomer()
            }
        })
    }
    
    spawnNewCustomer() {
        this.#customerCount++
        
        // Random customer sprite (als je meerdere hebt)
        const customerSprites = [Resources.Customer1, Resources.Customer2]
        const randomSprite = customerSprites[Math.floor(Math.random() * customerSprites.length)]
        
        const newCustomer = new Customer(new Vector(735, 220), randomSprite)
        this.add(newCustomer)
        
        // Update order display
        if(this.#orderDisplay) {
            this.#orderDisplay.updateOrder(newCustomer.getOrder())
        }
    }
}
```

### STAP 5: Timer Toevoegen ⏱️
**File:** `minigame_2.js`

```javascript
#timer = 60 // Seconden
#timerLabel

startTimer() {
    this.#timerLabel = new Label({
        text: `Tijd: ${this.#timer}`,
        pos: new Vector(engine.drawWidth - 150, 50),
        font: { size: 24, color: Color.White }
    })
    this.add(this.#timerLabel)
}

onPreUpdate(engine, delta) {
    // Update timer elke seconde
    this.#timer -= delta / 1000
    this.#timerLabel.text = `Tijd: ${Math.ceil(this.#timer)}`
    
    if(this.#timer <= 0) {
        // Game over
        engine.goToScene('gameover')
    }
}
```

### STAP 6: Polish & Feedback 🎮
**Toevoegingen:**

1. **Score systeem:**
```javascript
#score = 0
// Bij succesvolle order:
this.#score += 100
```

2. **Food respawn na gebruik:**
```javascript
// In Food class:
reset() {
    this.pos = this.originalPos.clone()
    this.#processedCollisions.clear()
}
```

3. **Visuele feedback:**
- Groene flash bij correct
- Rode shake bij fout
- Score popup animatie

## Code Review Checklist
- [ ] Order validatie werkt met exacte match
- [ ] Alle 5 food items zijn aanwezig
- [ ] Order is zichtbaar voor speler
- [ ] Nieuwe customers spawnen automatisch
- [ ] Timer telt af
- [ ] Food items resetten na gebruik
- [ ] Error handling voor edge cases

## Mogelijke Problemen
1. **Resources ontbreken:** Check of Food4/Food5 sprites bestaan
2. **Memory leak:** Zorg dat oude customers/labels verwijderd worden
3. **Collision bugs:** Reset collision tracking bij nieuwe customer
4. **Timer te snel/langzaam:** Pas timer waarde aan voor balancing

## Test Scenario's
1. Maak een order van 1 item correct
2. Maak een order van 3 items met duplicates [2,2,1]
3. Geef verkeerde volgorde [1,2,3] vs [3,2,1]
4. Laat timer aflopen
5. Check of food items correct resetten