import UI from "../scenes/UI";
import Button from "./button";
import InventoryManager from "./InventoryManager";
import BuildingData from "../data/BuildingData";

export default class BuildMenu {

    private scene: UI;
    private Background: Phaser.GameObjects.Rectangle;
    private Header: Phaser.GameObjects.Text;
    private CloseButton: Phaser.GameObjects.Image;
    private CloseButtonText: Phaser.GameObjects.Text;
    private BuildingListObjects: any[] = [];
    public InventoryManager: InventoryManager

    constructor ( scene: UI ) {
        this.scene = scene;
        this.InventoryManager = this.scene.Game.InventoryManager;

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
            this.Background.getTopLeft().y + 5,
            "Buildings"
        )
        .setOrigin(0)
        .setVisible(false);

        this.CloseButton = scene.add.image(this.Background.getTopRight().x, this.Background.getTopRight().y, "panel-small").setOrigin(0.5, 0.5).setVisible(false).setInteractive().setDepth(10).setDisplaySize(24, 24);

        this.CloseButton.on('pointerdown', () => {
            this.Hide()
        }, this);

        this.CloseButtonText = scene.add.text(this.CloseButton.getCenter().x, this.CloseButton.getCenter().y, "X").setOrigin(0.5, 0.5).setVisible(false).setDepth(11);

    }

    Show () {

        // Create a button for each unlocked building
        let ButtonY = this.Header.getBottomLeft().y + 5;

        BuildingData.forEach( (Building: BuildingData) => {

            let button = this.scene.add.rectangle(this.Background.getTopLeft().x + 3, ButtonY, this.Background.width - 10, 50, 0x000000, 1)
            .setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.SelectBuilding(Building.Name)
            }, this.scene)
            .on('pointerover', () => {
                button.setStrokeStyle(1, 0xffffff, 1);
            }, this.scene)
            .on('pointerout', () => {
                button.setStrokeStyle(1, 0xffffff, 0);
            }, this.scene)

            //let image = this.scene.add.image(5, 5, Building.Image).setDisplaySize(button.width * 0.2, 90).setOrigin(0);
            let name = this.scene.add.text(button.getCenter().x + 5, button.getCenter().y + 5, Building.Name, { fontSize: 16 });

            Phaser.Display.Align.In.Center(name, button);

            let x = button.getBottomLeft().x;
            
            Building.Cost.forEach( (cost: { Resource: number; Amount: number }) => {
                const resource = this.scene.Game.DataManager.GetItemData(cost.Resource);
                const spritedata = resource.Sprite.split("-");
                let sprite = this.scene.add.sprite(x, button.getBottomLeft().y, spritedata[0], spritedata[1]).setOrigin(0, 1);
                let quantity = this.scene.add.text(sprite.getRightCenter().x, sprite.getRightCenter().y, `${cost.Amount}`);
                x = quantity.getRightCenter().x + 5;
                this.BuildingListObjects.push(sprite);
                this.BuildingListObjects.push(quantity);
            });

            ButtonY += button.height + 5;

            this.BuildingListObjects.push(name);
            this.BuildingListObjects.push(button);
        });

        this.Background.setVisible(true);
        this.Header.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
    }

    Hide () {
        this.BuildingListObjects.forEach( (object) => { object.destroy() });
        this.Background.setVisible(false);
        this.Header.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.scene.ActivePanel = null;
    }

}