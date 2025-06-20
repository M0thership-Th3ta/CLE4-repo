import { ImageSource, Sound, Loader } from 'excalibur'

// Gebruik altijd paden relatief aan de public folder
const Resources = {
    Turtle: new ImageSource('images/turtle.png'),
    Platform: new ImageSource('images/platform.png'),
    Sea: new ImageSource('images/sea.png'),
    Background3: new ImageSource('images/backgroundCliff.png'),
    Dock: new ImageSource('images/dock.png'),
    MarineBiologist: new ImageSource('images/marineBiologist.png'),
    RobotWithTurtle: new ImageSource('images/robotWithTurtle.png'),
    BG1: new ImageSource('images/greengrassbluebackground.png'),
    BG2: new ImageSource('images/snackbar.png'),
    RestaurantLayout: new ImageSource('images/restaurantLayout.png'),
    Player: new ImageSource('images/robot.png'),
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
    Food4: new ImageSource('images/lime.png'), // Placeholder: lime
    Food5: new ImageSource('images/Lemon.png'), // Placeholder: lemon
    GreenGrassBlueBackground: new ImageSource('images/greengrassbluebackground.png'),
    Persona1: new ImageSource('images/persona1.png'),
    Persona2: new ImageSource('images/persona2.png'),
    Persona3: new ImageSource('images/persona3.png'),
    Zwartachtergrond: new ImageSource('images/zwartachtergrond.png'),
}

// Loader vullen
const ResourceLoader = new Loader()
for (const res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
