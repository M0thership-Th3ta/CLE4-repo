import '../css/style.css'
import { Engine, Vector, DisplayMode, SolverStrategy, Color } from "excalibur"
import { ResourceLoader } from './resources.js'
import { DebugControl } from './debug_control.js'
import { Minigame_1 } from './scenes/minigames/minigame_1/minigame_1.js'
import { Minigame_2 } from './scenes/minigames/minigame_2/minigame_2.js'
import { Minigame_3 } from './scenes/minigames/minigame_3/minigame_3.js'
import { Restaurantscene_1 } from './scenes/cutscenes/restaurantscene_1.js'
import { Restaurantscene_2 } from './scenes/cutscenes/restaurantscene_2.js'
import { Restaurantscene_3 } from './scenes/cutscenes/restaurantscene_3.js'
import { Restaurantscene_4 } from './scenes/cutscenes/restaurantscene_4.js'
import { WorldMap } from './scenes/locations/worldmap/worldmap.js'
import { TestScene } from './scenes/cutscenes/testscene.js'
import { GameOverScene } from './scenes/cutscenes/gameover.js'
import { GameCompletedScene } from './scenes/cutscenes/gamecompleted.js'
import { StartScene } from './scenes/startscene.js'
import { InstructionScreen } from './scenes/minigames/minigame_2/screens/instruction_screen.js'
import { Minigame2FailScreen } from './scenes/minigames/minigame_2/screens/minigame2_fail_screen.js'
import { Instruction } from './scenes/cutscenes/minigame_3_instruction.js'



export class Game extends Engine {
    gamepadControl

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            physics: {
                solver: SolverStrategy.Arcade,
                gravity: new Vector(0, 800),

            },
            backgroundColor: Color.fromHex('#87ceeb'),
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
        this.add('worldmap', new WorldMap())
        this.add('testscene', new TestScene())
        this.add('gameover', new GameOverScene())
        this.add('gamecompleted', new GameCompletedScene())
        this.add('minigame_2_instruction', new InstructionScreen())
        this.add('minigame2_fail_screen', new Minigame2FailScreen())
        this.add('minigame_3_instruction', new Instruction())
        this.add('startscene', new StartScene())
        this.goToScene('startscene')

        


        this.debugControl = new DebugControl(this)
        this.debugControl.initialize()


        this.input.gamepads.enabled = true
        this.input.gamepads.on('connect', (connectevent) => {
            console.log("gamepad detected")
            this.gamepadControl = connectevent.gamepad
        })
    }



}

new Game()
