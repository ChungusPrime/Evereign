import UI from "../scenes/UI";
import BBCodeText from 'phaser4-rex-plugins/plugins/bbcodetext.js';
import DamageTypes from "../data/DamageTypes";

export default class EventLog {

    public scene: UI;

    public EventLogMessages: Phaser.GameObjects.Layer;
    public EventLogBackground: Phaser.GameObjects.Rectangle;
    public EventsLogCamera: Phaser.Cameras.Scene2D.Camera;

    constructor ( scene: UI ) {
        this.scene = scene;

        this.EventLogMessages = this.scene.add.layer();

        this.EventLogBackground = this.scene.add.rectangle(this.scene.SaveButton.getBottomLeft().x, this.scene.SaveButton.getBottomLeft().y + 5, this.scene.SidePanelBackground.width -12, 465, 0x000000, 1)
        .setOrigin(0)
        .setInteractive()
        .on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            this.EventsLogCamera.scrollY += (pointer.deltaY * 0.1);
        })
        .setStrokeStyle(1, 0xffffff, 1);

        this.EventsLogCamera = this.scene.cameras.add(
            this.EventLogBackground.getTopLeft().x,
            this.EventLogBackground.getTopLeft().y,
            this.EventLogBackground.width,
            this.EventLogBackground.height,
            false,
            "Event-Log-Camera"
        )
        .setVisible(true)
        .setZoom(1)
        .setBackgroundColor({ r: 100, b: 100, g: 100, a: 100 });
    }

    NewEvent ( text: string ) {

        // Replace damage type names with their colours
        Object.entries(DamageTypes).forEach( ([key, type]) => {
            text = text.replace(key, `[color=${type}]${key}[/color]`);
        });

        const message = new BBCodeText(this.scene, 0, 0, text, {
            fontSize: 12,
            wordWrap: {
                width: this.EventLogBackground.width - 2
            }
        }).setOrigin(0, 0);
        this.EventLogMessages.add(message);

        let Y = this.EventLogBackground.getTopLeft().y + 5;
        let X = this.EventLogBackground.getTopLeft().x + 2;
        let height = 0;

        this.EventLogMessages.getChildren().forEach( (message: Phaser.GameObjects.Text) => {
            message.setPosition(X, Y);
            Y += message.height + 3;
            height += message.height + 3;
        });

        this.EventsLogCamera.setBounds(
            this.EventLogBackground.getTopLeft().x,
            this.EventLogBackground.getTopLeft().y,
            this.EventLogBackground.width,
            height
        );

        this.EventsLogCamera.scrollY = height;
    }


}