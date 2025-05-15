import UI from "../scenes/UI";

export default class JournalButton extends Phaser.GameObjects.Text {

    constructor ( scene: UI, x: number, y: number, text: string ) {
        
        super(scene, x, y, text, {
            align: "center",
            fontFamily: "Augusta",
            fontSize: 36 
        });

        this.setVisible(false)
        .setOrigin(0.5)
        .setTint(0x000000)
        .setInteractive()
        .on('pointerover', () => { 
            this.setTint(scene.ColourWheel[192].color);
        })
        .on('pointerout', () => { 
            this.setTint(0x000000);
        })
        .on('pointerdown', () => { 
            scene.ChangeJournalMenu(text);
        });

        scene.add.existing(this);
    }

}