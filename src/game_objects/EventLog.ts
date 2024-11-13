import UI from "../scenes/UI";

export default class EventLog {

    public scene: UI;

    public messages: Phaser.GameObjects.Text[] = [];
    public background: Phaser.GameObjects.Rectangle;
    public layer: Phaser.GameObjects.Layer;

    constructor ( scene: UI ) {
        this.scene = scene;
        this.layer = this.scene.EventLogMessages;
        this.background = this.scene.EventLogBackground;
    }

    NewEvent ( text: string ) {
        const message = this.scene.add.text(0, 0, text, {
            fontSize: 12,
            wordWrap: {
                useAdvancedWrap: true,
                width: this.scene.EventLogBackground.width - 2
            }
        }).setOrigin(0, 0);
        this.messages.push(message);
        this.scene.WorldMapCamera.ignore(message);
        this.Update();
    }

    Update () {

        let Y = this.scene.EventLogBackground.getTopLeft().y + 5;
        let X = this.scene.EventLogBackground.getTopLeft().x + 2;
        let height = 0;

        this.messages.forEach( (message: Phaser.GameObjects.Text) => {
            message.setPosition(X, Y);
            Y += message.height + 2;
            height += message.height + 2.5;
        });

        this.scene.EventsLogCamera.setBounds(
            this.scene.EventLogBackground.getTopLeft().x,
            this.scene.EventLogBackground.getTopLeft().y,
            this.scene.SidePanelWidth,
            height
        );

        this.scene.EventsLogCamera.scrollY = height;

    }

}