import Game from "../scenes/Game";
import UI from "../scenes/UI";
import Item from "../game_objects/Item"

export default class InventoryManager {

    public Game: Game;
    public UI: UI;
    public CurrentResourceCount: number = 0;
    public MaxResources: number = 50;
    public GoldSprite: string = "items-3";
    public Background: Phaser.GameObjects.Rectangle;
    public Header: Phaser.GameObjects.Text;
    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;
    public DisplayOffset: number = 0;
    public Items: Item[] = [];

    constructor ( game: Game, ui: UI ) {

        this.Game = game;
        this.UI = ui;

        // Background
        this.Background = this.UI.add.rectangle ( game.cameras.main.width / 2, game.cameras.main.height / 2, 400, 400, 0x000000, 0.85)
        .setOrigin(0.5, 0.5)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        // Header
        this.Header = this.UI.add.text( this.Background.getTopLeft().x + 5, this.Background.getTopLeft().y + 10, `Inventory (${this.CurrentResourceCount}/${this.MaxResources})`)
        .setOrigin(0, 0.5)
        .setVisible(false);

        this.CloseButton = this.UI.add.image(this.Background.getTopRight().x, this.Background.getTopRight().y, "panel-small")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setInteractive()
        .setDepth(10)
        .setDisplaySize(24, 24)
        .on('pointerdown', () => {
            this.Hide();
        }, this);

        this.CloseButtonText = this.UI.add.text(this.CloseButton.getCenter().x, this.CloseButton.getCenter().y, "X")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(11);

        this.Game.DataManager.GameData.Inventory.forEach( (item: { ID: number, Quantity: number }) => {
            this.AddResource(item.ID, item.Quantity);
        });

    }

    AddResource ( ID: number, quantity: number ) {

        let Exists = this.Items.find((res) => res.ItemID == ID);

        if ( Exists == undefined ) {
            const Instance = new Item(this.UI, this.Header.getBottomLeft().x + 5, this.Header.getBottomLeft().y + 5, this.Background.width - 20, 50, ID, quantity);
            this.Items.push(Instance);
        } else {
            Exists.ItemQuantity += quantity;
            Exists.quantity.setText(Exists.ItemQuantity.toString());
        }

        this.CurrentResourceCount += quantity;
        this.Header.setText(`Inventory (${this.CurrentResourceCount}/${this.MaxResources})`);
    }

    AddGold ( quantity: number ) {
        this.UI.EventLog.NewEvent(`You got ${quantity}gp`);
        return this.Game.DataManager.GameData.Gold += quantity;
    }

    Show () {
        this.Background.setVisible(true);
        this.Header.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
        this.Items.forEach( (obj: Item) => { 
            obj.Show();
        });
        console.log(this.Items);
    }

    Hide () {
        this.Items.forEach( ( obj: Item) => {
            obj.Hide();
        });
        this.Background.setVisible(false);
        this.Header.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.UI.ActivePanel = null;
    }

}