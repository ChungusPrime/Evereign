import Town from "../scenes/Game";

export default class Placeholder extends Phaser.GameObjects.Rectangle {

    public body: any

    constructor ( scene: Town ) {
        super( scene, 0, 0, 0, 0, 0xdb382c, 0.8 );
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0).setSize(0, 0);
        this.body.setSize(0, 0);
        this.setFillStyle(0xdb382c, 0.8);
        this.setDepth(1002);
    }

    setPlaceholder ( Size: number ): void {
        this.setActive(true);
        this.setVisible(true);
        this.setSize(Size, Size);
        this.body.setSize(Size, Size);
    }

}