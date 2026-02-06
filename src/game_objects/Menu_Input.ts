import Menu from "../scenes/Menu";

export default class MenuInput extends Phaser.GameObjects.NineSlice {

    public scene: Menu;
    public TextObject: Phaser.GameObjects.Text;
    public CurrentValue: string = "";
    public Selected: boolean = false;

    constructor ( scene: Menu, x: number, y: number, text: string) {
        super(scene, x, y, "Kenney-UI", "buttonLong_blue_pressed", 312, 32, 16, 16, 16, 16);
        this.scene = scene;

        // Current value
        this.setOrigin(0.5).setInteractive().on('pointerover', () => {
            this.Selected = true;
            //this.setTint(0xE0BA99);
        }).on('pointerout', () => {
            this.Selected = false;
            //this.setTint(0xdaa475);
        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                this.scene.sound.play('click');
                console.log(this.CurrentValue);
            }
        }).setVisible(false)
        //.setTint(0xdaa475);

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

        this.scene.CharacterCreationGroup.addMultiple([
            this,
            this.TextObject,
        ]);

        scene.input.keyboard.on('keydown', (event: any) => {

            if (this.Selected) {

                if (event.key === 'Backspace') {
                    this.CurrentValue = this.CurrentValue.slice(0, -1);
                    this.TextObject.setText(this.CurrentValue);
                    return;
                }

                // Ignore modifiers like Shift, Ctrl, etc.
                if (event.key.length > 1 || event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt') {
                    return;
                }

                // Ignore special keys like Enter, Escape, etc.
                if (event.key === 'Enter' || event.key === 'Escape') {
                    return;
                }

                // Ignore symbols that are not alphanumeric
                if (!/^[a-zA-Z0-9]$/.test(event.key)) {
                    return;
                }

                console.log(`Key pressed: ${event.key}`);
                this.CurrentValue += event.key;
                this.TextObject.setText(this.CurrentValue);

            }

        });

    }
}