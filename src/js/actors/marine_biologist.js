import { Vector } from "excalibur";
import { Resources } from "../resources";
import { NPC } from "./npc";
import { Player } from "../player/playermarine";

export class MarineBiologist extends NPC {

    constructor(pos) {

        super( pos, "marine biologist", 40);
    }

    setupGraphics() {
        const sprite = Resources.MarineBiologist.toSprite();
        sprite.scale = new Vector(0.40, 0.40);
        this.graphics.use(sprite);
    }

    hit () {
        this.actions.blink(this.width, this.height);
    }

}