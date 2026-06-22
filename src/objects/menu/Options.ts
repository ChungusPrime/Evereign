import Menu from "../../scenes/Menu";
import Checkbox from "../ui/UI_Checkbox";

class Options extends Phaser.GameObjects.Group {

    public checkboxes: Checkbox[] = [];

    constructor(scene: Menu) {
        super(scene);
        let X = scene.scale.width * 0.18;
        let Y = scene.scale.height * 0.17;

        let CheckX = scene.scale.width * 0.40;

        Object.entries(scene.Data.Options).forEach(option => {

            console.log(option);

            let text = this.scene.add.text(X, Y, option[0], { fontSize: 24, fontFamily: "Augusta", color: "black" }).setOrigin(0, 0.5);

            let check = new Checkbox(scene, CheckX, Y, () => {
                check.toggleValue();
                scene.Data.Options[option[0]] = check.value;
                const Encoded = JSON.stringify(scene.Data);
                localStorage.setItem("EvereignData", Encoded);
            }, Boolean(option[1])).setVisible(false);

            this.checkboxes.push(check);

            this.addMultiple([text, check, check.sprite]);

            Y += text.height + 20;

        });

        this.setVisible(false);
    }

}

export default Options;
