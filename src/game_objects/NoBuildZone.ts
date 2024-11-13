import Game from "../scenes/Game";

export default class NoBuildZone {

    public scene: Game;
    public body: Phaser.Physics.Arcade.Sprite;
    public circle: Phaser.GameObjects.Arc;

    constructor ( scene: Game, parent: Phaser.GameObjects.Sprite, x: number, y: number, radius: number ) {
        
        this.scene = scene;

        this.circle = this.scene.add.circle(parent.getCenter().x, parent.getCenter().y, radius, 0xff0000, 0.15)
        .setVisible(false);

        parent.setInteractive()
        .on('pointerover', () => {
            this.circle.setVisible(true);
        })
        .on('pointerout', () => {
            this.circle.setVisible(false);
        });
        
        this.body = this.scene.physics.add.sprite(parent.getCenter().x, parent.getCenter().y, "items", 0)
        .setCircle(radius, -radius, -radius)
        .setOrigin(0.5, 0.5)
        .setDepth(this.circle.depth + 1);
    }

}