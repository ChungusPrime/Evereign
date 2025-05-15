import Game from "../scenes/Game";

export default class Tree extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;

    constructor ( scene: Game, x: number, y: number, width: number, height: number, type: string ) {

        super(scene, x, y, "tree03_s_01_animation", 0);

        switch (type) {
            case "Oak Tree": this.setTexture("tree03_s_01_animation"); break;
            default: this.setTexture("tree03_s_01_animation");
        }

        this.setData('type', type)

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.setOrigin(0, 1)
        .setDisplaySize(width, height)
        .setPipeline("Light2D")
        .setDepth(100)
        .setInteractive()
        .on('pointerover', () => { 
            this.scene.SelectedObject = this
        })
        .on('pointerout', () => { 
            this.scene.SelectedObject = null 
        }).setBodySize(40, 60)
        .play('tree-03-anim')
        .setImmovable(true);

        this.body.setOffset(40, 80);

        return this;
    }
}