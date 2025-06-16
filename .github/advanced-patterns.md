# Excalibur.js Advanced Patterns

Advanced patterns and architectures for complex game features.

## Component-Based Architecture

### Health Component Example
```javascript
import { Component } from 'excalibur'

export class HealthComponent extends Component {
    public readonly type = 'health'
    
    constructor(public maxHealth: number, public currentHealth = maxHealth) {
        super()
    }
    
    takeDamage(amount: number) {
        this.currentHealth = Math.max(0, this.currentHealth - amount)
        if (this.currentHealth === 0) {
            this.owner?.kill()
        }
    }
    
    heal(amount: number) {
        this.currentHealth = Math.min(this.maxHealth, this.currentHealth + amount)
    }
}

// Usage in actor
onInitialize() {
    this.addComponent(new HealthComponent(100))
}

// Access component
handleDamage(amount) {
    this.get(HealthComponent).takeDamage(amount)
}
```

## State Machine Pattern

### Hook State Machine (Gold Miner)
```javascript
export class StateMachine {
    #currentState
    #states = new Map()
    #owner
    
    constructor(owner, initialState) {
        this.#owner = owner
        this.#currentState = initialState
    }
    
    addState(name, state) {
        this.#states.set(name, state)
    }
    
    setState(newState) {
        const current = this.#states.get(this.#currentState)
        if (current?.exit) {
            current.exit(this.#owner)
        }
        
        this.#currentState = newState
        const next = this.#states.get(newState)
        if (next?.enter) {
            next.enter(this.#owner)
        }
    }
    
    update(engine, delta) {
        const current = this.#states.get(this.#currentState)
        if (current?.update) {
            current.update(this.#owner, engine, delta)
        }
    }
}

// Hook implementation
export class Hook extends Actor {
    #stateMachine
    
    onInitialize(engine) {
        this.#stateMachine = new StateMachine(this, 'idle')
        
        this.#stateMachine.addState('idle', {
            enter: (hook) => {
                hook.vel = Vector.Zero
            },
            update: (hook, engine) => {
                if (engine.input.keyboard.wasPressed(Keys.Space)) {
                    hook.stateMachine.setState('extending')
                }
            }
        })
        
        this.#stateMachine.addState('extending', {
            enter: (hook) => {
                hook.vel = new Vector(0, 300)
                Resources.HookSound.play()
            },
            update: (hook) => {
                if (hook.pos.y > 600) {
                    hook.stateMachine.setState('retracting')
                }
            }
        })
    }
    
    onPostUpdate(engine, delta) {
        this.#stateMachine.update(engine, delta)
    }
}
```

## Dialogue System

### Dialogue Data Structure
```json
{
    "dialogues": [
        {
            "id": "intro_1",
            "speaker": "Opa",
            "text": "Welkom bij de goudmijn!",
            "choices": [
                {
                    "text": "Natuurlijk help ik je!",
                    "next": "intro_2_yes"
                },
                {
                    "text": "Waarom zou ik?",
                    "next": "intro_2_no"
                }
            ]
        }
    ]
}
```

### Dialogue System Implementation
```javascript
export class DialogueSystem {
    #currentDialogue = null
    #dialogueBox
    
    async loadDialogue(filename) {
        const response = await fetch(`/assets/dialogues/${filename}`)
        return await response.json()
    }
    
    showDialogue(dialogueId, dialogueData) {
        const dialogue = dialogueData.find(d => d.id === dialogueId)
        
        if (!dialogue) {
            console.error(`Dialoog ${dialogueId} niet gevonden!`)
            return
        }
        
        this.#dialogueBox.show(dialogue.speaker, dialogue.text)
        
        if (dialogue.choices) {
            this.#createChoiceButtons(dialogue.choices, dialogueData)
        } else if (dialogue.next) {
            this.#waitForSpace(() => {
                this.showDialogue(dialogue.next, dialogueData)
            })
        }
    }
}
```

## Performance Optimization

### Object Pooling
```javascript
export class BulletPool {
    #pool = []
    #activeCount = 0
    
    constructor(size = 50) {
        for (let i = 0; i < size; i++) {
            this.#pool.push(new Bullet())
        }
    }
    
    getBullet() {
        if (this.#activeCount < this.#pool.length) {
            const bullet = this.#pool[this.#activeCount]
            this.#activeCount++
            bullet.reset()
            return bullet
        }
        
        // Pool uitgeput, maak nieuwe bullet
        const newBullet = new Bullet()
        this.#pool.push(newBullet)
        this.#activeCount++
        return newBullet
    }
    
    returnBullet(bullet) {
        const index = this.#pool.indexOf(bullet)
        if (index !== -1 && index < this.#activeCount) {
            // Swap met laatste actieve bullet
            const temp = this.#pool[index]
            this.#pool[index] = this.#pool[this.#activeCount - 1]
            this.#pool[this.#activeCount - 1] = temp
            this.#activeCount--
        }
    }
}
```

### Performance Monitoring
```javascript
export class PerformanceMonitor {
    #fpsHistory = []
    #lowFpsThreshold = 30
    
    constructor(engine) {
        this.engine = engine
        this.startMonitoring()
    }
    
    startMonitoring() {
        this.engine.on('postupdate', () => {
            const currentFps = this.engine.clock.fps
            this.#fpsHistory.push(currentFps)
            
            if (this.#fpsHistory.length > 60) {
                this.#fpsHistory.shift()
            }
            
            this.checkPerformance()
        })
    }
    
    checkPerformance() {
        const avgFps = this.#fpsHistory.reduce((a, b) => a + b, 0) / this.#fpsHistory.length
        
        if (avgFps < this.#lowFpsThreshold) {
            console.warn('Lage performance:', avgFps)
            this.reduceQuality()
        }
    }
    
    reduceQuality() {
        // Verminder particle effects
        // Zet antialiasing uit
        this.engine.screen.antialiasing = false
    }
}
```

## Advanced Input Patterns

### Input Mapping System
```javascript
export class InputMapper {
    #mappings = new Map()
    #engine
    
    constructor(engine) {
        this.#engine = engine
    }
    
    addMapping(action, keys) {
        this.#mappings.set(action, keys)
    }
    
    isActionPressed(action) {
        const keys = this.#mappings.get(action)
        if (!keys) return false
        
        return keys.some(key => 
            this.#engine.input.keyboard.wasPressed(key)
        )
    }
    
    isActionHeld(action) {
        const keys = this.#mappings.get(action)
        if (!keys) return false
        
        return keys.some(key => 
            this.#engine.input.keyboard.isHeld(key)
        )
    }
}

// Usage
const input = new InputMapper(engine)
input.addMapping('jump', [Keys.Space, Keys.W, Keys.Up])
input.addMapping('shoot', [Keys.Enter, Keys.E])

// In update
if (input.isActionPressed('jump')) {
    this.jump()
}
```

## Scene Transitions

### Custom Transitions
```javascript
export class CustomTransition {
    static fadeToBlack(duration = 1000) {
        return {
            in: new ex.FadeInOut({ 
                duration: duration / 2, 
                direction: 'in',
                color: ex.Color.Black 
            }),
            out: new ex.FadeInOut({ 
                duration: duration / 2, 
                direction: 'out',
                color: ex.Color.Black 
            })
        }
    }
    
    static slide(direction = 'left', duration = 500) {
        return {
            out: new ex.Slide({ 
                duration, 
                direction,
                easing: ex.EasingFunctions.EaseInOutCubic
            })
        }
    }
}

// Usage
game.goToScene('level2', {
    destinationIn: CustomTransition.fadeToBlack().in,
    sourceOut: CustomTransition.fadeToBlack().out
})
```

## Save System

### Game State Manager
```javascript
export class GameState {
    static #instance = null
    #completedMinigames = new Set()
    #totalScore = 0
    
    static getInstance() {
        if (!GameState.#instance) {
            GameState.#instance = new GameState()
        }
        return GameState.#instance
    }
    
    markMinigameComplete(name, score) {
        this.#completedMinigames.add(name)
        this.#totalScore += score
        this.saveProgress()
    }
    
    saveProgress() {
        const saveData = {
            completed: Array.from(this.#completedMinigames),
            score: this.#totalScore,
            timestamp: Date.now()
        }
        
        localStorage.setItem('gameProgress', JSON.stringify(saveData))
    }
    
    loadProgress() {
        const saveString = localStorage.getItem('gameProgress')
        if (saveString) {
            const saveData = JSON.parse(saveString)
            this.#completedMinigames = new Set(saveData.completed)
            this.#totalScore = saveData.score
        }
    }
}
```

## Debugging Tools

### Debug Shortcuts
```javascript
if (process.env.NODE_ENV === 'development') {
    window.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'F1':
                // Skip to next minigame
                GameState.getInstance().markMinigameComplete('current', 999)
                this.engine.goToScene('menu')
                break
            case 'F2':
                // Give extra points
                this.addScore(100)
                break
            case 'F3':
                // Toggle debug view
                this.engine.showDebug = !this.engine.showDebug
                break
            case 'F4':
                // Show performance stats
                console.log('FPS:', this.engine.clock.fps)
                console.log('Actors:', this.engine.currentScene.actors.length)
                break
        }
    })
}
```