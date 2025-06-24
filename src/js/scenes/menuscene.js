import { Actor, Scene, Vector, CollisionType, Color, Rectangle, clamp, Keys, Label, Font, FontUnit } from "excalibur"
import { Resources } from '../resources.js'
import { Restaurantscene_2 } from './cutscenes/restaurantscene_2.js'


// MenuScene toont de titel en instructies
export class MenuScene extends Scene {
    _keyHandler;
    constructor() {
        super({
            id: 'menuscene',
            width: 800,
            height: 600,
            backgroundColor: Color.fromHex('#f00e70'),
        })
    }

    onInitialize(engine) {
        // Voeg een titel toe
        const title = new Label({
            text: 'Shanty Kitchen!',
            pos: new Vector(engine.drawWidth / 2, 200),
            font: new Font({
                family: 'Arial',
                size: 32,
                color: Color.White, // Maak wit voor zichtbaarheid
                textAlign: 'center',
            }),
            anchor: new Vector(0.5, 0.5),
        })
        this.add(title)

        // Voeg een instructie toe
        const instruction = new Label({
            text: 'Druk op [Z] of [Spatie] om te starten',
            pos: new Vector(engine.drawWidth / 2, 350),
            font: new Font({
                family: 'Arial', // consistent hoofdlettergebruik
                size: 18,
                color: Color.White, // Maak wit voor zichtbaarheid
                textAlign: 'center'
            }),
            anchor: new Vector(0.5, 0.5)
        })
        this.add(instruction)

        // Sla de handler op als property
        this._keyHandler = (evt) => {
            console.log("Key pressed:", evt.key);
            if (evt.key === Keys.Z || evt.key === Keys.Space) {
                engine.goToScene('restaurantscene_2');
            }
        };
        engine.input.keyboard.on('press', this._keyHandler);
    }

    onDeactivate() {
        // Verwijder de event listener netjes bij verlaten scene
        if (this._keyHandler) {
            this.engine.input.keyboard.off('press', this._keyHandler);
        }
    }
}