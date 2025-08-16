import Menu from "../scenes/Menu";

export default class TextButton extends Phaser.GameObjects.Text {
    public scene: Menu;
    constructor ( scene: Menu, x: number, y: number, text: string, callback: Function, fontsize: number = 32, colour: string = "#000000" ) {
        super(scene, x, y, text, { fontSize: fontsize, align: "center", fontFamily: "Augusta", color: colour });
        this.setOrigin(0.5);
        this.scene = scene;
        this.setInteractive();
        this.on('pointerover', () => {
            this.setColor("#ffffff");
        }).on('pointerout', () => {
            this.setColor(colour);
        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                callback();
                this.scene.sound.play('click');
            }
        });
        this.scene.add.existing(this);
    }
}