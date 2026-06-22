import Game from "../../scenes/Game";
import UI from "../../scenes/UI";

export default class FloatingText extends Phaser.GameObjects.Text {

    public scene: UI | Game;
    public sprite: Phaser.GameObjects.Sprite | null;

    constructor ( scene: UI | Game, event: any ) {

        super( scene, scene.cameras.main.width / 2 - scene.scale.width * 0.1 , scene.cameras.main.height / 2, event.message, {});

        this.scene = scene;

        this.setOrigin(0.5);
        this.setShadow();
        this.setDepth(9999);

        let DestY = scene.cameras.main.height / 2 - 200;

        if ( event.x ) {
            this.setX(event.x);
            this.setY(event.y);
            DestY = event.y - 200;
        }

        let targets = [];
        targets.push(this);

        if ( event.sprite1 ) {
            this.sprite = this.scene.add.sprite( this.getLeftCenter().x, this.getLeftCenter().y, event.sprite1, event.sprite2 ).setOrigin(1, 0.5).setDepth(9999);
            targets.push(this.sprite);
        }

        this.scene.add.existing(this);

        this.scene.tweens.add({
            targets: targets,
            y: DestY,
            alpha: 0,
            ease: 'Power1',
            duration: 3000,
            onComplete: () => {
                this.destroy();
            }
        });

    }
}