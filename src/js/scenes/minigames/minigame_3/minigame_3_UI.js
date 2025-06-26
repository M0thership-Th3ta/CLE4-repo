import { Actor, Color, Font, FontUnit, Label, TextAlign, Vector } from "excalibur";
import { Resources } from "../../../resources";

export class Minigame3UI extends Actor {

    amountTracker;
    amountLabel;
    amount = 0;

    constructor(player, amountTracker) {

        super({
            x: 0,
            y: 0,
            z: 100
        });

        this.player = player;
        this.amountTracker = amountTracker ?? { amount: 0 };
    }

    onInitialize(engine) {
        const font = new Font({
            family: "Arial",
            size: 24,
            color: Color.Blue,
            textAlign: TextAlign.Left,
        })

        this.amountLabel = new Label({
            text: `Zeeschildpadden geredt: 0`,
            pos: new Vector(800, 25),
            font: Resources.PressStart2P.toFont({
                size: 15,
                color: Color.White,
                unit: FontUnit.Px,
            }),
        })

        this.addChild(this.amountLabel);
        this.updateAmount(this.amountTracker.amount);
    }

    updateAmount(amount) {
        this.amountLabel.text = `Zeeschildpadden geredt: ${amount}`;
    }
}
