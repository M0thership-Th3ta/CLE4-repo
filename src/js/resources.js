import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Turtle: new ImageSource('images/turtle.png'),
    Platform: new ImageSource('images/platform.png'),
    Sea: new ImageSource('images/sea.jpg'),
    Background3: new ImageSource('images/backgroundCliff.png'),
    Dock: new ImageSource('images/dock.png'),
    BG1: new ImageSource('images/greengrassbluebackground.png'),
    BG2: new ImageSource('images/snackbar.png'),
    Food1: new ImageSource('images/food1.png'),
    Food2: new ImageSource('images/food2.png'),
    Food3: new ImageSource('images/food3.png'),
    RestaurantLayout: new ImageSource('images/restaurantLayout.png'),
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }