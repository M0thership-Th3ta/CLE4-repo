import { Actor, Keys } from "excalibur"

export class DebugControl extends Actor {
    engine

    constructor(engine) {
        super()
        this.engine = engine
       /////////////////////////////////////////// Voeg DebugControl toe aan de huidige scene
        if (engine.currentScene) {
            engine.currentScene.add(this)
        }
    }

    initialize() {
        this.engine.input.keyboard.on('press', (evt) => this.handleKeyPress(evt))
    }

    handleKeyPress(evt) {
        switch (evt.key) {
            case Keys.Q:
                this.switchScene('restaurantscene_1')
                break
            case Keys.P:
                this.switchScene('minigame_1')
                break
            case Keys.E:
                this.switchScene('restaurantscene_2')
                break
            case Keys.R:
                this.switchScene('minigame_2')
                break
            case Keys.T:
                this.switchScene('restaurantscene_3')
                break
            case Keys.Y:
                this.switchScene('minigame_3')
                break
            case Keys.O:
                this.switchScene('restaurantscene_4')
                break
            case Keys.I:
                this.switchScene('testscene')
                break
            case Keys.K:
                this.switchScene('gameover')
                break
            case Keys.F:
            case Keys.F2:
                this.switchScene('worldmap')
                break
                // Toggle debug mode om colliders te zien
                this.engine.toggleDebug()
                console.log(`Debug mode: ${this.engine.isDebug ? 'AAN' : 'UIT'}`)
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