import Menu from "../../scenes/Menu";
import TextButton from "../UI_TextButton";

class MainMenu extends Phaser.GameObjects.Group {

    ContinueButton: TextButton;
    CreateButton: TextButton;
    LoadButton: TextButton;
    TutorialButton: TextButton;
    CloudButton: TextButton;
    ReincarnationButton: TextButton;
    ControlsButton: TextButton;
    OptionsButton: TextButton;
    CreditsButton: TextButton;
    QuitGameButton: TextButton;
    TestButton: TextButton;

    constructor(scene: Menu) {
        
        super(scene);

        this.ContinueButton = new TextButton(
            scene,
            scene.scale.width * 0.31,
            scene.scale.height * 0.25,
            `Load Last Played`,
            () => { 
                scene.StartGame(scene.Data.LastCharacterPlayed, "Adventure")
            }
        );

        this.CreateButton = new TextButton(
            scene,
            scene.scale.width * 0.31,
            scene.scale.height * 0.35,
            "New Character",
            () => { 
                scene.ChangeMenu("create")
            }
        );

        this.LoadButton = new TextButton(
            scene,
            scene.scale.width * 0.31,
            scene.scale.height * 0.45,
            "Load Character",
            () => { 
                scene.ChangeMenu("load")
            }
        );

        this.TutorialButton = new TextButton(
            scene,
            scene.scale.width * 0.31,
            scene.scale.height * 0.55,
            "Tutorial",
            () => { 
                scene.StartGame("Bithmas", "Tutorial")
            }
        );

        this.CloudButton = new TextButton(
            scene,
            scene.scale.width * 0.31,
            scene.scale.height * 0.65,
            "Cloud Saves",
            () => { 
                scene.ChangeMenu("cloud")
            }
        );

        this.ReincarnationButton = new TextButton(
            scene,
            scene.scale.width * 0.69,
            scene.scale.height * 0.25,
            "Bloodline",
            () => { 
                scene.ChangeMenu("bloodline")
            }
        );

        this.ControlsButton = new TextButton(
            scene,
            scene.scale.width * 0.69,
            scene.scale.height * 0.35,
            "Controls",
            () => { 
                scene.ChangeMenu("controls")
            }
        );

        this.OptionsButton = new TextButton(
            scene,
            scene.scale.width * 0.69,
            scene.scale.height * 0.45,
            "Options",
            () => { 
                scene.ChangeMenu("options")
            }
        );

        this.CreditsButton = new TextButton(
            scene,
            scene.scale.width * 0.69,
            scene.scale.height * 0.55,
            "Credits",
            () => { 
                scene.ChangeMenu("credits")
            }
        );

        this.QuitGameButton = new TextButton(
            scene,
            scene.scale.width * 0.69,
            scene.scale.height * 0.65,
            "Quit",
            () => { 
                window.close()
            }
        );

        this.TestButton = new TextButton(
            scene,
            scene.scale.width * 0.31,
            scene.scale.height * 0.75,
            "Test",
            () => {
                scene.StartGame("Bithmas", "Arena")
            }
        );

        this.addMultiple([
            this.ContinueButton,
            this.CreateButton,
            this.LoadButton,
            this.TutorialButton,
            this.CloudButton,
            this.ReincarnationButton,
            this.ControlsButton,
            this.OptionsButton,
            this.CreditsButton,
            this.QuitGameButton,
            this.TestButton
        ]);

        this.setVisible(false);
    }

}

export default MainMenu;
