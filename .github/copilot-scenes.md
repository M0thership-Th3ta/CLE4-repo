# Excalibur.js Cutscene Implementation Instructions

Je bent een AI programming assistant die helpt bij het implementeren van een cutscene systeem in ExcaliburJS met 2 NPC's, walking animations en dialoog. De student leert game development en werkt in een team omgeving.

## Project Context & Requirements

### Target Implementation
- **testscene** met 2 NPC actors
- **Walking animations** voor character movement
- **Dialoog systeem** met HTML overlay UI
- **Sequence management** voor cutscene flow
- **Clean code structure** volgens best practices

### Student Background
- 1e jaar Creative Media & Game Technologies
- Tech stack: HTML, CSS (Tailwind), PHP, JavaScript
- Tools: Excalibur, Unreal Engine, Godot
- Prefereert: werken met code, clean structure, conceptuele uitleg

## Code Style & Conventions

### Naming Conventions (STRICT)
- **Classes**: PascalCase (`CutsceneScene`, `DialogueManager`, `NPC`)
- **Variables/functions**: camelCase (`currentDialogue`, `walkTo()`, `playCutsceneSequence()`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_WALK_SPEED`, `DIALOGUE_DURATION`)
- **Files**: lowercase only (`cutscenescene.js`, `dialoguemanager.js`, `npc.js`)
- **Private members**: Use `#` prefix (`#isWalking`, `#dialogueData`)

### Comments & Documentation
```javascript
// Nederlandse comments voor functie beschrijvingen
// Deze functie laat de NPC naar een target positie lopen
// en returned een Promise die resolved wanneer aangekomen
async walkTo(targetPos, speed = 50) {
    // Implementation met Engelse technische termen
    this.vel = direction.scale(speed)
}
```

### File Organization Pattern
```
js/
├── scenes/
│   └── cutscenes/
        └── testscene.js  // test scene waar we een opzet gaan maken
        └── cutscenemanager.js  // waar de cutscenes worden geregeld
├── actors/
│   └── npc.js                  // Herbruikbare NPC class
├── dialogue/
│   ├── dialoguemanager.js     // UI en flow management
│   └── cutscene-data.json     // Dialoog content data
├── resources.js               // Asset loading
└── game.js                    // Game setup
```

## Implementation Guidelines

### 1. Scene Architecture
- **Gebruik `onInitialize()`** voor setup, NOOIT constructor
- **Gebruik `onActivate()`** voor cutscene start logic
- **Gebruik `onDeactivate()`** voor cleanup (CRITICAL voor memory leaks)
- **Scene transitions** met `engine.goToScene()`

### 2. NPC Actor Implementation
```javascript
export class NPC extends Actor {
    #walkAnimation    // Private animation property
    #isWalking = false

    constructor(pos, name) {
        super({
            pos,
            width: 32,
            height: 64,
            collisionType: CollisionType.PreventCollision  // Geen physics collision
        })
    }

    onInitialize(engine) {
        // Setup graphics en animations hier
        // NOOIT in constructor
    }

    // Promise-based movement voor sequence control
    async walkTo(targetPos, speed = 50) {
        // Implementation returns Promise
    }
}
```

### 3. Dialogue System Architecture
- **HTML overlay** (NIET canvas-based) voor beste performance
- **JSON data files** voor dialogue content
- **TypeScript interfaces** voor type safety
- **Cleanup methods** voor DOM element removal

### 4. Animation Handling
```javascript
// Animation setup pattern
this.#walkAnimation = Animation.fromSpriteSheet(
    Resources.NpcSprite.toSpriteSheet(4, 4), // Grid dimensions
    [0, 1, 2, 3], // Frame indices
    100 // Duration in ms
)

// Graphics management
this.graphics.add('walk', this.#walkAnimation)
this.graphics.add('idle', this.#idleSprite)
this.graphics.use('walk') // Switch animations
```

## Critical Implementation Rules

### Memory Management (ZEER BELANGRIJK)
1. **Cleanup HTML elements** in `onDeactivate()`
2. **Stop animations** bij scene transitions
3. **Remove event listeners** om memory leaks te voorkomen
4. **Clear timers/intervals** in cleanup methods

### Async/Await Pattern voor Sequences
```javascript
async #playCutsceneSequence() {
    // Stap 1: Parallel movement
    await Promise.all([
        this.#npc1.walkTo(new Vector(250, 300)),
        this.#npc2.walkTo(new Vector(350, 300))
    ])
    
    // Stap 2: Sequential dialogue
    await this.#dialogueManager.startDialogue(dialogueData)
    
    // Stap 3: Exit movements
    await Promise.all([
        this.#npc1.walkTo(new Vector(600, 300)),
        this.#npc2.walkTo(new Vector(700, 300))
    ])
}
```

### HTML UI Integration
```javascript
// Positioneer HTML over canvas
dialogueBox.style.cssText = `
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;           // Boven canvas
    pointer-events: all;     // Enable interactions
`
```

## Common Pitfalls & Solutions

### 1. Animation Issues
**Problem**: Spritesheet niet correct geladen
**Solution**: Controleer grid dimensions en frame indices
```javascript
// FOUT: Verkeerde grid size
Animation.fromSpriteSheet(sprite, [0,1,2], 100) // Geen grid size

// CORRECT: Specificeer grid
Animation.fromSpriteSheet(sprite.toSpriteSheet(4, 4), [0,1,2], 100)
```

### 2. Movement Synchronization
**Problem**: NPC's bewegen niet tegelijk of sequence loopt door elkaar
**Solution**: Gebruik `Promise.all()` voor parallel, `await` voor sequential
```javascript
// Parallel movement
await Promise.all([npc1.walkTo(pos1), npc2.walkTo(pos2)])

// Sequential actions  
await npc1.walkTo(pos1)
await npc2.walkTo(pos2)
```

### 3. HTML Dialogue Cleanup
**Problem**: HTML elements blijven in DOM na scene switch
**Solution**: Implementeer proper cleanup
```javascript
onDeactivate() {
    this.#dialogueManager?.cleanup()  // Optional chaining
}

cleanup() {
    if (this.#dialogueBox) {
        this.#dialogueBox.remove()     // Remove from DOM
        this.#dialogueBox = null       // Clear reference
    }
}
```

### 4. Actor Positioning
**Problem**: NPC's niet zichtbaar of op verkeerde posities
**Solution**: Controleer scene bounds en collision types
```javascript
// Zorg dat posities binnen canvas bounds zijn
const npc = new NPC(new Vector(100, 300)) // Within 1280x720

// Use PreventCollision voor cutscene characters
collisionType: CollisionType.PreventCollision
```

## Development Workflow

### 1. Start Simple
Begin met statische NPC's en hardcoded dialogue, voeg dan beweging en animatie toe.

### 2. Test Incrementally
- Test elke component apart
- Controleer memory usage in browser devtools
- Verify cleanup met scene transitions

### 3. Debug Tools
```javascript
// Enable debug mode voor troubleshooting
game.showDebug(true)

// Log positions voor movement debugging
console.log(`NPC position: ${this.pos.x}, ${this.pos.y}`)

// Check scene state
console.log(`Current scene: ${engine.currentSceneName}`)
```

### 4. Performance Monitoring
- Gebruik browser profiler voor performance analysis
- Monitor DOM element count
- Check for memory leaks bij repeated scene transitions

## Code Review Checklist

- [ ] **Comments**: Nederlandse functie beschrijvingen?
- [ ] **Naming**: PascalCase classes, camelCase methods?
- [ ] **Private**: `#` prefix voor private members?
- [ ] **Lifecycle**: `onInitialize()` gebruikt ipv constructor?
- [ ] **Cleanup**: `onDeactivate()` implementeert proper cleanup?
- [ ] **Async**: `await` gebruikt bij sequence operations?
- [ ] **Memory**: Event listeners en DOM elements opgeruimd?
- [ ] **Types**: TypeScript interfaces gebruikt waar mogelijk?

## Error Handling Patterns

```javascript
// Graceful error handling voor missing assets
try {
    this.graphics.use('walk')
} catch (error) {
    console.warn('Walking animation niet gevonden, gebruik idle')
    this.graphics.use('idle')
}

// Validate dialogue data
if (!dialogueData || !Array.isArray(dialogueData.cutsceneDialogue)) {
    console.error('Invalid dialogue data format')
    return
}
```

## Success Criteria

Een succesvolle implementatie heeft:
1. **2 NPC's** die smooth naar elkaar toe lopen
2. **Working animations** tijdens movement
3. **HTML dialogue overlay** met typewriter effect
4. **Proper sequence flow** (movement → dialogue → exit)
5. **Clean memory management** zonder leaks
6. **Error handling** voor edge cases
7. **Modulaire code structure** met herbruikbare components

Focus op stap-voor-stap implementatie en test elke component voordat je verder gaat. Prioriteer werkende functionaliteit boven perfecte animaties - optimization komt later!