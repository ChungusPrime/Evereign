import Game from "../../scenes/Game";

export default class TorchPole extends Phaser.GameObjects.Sprite {

    public scene: Game;
    public light: Phaser.GameObjects.Light;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject, isPlayerOwned: boolean = false ) {
        super( scene, object.x, object.y, "RA_Village_Animation03", 0 );
        this.scene = scene;
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(64, 64)
        .setPipeline("Light2D")
        .play({ key: "torch-pole-anim", repeat: -1 })
        this.light = scene.lights.addLight(object.x + 32, object.y - 32, 256, 0xFE9900, 1);
        scene.MapLights.add(this);

        scene.add.tween({
            targets: this.light,
            intensity: { from: 0.8, to: 1 },
            radius: { from: 240, to: 256 },
            duration: Phaser.Math.Between(600, 1000),
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        return this;
    }

}