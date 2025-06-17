import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { DebugControl } from './debug_control.js'
import { Minigame_1 } from './scenes/minigames/minigame_1/minigame_1.js'
import { Minigame_2 } from './scenes/minigames/minigame_2/minigame_2.js'
import { Minigame_3 } from './scenes/minigames/minigame_3/minigame_3.js'
import { Cutscene_1 } from './scenes/cutscenes/cutscene_1.js'
import { Cutscene_2 } from './scenes/cutscenes/cutscene_2.js'
import { Cutscene_3 } from './scenes/cutscenes/cutscene_3.js'
import { Cutscene_4 } from './scenes/cutscenes/cutscene_4.js'
import { Testscene } from './scenes/cutscenes/testscene.js'

export class Game extends Engine {

    constructor() {
        super({ 
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Realistic,
                gravity: new Vector(0, 800)
            }
         })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")
        this.add('cutscene_1', new Cutscene_1())
        this.add('minigame_1', new Minigame_1())
        this.add('cutscene_2', new Cutscene_2())
        this.add('minigame_2', new Minigame_2())
        this.add('cutscene_3', new Cutscene_3())
        this.add('minigame_3', new Minigame_3())
        this.add('cutscene_1', new Cutscene_4())
        this.add('testscene', new Testscene())
        this.goToScene('root')

        this.debugControl = new DebugControl(this)
        this.debugControl.initialize()
    }
}

new Game()
