import Game from "../../scenes/Game";

export default class Torch extends Phaser.GameObjects.Sprite {

    public scene: Game;
    public light: Phaser.GameObjects.Light;

    constructor ( scene: Game, x: number, y: number, ID: string, Data: WorldData ) {
        super( scene, x, y, "RA_Village_Animations", 20 );
        this.scene = scene;
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(32, 32)
        .setPipeline("Light2D")
        this.light = scene.lights.addLight(x + 16, y - 16, 256, 0xFE9900, 1);
        return this;
    }
    
}