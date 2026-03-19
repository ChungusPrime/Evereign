import Menu from "../../scenes/Menu";
import TextButton from "../UI_TextButton";
import GameData from "../../data/DefaultGameData";

class Controls extends Phaser.GameObjects.Group {

    ControlObjects: TextButton[] = [];
    ResetControlsButton: TextButton;

    MouseButtonMap: { [key: string]: string } = {
        "mouse-0": "Left Mouse",
        "mouse-1": "Middle Mouse",
        "mouse-2": "Right Mouse"
    };

    constructor(scene: Menu) {
        super(scene);

        let Y = scene.scale.height * 0.18;
        let X = scene.scale.width * 0.32;

        Object.entries(scene.Data.Controls).forEach(control => {

            let label = control[1];
            if (this.MouseButtonMap[control[1]])
                label = this.MouseButtonMap[control[1]];

            let ControlBind = new TextButton(scene, X, Y, `${control[0]}: ${label}`, () => {
                scene.StartRebind(control[0], ControlBind);
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

}

export default Controls;
