import Menu from "../scenes/Menu";
import TextButton from "./UI_TextButton";

export default class MenuSelect extends Phaser.GameObjects.NineSlice {

    public scene: Menu;

    public ScrollLeft: Phaser.GameObjects.Sprite;
    public ScrollRight: Phaser.GameObjects.Sprite;
    public TextObject: Phaser.GameObjects.Text;
    public CurrentValue: string | null = null;
    public Options: string[] = [];
    public ValueIndex: number = null;
    public InformationButton: TextButton;

    constructor ( scene: Menu, x: number, y: number, text: string, options: string[] ) {

        super(scene, x, y, "Kenney-UI", "buttonLong_blue_pressed", 312, 32, 16, 16, 16, 16);

        this.scene = scene;
        this.Options = options;

        // Current value
        this.setOrigin(0.5)
        .setInteractive()
        .on('pointerover', () => {

        }).on('pointerout', () => {

        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                this.scene.sound.play('click');
                console.log(this.CurrentValue);
                this.scene.SetHelpText(this.CurrentValue ? this.CurrentValue : "No information available for this option.");
            }
        })
        .setVisible(false);

        //this.setTint(0xdaa475);
        this.displayWidth = 300;

        this.scene.add.existing(this);

        // Value text
        this.TextObject = this.scene.add.text(this.getCenter().x, this.getCenter().y, text, {
            fontSize: 24,
            align: "center",
            fontFamily: "Augusta",
            wordWrap: {
                width: this.displayWidth - 10,
                useAdvancedWrap: true
            }
        })
        .setOrigin(0.5, 0.5)
        .setVisible(false);

        // Get previous option
        this.ScrollLeft = this.scene.add.sprite(this.getLeftCenter().x - 15, y, "Kenney-UI", "arrowBlue_left");
        this.ScrollLeft.setOrigin(0.5);
        //this.ScrollLeft.setTint(0xE0BA99);
        this.ScrollLeft.setInteractive();
        this.ScrollLeft.on('pointerover', () => {

        }).on('pointerout', () => {

        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                this.scene.sound.play('click');

                if ( this.ValueIndex === null ) {
                    this.ValueIndex = 0;
                } else {
                    this.ValueIndex--;
                }

                if ( this.ValueIndex < 0 ) {
                    this.ValueIndex = this.Options.length - 1;
                }
                this.CurrentValue = this.Options[this.ValueIndex];
                this.TextObject.setText(this.CurrentValue);
            }
        })
        .setVisible(false);

        // Get next option
        this.ScrollRight = this.scene.add.sprite(this.getRightCenter().x + 15, y, "Kenney-UI", "arrowBlue_right");
        this.ScrollRight.setOrigin(0.5);
        //this.ScrollRight.setTint(0xdaa475);
        this.ScrollRight.setInteractive();
        this.ScrollRight.on('pointerover', () => {

        }
        ).on('pointerout', () => {

        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                this.scene.sound.play('click');
                if ( this.ValueIndex === null ) {
                    this.ValueIndex = 0;
                } else {
                    this.ValueIndex++;
                }
                if ( this.ValueIndex >= this.Options.length ) {
                    this.ValueIndex = 0;
                }
                this.CurrentValue = this.Options[this.ValueIndex];
                this.TextObject.setText(this.CurrentValue);
            }
        })
        .setVisible(false);

        this.scene.CharacterCreationGroup.addMultiple([
            this,
            this.ScrollLeft,
            this.ScrollRight,
            this.TextObject,
            //this.InformationButton
        ]);

    }
}