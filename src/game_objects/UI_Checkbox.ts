import Menu from "../scenes/Menu";

export default class Checkbox extends Phaser.GameObjects.NineSlice {

    public scene: Menu;
    public sprite: Phaser.GameObjects.Sprite;
    public value: boolean = false;

    constructor ( scene: Menu, x: number, y: number, callback: Function, initialValue: boolean = false ) {

        super(scene, x, y, 'Kenney-UI', "buttonLong_blue_pressed", 32, 32, 6, 6, 6, 6);

        this.setOrigin(0.5);

        this.scene = scene;

        this.value = initialValue;

        this.setInteractive();

        this.on('pointerover', () => {

        }).on('pointerout', () => {

        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                callback();
                this.scene.sound.play('click');
            }
        });

        this.scene.add.existing(this);

        this.sprite = this.scene.add.sprite(
            this.getCenter().x,
            this.getCenter().y,
            'Kenney-UI',
            "iconCheck_grey"
        )
        .setOrigin(0.5)
        .setDisplaySize(16, 16)
        .setVisible(this.value);

        
        this.scene.add.existing(this.sprite);
    }

    public toggleValue () {
        this.value = !this.value;
        if ( this.value ) {
            this.sprite.setVisible(true);
        } else {
            this.sprite.setVisible(false);
        }
    }

    public show () {
        this.setVisible(true);
        if ( this.value == true ) {
            this.sprite.setVisible(true);
        } else {
            this.sprite.setVisible(false);
        }
    }

    public hide () {
        this.setVisible(false);
        if ( this.value == false ) {
            this.sprite.setVisible(false);
        } else {
            this.sprite.setVisible(true);
        }
    }
    
}