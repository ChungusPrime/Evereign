import TownUI from "../scenes/UI";

export default class Button extends Phaser.GameObjects.Image {

    text: Phaser.GameObjects.Text;
    scene: TownUI;

    constructor ( scene: TownUI, x: number, y: number, text: string, callback: Function ) {

        super ( scene, x, y, "button-down" );

        this.scene = scene;

        this.setInteractive().setOrigin(0).setDisplaySize( this.scene.SidePanelWidth * 0.92, 40 );

        this.text = scene.add.text(this.getCenter().x, this.getCenter().y, text, { fontSize: 20 }).setOrigin(0.5, 0.5);

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

        scene.add.existing(this);
    }

}
