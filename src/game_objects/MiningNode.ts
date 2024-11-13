import Game from "../scenes/Game";

export default class MiningNode extends Phaser.Physics.Arcade.Sprite {
    public scene: Game;
    constructor ( scene: Game, x: number, y: number, width: number, height: number, name: string ) {
        super(scene, x, y, "mining-nodes", 0);
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
        }).setData('type', name)
        .setImmovable(true);
        return this;
    }
}