import UI from "../scenes/UI";
import Button from "./button";

export default class MilestonesMenu {

    private scene: UI;
    private Background: Phaser.GameObjects.Rectangle;
    private Header: Phaser.GameObjects.Text;
    private CloseButton: Phaser.GameObjects.Image;
    private CloseButtonText: Phaser.GameObjects.Text;
    private ResourceObjects: any[] = [];

    constructor ( scene: UI ) {

        this.scene = scene;

        // Background
        this.Background = scene.add.rectangle (
            scene.Game.cameras.main.width / 2,
            scene.Game.cameras.main.height / 2,
            400,
            400,
            0x000000,
            0.8
        )
        .setOrigin(0.5, 0.5)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        // Header
        this.Header = scene.add.text(
            this.Background.getTopLeft().x + 5, 
            this.Background.getTopLeft().y + 10,
            `Milestones`
        )
        .setOrigin(0, 0.5)
        .setVisible(false);

        this.CloseButton = scene.add.image(this.Background.getTopRight().x, this.Background.getTopRight().y, "panel-small").setOrigin(0.5, 0.5).setVisible(false).setInteractive().setDepth(10).setDisplaySize(24, 24);

        this.CloseButton.on('pointerdown', () => {
            this.Hide()
        }, this);

        this.CloseButtonText = scene.add.text(this.CloseButton.getCenter().x, this.CloseButton.getCenter().y, "X").setOrigin(0.5, 0.5).setVisible(false).setDepth(11);
    }

    Show () {

        let Y = this.Header.getBottomLeft().y + 5;

        this.scene.Game.MilestoneManager.Milestones.forEach(milestone => {
            
            let resourceBG = this.scene.add.rectangle(
                this.Header.getBottomLeft().x + 5,
                Y,
                this.Background.width - 20,
                50,
                0x000000,
                1
            )
            .setOrigin(0, 0)
            .setStrokeStyle(1, 0xffffff, 1)
            .setVisible(true);
    
            let resourceText = this.scene.add.text(
                resourceBG.getTopLeft().x + 5,
                resourceBG.getTopLeft().y + 5,
                `${milestone.Name}\n${milestone.Description}`,
                { 
                    wordWrap: {
                        useAdvancedWrap: true,
                        width: resourceBG.width - 5
                    }
                }
            ).setVisible(true);
    
            this.ResourceObjects.push(resourceBG);
            this.ResourceObjects.push(resourceText);

            Y += 60
            
        });

        this.Background.setVisible(true);
        this.Header.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
    }

    Hide () {
        console.log("hide resources");
        this.ResourceObjects.forEach( (object) => { object.destroy() });
        this.Background.setVisible(false);
        this.Header.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.scene.ActivePanel = null;
    }

}