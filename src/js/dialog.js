import { Actor, Vector, Color, Text, Font } from 'excalibur';

export class DialogSystem {
    constructor(game) {
        this.game = game;
        
        // Dialog box background
        this.dialogBox = new Actor({
            pos: new Vector(game.drawWidth / 2, game.drawHeight - 100),
            width: game.drawWidth - 40,
            height: 150,
            color: Color.Transparent,
        });
        this.dialogBox.anchor.setTo(0.5, 0.5);
        this.dialogBox.graphics.opacity = 0.8;
        
        // Text display
        this.textActor = new Actor({
            pos: new Vector(40, game.drawHeight - 150),
            width: game.drawWidth - 80,
            height: 130,
        });
        this.textActor.anchor.setTo(0, 0);
        
        // State
        this.currentDialog = [];
        this.currentLine = 0;
        this.isDialogActive = false;
        // Hide initially
        this.dialogBox.visible = false
        this.textActor.visible = false
    }
    
    

    hideDialog() {
    this.isDialogActive = false;
    this.dialogBox.visible = false;
    this.textActor.visible = false;
    // Optionally clear the text as well
    this.textActor.graphics.use(null);
}

    displayCurrentLine() {
    if (this.currentLine < this.currentDialog.length) {
        const text = new Text({
            text: this.currentDialog[this.currentLine],
            font: new Font({ 
                size: 70, 
                family: 'Press Start 2P', 
                color: Color.Black,
                shadow: {
                    blur: 5,
                    offset: new Vector(2, 2),
                    color: Color.Black
                }
            }),
            maxWidth: this.game.drawWidth - 80
        });
        this.textActor.graphics.use(text);
        this.updateDialogVisibility();
    } else {
        this.hideDialog();
    }
}
    
    nextLine() {
        this.currentLine++;
        this.displayCurrentLine();
    }
    
    showDialog(dialogLines) {
        this.currentDialog = dialogLines;
        this.currentLine = 0;
        this.isDialogActive = true;
        this.updateDialogVisibility();
        this.displayCurrentLine();
    }

    updateDialogVisibility() {
        // Only show the dialog box and text if dialog is active
        this.dialogBox.visible = this.isDialogActive;
        this.textActor.visible = this.isDialogActive;
    }
}