import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { DebugControl } from './debug_control.js'
import { Minigame_1 } from './scenes/minigames/minigame_1/minigame_1.js'
import { Minigame_2 } from './scenes/minigames/minigame_2/minigame_2.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        this.add('minigame_1', new Minigame_1())
        this.add('minigame_2', new Minigame_2())
        this.goToScene('root')

        this.debugControl = new DebugControl(this)
        this.debugControl.initialize()
    }
}

new Game()
