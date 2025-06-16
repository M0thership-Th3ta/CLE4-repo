import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Turtle: new ImageSource('public/images/turtle.png'),
    Platform: new ImageSource('public/images/platform.png'),
    Sea: new ImageSource('public/images/sea.png'),
    Background3: new ImageSource('public/images/backgroundCliff.png'),
    Dock: new ImageSource('public/images/dock.png'),
    BG1: new ImageSource('public/images/greengrassbluebackground.png'),
    BG2: new ImageSource('public/images/snackbar.png'),
    RestaurantLayout: new ImageSource('public/images/restaurantLayout.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }