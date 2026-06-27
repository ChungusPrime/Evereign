import Menu from "../../scenes/Menu";
import ScenarioData from "../../data/ScenarioData";
import TextButton from "../ui/UI_TextButton";

class Scenarios extends Phaser.GameObjects.Group {
    constructor(scene: Menu) {
        super(scene);
        Object.keys(ScenarioData).forEach((key, index) => {
            let scenario = ScenarioData[key];
            let ScenarioButton = new TextButton(scene, scene.scale.width * 0.32, scene.scale.height * (0.25 + index * 0.1), scenario.Name, () => {
                scene.CharacterCreationGroup.CreateCharacter(scenario.CharacterName, "Standard", null, scenario.CharacterClass, scenario.CharacterRace, "Scenario");
                scene.StartGame(scenario.Name, "Scenario");
            }, 32).setVisible(false);
            this.add(ScenarioButton);
        });
    }
}

export default Scenarios;
