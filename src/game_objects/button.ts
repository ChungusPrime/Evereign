import UI from "../scenes/UI";

export default class Button extends Phaser.GameObjects.NineSlice {

    public scene: UI;
    public text: Phaser.GameObjects.Text;

    constructor ( scene: UI, x: number, y: number, text: string, callback: Function ) {

        super ( scene, x, y, "Kenney-UI", "buttonLong_blue_pressed", scene.SidePanelBackground.width * 0.95, 40, 10, 10, 10, 10 );

        this.scene = scene;

        this.setInteractive().setOrigin(0);

        //Phaser.Display.Align.In.Center(this.text, this);

        this.on('pointerdown', () => {
            callback();
            this.scene.sound.play('click');
        }, scene);

        this.on('pointerover', () => {
            //this.button.setTexture('button');
        }, scene);

        this.on('pointerout', () => {
            //this.button.setTexture('button-down');
        }, scene);

        this.scene.add.existing(this);

        this.text = scene.add.text(this.getCenter().x, this.getCenter().y, text, { fontSize: 24, align: "center", fontFamily: "Augusta" }).setOrigin(0.5, 0.5).setShadow(1, 1, "#000000", 1);

        this.scene.add.existing(this.text);

        return this;
    }

}
