import Menu from "../../scenes/Menu";
import TextButton from "../UI_TextButton";

class Options extends Phaser.GameObjects.Group {

    constructor(scene: Menu) {
        super(scene);

        let X = scene.scale.width * 0.32;
        let Y = scene.scale.height * 0.17;

        Object.entries(scene.Data.Options).forEach(option => {
            let label = option[1].toLocaleString();
            let OptionButton = new TextButton(scene, X, Y, `${option[0]}: ${label}`, () => {}, 32).setVisible(false);
            this.add(OptionButton);
            Y += OptionButton.height + 15;
        });

        this.setVisible(false);
    }

}

export default Options;
