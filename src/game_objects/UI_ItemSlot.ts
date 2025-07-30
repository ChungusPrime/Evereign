import UI from "../scenes/UI";
import ItemData from "../data/ItemData";
import { GD } from "../scenes/Game";

export default class ItemSlot extends Phaser.GameObjects.NineSlice {

    public scene: UI;
    public InventoryIndex: string;
    public Item: Phaser.GameObjects.Sprite;
    public ItemData: any = null;

    public Label: Phaser.GameObjects.Text | null;
    public QuantityText: Phaser.GameObjects.Text;

    constructor ( scene: UI, x: number, y: number, index: string, label: string | null = null ) {

        super(scene, x, y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6);
        this.scene = scene;

        // The slot itself
        this.setVisible(false);
        this.setDisplaySize(64, 64);
        this.setOrigin(0, 0);
        this.setInteractive();

        this.on("pointerover", () => {
            if ( scene.Game.Inventory.HeldItem != null && this.ItemData == null ) {
                this.setTint(0x00ff00);
                scene.Game.Inventory.HoveredOnSlot = this.InventoryIndex;
            } else if ( scene.Game.Inventory.HeldItem != null && this.ItemData != null ) {
                this.setTint(0xd6293d);
            }
        });

        this.on("pointerout", () => {
            this.clearTint();
            scene.Game.Inventory.HoveredOnSlot = null;
        });

        this.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if ( pointer.leftButtonDown() && scene.Game.Inventory.HeldItem != null && this.ItemData == null ) {
                console.log(`Item dropped: ${scene.Game.Inventory.HeldItem.getData('slot')} to slot ${this.InventoryIndex}`);
                let FromSlot = scene.Game.Inventory.HeldItem.getData('slot');
                let ToSlot = this.InventoryIndex;
                console.log(`Swapping items: ${FromSlot} with ${ToSlot}`);
                GD.Inventory[ToSlot] = GD.Inventory[FromSlot];
                GD.Inventory[FromSlot] = null;
                scene.Game.Inventory.Items.find((item) => item.InventoryIndex == FromSlot).Refresh();
                scene.Game.Inventory.Items.find((item) => item.InventoryIndex == ToSlot).Refresh();
                scene.input.topOnly = true;
                scene.Game.Inventory.HeldItem.destroy();
                scene.Game.Inventory.HeldItem = null;
                scene.Game.Inventory.HoveredOnSlot = null;
                if ( ToSlot.includes("Equipment_") )
                    console.warn(`Equipment changed, updating equipment character stats.`);
                scene.sound.play("InventoryPutdown");
                console.table(GD.Inventory);
            }
        });

        this.scene.add.existing(this);

        // Set the inventory index
        this.InventoryIndex = index;
        this.ItemData = GD.Inventory[this.InventoryIndex];

        this.SetupSprite(scene);

        // Label for the slot
        if ( label != null ) {
            this.Label = this.scene.add.text(this.getBottomCenter().x, this.getBottomCenter().y + 5, label, {
                fontFamily: "Augusta",
                fontSize: 16,
                align: "center"
            }).setOrigin(0.5, 0).setVisible(false);
        }

        // Quantity Label
        this.QuantityText = this.scene.add.text(this.getBottomRight().x - 5, this.getBottomRight().y - 5, "x0", {
            fontFamily: "Augusta",
            fontSize: 20 
        })
        .setOrigin(1, 1)
        .setDepth(10001)
        .setVisible(false);

        if ( this.ItemData && this.ItemData.Quantity > 0 ) {
            this.QuantityText.setText(`x${this.ItemData.Quantity}`);
        }

        this.scene.add.existing(this.QuantityText);

    }

    SetupSprite (scene: UI) {

        // Item sprite
        this.Item = this.scene.add.sprite(this.getCenter().x, this.getCenter().y, null, null) as Phaser.GameObjects.Sprite;

        if ( this.ItemData ) {
            const item = ItemData[this.ItemData.ID];
            this.Item.setTexture(item.Sprite.split("-")[0], item.Sprite.split("-")[1]);
        }

        if ( scene.ActivePanel == "Inventory" && this.ItemData != null ) {
            this.Item.setVisible(true);
        } else {
            this.Item.setVisible(false);
        }

        this.Item.setOrigin(0.5, 0.5);
        this.Item.setDisplaySize(64, 64);
        this.Item.setInteractive();

        this.Item.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if ( pointer.leftButtonDown() && this.scene.Game.Inventory.HeldItem == null ) {
                this.scene.Game.Inventory.HeldItem = this.Item;
                this.scene.input.topOnly = false;
                this.scene.sound.play("InventoryPickup");
            }
            if ( pointer.rightButtonDown() && this.scene.Game.Inventory.HeldItem != null) {
                this.scene.sound.play("InventoryPutdown");
                this.scene.Game.Inventory.HeldItem.destroy();
                this.scene.Game.Inventory.HeldItem = null;
                this.scene.Game.Inventory.HoveredOnSlot = null;
                this.SetupSprite(scene);
                this.scene.input.topOnly = true;
                this.scene.Game.Inventory.Items.forEach((item) => {
                    item.clearTint();
                });
            }
        });
        this.Item.setDepth(10000);
        this.Item.setData("slot", this.InventoryIndex);

        if ( this.ItemData ) {
            const sprite = ItemData[this.ItemData.ID].Sprite.split("-");
            this.Item.setTexture(sprite[0], sprite[1]);
        }

    }

    public Refresh () {
        this.ItemData = GD.Inventory[this.InventoryIndex];
        this.SetupSprite(this.scene);

        if ( this.ItemData && this.ItemData.Quantity > 1 ) {
            this.QuantityText.setText(`x${this.ItemData.Quantity}`);
            this.QuantityText.setVisible(true);
        } else {
            this.QuantityText.setVisible(false);
        }

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
