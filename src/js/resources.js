import { ImageSource, Sound, Loader } from 'excalibur'

// Gebruik altijd paden relatief aan de public folder
const Resources = {
    Turtle: new ImageSource('images/turtle.png'),
    Platform: new ImageSource('images/Rock.png'),
    Sea: new ImageSource('images/sea.png'),
    Background3: new ImageSource('images/beach-background.png'),
    Dock: new ImageSource('images/dock.png'),
    MarineBiologist: new ImageSource('images/marineBiologist.png'),
    RobotWithTurtle: new ImageSource('images/robot-holding-turtle.png'),
    BG1: new ImageSource('images/greengrassbluebackground.png'),
    BG2: new ImageSource('images/snackbar.png'),
    RestaurantLayout: new ImageSource('images/restaurantLayout.png'),
    Player: new ImageSource('images/robot-02.png'),
    Food1: new ImageSource('images/pastechi.png'),
    Food2: new ImageSource('images/lumpia.png'),
    Food3: new ImageSource('images/johny-cake.png'),    
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
    Food4: new ImageSource('images/fria.png'), // Placeholder: lime
    Food5: new ImageSource('images/fria-purple.png'), // Placeholder: lemon
     GreenGrassBlueBackground: new ImageSource('images/greengrassbluebackground.png'),
    Persona1: new ImageSource('images/persona1.png'),
    Persona2: new ImageSource('images/persona2.png'),
    Persona3: new ImageSource('images/persona3.png'),
    Zwartachtergrond: new ImageSource('images/zwartachtergrond.png'),
}
   

// Voeg error handling toe voor elke resource
// Voeg load handlers toe voor elke resource
Object.entries(Resources).forEach(([name, resource]) => {
    if (typeof resource.load === 'function') {
        resource.load()
            .then(() => console.log(`✓ ${name} geladen`))
            .catch((error) => console.error(`✗ Fout bij laden ${name}:`, error))
    }
})

const ResourceLoader = new Loader()
for (const res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }
