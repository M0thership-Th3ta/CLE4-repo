import { Actor, Engine, Vector, DisplayMode, Keys } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'

export class DebugControl extends Actor {
    onPreUpdate(engine, delta) {
        if (engine.input.keyboard.wasPressed(Keys.One)) {
            engine.currentScene.clear();
            engine.goToScene('minigame_1');
            setTimeout(() => {
            minigame_1.startGame();
            }, 0);
        }

        if (engine.input.keyboard.wasPressed(Keys.Two)) {
            engine.currentScene.clear();
            engine.goToScene('minigame_2');
            setTimeout(() => {
            minigame_2.startMinigame();
            }, 0);
        }
    }
}