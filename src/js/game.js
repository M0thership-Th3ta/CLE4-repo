import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { DebugControl } from './debug_control.js'
import { Minigame_1 } from './scenes/minigames/minigame_1/minigame_1.js'
import { Minigame_2 } from './scenes/minigames/minigame_2/minigame_2.js'
import { Minigame_3 } from './scenes/minigames/minigame_3/minigame_3.js'
import { Restaurantscene_1 } from './scenes/cutscenes/restaurantscene_1.js'
import { Restaurantscene_2 } from './scenes/cutscenes/restaurantscene_2.js'
import { Restaurantscene_3 } from './scenes/cutscenes/restaurantscene_3.js'
import { Restaurantscene_4 } from './scenes/cutscenes/restaurantscene_4.js'
import { Testscene } from './scenes/cutscenes/testscene.js'

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
        this.add('restaurantscene_1', new Restaurantscene_1())
        this.add('minigame_1', new Minigame_1())
        this.add('restaurantscene_2', new Restaurantscene_2())
        this.add('minigame_2', new Minigame_2())
        this.add('restaurantscene_3', new Restaurantscene_3())
        this.add('minigame_3', new Minigame_3())
        this.add('restaurantscene_4', new Restaurantscene_4())
        this.add('testscene', new Testscene())
        this.goToScene('root')

        this.debugControl = new DebugControl(this)
        this.debugControl.initialize()
    }
}

new Game()
