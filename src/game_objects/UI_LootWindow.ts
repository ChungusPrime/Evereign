import UI from "../scenes/UI";

class LootWindowDisplayObject extends Phaser.GameObjects.Rectangle {

    public scene: UI;
    public ItemSprite: Phaser.GameObjects.Sprite;
    public ItemText: Phaser.GameObjects.Text;
    public LootWindow: LootWindow;

    public ItemName: string = "";
    public ItemSpriteArr: string[] = [];

    constructor ( LootWindow: LootWindow, ChestID: number, item: LootItem, index: number ) {

        super( LootWindow.scene, LootWindow.Text.getBottomLeft().x, LootWindow.Text.getBottomLeft().y + 3 + (index * 40), LootWindow.Background.width - 6, 36, 0x000000, 0.5);
        this.scene.add.existing(this);
        this.setStrokeStyle(1, 0xffffff, 1).setOrigin(0, 0).setVisible(true);

        this.LootWindow = LootWindow;

        this.scene.Game.DataManager.ItemData.forEach( (element) => {
            if ( element.ID == item.ItemID ) {
                this.ItemName = element.Name;
                this.ItemSpriteArr = element.Sprite.split("-");
            }
        });

        this.ItemSprite = this.scene.add.sprite(this.getLeftCenter().x + 3, this.getLeftCenter().y, this.ItemSpriteArr[0], this.ItemSpriteArr[1]).setOrigin(0, 0.5);

        this.ItemText = this.scene.add.text(this.ItemSprite.getRightCenter().x + 3, this.ItemSprite.getRightCenter().y, `${item.Amount}x ${this.ItemName}`, {
            fontFamily: "Augusta",
            fontSize: 20,
            wordWrap: { 
                useAdvancedWrap: true, 
                width: LootWindow.Background.width - 6 
            }
        }).setOrigin(0, 0.5);

        this.ItemText.setInteractive()
        .on('pointerover', () => {
            this.ItemText.setTint(0x2596be);
        })
        .on('pointerout', () => {
            this.ItemText.clearTint();
        })
        .on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.rightButtonDown() ) { 
                this.LootWindow.LootItem(this, ChestID, item.ItemID, item.Amount);
                return;
            }
            this.LootWindow.LootItem(this, ChestID, item.ItemID, 1);
        });

        return this;

    }

}

export default class LootWindow {

    public scene: UI;
    public Background: Phaser.GameObjects.Rectangle
    public Text: Phaser.GameObjects.Text;
    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;
    public LootAllButton: Phaser.GameObjects.Image;
    public LootAllButtonText: Phaser.GameObjects.Text;
    public ShownItems: Phaser.GameObjects.Group;

    constructor ( scene: UI ) {
        this.scene = scene;
        this.ShownItems = this.scene.add.group([]);

        this.Background = this.scene.add.rectangle( this.scene.Game.cameras.main.width / 2, this.scene.Game.cameras.main.height / 2, 400, 500, 0x000000, 0.9)
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setStrokeStyle(1, 0xffffff);

        this.Text = this.scene.add.text(this.Background.getTopLeft().x + 3, this.Background.getTopLeft().y + 3, "Loot", {
            fontFamily: "Augusta",
            fontSize: 24,
            wordWrap: { 
                useAdvancedWrap: true, 
                width: this.Background.width - 6 
            }
        }).setVisible(false);

        this.CloseButton = this.scene.add.image(this.Background.getTopRight().x, this.Background.getTopRight().y, "panel-small")
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

        this.LootAllButton = this.scene.add.image(this.Background.getBottomCenter().x, this.Background.getBottomCenter().y, "button-down")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(10)
        .setDisplaySize(100, 40)
        .setInteractive()
        .on('pointerdown', () => {
            console.log("Take All");
        }, this);

        this.LootAllButtonText = this.scene.add.text(this.LootAllButton.getCenter().x, this.LootAllButton.getCenter().y, "Take All")
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(11);
    }

    Show ( id: number ) {

        this.Background.setVisible(true);
        this.Text.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
        this.LootAllButton.setVisible(true);
        this.LootAllButtonText.setVisible(true);

        this.scene.Game.DataManager.GetChestLoot(id).forEach( ( item: LootItem, index: number ) => {
            if ( item.Amount == 0 ) return;
            let Object = new LootWindowDisplayObject(this, id, item, index);
            this.ShownItems.add(Object);
            this.ShownItems.add(Object.ItemText);
            this.ShownItems.add(Object.ItemSprite);
        });

    }

    Hide () {
        this.Background.setVisible(false);
        this.Text.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.LootAllButton.setVisible(false);
        this.LootAllButtonText.setVisible(false);
        this.ShownItems.clear(true, true);
    }

    LootItem ( DisplayObject: LootWindowDisplayObject, ChestID: number, ItemID: string, Amount: number ) {
        console.log(`Looted: ${Amount}x ${ItemID} from Chest: ${ChestID}`);
        this.scene.Game.DataManager.GetChestLoot(ChestID).forEach( ( item: LootItem, index: number ) => {
            if ( item.ItemID == ItemID ) {
                this.scene.Game.Inventory.AddItem(ItemID, Amount);
                item.Amount -= Amount;
                DisplayObject.ItemText.setText(`${item.Amount}x ${DisplayObject.ItemName}`);
                if ( item.Amount == 0 ) {
                    DisplayObject.ItemText.destroy();
                    DisplayObject.ItemSprite.destroy();
                    DisplayObject.destroy();
                }
            }
        });
    }

}