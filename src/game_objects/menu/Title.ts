import Menu from "../../scenes/Menu";
import TextButton from "../UI_TextButton";

class Title extends Phaser.GameObjects.Group {

    constructor ( scene: Menu ) {

        super(scene);

        let Logo = scene.add.image(
            scene.Book.getCenter().x,
            scene.Book.getCenter().y, "logo")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(
            scene.scale.width * 0.2,
            scene.scale.height * 0.45
        );

        let TitleText = scene.add.text(
            Logo.getTopCenter().x,
            Logo.getTopCenter().y - 35,
            "EVEREIGN",
            { 
                fontSize: 72,
                align: "center",
                fontFamily: "Augusta"
            })
        .setOrigin(0.5);

        let StartButton = new TextButton(
            scene,
            Logo.getBottomCenter().x,
            Logo.getBottomCenter().y + 35,
            "Click To Start",
            () => { scene.ChangeMenu("main") },
            48,
            "#FFFFFF"
        );

        this.addMultiple([
            Logo,
            TitleText,
            StartButton
        ]);

    }

}

export default Title;