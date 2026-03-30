import Menu from "../../scenes/Menu";
import TextButton from "../UI_TextButton";
import GameData from "../../data/DefaultGameData";

class Controls extends Phaser.GameObjects.Group {

    public ControlObjects: TextButton[] = [];
    public ResetControlsButton: TextButton;
    public RebindInProgress: boolean = false;
    public scene: Menu;

    public InputLabelMap: { [key: string]: string } = {
        " ": "Space",
        "mouse-0": "Left Mouse",
        "mouse-1": "Middle Mouse",
        "mouse-2": "Right Mouse"
    };

    constructor(scene: Menu) {
        super(scene);

        this.scene = scene;

        let Y = scene.scale.height * 0.18;
        let X = scene.scale.width * 0.32;

        Object.entries(scene.Data.Controls).forEach(control => {

            let label = control[1];
            if (this.InputLabelMap[control[1]])
                label = this.InputLabelMap[control[1]];

            let ControlBind = new TextButton(scene, X, Y, `${control[0]}: ${label}`, () => {
                this.StartRebind(control[0], ControlBind);
            }, 32).setVisible(false);

            this.add(ControlBind);

            Y += ControlBind.height + 10;

            if (Y > scene.scale.height * 0.7) {
                X = scene.scale.width * 0.69;
                Y = scene.scale.height * 0.18;
            }

            this.ControlObjects.push(ControlBind);
        });

        this.ResetControlsButton = new TextButton(scene, scene.scale.width * 0.32, scene.scale.height * 0.8, "Reset to default", () => {
            scene.Data.Controls = JSON.parse(JSON.stringify(GameData.Controls));
            localStorage.setItem("EvereignData", JSON.stringify(scene.Data));
            this.ControlObjects.forEach(control => {
                control.setText(`${control.text.split(':')[0]}: ${scene.Data.Controls[control.text.split(':')[0]]}`);
            });
        }).setVisible(false);

        this.add(this.ResetControlsButton);

        this.setVisible(false);
    }

    StartRebind(key: string, button: TextButton) {
        this.RebindInProgress = true;
        this.scene.time.delayedCall(100, () => {
            button.setText(`${key}: waiting for input...`);
            if ( this.RebindInProgress ) {

                let code = null;

                // Keyboard
                let keyboardlisten = this.scene.input.keyboard.once('keydown', (event: any) => {
                    code = event.key;
                    keyboardlisten.removeAllListeners();
                    mouselisten.removeAllListeners();
                    let label = code;
                    if (this.InputLabelMap[code])
                        label = this.InputLabelMap[code];
                    button.setText(`${key}: ${label}`);
                    this.RebindKey(key, code);
                    this.RebindInProgress = false;
                });

                // Mouse
                let mouselisten = this.scene.input.on('pointerdown', (event: any) => {
                    code = `mouse-${event.button}`;
                    keyboardlisten.removeAllListeners();
                    mouselisten.removeAllListeners();
                    let label = code;
                    if (this.InputLabelMap[code])
                        label = this.InputLabelMap[code];
                    button.setText(`${key}: ${label}`);
                    this.RebindKey(key, code);
                    this.RebindInProgress = false;
                });

                return;
            }

        }, [], this);
    }

    RebindKey(key: string, value: string) {
        console.log(key, value);
        this.scene.Data.Controls[key] = value;
        localStorage.setItem("EvereignData", JSON.stringify(this.scene.Data));
    }

}

export default Controls;
