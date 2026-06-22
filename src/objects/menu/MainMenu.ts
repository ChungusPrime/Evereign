import Menu from "../../scenes/Menu";
import TextButton from "../ui/UI_TextButton";

class MainMenu extends Phaser.GameObjects.Group {

    ContinueButton: TextButton;
    CreateButton: TextButton;
    LoadButton: TextButton;
    CloudButton: TextButton;
    ReincarnationButton: TextButton;
    ControlsButton: TextButton;
    OptionsButton: TextButton;
    CreditsButton: TextButton;
    QuitGameButton: TextButton;
    ScenariosButton: TextButton;

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

        this.ScenariosButton = new TextButton(
            scene,
            scene.scale.width * 0.31,
            scene.scale.height * 0.55,
            "Scenarios",
            () => {
                scene.ChangeMenu("scenarios")
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

        this.addMultiple([
            this.ContinueButton,
            this.CreateButton,
            this.LoadButton,
            this.CloudButton,
            this.ReincarnationButton,
            this.ControlsButton,
            this.OptionsButton,
            this.CreditsButton,
            this.QuitGameButton,
            this.ScenariosButton
        ]);

        this.setVisible(false);
    }

}

export default MainMenu;
