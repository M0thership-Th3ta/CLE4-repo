# Minigame 3 - Turtle Rescue Documentation

## Overzicht
Minigame 3 is een platformer waar de speler (robot) schildpadden moet redden door ze op te pakken en naar de marinebioloog te brengen. De speler moet voorkomen dat ze in zee vallen.

## Game Flow
1. Speler komt vanuit `restaurantscene_3` (via groene "Level 2" balk)
2. Speelt het turtle rescue spel
3. Bij winnen: "Minigame 3 voltooid!" scherm
4. Bij verliezen (in zee vallen): Gaat naar `gameover` scene

## Mappenstructuur
```
src/js/
├── scenes/
│   ├── minigames/
│   │   └── minigame_3/
│   │       ├── minigame_3.js       # Hoofdscene logica
│   │       ├── background_3.js     # Achtergrond (cliff)
│   │       ├── dock.js            # Startplatform
│   │       ├── platform.js        # Springplatforms
│   │       ├── sea.js             # Zee (game over trigger)
│   │       ├── turtle.js          # Schildpadden om te redden
│   │       └── minigame_3_UI.js   # UI voor score tracking
│   └── cutscenes/
│       ├── restaurantscene_3.js   # Scene vóór minigame 3
│       ├── restaurantscene_4.js   # Scene na minigame 3
│       └── gameover.js            # Game over scene
├── player/
│   └── playermarine.js            # Player class voor minigame 3
├── actors/
│   └── marine_biologist.js       # NPC die turtles aanneemt
├── resources.js                   # Alle game assets
└── game.js                        # Hoofdgame setup

```

## Files en Dependencies

### 1. minigame_3.js (Hoofdscene)
**Imports:**
```javascript
import { Color, Font, Keys, Label, Scene, TextAlign, Vector } from "excalibur"
import { Background3 } from "./background_3.js"
import { Platform } from "./platform.js"
import { Turtle } from "./turtle.js"
import { Dock } from "./dock.js"
import { Sea } from "./sea.js"
import { Player } from "../../../player/playermarine.js"
import { Minigame3UI } from "./minigame_3_UI.js"
import { MarineBiologist } from "../../../actors/marine_biologist.js"
```

**Functionaliteit:**
- Beheert game state (collectedTurtles, totalTurtles)
- Spawnt alle game objecten
- Handelt game complete/game over af
- Reset bij nieuwe activatie

**Belangrijke properties:**
- `totalTurtles = 5`
- `collectedTurtles = 0`
- `amountTracker = { amount: 0 }`
- `gameHasEnded = false`

### 2. playermarine.js (Player)
**Imports:**
```javascript
import { Actor, CollisionType, DegreeOfFreedom, Engine, Shape, Side, Vector } from "excalibur"
import { Resources } from '../resources.js'
import { Turtle } from "../scenes/minigames/minigame_3/turtle.js"
import { MarineBiologist } from "../actors/marine_biologist.js"
import { Sea } from "../scenes/minigames/minigame_3/sea.js"
```

**Functionaliteit:**
- Beweging met pijltjestoetsen
- Gravity-based jumping
- Collision handling met:
  - **Turtle**: Pakt op, verandert sprite naar RobotWithTurtle
  - **MarineBiologist**: Levert turtle af, verhoogt score
  - **Sea**: Triggert game over
- `hasTurtle` flag voor state tracking

### 3. turtle.js
**Functionaliteit:**
- Passive collision actor
- Wordt verwijderd bij `hit()`
- Geschaald naar 0.20 van originele grootte

### 4. marine_biologist.js
**Extends:** NPC class
**Functionaliteit:**
- Ontvangt turtles van player
- Blink effect bij interactie
- Geschaald naar 0.40 van originele grootte

### 5. platform.js
**Functionaliteit:**
- Fixed collision platforms
- Speler kan erop springen
- Collider box: 350x50 pixels

### 6. dock.js
**Functionaliteit:**
- Startplatform waar marinebioloog staat
- Collider alleen bovenaan (530x5 pixels)

### 7. sea.js
**Functionaliteit:**
- Game over trigger zone
- Grote collider box onder water niveau
- Blink effect bij hit (niet gebruikt momenteel)

### 8. minigame_3_UI.js
**Functionaliteit:**
- Toont "Aantal geredt schildpadden: X"
- Update via `updateAmount()` methode

### 9. gameover.js
**Functionaliteit:**
- Zwarte achtergrond met "GAME OVER" tekst
- Rode "Opnieuw proberen" balk
- Reset minigame 3 na 2 seconden stilstaan op balk

## Game Mechanics

### Win Conditie
- Verzamel alle 5 schildpadden
- Breng ze naar de marinebioloog
- Triggert `gameCompleted()` functie

### Verlies Conditie
- Val in zee
- Triggert `gameOver()` → gaat naar gameover scene

### Controls
- **Pijltjestoetsen**: Beweging
- **Up**: Spring (alleen als grounded)
- **ESC**: Exit game (alleen bij win scherm)

## Resources Gebruikt
- `Turtle`: turtle.png
- `Platform`: platform.png
- `Sea`: sea.png
- `Background3`: backgroundCliff.png
- `Dock`: dock.png
- `MarineBiologist`: marineBiologist.png
- `Player`: robot.png
- `RobotWithTurtle`: robotWithTurtle.png

## Bekende Issues/Bugs
1. **Multiple game over triggers**: Als speler in zee valt, kan gameOver meerdere keren triggeren
2. **Event listener accumulation**: Bij herstarten stapelen event listeners op
3. **Turtle spawn locaties**: Momenteel hardcoded, niet random op platforms
4. **localStorage gebruik**: `amountTurtles` wordt opgeslagen maar niet consistent gebruikt

## Scene Navigation
```
restaurantscene_3 → minigame_3 → restaurantscene_4 (niet geïmplementeerd)
                            ↓
                        gameover → minigame_3 (restart)
```

## Belangrijke Aandachtspunten
1. Scene wordt volledig verwijderd en opnieuw aangemaakt bij restart vanuit gameover
2. Player sprite verandert dynamisch bij turtle pickup/delivery
3. UI update gebeurt via scene reference (`this.engine.currentScene.minigame3UI`)
4. Gravity is actief (800 pixels/sec²)
5. Debug controls: K toets gaat direct naar gameover scene