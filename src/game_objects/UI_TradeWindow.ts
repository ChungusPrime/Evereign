import UI from "../scenes/UI";
import { GD } from "../scenes/Game";

class TradeWindowDisplayObject extends Phaser.GameObjects.Rectangle {

    public scene: UI;

    public ItemSprite: Phaser.GameObjects.Sprite;
    public ItemText: Phaser.GameObjects.Text;
    public ItemPriceText: Phaser.GameObjects.Text;
    public QuantityInput: Phaser.GameObjects.Text;

    public TradeWindow: TradeWindow;

    public ItemName: string = "";
    public ItemSpriteArr: string[] = [];
    public ItemPrice: number = 0;
    public QuantityDecreaseButton: Phaser.GameObjects.Text;
    public QuantityIncreaseButton: Phaser.GameObjects.Text;
    public ConfirmButton: Phaser.GameObjects.Text;

    constructor ( TradeWindow: TradeWindow, Item: any, index: number, type: string ) {

        super( TradeWindow.scene, 0, 0, TradeWindow.LeftBackground.width - 6, 64, 0x000000, 0.5);

        this.scene.add.existing(this);

        if ( type == "Selling" ) {
            this.setPosition(TradeWindow.LeftBackground.getTopLeft().x + 3, TradeWindow.LeftBackground.getTopLeft().y + (TradeWindow.SellingText.height + 15) + (index * this.height));
        } else if ( type == "Buying" ) {
            this.setPosition(TradeWindow.RightBackground.getTopLeft().x + 3, TradeWindow.LeftBackground.getTopLeft().y + (TradeWindow.BuyingText.height + 15) + (index * this.height));
        }

        this.setStrokeStyle(1, 0xffffff, 1).setOrigin(0, 0).setVisible(true);

        this.TradeWindow = TradeWindow;

        let ItemData = this.scene.Game.DataManager.GetItemData(Item.ID);
        this.ItemName = ItemData.Name;
        this.ItemSpriteArr = ItemData.Sprite.split("-");
        this.ItemPrice = Item.Price;

        this.ItemSprite = this.scene.add.sprite(this.getTopLeft().x + 4, this.getTopLeft().y + 4, this.ItemSpriteArr[0], this.ItemSpriteArr[1]).setOrigin(0, 0);

        this.ItemText = this.scene.add.text(this.ItemSprite.getRightCenter().x + 4, this.ItemSprite.getRightCenter().y, `${Item.Amount}x ${this.ItemName}`, {
            fontFamily: "Augusta",
            fontSize: 20,
            wordWrap: {
                useAdvancedWrap: true, 
                width: TradeWindow.LeftBackground.width - 6 
            }
        }).setOrigin(0, 0.5);

        this.QuantityInput = this.scene.add.text(this.getRightCenter().x - 60, this.getRightCenter().y, "0", { fontFamily: "Augusta", fontSize: 24 } ).setOrigin(0, 0.5);

        this.QuantityDecreaseButton = this.scene.add.text(this.QuantityInput.getLeftCenter().x - 20, this.getLeftCenter().y, "-", { fontFamily: "Augusta", fontSize: 30 } )
        .setOrigin(0, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
            let Quantity = parseInt(this.QuantityInput.text);
            if ( Quantity > 0 ) {
                this.QuantityInput.setText(`${Quantity - 1}`);
            }
        });

        this.QuantityIncreaseButton = this.scene.add.text(this.QuantityInput.getRightCenter().x, this.getRightCenter().y, "+", { fontFamily: "Augusta", fontSize: 30 } )
        .setOrigin(0, 0.5)
        .setInteractive()
        .on('pointerdown', () => {
            let Quantity = parseInt(this.QuantityInput.text);
            this.QuantityInput.setText(`${Quantity + 1}`);
        });

        // Button to complete the transaction
        if ( type == "Selling" ) {
            this.ConfirmButton = this.scene.add.text(this.QuantityInput.getBottomCenter().x, this.QuantityInput.getBottomCenter().y + 2, "Buy", { fontFamily: "Augusta", fontSize: 20, align: "center" } )
            .setOrigin(0.5, 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.TradeWindow.BuyItem(ItemData.ID, parseInt(this.QuantityInput.text), this.ItemPrice);
            });
        } else if ( type == "Buying" ) {
            this.ConfirmButton = this.scene.add.text(this.QuantityInput.getBottomCenter().x, this.QuantityInput.getBottomCenter().y + 2, "Sell", { fontFamily: "Augusta", fontSize: 20, align: "center" } )
            .setOrigin(0.5, 0)
            .setInteractive()
            .on('pointerdown', () => {
                this.TradeWindow.SellItem(ItemData.ID, parseInt(this.QuantityInput.text), this.ItemPrice);
            });
        }

        this.ItemPriceText = this.scene.add.text(this.ItemSprite.getBottomLeft().x, this.ItemSprite.getBottomLeft().y + 8, `Price: ${this.ItemPrice}`, {
            fontFamily: "Augusta",
            fontSize: 20,
            wordWrap: { 
                useAdvancedWrap: true, 
                width: TradeWindow.LeftBackground.width - 6 
            }
        }).setOrigin(0, 0.5);

        return this;

    }

}

export default class TradeWindow {

    public scene: UI;
    public Background: Phaser.GameObjects.Rectangle;
    public LeftBackground: Phaser.GameObjects.Rectangle;
    public RightBackground: Phaser.GameObjects.Rectangle;
    public BuyingText: Phaser.GameObjects.Text;
    public SellingText: Phaser.GameObjects.Text;
    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;
    public TraderItems: Phaser.GameObjects.Group;
    public TraderText: Phaser.GameObjects.Text;
    public TraderTextBackground: Phaser.GameObjects.Rectangle;

    public CurrentShopID: number;

    constructor ( scene: UI ) {

        this.scene = scene;
        this.TraderItems = this.scene.add.group([]);

        this.TraderTextBackground = this.scene.add.rectangle(this.scene.Game.cameras.main.width / 2, this.scene.Game.cameras.main.height * 0.1, 650, 50, 0x000000, 1)
        .setVisible(false)
        .setStrokeStyle(1, 0xffffff);

        this.TraderText = this.scene.add.text(this.TraderTextBackground.getCenter().x, this.TraderTextBackground.getCenter().y, "Trader", { fontFamily: "Augusta", fontSize: 24, align: "center" }).setOrigin(0.5, 0.5).setVisible(false);

        this.LeftBackground = this.scene.add.rectangle(this.TraderTextBackground.getBottomLeft().x, this.TraderTextBackground.getBottomLeft().y, this.TraderTextBackground.width / 2, 500, 0x000000, 1)
        .setOrigin(0, 0)
        .setVisible(false)
        .setStrokeStyle(1, 0xffffff);

        this.SellingText = this.scene.add.text(this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 15, "Selling", { fontFamily: "Augusta", fontSize: 24, align: "center" })
        .setOrigin(0.5, 0.5)
        .setVisible(false);

        this.RightBackground = this.scene.add.rectangle(this.LeftBackground.getTopRight().x, this.LeftBackground.getTopRight().y, this.TraderTextBackground.width / 2, 500, 0x000000, 1)
        .setOrigin(0, 0)
        .setVisible(false)
        .setStrokeStyle(1, 0xffffff);

        this.BuyingText = this.scene.add.text(this.RightBackground.getTopCenter().x, this.RightBackground.getTopCenter().y + 15, "Buying", { fontFamily: "Augusta", fontSize: 24, align: "center" })
        .setOrigin(0.5, 0.5)
        .setVisible(false);
        
        this.CloseButton = this.scene.add.image(this.TraderTextBackground.getRightCenter().x - 30, this.TraderTextBackground.getRightCenter().y, "panel-small")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(10)
        .setDisplaySize(24, 24)
        .setInteractive()
        .on('pointerdown', () => {
            this.Hide();
        }, this);

        this.CloseButtonText = this.scene.add.text(this.CloseButton.getCenter().x, this.CloseButton.getCenter().y, "X")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(11);

        this.CurrentShopID = 0;

    }

    Show ( id: number ) {

        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
        this.RightBackground.setVisible(true);
        this.LeftBackground.setVisible(true);
        this.SellingText.setVisible(true);
        this.BuyingText.setVisible(true);
        this.TraderText.setVisible(true);
        this.TraderTextBackground.setVisible(true);

        this.CurrentShopID = id;

        this.TraderText.setText(this.scene.Game.DataManager.GetBuildingData(id).Name);

        let Trader = GD.Maps[GD.CurrentMap].Buildings.find( ( building: IBuilding ) => building.ID == id );

        Trader.Selling.forEach( ( item, index: number ) => {
            let Object = new TradeWindowDisplayObject(this, item, index, "Selling");
            this.TraderItems.add(Object);
            this.TraderItems.add(Object.ItemText);
            this.TraderItems.add(Object.ItemSprite);
            this.TraderItems.add(Object.QuantityInput);
            this.TraderItems.add(Object.ItemPriceText);
            this.TraderItems.add(Object.QuantityDecreaseButton);
            this.TraderItems.add(Object.QuantityIncreaseButton);
            this.TraderItems.add(Object.ConfirmButton);
        });

        Trader.Buying.forEach( ( item, index: number ) => {
            let Object = new TradeWindowDisplayObject(this, item, index, "Buying");
            this.TraderItems.add(Object);
            this.TraderItems.add(Object.ItemText);
            this.TraderItems.add(Object.ItemSprite);
            this.TraderItems.add(Object.QuantityInput);
            this.TraderItems.add(Object.ItemPriceText);
            this.TraderItems.add(Object.QuantityDecreaseButton);
            this.TraderItems.add(Object.QuantityIncreaseButton);
            this.TraderItems.add(Object.ConfirmButton);
        });

        this.scene.EventLog.EventsLogCamera.ignore(this.TraderItems);
        this.scene.EventLog.EventsLogCamera.ignore([
            this.CloseButton,
            this.CloseButtonText,
            this.LeftBackground,
            this.RightBackground,
            this.SellingText,
            this.BuyingText,
            this.TraderText,
            this.TraderTextBackground
        ]);
    }

    Hide () {
        this.RightBackground.setVisible(false);
        this.LeftBackground.setVisible(false);
        this.SellingText.setVisible(false);
        this.BuyingText.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.TraderText.setVisible(false);
        this.TraderTextBackground.setVisible(false);
        this.TraderItems.clear(true, true);
        this.CurrentShopID = 0;
    }

    BuyItem ( id: string, quantity: number, price: number ) {
        console.log(`Buying ItemID: ${id}, Quantity: ${quantity} from BuildingID: ${this.CurrentShopID} for ${price} gold each`);
        //this.scene.Game.Inventory.AddItem(id, quantity); // Add the item to the player's inventory
        //this.scene.Game.Inventory.RemoveItem("gold", price * quantity); // Remove the gold from the player's inventory
    }
    
    SellItem ( id: string, quantity: number, price: number ) {
        console.log(`Selling ItemID: ${id}, Quantity: ${quantity} to BuildingID: ${this.CurrentShopID} for ${price} gold each`);
        //this.scene.Game.Inventory.RemoveItem(id, quantity); // Remove the item from the player's inventory
        //this.scene.Game.Inventory.AddItem("gold", price * quantity); // Add the gold to the player's inventory
    }

}