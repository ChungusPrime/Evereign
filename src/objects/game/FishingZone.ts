import Game from "../../scenes/Game";

export default class FishingZone extends Phaser.GameObjects.Rectangle {

    public scene: Game;

    constructor ( scene: Game, x: number, y: number, width: number, height: number ) {
        super( scene, x, y, width, height, 0xff0000, 0.75 );
        this.scene = scene;
        this.setOrigin(0, 0);
        this.setInteractive();
        this.on("pointerdown", () => {
            this.scene.ActionManager.StartHarvesting(this);
        });
        this.scene.Zones.add(this);
        this.scene.add.existing(this);
    }

}