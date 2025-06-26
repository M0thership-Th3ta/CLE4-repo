import { Actor, Scene, Vector, Color, Label, Font, FontUnit, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { Restaurantscene_2 } from './cutscenes/restaurantscene_2.js'

// StartScene toont de titel en instructies
export class StartScene extends Scene {
    _keyHandler;

    constructor() {
        super({
            id: 'startscene',
            width: 800,
            height: 600,
            backgroundColor: Color.fromHex('#f00e70'),
        })
    }

    onInitialize(engine) {
        this.engine = engine; // sla engine op voor later gebruik

        // Voeg achtergrondafbeelding toe
        const background = new Actor({
            pos: new Vector(engine.drawWidth / 2, engine.drawHeight / 2),
            width: engine.drawWidth,
            height: engine.drawHeight,
            anchor: new Vector(0.5, 0.5),
            z: -1 // Zorg dat de achtergrond achter alles staat
        });
        const bgSprite = Resources.Startscene.toSprite();
        bgSprite.width = engine.drawWidth;
        bgSprite.height = engine.drawHeight;
        background.graphics.use(bgSprite);
        this.add(background);

        // Voeg een titel toe
        const title = new Label({
                text: "Shanty's Kitchen",
                pos: new Vector(engine.drawWidth / 2, 200),
                font: new Font({
                    family: 'Arial',
                    size: 32,
                    color: Color.White,
                    textAlign: 'center',
                }),
                anchor: new Vector(0.5, 0.5),
            })
       

        // Voeg een instructie toe
        const instruction = new Label({
                text: 'Druk op A-Knop om te beginnen!',
                // pos: new Vector(engine.drawWidth / 2, 350),
                pos: new Vector(380, 380),

                // font: new Font({
                //     family: 'Arial',
                //     size: 18,
                //     color: Color.White,
                //     textAlign: 'center'
                // }),
                font: Resources.PressStart2P.toFont({
                size: 18,
                color: Color.White,
                unit: FontUnit.Px,
            }),
                anchor: new Vector(0.5, 0.5)
            })
        this.add(instruction)

        // Sla de handler op als property
        this._keyHandler = (evt) => {
                if (evt.key === Keys.Z || evt.key === Keys.Space) {
                    engine.goToScene('restaurantscene_2');
                }
            };
            engine.input.keyboard.on('press', this._keyHandler);
        }

    // Gebruik de update-methode i.p.v. setInterval
    update(engine, delta) {
            super.update(engine, delta);

            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            for(const pad of gamepads) {
                if (!pad) continue;
                // A-knop (Xbox: 0), X-knop (PlayStation: 0), eventueel B/Circle (index 1)
                if ((pad.buttons[0] && pad.buttons[0].pressed) ||
                    (pad.buttons[1] && pad.buttons[1].pressed)) {
                    engine.goToScene('restaurantscene_2');
                }
            }
        }    onDeactivate() {
            // Verwijder de event listener netjes bij verlaten scene
            if(this._keyHandler && this.engine) {
                this.engine.input.keyboard.off('press', this._keyHandler);
    }
}
}