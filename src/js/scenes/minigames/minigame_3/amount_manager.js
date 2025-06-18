import { Actor, Color, Font, Label, TextAlign, Vector } from "excalibur";

export class AmountManager extends Actor {

    amountTracker;
    amountLabel;

    constructor(player, amountTracker) {

        super({
            x: 0,
            y: 0,
            z: 100
        });

        this.player = this.player;
        this.amountTracker = this.amountTracker ?? { amount: 0 };
    }

    onInitialize(engine) {
        const font = new Font({
            family: "Arial",
            size: 24,
            color: Color.White,
            textAlign: TextAlign.Left,
        })

        this.amountLabel = new Label({
            text: `Aantal geredt schildpadden: ${this.amountTracker.amount}`,
            pos: new Vector(10, 10),
            font: font,
        })

        this.addChild(this.amountLabel);
    }

    updateAmount(amount) {
        this.amountLabel.text = `Aantal geredt schildpadden: ${amount}`;
    }
}
