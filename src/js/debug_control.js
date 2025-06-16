import { Actor, Keys } from "excalibur"

export class DebugControl extends Actor {
    engine

    constructor(engine) {
        super()
        this.engine = engine
    }

    initialize() {
        this.engine.input.keyboard.on('press', (evt) => this.handleKeyPress(evt))
    }

    handleKeyPress(evt) {
        switch (evt.key) {
            case Keys.Q:
                this.switchScene('cutscene_1')
                break
            case Keys.W:
                this.switchScene('minigame_1')
                break
            case Keys.E:
                this.switchScene('cutscene_2')
                break
            case Keys.R:
                this.switchScene('minigame_2')
                break
            case Keys.T:
                this.switchScene('cutscene_3')
                break
            case Keys.R:
                this.switchScene('minigame_3')
                break
            case Keys.R:
                this.switchScene('cutscene_4')
                break
        }
    }

    // Wissel van scene en verwijder alle actors uit de oude scene
    switchScene(sceneName) {
        const currentScene = this.engine.currentScene
        // Verwijder alle actors uit de scene
        for (const actor of currentScene.actors) {
            currentScene.remove(actor)
        }
        this.engine.goToScene(sceneName)
    }
}