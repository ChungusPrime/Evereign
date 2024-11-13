import UI from "../scenes/UI";

export default class DialogueWindow {

    public scene: UI;
    public DialogueCamera!: Phaser.Cameras.Scene2D.Camera;
    public Background: Phaser.GameObjects.Rectangle
    public Text: Phaser.GameObjects.Text;
    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;
    
    constructor ( scene: UI ) {
        this.scene = scene;
    }

    Create () {

        this.Background = this.scene.add.rectangle(this.scene.scale.width / 2, this.scene.scale.height / 2, 400, 600, 0x000000, 0.9).setOrigin(0.5, 0.5).setVisible(false);

        this.DialogueCamera = this.scene.cameras.add(
            this.Background.getTopLeft().x,
            this.Background.getTopLeft().y,
            400,
            600,
            false,
            "DialogueWindowCamera"
        ).setBounds(this.Background.getTopLeft().x, this.Background.getTopLeft().y, 400, 600).setVisible(false);

        this.DialogueCamera.ignore([
            this.scene.UILayer,
            this.scene.WorldMapLayer,
            this.scene.EventLogMessages
        ]);

        this.Background.setInteractive().on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            console.log(pointer.deltaY);
            this.DialogueCamera.scrollY += (pointer.deltaY * 0.1);
        });

        this.Text = this.scene.add.text(this.Background.getTopLeft().x + 3, this.Background.getTopLeft().y + 3, "", {
            wordWrap: { 
                useAdvancedWrap: true, 
                width: this.Background.width - 6 
            }
        }).setVisible(false);

        this.CloseButton = this.scene.add.image(this.Background.getTopRight().x, this.Background.getTopRight().y, "panel-small")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(10)
        .setDisplaySize(24, 24)
        .setInteractive()
        .on('pointerdown', () => {
            this.Hide();
            this.scene.Game.DataManager.AddFlag(1);
        }, this);

        this.CloseButtonText = this.scene.add.text(this.CloseButton.getCenter().x, this.CloseButton.getCenter().y, "X")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(11);

        this.DialogueCamera.ignore([this.Background, this.CloseButtonText, this.CloseButton]);
        this.scene.EventsLogCamera.ignore([this.Text, this.Background, this.CloseButton, this.CloseButtonText]);
        this.scene.WorldMapCamera.ignore([this.Text, this.Background, this.CloseButton, this.CloseButtonText]);
        this.scene.cameras.main.ignore([this.Text]);

    }

    Show ( key: string ) {
        this.Text.setText(this.scene.Game.DataManager.DialogueData[key].text);
        this.DialogueCamera.setBounds(this.Background.getTopLeft().x, this.Background.getTopLeft().y, 400, this.Text.height + 10).setVisible(false);
        this.Background.setVisible(true);
        this.DialogueCamera.setVisible(true);
        this.Text.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
    }

    Hide () {
        this.Background.setVisible(false);
        this.DialogueCamera.setVisible(false);
        this.Text.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
    }

}