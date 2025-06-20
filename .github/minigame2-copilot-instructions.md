# Restaurant Minigame 2 - Complete Implementation Guide

## Overview
Restaurant minigame met progressieve moeilijkheid waar:
- Spelers food items naar customers slepen met WASD + Enter
- Orders exact moeten matchen (volgorde én items)
- Difficulty oploopt van 1 naar 4 items per order
- Timer van 60 seconden aftelt

## Game Flow
1. **Instruction Screen** → Uitleg + Start knop
2. **Game Loop** → 7 orders totaal:
   - 2x orders met 1 item
   - 2x orders met 2 items  
   - 2x orders met 3 items
   - 1x order met 4 items
3. **End Screen** → Success (alle orders) of Fail (tijd op)

## File Structuur
```
minigame_2/
├── actors/
│   ├── customer.js         # Verplaats customers.js hierheen
│   ├── food.js            # Blijft zoals nu
│   └── order.js           # Blijft zoals nu
├── ui/
│   ├── order_display.js   # Enhanced versie met groene highlights
│   ├── timer_display.js   # Split timer logic uit minigame_2.js
│   ├── score_display.js   # Nieuwe score counter
│   └── progress_bar.js    # Visuele voortgang (optioneel)
├── screens/
│   ├── instruction_screen.js  # Start scherm met uitleg
│   ├── success_screen.js      # Gewonnen scherm
│   └── fail_screen.js         # Game over scherm
├── managers/
│   ├── difficulty_manager.js  # Beheert order progressie
│   └── game_state.js         # Centrale game state
├── background_2.js            # Blijft zoals nu
└── minigame_2.js             # Hoofdscene, wordt veel cleaner
```

## Belangrijke Classes

### GameState (NEW)
```javascript
export class GameState {
    #score = 0
    #ordersCompleted = 0
    #currentDifficulty = 1
    #totalOrders = 7
    
    isGameComplete() {
        return this.#ordersCompleted >= this.#totalOrders
    }
    
    incrementOrder() {
        this.#ordersCompleted++
        this.#score += 100 * this.#currentDifficulty
    }
    
    getCurrentOrderSize() {
        // Logic voor difficulty progression
        if (this.#ordersCompleted < 2) return 1
        if (this.#ordersCompleted < 4) return 2
        if (this.#ordersCompleted < 6) return 3
        return 4
    }
}
```

### OrderDisplay (ENHANCED)
```javascript
export class OrderDisplay extends Actor {
    #orderLabels = []  // Array van labels voor elk item
    #highlightedIndices = new Set()
    
    updateOrder(orderArray) {
        // Maak labels voor elk item in de order
    }
    
    highlightDeliveredItem(foodId, orderArray) {
        // Vind eerste niet-gehighlighte index van foodId
        // Maak die label groen
    }
    
    resetHighlights() {
        // Reset alle kleuren naar wit
    }
}
```

### TimerDisplay (NEW)
```javascript
export class TimerDisplay extends Actor {
    #timeRemaining = 60
    #timerLabel
    
    onPreUpdate(engine, delta) {
        // Update timer en emit 'timeUp' event
    }
}
```

### DifficultyManager (NEW)
```javascript
export class DifficultyManager {
    static getOrderSize(ordersCompleted) {
        if (ordersCompleted < 2) return 1
        if (ordersCompleted < 4) return 2
        if (ordersCompleted < 6) return 3
        return 4
    }
}
```

## Key Features

### Visual Order Feedback
```javascript
// In customer.js wanneer food wordt toegevoegd:
handleFoodDelivery(foodActor) {
    // Voeg food toe aan givenFood array
    // Emit event naar OrderDisplay voor highlighting
    this.scene.engine.emit('foodDelivered', { 
        foodId: foodActor.foodId,
        customerOrder: this.#order.getOrder()
    })
}

// In minigame_2.js:
engine.on('foodDelivered', (evt) => {
    this.#orderDisplay.highlightDeliveredItem(evt.foodId, evt.customerOrder)
})
```

### Screen Transitions
```javascript
// Timer op 0:
engine.on('timeUp', () => {
    engine.goToScene('fail_screen')
})

// Alle orders compleet:
engine.on('orderComplete', () => {
    this.#gameState.incrementOrder()
    if (this.#gameState.isGameComplete()) {
        engine.goToScene('success_screen')
    }
})
```

### Order Progression System
```javascript
spawnNewCustomer() {
    const orderSize = this.#gameState.getCurrentOrderSize()
    const newOrder = new Order(orderSize) // Order class moet size parameter accepteren
    const customer = new Customer(pos, sprite, newOrder)
    this.add(customer)
}
```

## UI Screens Details

### InstructionScreen
- **Titel**: "Restaurant Rush!"
- **Uitleg**: 
  - "Help klanten door hun bestelling te leveren"
  - "Sleep food items met WASD + Enter"
  - "Lever items in de juiste volgorde!"
- **Controls display**: Visuele WASD keys + Enter uitleg
- **Start**: Spacebar om te beginnen

### SuccessScreen
- **Titel**: "Geweldig gedaan!"
- **Score display**: Totale score
- **Orders completed**: "7/7 orders voltooid!"
- **Knoppen**: 
  - "Opnieuw spelen" → restart minigame_2
  - "Verder" → volgende scene

### FailScreen
- **Titel**: "Tijd is op!"
- **Score display**: Behaalde score
- **Orders completed**: "X/7 orders voltooid"
- **Knop**: "Probeer opnieuw" → restart minigame_2

## Implementation Steps

### Step 1: Basic Refactoring
- Extract timer naar TimerDisplay class
- Verplaats files naar nieuwe mappenstructuur
- Clean up minigame_2.js

### Step 2: Game State Management
- Implementeer GameState class
- Voeg score tracking toe
- Implementeer order counting

### Step 3: UI Screens
- Maak alle 3 screens (instruction, success, fail)
- Implementeer scene navigatie
- Test screen flow

### Step 4: Order Display Enhancement
- Refactor naar multiple labels
- Implementeer highlight functionaliteit
- Handle duplicates correct

### Step 5: Difficulty System
- Implementeer DifficultyManager
- Update Order class voor variable size
- Test progressie (1→2→3→4 items)

### Step 6: Event System
- Setup alle game events (timeUp, orderComplete, foodDelivered)
- Connect alle components via events
- Debug event flow

### Step 7: Polish
- Voeg animaties toe voor feedback
- Sound effects voor success/fail
- Smooth transitions tussen screens

## Testing Checklist
- [ ] Timer stopt op 0 en toont fail screen
- [ ] Order items worden individueel groen bij delivery
- [ ] Duplicates worden correct gehighlight (alleen eerste niet-groene)
- [ ] Difficulty loopt correct op (1,1,2,2,3,3,4)
- [ ] Success screen verschijnt na 7 orders
- [ ] Score wordt correct berekend
- [ ] Alle screens zijn navigeerbaar
- [ ] Game kan herstart worden
- [ ] Events worden correct ge-emit en afgehandeld

## Code Conventions
- Gebruik private fields (#) voor encapsulation
- Comments in Nederlands
- Event-driven communication tussen components
- Geen magic numbers - gebruik constants
- Defensive programming met null checks

## Potential Pitfalls
1. **Order highlighting**: Zorg dat indices correct matchen
2. **Event timing**: Wacht op initialization voor event setup
3. **Memory leaks**: Clean up event listeners bij scene switch
4. **Duplicate handling**: Test met orders zoals [1,1,2,1]
5. **Scene transitions**: Zorg voor proper cleanup