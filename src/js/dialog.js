import { Actor, Vector, Color, Text, Font } from 'excalibur';

export class DialogSystem {
    constructor(game) {
        this.game = game;
        
        // Dialog box background
        this.dialogBox = new Actor({
            pos: new Vector(game.drawWidth / 2, game.drawHeight - 100),
            width: game.drawWidth - 40,
            height: 150,
            color: Color.Gray,
        });
        this.dialogBox.anchor.setTo(0.5, 0.5);
        this.dialogBox.graphics.opacity = 0;
        
        // Text display
        this.textActor = new Actor({
            pos: new Vector(40, game.drawHeight - 150),
            width: game.drawWidth - 80,
            height: 130,
        });
        this.textActor.anchor.setTo(0, 0);
        this.textActor.graphics.opacity = 0;
        
        // State
        this.currentDialog = [];
        this.currentLine = 0;
        this.isDialogActive = false;
    }
    
    hideDialog() {
        this.isDialogActive = false;
        this.dialogBox.graphics.opacity = 0;
        this.textActor.graphics.opacity = 0;
        this.textActor.graphics.use(null);
    }

    displayCurrentLine() {
        if (this.currentLine < this.currentDialog.length) {
            const text = new Text({
                text: this.currentDialog[this.currentLine],
                font: new Font({ 
                    size: 25, 
                    family: 'Arial', 
                    color: Color.Black,
                    shadow: {
                        blur: 5,
                        offset: new Vector(2, 2),
                        color: Color.White
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
        this.dialogBox.graphics.opacity = this.isDialogActive ? 0.8 : 0;
        this.textActor.graphics.opacity = this.isDialogActive ? 1 : 0;
    }
}