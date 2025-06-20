// // import { Scene, Actor, Vector, CollisionType } from 'excalibur'
// // import { Resources } from '../../resources.js'

// // export class WorldMap extends Scene {
// //     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
// //     onInitialize(engine) {
// //         // Voeg de achtergrond toe met greengrassbluebackground.png
// //         const background = new Actor({
// //             pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
// //             width: engine.drawWidth,
// //             height: engine.drawHeight,
// //             collisionType: CollisionType.PreventCollision
// //         })
// //         background.graphics.use(Resources.GreenGrassBlueBackground.toSprite())
// //         this.add(background)
// //     }
// // }

// import { Scene, Actor, Vector, CollisionType } from 'excalibur'
// import { Resources } from '../../resources.js'

// // Deze scene toont alleen de achtergrondafbeelding van greengrassbluebackground.png
// export class WorldMap extends Scene {
//     // Deze functie wordt één keer aangeroepen wanneer de scene wordt geladen
//     onInitialize(engine) {
//         // Maak een actor voor de achtergrond
//         const background = new Actor({
//             pos: new Vector(engine.halfDrawWidth, engine.halfDrawHeight),
//             width: engine.drawWidth,
//             height: engine.drawHeight,
//             collisionType: CollisionType.PreventCollision
//         })
//         background.graphics.use(Resources.GreenGrassBlueBackground.toSprite())
//         // Voeg de actor toe aan de scene
//         this.add(background)
//     }
// }