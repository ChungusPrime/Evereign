import UI from "../scenes/UI";
import Game from "../scenes/Game";

export default class Item extends Phaser.GameObjects.Rectangle {

    public ItemID: string;
    public ItemQuantity: number;
    public ItemType: string;
    
    public sprite: Phaser.GameObjects.Sprite;
    public text: Phaser.GameObjects.Text;
    public quantity: Phaser.GameObjects.Text;
    
    constructor ( scene: UI, x: number, y: number, width: number, height: number, ItemID: string, ItemQuantity: number ) {
        super(scene, x, y, width, height, 0x000000, 1);
        let Game = scene.scene.get("Game") as Game;
        this.setOrigin(0, 0)
        this.setStrokeStyle(1, 0xffffff, 1);
        this.setVisible(scene.ActivePanel == "Resources");
        this.ItemID = ItemID;
        this.ItemQuantity = ItemQuantity;
        const ItemData = Game.DataManager.GetItemData(this.ItemID);
        this.ItemType = ItemData.Category;
        const sprite = ItemData.Sprite.split("-");
        
        this.sprite = scene.add.sprite(this.getLeftCenter().x + 24, this.getLeftCenter().y, sprite[0], sprite[1])
        .setOrigin(0, 0.6)
        .setVisible(scene.ActivePanel == "Resources")
        .setDepth(this.depth + 1);

        this.text = scene.add.text(this.sprite.getRightCenter().x + 10, this.sprite.getRightCenter().y, `${ItemData.Name}`, { 
            fontFamily: "Augusta", 
            fontSize: 18, wordWrap: { 
                useAdvancedWrap: true,
                width: this.width - 3
            }
        })
        .setOrigin(0, 0.5)
        .setVisible(scene.ActivePanel == "Resources")
        .setDepth(this.depth + 1);

        this.quantity = scene.add.text(this.getRightCenter().x - 32, this.getRightCenter().y, `x${ItemQuantity}`, { 
            fontFamily: "Augusta", 
            fontSize: 18, wordWrap: { 
                useAdvancedWrap: true,
                width: this.width - 3
            }
        })
        .setVisible(scene.ActivePanel == "Resources")
        .setOrigin(0, 0.5)
        .setDepth(this.depth + 1);

        this.setInteractive();

        this.on('pointerover', ( pointer: Phaser.Input.Pointer ) => {
            this.setStrokeStyle(1, 0xbf942e, 1);
            scene.Tooltip.setPosition(pointer.x + 32, pointer.y + 5);
            scene.Tooltip.Show("Item", ItemData.ID);
        });

        this.on('pointermove', ( pointer: Phaser.Input.Pointer ) => {
            scene.Tooltip.Move(pointer.x + 32, pointer.y + 5);
        });

        this.on('pointerout', () => {
            this.setStrokeStyle(1, 0xffffff, 1);
            scene.Tooltip.Hide();
        });

        scene.add.existing(this);
        scene.add.existing(this.sprite);
        scene.add.existing(this.quantity);
        scene.add.existing(this.text);
    }

    Move ( x: number, y: number ) {
        this.setPosition(x, y);
        this.sprite.setPosition(this.getLeftCenter().x + 5, this.getLeftCenter().y + 5);
        this.text.setPosition(this.sprite.getRightCenter().x + 5, this.sprite.getRightCenter().y);
        this.quantity.setPosition(this.getRightCenter().x - 32, this.getRightCenter().y);
    }

    Show () {
        this.setVisible(true);
        this.sprite.setVisible(true);
        this.text.setVisible(true);
        this.quantity.setVisible(true);
    }

    Hide () {
        this.setVisible(false);
        this.sprite.setVisible(false);
        this.text.setVisible(false);
        this.quantity.setVisible(false);
    }

}