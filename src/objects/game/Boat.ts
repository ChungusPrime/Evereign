import Game from "../../scenes/Game";

export default class Boat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Game, object: Phaser.Types.Tilemaps.TiledObject) {
        super(scene, object.x, object.y, "boats", 0);
        scene.add.existing(this);
        scene.physics.add.existing(this, true);
        this.setOrigin(0, 1);
        this.setLighting(true);
        if ( object.flippedHorizontal )
            this.setFlipX(true);
    }
}