// // // // // // // // import { Actor, Scene, Label, Vector, Color, FontUnit, Keys, CollisionType } from "excalibur";
// // // // // // // // import { Resources, ResourceLoader } from '../../resources.js';
// // // // // // // // import { Player } from '../../player/robot/player.js';
// // // // // // // // import { Restaurant } from '../locations/restaurant.js';
// // // // // // // // import { Shanty } from '../../player/shanty/shanty.js';
// // // // // // // // import { TestActor } from '../../actors/testactor.js';

// // // // // // // // export class Testscene extends Scene {

// // // // // // // //     constructor() {
// // // // // // // //         super()
// // // // // // // //     }

// // // // // // // //     onInitialize(engine) {
// // // // // // // //         // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// // // // // // // //         this.setupRestaurant(engine)
// // // // // // // //     }

// // // // // // // //     onActivate(engine) {
// // // // // // // //         // Deze functie wordt aangeroepen telkens als de scene actief wordt
// // // // // // // //         console.log("Testscene is nu actief")
// // // // // // // //     }    // Deze functie bevat de restaurant setup
// // // // // // // //     setupRestaurant(engine) {
// // // // // // // //         console.log("Start test cutscene!");        // Laad de restaurant achtergrond in deze scene
// // // // // // // //         const restaurantBackground = new Actor({
// // // // // // // //             pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
// // // // // // // //             width: engine.drawWidth,
// // // // // // // //             height: engine.drawHeight,
// // // // // // // //             collisionType: CollisionType.PreventCollision
// // // // // // // //         })
// // // // // // // //         restaurantBackground.graphics.use(Resources.RestaurantLayout.toSprite())
// // // // // // // //         this.add(restaurantBackground)        // Voeg Shanty toe aan de scene
// // // // // // // //         const shanty = new Shanty(new Vector(200, 300))
// // // // // // // //         this.add(shanty)

// // // // // // // //         // Voeg TestActor (Farmer) toe aan de scene
// // // // // // // //         const farmer = new TestActor(new Vector(400, 350))
// // // // // // // //         this.add(farmer)

// // // // // // // //         console.log("Restaurant layout geladen in testscene!")
// // // // // // // //         console.log("Shanty toegevoegd aan testscene!")
// // // // // // // //         console.log("TestActor (Farmer) toegevoegd aan testscene!")
// // // // // // // //     }
// // // // // // // // }


// // // // // // // import { Scene, Actor, Vector, CollisionType, Color, clamp } from 'excalibur'
// // // // // // // import { Resources } from '../../resources.js'

// // // // // // // // TestScene: speler kan naar worldmap door 2 seconden stil te staan op wit blok
// // // // // // // export class TestScene extends Scene {
// // // // // // //     #player
// // // // // // //     #worldMapTrigger
// // // // // // //     #overlapFrames = 0
// // // // // // //     #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

// // // // // // //     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// // // // // // //     onInitialize(engine) {
// // // // // // //         // Voeg speler toe
// // // // // // //         this.#player = new Actor({
// // // // // // //             name: 'player',
// // // // // // //             pos: new Vector(engine.halfDrawWidth, 200),
// // // // // // //             width: 32,
// // // // // // //             height: 32,
// // // // // // //             collisionType: CollisionType.Active
// // // // // // //         })
// // // // // // //         this.#player.graphics.use(Resources.Persona1.toSprite())
// // // // // // //         this.add(this.#player)

// // // // // // //         // Voeg triggerblok toe onderaan in het midden
// // // // // // //         this.#worldMapTrigger = new Actor({
// // // // // // //             pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
// // // // // // //             width: 120,
// // // // // // //             height: 40,
// // // // // // //             collisionType: CollisionType.Passive
// // // // // // //         })
// // // // // // //         // Geef het blok een witte kleur
// // // // // // //         this.#worldMapTrigger.graphics.use(Color.White)
// // // // // // //         this.add(this.#worldMapTrigger)
// // // // // // //     }

// // // // // // //     // Deze functie wordt elke frame aangeroepen
// // // // // // //     onPostUpdate(engine, delta) {
// // // // // // //         // Controleer of beide actors bestaan en bounds hebben
// // // // // // //         if (!this.#player || !this.#worldMapTrigger) return
// // // // // // //         if (!this.#player.bounds || !this.#worldMapTrigger.bounds) return

// // // // // // //         // Beweging met pijltjestoetsen
// // // // // // //         let xspeed = 0
// // // // // // //         let yspeed = 0
// // // // // // //         const SPEED = 180

// // // // // // //         if (engine.input.keyboard.isHeld('ArrowLeft')) xspeed = -SPEED
// // // // // // //         if (engine.input.keyboard.isHeld('ArrowRight')) xspeed = SPEED
// // // // // // //         if (engine.input.keyboard.isHeld('ArrowUp')) yspeed = -SPEED
// // // // // // //         if (engine.input.keyboard.isHeld('ArrowDown')) yspeed = SPEED

// // // // // // //         this.#player.vel = new Vector(xspeed, yspeed)

// // // // // // //         // Houd speler binnen het scherm
// // // // // // //         this.#player.pos.x = clamp(this.#player.pos.x, this.#player.width / 2, engine.drawWidth - this.#player.width / 2)
// // // // // // //         this.#player.pos.y = clamp(this.#player.pos.y, this.#player.height / 2, engine.drawHeight - this.#player.height / 2)

// // // // // // //         // Check overlap met triggerblok via bounding box
// // // // // // //         if (this.#isOverlapping(this.#player, this.#worldMapTrigger) && this.#player.vel.magnitude() < 5) {
// // // // // // //             this.#overlapFrames++
// // // // // // //             // Ga naar worldmap als speler 2 seconden stilstaat op het blok
// // // // // // //             if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
// // // // // // //                 engine.goToScene('worldmap')
// // // // // // //             }
// // // // // // //         } else {
// // // // // // //             this.#overlapFrames = 0
// // // // // // //         }
// // // // // // //     }

// // // // // // //     // Check of twee actors overlappen via hun bounding box
// // // // // // //     #isOverlapping(actorA, actorB) {
// // // // // // //         // Controleer of beide actors en hun bounds bestaan
// // // // // // //         if (!actorA || !actorB || !actorA.bounds || !actorB.bounds) return false
// // // // // // //         return actorA.bounds.intersect(actorB.bounds).hasIntersection()
// // // // // // //     }
// // // // // // // }

// // // // // // import { Scene, Actor, Vector, CollisionType, Color, clamp, Graphics } from 'excalibur'
// // // // // // import { Resources } from '../../resources.js'

// // // // // // // TestScene: speler kan naar worldmap door 2 seconden stil te staan op wit blok
// // // // // // export class TestScene extends Scene {
// // // // // //     #player
// // // // // //     #worldMapTrigger
// // // // // //     #overlapFrames = 0
// // // // // //     #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

// // // // // //     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// // // // // //     onInitialize(engine) {
// // // // // //         // Voeg speler toe
// // // // // //         this.#player = new Actor({
// // // // // //             name: 'player',
// // // // // //             pos: new Vector(engine.halfDrawWidth, 200),
// // // // // //             width: 32,
// // // // // //             height: 32,
// // // // // //             collisionType: CollisionType.Active
// // // // // //         })
// // // // // //         this.#player.graphics.use(Resources.Persona1.toSprite())
// // // // // //         this.add(this.#player)

// // // // // //         // Voeg triggerblok toe onderaan in het midden
// // // // // //         this.#worldMapTrigger = new Actor({
// // // // // //             pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
// // // // // //             width: 120,
// // // // // //             height: 40,
// // // // // //             collisionType: CollisionType.Passive
// // // // // //         })
// // // // // //         // Gebruik een Graphics.Rect voor een wit blok
// // // // // //         this.#worldMapTrigger.graphics.use(Graphics.Rect({
// // // // // //             width: 120,
// // // // // //             height: 40,
// // // // // //             color: Color.White
// // // // // //         }))
// // // // // //         this.add(this.#worldMapTrigger)
// // // // // //     }

// // // // // //     // Deze functie wordt elke frame aangeroepen
// // // // // //     onPostUpdate(engine, delta) {
// // // // // //         // Controleer of beide actors bestaan en bounds hebben
// // // // // //         if (!this.#player || !this.#worldMapTrigger) return
// // // // // //         if (!this.#player.bounds || !this.#worldMapTrigger.bounds) return

// // // // // //         // Beweging met pijltjestoetsen
// // // // // //         let xspeed = 0
// // // // // //         let yspeed = 0
// // // // // //         const SPEED = 180

// // // // // //         if (engine.input.keyboard.isHeld('ArrowLeft')) xspeed = -SPEED
// // // // // //         if (engine.input.keyboard.isHeld('ArrowRight')) xspeed = SPEED
// // // // // //         if (engine.input.keyboard.isHeld('ArrowUp')) yspeed = -SPEED
// // // // // //         if (engine.input.keyboard.isHeld('ArrowDown')) yspeed = SPEED

// // // // // //         this.#player.vel = new Vector(xspeed, yspeed)

// // // // // //         // Houd speler binnen het scherm
// // // // // //         this.#player.pos.x = clamp(this.#player.pos.x, this.#player.width / 2, engine.drawWidth - this.#player.width / 2)
// // // // // //         this.#player.pos.y = clamp(this.#player.pos.y, this.#player.height / 2, engine.drawHeight - this.#player.height / 2)

// // // // // //         // Check overlap met triggerblok via bounding box
// // // // // //         if (this.#isOverlapping(this.#player, this.#worldMapTrigger) && this.#player.vel.magnitude() < 5) {
// // // // // //             this.#overlapFrames++
// // // // // //             // Ga naar worldmap als speler 2 seconden stilstaat op het blok
// // // // // //             if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
// // // // // //                 engine.goToScene('worldmap')
// // // // // //             }
// // // // // //         } else {
// // // // // //             this.#overlapFrames = 0
// // // // // //         }
// // // // // //     }

// // // // // //     // Check of twee actors overlappen via hun bounding box
// // // // // //     #isOverlapping(actorA, actorB) {
// // // // // //         if (!actorA || !actorB || !actorA.bounds || !actorB.bounds) return false
// // // // // //         return actorA.bounds.intersect(actorB.bounds).hasIntersection()
// // // // // //     }
// // // // // // }


// // // // // import { Scene, Actor, Vector, CollisionType, Color, clamp, Rectangle } from 'excalibur'
// // // // // import { Resources } from '../../resources.js'

// // // // // // TestScene: speler kan naar worldmap door 2 seconden stil te staan op wit blok
// // // // // export class TestScene extends Scene {
// // // // //     #player
// // // // //     #worldMapTrigger
// // // // //     #overlapFrames = 0
// // // // //     #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

// // // // //     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// // // // //     onInitialize(engine) {
// // // // //         // Voeg speler toe
// // // // //         this.#player = new Actor({
// // // // //             name: 'player',
// // // // //             pos: new Vector(engine.halfDrawWidth, 200),
// // // // //             width: 32,
// // // // //             height: 32,
// // // // //             collisionType: CollisionType.Active
// // // // //         })
// // // // //         this.#player.graphics.use(Resources.Persona1.toSprite())
// // // // //         this.add(this.#player)

// // // // //         // Voeg triggerblok toe onderaan in het midden
// // // // //         this.#worldMapTrigger = new Actor({
// // // // //             pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
// // // // //             width: 120,
// // // // //             height: 40,
// // // // //             collisionType: CollisionType.Passive
// // // // //         })
// // // // //         // Gebruik een Rectangle voor een wit blok
// // // // //         this.#worldMapTrigger.graphics.use(new Rectangle({
// // // // //             width: 120,
// // // // //             height: 40,
// // // // //             color: Color.White
// // // // //         }))
// // // // //         this.add(this.#worldMapTrigger)
// // // // //     }

// // // // //     // Deze functie wordt elke frame aangeroepen
// // // // //     onPostUpdate(engine, delta) {
// // // // //         // Controleer of beide actors bestaan en bounds hebben
// // // // //         if (!this.#player || !this.#worldMapTrigger) return
// // // // //         if (!this.#player.bounds || !this.#worldMapTrigger.bounds) return

// // // // //         // Beweging met pijltjestoetsen
// // // // //         let xspeed = 0
// // // // //         let yspeed = 0
// // // // //         const SPEED = 180

// // // // //         if (engine.input.keyboard.isHeld('Keys.Left')) xspeed = -SPEED
// // // // //         if (engine.input.keyboard.isHeld('ArrowRight')) xspeed = SPEED
// // // // //         if (engine.input.keyboard.isHeld('ArrowUp')) yspeed = -SPEED
// // // // //         if (engine.input.keyboard.isHeld('ArrowDown')) yspeed = SPEED

// // // // //         this.#player.vel = new Vector(xspeed, yspeed)

// // // // //         // Houd speler binnen het scherm
// // // // //         this.#player.pos.x = clamp(this.#player.pos.x, this.#player.width / 2, engine.drawWidth - this.#player.width / 2)
// // // // //         this.#player.pos.y = clamp(this.#player.pos.y, this.#player.height / 2, engine.drawHeight - this.#player.height / 2)

// // // // //         // Check overlap met triggerblok via bounding box
// // // // //         if (this.#isOverlapping(this.#player, this.#worldMapTrigger) && this.#player.vel.magnitude() < 5) {
// // // // //             this.#overlapFrames++
// // // // //             // Ga naar worldmap als speler 2 seconden stilstaat op het blok
// // // // //             if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
// // // // //                 engine.goToScene('worldmap')
// // // // //             }
// // // // //         } else {
// // // // //             this.#overlapFrames = 0
// // // // //         }
// // // // //     }

// // // // //     // Check of twee actors overlappen via hun bounding box
// // // // //     #isOverlapping(actorA, actorB) {
// // // // //         if (!actorA || !actorB || !actorA.bounds || !actorB.bounds) return false
// // // // //         return actorA.bounds.intersect(actorB.bounds).hasIntersection()
// // // // //     }
// // // // // }

// // // // import { Scene, Actor, Vector, CollisionType, Color, Rectangle, clamp, Keys } from 'excalibur'
// // // // import { Resources } from '../../resources.js'

// // // // export class TestScene extends Scene {
// // // //     #player
// // // //     #worldMapTrigger
// // // //     #overlapFrames = 0
// // // //     #REQUIRED_FRAMES = 120
// // // //     #SPEED = 180

// // // //     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// // // //     onInitialize(engine) {
// // // //         // Voeg speler toe
// // // //         this.#player = new Actor({
// // // //             name: 'player',
// // // //             pos: new Vector(engine.halfDrawWidth, 200),
// // // //             width: 32,
// // // //             height: 32,
// // // //             collisionType: CollisionType.Active
// // // //         })
// // // //         this.#player.graphics.use(Resources.Persona1.toSprite())
// // // //         this.add(this.#player) // <-- BELANGRIJK

// // // //         // Voeg triggerblok toe onderaan in het midden
// // // //         this.#worldMapTrigger = new Actor({
// // // //             pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
// // // //             width: 120,
// // // //             height: 40,
// // // //             collisionType: CollisionType.Passive
// // // //         })
// // // //         this.#worldMapTrigger.graphics.use(new Rectangle({
// // // //             width: 120,
// // // //             height: 40,
// // // //             color: Color.White
// // // //         }))
// // // //         this.add(this.#worldMapTrigger) // <-- BELANGRIJK
// // // //     }

// // // //     // Per-frame logica
// // // //     onPostUpdate(engine, delta) {
// // // //         if (!this.#player || !this.#worldMapTrigger) return

// // // //         // Beweging met pijltjestoetsen
// // // //         let xspeed = 0
// // // //         let yspeed = 0

// // // //         if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld('ArrowLeft')) xspeed = -this.#SPEED
// // // //         if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld('ArrowRight')) xspeed = this.#SPEED
// // // //         if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld('ArrowUp')) yspeed = -this.#SPEED
// // // //         if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld('ArrowDown')) yspeed = this.#SPEED

// // // //         this.#player.vel = new Vector(xspeed, yspeed)

// // // //         // Houd speler binnen het scherm
// // // //         this.#player.pos.x = clamp(this.#player.pos.x, this.#player.width / 2, engine.drawWidth - this.#player.width / 2)
// // // //         this.#player.pos.y = clamp(this.#player.pos.y, this.#player.height / 2, engine.drawHeight - this.#player.height / 2)

// // // //         // Check overlap met triggerblok via bounding box
// // // //         if (this.#isOverlapping(this.#player, this.#worldMapTrigger) && this.#player.vel.magnitude() < 5) {
// // // //             this.#overlapFrames++
// // // //             if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
// // // //                 engine.goToScene('worldmap')
// // // //             }
// // // //         } else {
// // // //             this.#overlapFrames = 0
// // // //         }
// // // //     }

// // // //     // Check of twee actors overlappen via hun bounding box
// // // //     #isOverlapping(actorA, actorB) {
// // // //         if (!actorA || !actorB || !actorA.bounds || !actorB.bounds) return false
// // // //         return actorA.bounds.intersect(actorB.bounds).hasIntersection()
// // // //     }
// // // // }



// // // import { Scene, Vector, Actor, CollisionType, Color, Rectangle, Keys, clamp } from 'excalibur'
// // // import { Resources } from '../../resources.js'

// // // // Spelerklasse met movement
// // // class TestPlayer extends Actor {
// // //     #speed = 180

// // //     constructor(pos) {
// // //         super({
// // //             pos,
// // //             width: 32,
// // //             height: 32,
// // //             collisionType: CollisionType.Active
// // //         })
// // //     }

// // //     // Deze functie wordt één keer aangeroepen wanneer de speler wordt toegevoegd
// // //     onInitialize(engine) {
// // //         this.graphics.use(Resources.Persona1.toSprite())
// // //     }

// // //     // Per-frame logica: beweging
// // //     onPreUpdate(engine) {
// // //         let xspeed = 0
// // //         let yspeed = 0

// // //         if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld('ArrowLeft')) xspeed = -this.#speed
// // //         if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld('ArrowRight')) xspeed = this.#speed
// // //         if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld('ArrowUp')) yspeed = -this.#speed
// // //         if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld('ArrowDown')) yspeed = this.#speed

// // //         this.vel = new Vector(xspeed, yspeed)

// // //         // Houd speler binnen het scherm
// // //         this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2)
// // //         this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2)
// // //     }
// // // }

// // // export class TestScene extends Scene {
// // //     #player
// // //     #worldMapTrigger
// // //     #overlapFrames = 0
// // //     #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

// // //     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// // //     onInitialize(engine) {
// // //         // Maak speler aan en voeg toe aan scene
// // //         this.#player = new TestPlayer(new Vector(engine.halfDrawWidth, 200))
// // //         this.add(this.#player)

// // //         // Maak triggerblok aan en voeg toe aan scene
// // //         this.#worldMapTrigger = new Actor({
// // //             pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
// // //             width: 120,
// // //             height: 40,
// // //             collisionType: CollisionType.Passive
// // //         })
// // //         this.#worldMapTrigger.graphics.use(new Rectangle({
// // //             width: 120,
// // //             height: 40,
// // //             color: Color.White
// // //         }))
// // //         this.add(this.#worldMapTrigger)
// // //     }

// // //     // Per-frame logica
// // //     onPostUpdate(engine, delta) {
// // //         // Check overlap met triggerblok via bounding box
// // //         const isOverlapping = this.#isOverlapping(this.#player, this.#worldMapTrigger)
// // //         const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

// // //         if (isOverlapping && isStandingStill) {
// // //             this.#overlapFrames++
// // //             // Ga naar worldmap als speler 2 seconden stilstaat op het blok
// // //             if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
// // //                 engine.goToScene('worldmap')
// // //             }
// // //         } else {
// // //             this.#overlapFrames = 0
// // //         }
// // //     }

// // //     // Check of twee actors overlappen via hun bounding box
// // //     #isOverlapping(actorA, actorB) {
// // //         return (
// // //             actorA.pos.x + actorA.width / 2 > actorB.pos.x - actorB.width / 2 &&
// // //             actorA.pos.x - actorA.width / 2 < actorB.pos.x + actorB.width / 2 &&
// // //             actorA.pos.y + actorA.height / 2 > actorB.pos.y - actorB.height / 2 &&
// // //             actorA.pos.y - actorA.height / 2 < actorB.pos.y + actorB.height / 2
// // //         )
// // //     }
// // // }



// // import { Scene, Actor, Vector, CollisionType, Color, Rectangle, Keys, clamp } from 'excalibur'
// // import { Resources } from '../../resources.js'

// // // Spelerklasse met movement
// // class TestPlayer extends Actor {
// //     #speed = 180

// //     constructor(pos) {
// //         super({
// //             pos,
// //             width: 32,
// //             height: 32,
// //             collisionType: CollisionType.Active
// //         })
// //     }

// //     // Deze functie wordt één keer aangeroepen wanneer de speler wordt toegevoegd
// //     onInitialize(engine) {
// //         this.graphics.use(Resources.Persona1.toSprite())
// //     }

// //     // Per-frame logica: beweging
// //     onPreUpdate(engine) {
// //         let xspeed = 0
// //         let yspeed = 0

// //         if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld('ArrowLeft')) xspeed = -this.#speed
// //         if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld('ArrowRight')) xspeed = this.#speed
// //         if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld('ArrowUp')) yspeed = -this.#speed
// //         if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld('ArrowDown')) yspeed = this.#speed

// //         this.vel = new Vector(xspeed, yspeed)

// //         // Houd speler binnen het scherm
// //         this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2)
// //         this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2)
// //     }
// // }

// // export class TestScene extends Scene {
// //     #player
// //     #worldMapTrigger
// //     #overlapFrames = 0
// //     #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

// //     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// //     onInitialize(engine) {
// //         // Maak speler aan en voeg toe aan scene
// //         this.#player = new TestPlayer(new Vector(engine.halfDrawWidth, 200))
// //         this.add(this.#player)

// //         // Maak triggerblok aan en voeg toe aan scene
// //         this.#worldMapTrigger = new Actor({
// //             pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
// //             width: 120,
// //             height: 40,
// //             collisionType: CollisionType.Passive
// //         })
// //         this.#worldMapTrigger.graphics.use(new Rectangle({
// //             width: 120,
// //             height: 40,
// //             color: Color.White
// //         }))
// //         this.add(this.#worldMapTrigger)
// //     }

// //     // Per-frame logica
// //     onPostUpdate(engine, delta) {
// //         // Check overlap met triggerblok via bounding box
// //         const isOverlapping = this.#isOverlapping(this.#player, this.#worldMapTrigger)
// //         const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

// //         if (isOverlapping && isStandingStill) {
// //             this.#overlapFrames++
// //             // Ga naar worldmap als speler 2 seconden stilstaat op het blok
// //             if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
// //                 engine.goToScene('worldmap')
// //             }
// //         } else {
// //             this.#overlapFrames = 0
// //         }
// //     }

// //     // Simpele AABB overlap check
// //     #isOverlapping(actorA, actorB) {
// //         return (
// //             actorA.pos.x + actorA.width / 2 > actorB.pos.x - actorB.width / 2 &&
// //             actorA.pos.x - actorA.width / 2 < actorB.pos.x + actorB.width / 2 &&
// //             actorA.pos.y + actorA.height / 2 > actorB.pos.y - actorB.height / 2 &&
// //             actorA.pos.y - actorA.height / 2 < actorB.pos.y + actorB.height / 2
// //         )
// //     }
// // }

// import { Scene, Actor, Vector, CollisionType, Color, Rectangle, Keys, clamp } from 'excalibur'
// import { Resources } from '../../resources.js'

// // Spelerklasse met movement
// class TestPlayer extends Actor {
//     #speed = 180

//     constructor(pos) {
//         super({
//             pos,
//             width: 32,
//             height: 32,
//             collisionType: CollisionType.Active
//         })
//     }

//     // Deze functie wordt één keer aangeroepen wanneer de speler wordt toegevoegd
//     onInitialize(engine) {
//         // Setup graphics en collision
//         this.graphics.use(Resources.Persona1.toSprite())
//     }

//     // Per-frame logica: beweging
//     onPreUpdate(engine) {
//         let xspeed = 0
//         let yspeed = 0

//         if (engine.input.keyboard.isHeld(Keys.Left) || engine.input.keyboard.isHeld('ArrowLeft')) xspeed = -this.#speed
//         if (engine.input.keyboard.isHeld(Keys.Right) || engine.input.keyboard.isHeld('ArrowRight')) xspeed = this.#speed
//         if (engine.input.keyboard.isHeld(Keys.Up) || engine.input.keyboard.isHeld('ArrowUp')) yspeed = -this.#speed
//         if (engine.input.keyboard.isHeld(Keys.Down) || engine.input.keyboard.isHeld('ArrowDown')) yspeed = this.#speed

//         this.vel = new Vector(xspeed, yspeed)

//         // Houd speler binnen het scherm
//         this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2)
//         this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2)
//     }
// }

// // TestScene: speler kan naar worldmap door 2 seconden stil te staan op wit blok
// export class TestScene extends Scene {
//     #player
//     #worldMapTrigger
//     #overlapFrames = 0
//     #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

//     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
//     onInitialize(engine) {
//         // Maak speler aan en voeg toe aan scene
//         this.#player = new TestPlayer(new Vector(engine.halfDrawWidth, 200))
//         this.add(this.#player)

//         // Maak triggerblok aan en voeg toe aan scene
//         this.#worldMapTrigger = new Actor({
//             pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
//             width: 120,
//             height: 40,
//             collisionType: CollisionType.Passive
//         })
//         // Gebruik een Rectangle voor een wit blok
//         this.#worldMapTrigger.graphics.use(new Rectangle({
//             width: 120,
//             height: 40,
//             color: Color.White
//         }))
//         this.add(this.#worldMapTrigger)
//     }

//     // Deze functie wordt elke frame aangeroepen
//     onPostUpdate(engine, delta) {
//         // Check overlap met triggerblok via bounding box
//         const isOverlapping = this.#isOverlapping(this.#player, this.#worldMapTrigger)
//         // Controleer of speler stilstaat
//         const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

//         if (isOverlapping && isStandingStill) {
//             this.#overlapFrames++
//             // Ga naar worldmap als speler 2 seconden stilstaat op het blok
//             if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
//                 engine.goToScene('worldmap')
//             }
//         } else {
//             this.#overlapFrames = 0
//         }
//     }

//     // Simpele AABB overlap check
//         #isOverlapping(actorA, actorB) {
//             return (
//                 actorA.pos.x + actorA.width / 2 > actorB.pos.x - actorB.width / 2 &&
//                 actorA.pos.x - actorA.width / 2 < actorB.pos.x + actorB.width / 2 &&
//                 actorA.pos.y + actorA.height / 2 > actorB.pos.y - actorB.height / 2 &&
//                 actorA.pos.y - actorA.height / 2 < actorB.pos.y + actorB.height / 2
//             )
//         }
//     }

import { Scene, Actor, Vector, CollisionType, Color, Rectangle, Keys, clamp } from 'excalibur'
import { Resources } from '../../resources.js'

// Spelerklasse met movement
class TestPlayer extends Actor {
    #speed = 180

    constructor(pos) {
        super({
            pos,
            width: 158,
            height: 158,
            collisionType: CollisionType.Active
        })
    }

    // Deze functie wordt één keer aangeroepen wanneer de speler wordt toegevoegd
    onInitialize(engine) {
        // Setup graphics en collision
        this.graphics.use(Resources.Persona1.toSprite())
    }

    // Per-frame logica: beweging
    onPreUpdate(engine) {
        // Beweging met pijltjestoetsen
        let xspeed = 0
        let yspeed = 0

        if (engine.input.keyboard.isHeld(Keys.Left)) xspeed = -this.#speed
        if (engine.input.keyboard.isHeld(Keys.Right)) xspeed = this.#speed
        if (engine.input.keyboard.isHeld(Keys.Up)) yspeed = -this.#speed
        if (engine.input.keyboard.isHeld(Keys.Down)) yspeed = this.#speed

        this.vel = new Vector(xspeed, yspeed)

        // Houd speler binnen het scherm
        this.pos.x = clamp(this.pos.x, this.width / 2, engine.drawWidth - this.width / 2)
        this.pos.y = clamp(this.pos.y, this.height / 2, engine.drawHeight - this.height / 2)
    }
}

// TestScene: speler kan naar worldmap door 2 seconden stil te staan op wit blok
export class TestScene extends Scene {
    #player
    #worldMapTrigger
    #overlapFrames = 0
    #REQUIRED_FRAMES = 120 // 2 seconden bij 60fps

    // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
    onInitialize(engine) {
        // Maak speler aan en voeg toe aan scene
        this.#player = new TestPlayer(new Vector(engine.halfDrawWidth, 200))
        this.add(this.#player)

        // Maak triggerblok aan en voeg toe aan scene
        this.#worldMapTrigger = new Actor({
            pos: new Vector(engine.halfDrawWidth, engine.drawHeight - 40),
            width: 120,
            height: 40,
            collisionType: CollisionType.Passive
        })
        // Gebruik een Rectangle voor een wit blok
        this.#worldMapTrigger.graphics.use(new Rectangle({
            width: 120,
            height: 40,
            color: Color.White
        }))
        this.add(this.#worldMapTrigger)
    }

    // Deze functie wordt elke frame aangeroepen
    onPostUpdate(engine, delta) {
        // Check overlap met triggerblok via bounding box
        if (this.#player && this.#worldMapTrigger) {
            const isOverlapping = this.#isOverlapping(this.#player, this.#worldMapTrigger)
            // Controleer of speler stilstaat
            const isStandingStill = Math.abs(this.#player.vel.x) < 1 && Math.abs(this.#player.vel.y) < 1

            if (isOverlapping && isStandingStill) {
                this.#overlapFrames++
                // Ga naar worldmap als speler 2 seconden stilstaat op het blok
                if (this.#overlapFrames >= this.#REQUIRED_FRAMES) {
                    engine.goToScene('worldmap')
                }
            } else {
                this.#overlapFrames = 0
            }
        }
    }

    // Simpele AABB overlap check
    #isOverlapping(actorA, actorB) {
        // Controleer of beide actors bestaan
        if (!actorA || !actorB) return false
        return (
            actorA.pos.x + actorA.width / 2 > actorB.pos.x - actorB.width / 2 &&
            actorA.pos.x - actorA.width / 2 < actorB.pos.x + actorB.width / 2 &&
            actorA.pos.y + actorA.height / 2 > actorB.pos.y - actorB.height / 2 &&
            actorA.pos.y - actorA.height / 2 < actorB.pos.y + actorB.height / 2
        )
    }
}