/*
Visual representation of a bar that can be used to display health, mana, or other resources.
This bar can be customized with different colors and sizes.
*/

export default class UI_Bar extends Phaser.GameObjects.Image {

    public scene: Phaser.Scene;
    public Background: Phaser.GameObjects.Rectangle;
    public Text: Phaser.GameObjects.Text;

    constructor ( scene: Phaser.Scene, x: number, y: number ) {
        super(scene, 0, 0, "red-bar");
        this.scene = scene;
        this.Background = scene.add.rectangle(x, y + 3, 340, 30, 0x000000, 1).setOrigin(0, 0);
        this.setDisplaySize(this.Background.width, 30).setOrigin(0, 0);
        this.setPosition(this.Background.getTopLeft().x, this.Background.getTopLeft().y);
        this.Text = this.scene.add.text(this.getLeftCenter().x + 4, this.getLeftCenter().y, "LIFE", { fontFamily: "Augusta"} ).setOrigin(0, 0.5);
    }

    update () {

    }

}