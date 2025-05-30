import UI from "../scenes/UI";
import ItemData from "../data/ItemData";
import { GD } from "../scenes/Game";

export default class ItemSlot extends Phaser.GameObjects.NineSlice {

    public InventoryIndex: number | string = 0;
    public Item: Phaser.GameObjects.Sprite;
    public ItemData: any = null;
    public SlotType: "inventory" | "equipment" = "inventory";

    public Label: Phaser.GameObjects.Text | null;
    public QuantityText: Phaser.GameObjects.Text;

    constructor ( scene: UI, x: number, y: number, index: number | string, label?: string ) {

        super(scene, x, y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6);

        // The slot itself
        this.setVisible(false);
        this.setDisplaySize(64, 64);
        this.setOrigin(0, 0);
        this.setInteractive();

        this.on("pointerover", () => {
            if ( scene.Game.Inventory.HeldItem != null ) {
                this.setTint(0x00ff00);
            }
        });

        this.on("pointerout", () => {
            this.clearTint();
        });

        this.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if ( pointer.leftButtonDown() && scene.Game.Inventory.HeldItem != null ) {
                scene.Game.Inventory.SwapItems(scene.Game.Inventory.HeldItem.getData('slot'), this.InventoryIndex);
                scene.input.topOnly = true;
                scene.Game.Inventory.HeldItem = null;
            }
        });

        this.scene.add.existing(this);

        // Set the inventory index
        this.InventoryIndex = index;

        if ( typeof this.InventoryIndex === "number" ) {
            this.ItemData = GD.Inventory[this.InventoryIndex];
            this.SlotType = "inventory";
        } else if ( typeof this.InventoryIndex === "string" ) {
            //this.ItemData = GD.Equipment[this.InventoryIndex];
            //this.SlotType = "equipment";
        }

        // Item sprite
        this.Item = this.scene.add.sprite(this.getCenter().x, this.getCenter().y, "Kenney-UI", "buttonSquare_blue_pressed");
        this.Item.setOrigin(0.5, 0.5);
        this.Item.setVisible(false);
        this.Item.setDisplaySize(64, 64);
        this.Item.setInteractive();
        this.Item.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if ( pointer.leftButtonDown() && scene.Game.Inventory.HeldItem == null ) {
                scene.Game.Inventory.HeldItem = this.Item;
                scene.input.topOnly = false; // Prevents other interactions while holding an item
            }
            if ( pointer.rightButtonDown() && scene.Game.Inventory.HeldItem != null) {
                scene.Game.Inventory.HeldItem = null;
                this.Item.setPosition(this.getCenter().x, this.getCenter().y);
                scene.input.topOnly = true;
                scene.Game.Inventory.Items.forEach((item) => {
                    item.clearTint();
                });
            }
        });
        this.Item.setDepth(10000);
        this.Item.setData("slot", this.InventoryIndex);

        if ( this.ItemData ) {
            console.log("ItemSlot: ItemData found for index", this.InventoryIndex, this.ItemData);
            const sprite = ItemData.find((item) => item.ID == this.ItemData.ID).Sprite.split("-");
            this.Item.setTexture(sprite[0], sprite[1]);
        }

        // Label for the slot
        if ( label ) {
            this.Label = this.scene.add.text(this.getBottomCenter().x, this.getBottomCenter().y + 5, label, {
                fontFamily: "Augusta",
                fontSize: 16,
                align: "center"
            }).setOrigin(0.5, 0).setVisible(false);
        }

        // Quantity Label
        this.QuantityText = this.scene.add.text(this.getBottomRight().x - 5, this.getBottomRight().y - 5, "x0", {
            fontFamily: "Augusta",
            fontSize: 12 
        })
        .setOrigin(1, 1)
        .setVisible(false);

        if ( this.ItemData && this.ItemData.Quantity > 0 ) {
            this.QuantityText.setText(`x${this.ItemData.Quantity}`);
        }

        this.scene.add.existing(this.QuantityText);

    }

    public Refresh () {
        if ( this.ItemData == null ) {
            this.setTexture("Kenney-UI", "buttonSquare_blue_pressed");
        } else {
            const sprite = ItemData.find((item) => item.ID == this.ItemData.ID).Sprite.split("-");
            this.Item.setTexture(sprite[0], sprite[1]);
        }

        this.QuantityText.setText(`x${this.ItemData.Quantity}`);
        this.Item.setData("slot", this.InventoryIndex);
    }

    public UpdateItem (id: string, quantity: number) {
        const sprite = ItemData.find((item) => item.ID == id).Sprite.split("-");
        this.Item.setTexture(sprite[0], sprite[1]);
        this.QuantityText.setText(`x${quantity}`);
        this.Item.setData("slot", this.InventoryIndex);
    }

    public Show () {
        this.setVisible(true);
        if ( this.ItemData ) {
            this.Item.setVisible(true);
            if ( this.ItemData.Quantity > 1 ) {
                this.QuantityText.setVisible(true);
            }
        }
        
        if ( this.Label ) {
            this.Label.setVisible(true);
        }
    }

    public Hide () {
        this.setVisible(false);
        if ( this.ItemData ) {
            this.Item.setVisible(false);
            if ( this.ItemData.Quantity > 0 ) {
                this.QuantityText.setVisible(false);
            }
        }

        if ( this.Label ) {
            this.Label.setVisible(false);
        }
    }

}
