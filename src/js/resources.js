import { ImageSource, Sound, Resource, Loader } from 'excalibur'

// voeg hier jouw eigen resources toe
const Resources = {
    Turtle: new ImageSource('public/images/turtle.png'),
    Platform: new ImageSource('public/images/platform.png'),
    Sea: new ImageSource('public/images/sea.png'),
    Background3: new ImageSource('public/images/backgroundCliff.png'),
    Dock: new ImageSource('public/images/dock.png'),
    MarineBiologist: new ImageSource('public/images/marineBiologist.png'),
    RobotWithTurtle: new ImageSource('public/images/robotWithTurtle.png'),
    BG1: new ImageSource('public/images/greengrassbluebackground.png'),
    BG2: new ImageSource('public/images/snackbar.png'),
    RestaurantLayout: new ImageSource('public/images/restaurantLayout.png'),
    Player: new ImageSource('public/images/robot.png'),
    Food1: new ImageSource('images/food1.png'),
    Food2: new ImageSource('images/food2.png'),
    Food3: new ImageSource('images/food3.png'),    
    Shanty: new ImageSource('images/pokemonGirl.png'),
    Farmer: new ImageSource('images/pokemonFarmer.png'),
    Tree: new ImageSource('images/tree.png'),
    Pointer: new ImageSource('images/pointer.png'),
    Customer1: new ImageSource('images/persona1.png'),
    Lime: new ImageSource('images/lime.png'),
    Lemon: new ImageSource('images/Lemon.png'),
    Basket: new ImageSource('images/basket.png'),
    Passionfruit: new ImageSource('images/pomegranete.png'),
    WorldMap: new ImageSource('images/map2.png'),
}

// Voeg error handling toe voor elke resource
Object.entries(Resources).forEach(([name, resource]) => {
    resource.onLoad = () => console.log(`✓ ${name} geladen`)
    resource.onError = (error) => console.error(`✗ Fout bij laden ${name}:`, error)
})

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
  ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
