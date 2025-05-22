import Game from "../../scenes/Game";

export default class MunklesBrightcap extends Phaser.GameObjects.Sprite {

    constructor ( scene: Game, x: number, y: number) {
        super( scene, x, y, "Buildings", "dwelling_1");
        scene.add.existing(this);
    }

}