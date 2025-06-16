import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Turtle } from './scenes/minigames/minigame_3/turtle'

// voeg hier jouw eigen resources toe
const Resources = {
    BG2: new ImageSource('public/images/load_bearing_image.png'),
    Turtle: new ImageSource('public/images/turtle.png'),
    Platform: new ImageSource('public/images/platform.png'),
    Sea: new ImageSource('public/images/sea.png'),
    Background3: new ImageSource('public/images/background3.png'),
    Dock: new ImageSource('public/images/dock.png'),
    BG1: new ImageSource('public/images/skyblue.png'),
    BG2: new ImageSource('public/images/snackbar.png'),
    RestaurantLayout: new ImageSource('public/images/restaurantlayout.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }