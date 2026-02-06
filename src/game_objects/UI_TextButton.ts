import Menu from "../scenes/Menu";
import BBCodeText from 'phaser3-rex-plugins/plugins/bbcodetext.js';
import UI from "../scenes/UI";

export default class TextButton extends BBCodeText {

    public scene: Menu | UI;

    public border : Phaser.GameObjects.NineSlice;

    constructor ( scene: Menu | UI, x: number, y: number, text: string, callback: Function, fontsize: number = 32, colour: string = "#000000" ) {
        super(scene, x, y, text, { fontSize: fontsize, align: "center", fontFamily: "Augusta" });
        this.setOrigin(0.5);
        this.scene = scene;
        this.setInteractive();
        this.on('pointerover', () => {
            this.setStyle({ color: "#ffffff" });
        }).on('pointerout', () => {
            this.setStyle({ color: colour });
        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                callback();
                this.scene.sound.play('click');
            }
        });
        this.setStyle({ color: colour });
        //this.border = this.scene.add.nineslice(x, y, 'Kenney-UI', "buttonLong_beige_pressed", 312, 64, 32, 32, 32, 32).setOrigin(0.5).setVisible(false);

        this.scene.add.existing(this);
    }

    public show () {
        this.setVisible(true);
        //this.border.setVisible(true);
    }

    public hide () {
        this.setVisible(false);
        //this.border.setVisible(false);
    }
    
}