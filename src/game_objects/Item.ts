import UI from "../scenes/UI";
import Game from "../scenes/Game";

export default class Item extends Phaser.GameObjects.Rectangle {

    public ItemID: number;
    public ItemQuantity: number;
    
    public sprite: Phaser.GameObjects.Sprite;
    public text: Phaser.GameObjects.Text;
    public quantity: Phaser.GameObjects.Text;
    
    constructor ( scene: UI, x: number, y: number, width: number, height: number, ItemID: number, ItemQuantity: number ) {
        super(scene, x, y, width, height, 0x000000, 1);

        let UI = scene.scene.get("UI") as UI;
        let Game = scene.scene.get("Game") as Game;

        this.setOrigin(0, 0)
        this.setStrokeStyle(1, 0xffffff, 1);
        this.setVisible(scene.ActivePanel == "Resources");
        this.ItemID = ItemID;
        this.ItemQuantity = ItemQuantity;

        const ItemData = Game.DataManager.GetItemData(this.ItemID);
        const sprite = ItemData.Sprite.split("-");
        
        this.sprite = scene.add.sprite(this.getLeftCenter().x + 5, this.getLeftCenter().y + 5, sprite[0], sprite[1]).setOrigin(0, 0.5).setVisible(scene.ActivePanel == "Resources").setDepth(this.depth + 1);
        this.text = scene.add.text(this.sprite.getRightCenter().x + 5, this.sprite.getRightCenter().y, `${ItemData.Name}`).setVisible(scene.ActivePanel == "Resources").setDepth(this.depth + 1);
        this.quantity = scene.add.text(this.text.getRightCenter().x + 5, this.text.getRightCenter().y, `${ItemQuantity}`).setVisible(scene.ActivePanel == "Resources").setOrigin(0.5).setDepth(this.depth + 1);
        scene.add.existing(this);
        scene.add.existing(this.sprite);
        scene.add.existing(this.quantity);
        scene.add.existing(this.text);
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