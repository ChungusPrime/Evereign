import Game from "../../scenes/Game";

export default class DeadWillowTree extends Phaser.Physics.Arcade.Sprite {

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject ) {
        super( scene, object.x, object.y, "WillowTree", 1);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(object.width, object.height)
        .setLighting(true)
        .setDepth(100)
        .setBodySize(30, 60)
        .setImmovable(true)
        this.body.setOffset(80, 120);
        scene.Trees.add(this);
    }

}