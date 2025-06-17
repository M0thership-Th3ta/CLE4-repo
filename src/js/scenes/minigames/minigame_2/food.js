import { Actor, Engine, Vector, CollisionType, Shape, RotationType } from "excalibur"
import { Resources } from '../../../resources.js'
import { Mouse } from '../../../player/robot/mouse.js'

export class Food1 extends Actor {

    constructor() {
        super({ 
            pos: new Vector(200, 200),
            width: Resources.Food1.width, 
            height: Resources.Food1.height,
            collisionType: CollisionType.Active
        })
        //this.on("collisionstart", (event) => this.hitSomething(event))
        this.graphics.use(Resources.Food1.toSprite())
        this.isInteractable = true
    }
}

export class Food2 extends Actor {

    constructor() {
        super({ 
            anchor: new Vector(100, 300),
            width: Resources.Food2.width, 
            height: Resources.Food2.height,
            collisionType: CollisionType.Active
        })
        //this.on("collisionstart", (event) => this.hitSomething(event))
        this.graphics.use(Resources.Food2.toSprite())
        this.isInteractable = true
    }
}

export class Food3 extends Actor {

    constructor() {
        super({ 
            pos: new Vector(300, 400),
            width: Resources.Food3.width, 
            height: Resources.Food3.height,
            collisionType: CollisionType.Active
        })
        //this.on("collisionstart", (event) => this.hitSomething(event))
        this.graphics.use(Resources.Food3.toSprite())
        this.isInteractable = true
    }
}