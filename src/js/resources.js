import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    BG1: new ImageSource('public/images/skyblue.png'),
    BG2: new ImageSource('public/images/snackbar.png'),
    RestaurantLayout: new ImageSource('public/images/restaurantlayout.png'),
}




const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }