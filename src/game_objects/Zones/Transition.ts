import Game from "../../scenes/Game";

export default class TransitionZone extends Phaser.GameObjects.Rectangle {

    public scene: Game;

    constructor ( scene: Game, x: number, y: number, width: number, height: number, id: number ) {
        super( scene, x, y, width + 6, height + 6, 0xff0000, 0.75 );
        this.scene = scene;
        this.setOrigin(0, 0);
        this.setData('Type', "Transition");
        this.setData('ID', id);
        this.setInteractive();
        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.rightButtonDown() ) {
                if ( Phaser.Geom.Rectangle.ContainsRect(this.getBounds(), this.scene.PlayerCharacter.getBounds()) ) {
                    this.scene.UI.ShowTransitionScreen();
                    this.scene.ActiveTransition = id;
                }
            }
        });
        this.scene.add.existing(this);
    }

}