import { Scene, Vector, Label, Font, Color } from "excalibur"

// MenuScene toont de titel en instructies
export class MenuScene extends Scene {
    constructor() {
        super({
            id: 'menuscene',
        })
    }

    onInitialize(engine) {
        // Voeg een titel toe
        const title = new Label({
            text: 'Shanty Kitchen!',
            pos: new Vector(engine.drawWidth / 2, 200),
            font: new Font({
                family: 'Press Start 2P',
                size: 32,
                color: Color.Black,
                textAlign: 'center'
            }),
            anchor: new Vector(0.5, 0.5)
        })
        this.add(title)

        // Voeg een instructie toe
        const instruction = new Label({
            text: 'Druk op [Z] of [Spatie] om te starten',
            pos: new Vector(engine.drawWidth / 2, 350),
            font: new Font({
                family: 'arial',
                size: 18,
                color: Color.Black,
                textAlign: 'center'
            }),
            anchor: new Vector(0.5, 0.5)
        })
        this.add(instruction)

        // Event listener voor starten
        engine.input.keyboard.on('press', (evt) => {
            if (evt.key === 'z' || evt.key === ' ') {
                engine.goToScene('restaurantscene_2') // Pas aan naar je gewenste scene
            }
        })
    }
}