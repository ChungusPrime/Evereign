import Game from "../../scenes/Game";

export default class Torch extends Phaser.GameObjects.Sprite {

    public scene: Game;
    public light: Phaser.GameObjects.Light;

    constructor ( scene: Game, object: { x: number, y: number, width: number, height: number }, isPlayerOwned: boolean = false ) {
        super( scene, object.x, object.y, "RA_Village_Animations", 20 );
        this.scene = scene;
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(32, 32)
        .setPipeline("Light2D")
        .play({ key: "torch-anim", repeat: -1 })
        this.light = scene.lights.addLight(object.x + 16, object.y - 16, 256, 0xFE9900, 1);
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