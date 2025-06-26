import { ImageSource, Sound, Loader, Font, FontSource } from 'excalibur'
import { StartScene } from './scenes/startscene'

// Gebruik altijd paden relatief aan de public folder
const Resources = {
    Turtle: new ImageSource('images/turtle.png'),
    Platform: new ImageSource('images/Rock.png'),
    Sea: new ImageSource('images/sea.png'),
    Background3: new ImageSource('images/beach-background.png'),
    Dock: new ImageSource('images/dock.png'),
    MarineBiologist: new ImageSource('images/miles2.png'),
    RobotWithTurtle: new ImageSource('images/robot-holding-turtle.png'),
    BG1: new ImageSource('images/greengrassbluebackground.png'),
    BG2: new ImageSource('images/snackbar-background.png'),
    RestaurantLayout: new ImageSource('images/restau-2.png'),
    Player: new ImageSource('images/robot-02.png'),
    Food1: new ImageSource('images/pastechi.png'),
    Food2: new ImageSource('images/lumpia.png'),
    Food3: new ImageSource('images/johny-cake.png'),    
    Shanty: new ImageSource('images/shanty2.png'),
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
    Persona2: new ImageSource('images/zhiwen.png'),
    Persona3: new ImageSource('images/miles2.png'),
    Zwartachtergrond: new ImageSource('images/zwartachtergrond.png'),
    PressStart2P: new FontSource('font/PressStart2P-Regular.ttf', 'basic'),
    InstructionBackground: new ImageSource('images/instructionBackground.png'),
    CorrectAnswer: new Sound('dialogue/sounds/correctanswer.mp3'),
    JumpSound: new Sound('dialogue/sounds/jumpsound.mp3'),
    ErrorSound: new Sound('dialogue/sounds/error.mp3'),
    TingSound: new Sound('dialogue/sounds/ting.mp3'),
    BackgroundMinigame2: new ImageSource('images/backgroundMinigame2.png'),
    snackbar_personage1 : new ImageSource('images/snackbar-personage1.png'),
    snackbar_personage2 : new ImageSource('images/snackbar-personage2.png'),
    snackbar_personage3 : new ImageSource('images/snackbar-personage3.png'),
    snackbar_personage4 : new ImageSource('images/snackbar-personage4.png'),
    Startscene: new ImageSource ('images/startscenes.png'),

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
