import Game from "../../scenes/Game";

export default class GoblinFirepit extends Phaser.GameObjects.Sprite {

    public scene: Game;
    public light: Phaser.GameObjects.Light;

    constructor ( scene: Game, object: { x: number, y: number, width: number, height: number }, isPlayerOwned: boolean = false ) {
        super( scene, object.x, object.y, "RA_Village_Animations", 118 );
        this.scene = scene;
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(32, 32)
        .setLighting(true)
        this.light = scene.lights.addLight(this.x + 16, this.y - 16, 256, 0x7DDA58, 1);
        return this;
    }

}