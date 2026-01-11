import UI from "../scenes/UI";
import { GD } from "../scenes/Game";

export default class TownManagement {

    private scene: UI;

    private HeaderBackground: Phaser.GameObjects.Rectangle;
    private CloseButton: Phaser.GameObjects.Image;
    private CloseButtonText: Phaser.GameObjects.Text;
    private NewTownButton: Phaser.GameObjects.NineSlice;
    private NewTownButtonText: Phaser.GameObjects.Text;
    public BackgroundObjects: Phaser.GameObjects.Group;

    // Player Town List
    private BackgroundTwo: Phaser.GameObjects.Rectangle;
    private HeaderTwo: Phaser.GameObjects.Text;
    public TownListObjects: Phaser.GameObjects.Group;

    // Chosen Town Details
    private TownObjects: Phaser.GameObjects.Group;

    // Available Building List
    public Background: Phaser.GameObjects.Rectangle;
    public Header: Phaser.GameObjects.Text;
    private BuildingListObjects: any[] = [];
    NewBuildingButton: Phaser.GameObjects.NineSlice;
    NewBuildingButtonText: Phaser.GameObjects.Text;

    constructor ( scene: UI ) {

        this.scene = scene;

        // Header
        this.HeaderBackground = scene.add.rectangle(scene.Game.cameras.main.width / 2, scene.Game.cameras.main.height * 0.15, 800, 48, 0x000000, 0.95)
        .setOrigin(0.5, 0.5)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        this.CloseButton = scene.add.image(this.HeaderBackground.getRightCenter().x - 28, this.HeaderBackground.getRightCenter().y, "panel-small")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDisplaySize(24, 24)
        .setInteractive()
        .on('pointerdown', () => { 
            this.Hide();
        }, this);

        this.CloseButtonText = scene.add.text(this.CloseButton.getCenter().x, this.CloseButton.getCenter().y, "X", { align: "center", fontFamily: "Augusta" })
        .setOrigin(0.5, 0.5)
        .setVisible(false);
        
        this.NewTownButton = scene.add.nineslice(this.CloseButton.getLeftCenter().x - 60, this.CloseButton.getLeftCenter().y, "Kenney-UI", "buttonLong_blue_pressed", 100, 24, 6, 6, 6, 6)
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setInteractive()
        .on('pointerdown', () => { 
            this.scene.Game.BuildingHelper.ActivateBuildingMode("Town Centre");
        }, this);
        
        this.NewTownButtonText = scene.add.text(this.NewTownButton.getCenter().x, this.NewTownButton.getCenter().y, "New Town", { align: "center", fontFamily: "Augusta" })
        .setOrigin(0.5, 0.5)
        .setVisible(false);

        this.NewBuildingButton = scene.add.nineslice(this.NewTownButton.getLeftCenter().x - 60, this.NewTownButton.getLeftCenter().y, "Kenney-UI", "buttonLong_blue_pressed", 100, 24, 6, 6, 6, 6)
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setInteractive()
        .on('pointerdown', () => { 
            this.scene.Game.BuildingHelper.ActivateBuildingMode("Town Centre");
        }, this);

        this.NewBuildingButtonText = scene.add.text(this.NewBuildingButton.getCenter().x, this.NewBuildingButton.getCenter().y, "New Building", { align: "center", fontFamily: "Augusta" })
        .setOrigin(0.5, 0.5)
        .setVisible(false);


        this.Header = scene.add.text(this.HeaderBackground.getTopLeft().x + 5, this.HeaderBackground.getTopLeft().y + 5, "Your Towns", { fontSize: 32, align: "center", fontFamily: "Augusta" })
        .setOrigin(0)
        .setVisible(false);

        // Content Body
        this.Background = scene.add.rectangle(this.HeaderBackground.getBottomLeft().x, this.HeaderBackground.getBottomLeft().y + 5, 800, 500, 0x000000, 0.95)
        .setStrokeStyle(1, 0xffffff, 1)
        .setOrigin(0, 0)
        .setVisible(false);

        this.BackgroundObjects = scene.add.group();
        this.BackgroundObjects.add(this.HeaderBackground);
        this.BackgroundObjects.add(this.CloseButton);
        this.BackgroundObjects.add(this.CloseButtonText);
        this.BackgroundObjects.add(this.NewTownButton);
        this.BackgroundObjects.add(this.NewTownButtonText);
        this.BackgroundObjects.add(this.Header);
        this.BackgroundObjects.add(this.Background);
        this.BackgroundObjects.add(this.NewBuildingButton);
        this.BackgroundObjects.add(this.NewBuildingButtonText);

        // Set up list of towns
        this.TownListObjects = scene.add.group();
        let Y = this.Background.getTopLeft().y + 5;
        Object.keys(GD.PlayerTowns).forEach( (RegionName: string) => {
            let name = this.scene.add.text(this.Background.getTopLeft().x + 3, Y, GD.PlayerTowns[RegionName].Name, { fontSize: 24, align: "center", fontFamily: "Augusta" })
            .setInteractive()
            .on('pointerdown', () => {
                console.log(GD.PlayerTowns[RegionName]);
            })
            .setVisible(false);
            Y += name.height + 5;
            this.TownListObjects.add(name);
        });

    }

    Show () {

        this.HeaderBackground.setVisible(true);
        this.Header.setVisible(true);
        this.Background.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
        this.NewTownButton.setVisible(true);
        this.NewTownButtonText.setVisible(true);
        this.NewBuildingButton.setVisible(true);
        this.NewBuildingButtonText.setVisible(true);

        this.TownListObjects.getChildren().forEach( (elem: any, index: number) => {
            elem.setVisible(true);
        });

        this.TownListObjects.setVisible(true);

        // Create a button for each unlocked building

        /*BuildingData.forEach( (Building: BuildingData) => {

            //if ( !GD.UnlockedBuildings.includes(Building.Name) ) return;

            let button = this.scene.add.rectangle(this.Background.getTopLeft().x + 3, ButtonY, this.Background.width - 10, 50, 0x000000, 1)
            .setOrigin(0)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.Game.BuildingManager.ActivateBuildingMode(Building.Name);
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
        });*/




    }

    Hide () {
        this.NewTownButton.setVisible(false);
        this.NewTownButtonText.setVisible(false);
        this.HeaderBackground.setVisible(false);
        this.Header.setVisible(false);
        this.Background.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.TownListObjects.setVisible(false);
        this.NewBuildingButton.setVisible(false);
        this.NewBuildingButtonText.setVisible(false);
        this.scene.ActivePanel = null;
    }

}