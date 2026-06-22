import Game from "../../scenes/Game";

export default class NoBuildZone extends Phaser.GameObjects.Rectangle {

    public scene: Game;

    constructor ( scene: Game, x: number, y: number, width: number, height: number ) {
        super( scene, x, y, width, height, 0xff0000, 0.75 );
        this.scene = scene;
    }

}