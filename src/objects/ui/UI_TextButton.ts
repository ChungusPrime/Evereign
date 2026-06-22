import Menu from "../../scenes/Menu";
import BBCodeText from 'phaser4-rex-plugins/plugins/bbcodetext.js';
import UI from "../../scenes/UI";

export default class TextButton extends BBCodeText {

    public scene: Menu | UI;

    constructor ( scene: Menu | UI, x: number, y: number, text: string, callback: Function, fontsize: number = 32, colour: string = "#000000", hoverColour: string = "#ffffff" ) {
        super(scene, x, y, text, { fontSize: fontsize, align: "center", fontFamily: "Augusta" });
        this.setOrigin(0.5);
        this.scene = scene;
        this.setInteractive();
        this.on('pointerover', () => {
            this.setStyle({ color: hoverColour });
        }).on('pointerout', () => {
            this.setStyle({ color: colour });
        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                callback();
                this.scene.sound.play('click');
            }
        });
        this.setStyle({ color: colour });
        this.scene.add.existing(this);
    }

    public show () {
        this.setVisible(true);
    }

    public hide () {
        this.setVisible(false);
    }
    
}