import { Actor, Vector, Color, Text, Font } from 'excalibur';

export class DialogSystem {
    constructor(game) {
        this.game = game;

        // Dialog box background
        this.dialogBox = new Actor({
            pos: new Vector(game.drawWidth / 2, game.drawHeight - 100),
            width: game.drawWidth - 40,
            height: 150,
             color: Color.fromHex('#6E260E'),
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
        this.completedDialogs = new Set(); // Track completed dialogs
        this.cooldown = false; // Cooldown state
        this.cooldownTimer = null; // Cooldown timer reference
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
                   color: Color.White,
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
            // Dialog finished
            this.hideDialog();
            this.completedDialogs.add(this.currentDialog.join('')); // Store completed dialog
            this.startCooldown();
        }
    }

    startCooldown() {
        this.cooldown = true;
        // Clear any existing timer
        if (this.cooldownTimer) {
            clearTimeout(this.cooldownTimer);
        }
        // Set new timer
        this.cooldownTimer = setTimeout(() => {
            this.cooldown = false;
        }, 5000); // 5 second cooldown
    }

    nextLine() {
        this.currentLine++;
        this.displayCurrentLine();
    }

    showDialog(dialogLines) {
        // Check if this dialog has been completed or is on cooldown
        const dialogKey = dialogLines.join('');
        if (this.completedDialogs.has(dialogKey)) return;
        if (this.cooldown) return;

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