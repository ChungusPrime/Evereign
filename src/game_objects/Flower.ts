import Game from "../scenes/Game";

export default class Flower extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;

    constructor ( scene: Game, x: number, y: number, type: string ) {

        super(scene, x, y, "RA_Jungle", 0);

        if ( type == "Marigold" ) {
            this.setTexture("RA_Jungle");
            this.setFrame(1075);
        } else if ( type == "Bloomberry" ) {
            this.setTexture("RA_Jungle");
            this.setFrame(1179);
        } else if ( type == "Munkle's Brightcap" ) {
            this.setTexture("RA_Cavern_Full");
            this.setFrame(902);
        }

        this.setData('type', type)

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.setOrigin(0, 1)
        .setLighting(true)
        .setDepth(100)
        .setInteractive()
        .on('pointerover', () => { 
            this.scene.SelectedObject = this
        })
        .on('pointerout', () => { 
            this.scene.SelectedObject = null 
        })
        .setImmovable(true);

        return this;
    }
}