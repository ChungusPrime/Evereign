import UI from "../scenes/UI";
import { GD, Inv } from "../scenes/Game";
import Game from "../scenes/Game";

export default class ItemSlot extends Phaser.GameObjects.NineSlice {

    public scene: UI;
    public Game: Game;
    public InventoryIndex: string;
    public Item: Phaser.GameObjects.Sprite;
    public DataInventorySlot: InventoryItem | null = null;
    public Label: Phaser.GameObjects.Text | null;
    public QuantityText: Phaser.GameObjects.Text;
    public Type: "Inventory" | "Equipment" | "Component";

    constructor ( Game: Game, scene: UI, x: number, y: number, index: string, label: string | null = null, type: "Inventory" | "Equipment" | "Component" = "Inventory" ) {

        super(scene, x, y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6);

        this.scene = scene;
        this.Game = Game;
        this.Type = type;
        this.InventoryIndex = index;
        this.DataInventorySlot = GD.Inventory[this.InventoryIndex];

        // The slot itself
        this.setVisible(false);
        this.setDisplaySize(64, 64);
        this.setOrigin(0, 0);
        this.setInteractive();

        this.on("pointerover", ( pointer: Phaser.Input.Pointer ) => {
            if ( Inv.HeldItem != null && this.DataInventorySlot == null ) {
                this.setTint(0x00ff00);
                Inv.HoveredOnSlot = this.InventoryIndex;
            } else if ( Inv.HeldItem != null && this.DataInventorySlot != null ) {
                this.setTint(0xd6293d);
            }
        });

        this.on("pointerout", ( pointer: Phaser.Input.Pointer) => {
            this.clearTint();
            Inv.HoveredOnSlot = null;
        });

        this.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if ( pointer.leftButtonDown() && Inv.HeldItem != null && this.DataInventorySlot == null ) {
                let FromSlot = Inv.HeldItem.getData('slot');
                let ToSlot = this.InventoryIndex;
                GD.Inventory[ToSlot] = GD.Inventory[FromSlot];
                GD.Inventory[FromSlot] = null;
                Inv.Items.find((item) => item.InventoryIndex == FromSlot).Refresh();
                Inv.Items.find((item) => item.InventoryIndex == ToSlot).Refresh();
                scene.input.topOnly = true;
                Inv.HeldItem.destroy();
                Inv.HeldItem = null;
                Inv.HoveredOnSlot = null;
                scene.sound.play("InventoryPutdown");
                scene.Game.PlayerCharacter.UpdateStats();
            }
        });

        this.scene.add.existing(this);

        this.SetupSprite(scene);

        // Label for the slot
        if ( label != null )
            this.Label = this.scene.add.text(this.getBottomCenter().x, this.getBottomCenter().y + 5, label, { fontFamily: "Augusta", fontSize: 16, align: "center"}).setOrigin(0.5, 0).setVisible(false);

        // Quantity Label
        this.QuantityText = this.scene.add.text(this.getBottomRight().x - 5, this.getBottomRight().y - 5, "x0", { fontFamily: "Augusta", fontSize: 20 })
        .setOrigin(1, 1)
        .setDepth(10001)
        .setVisible(false);

        if ( this.DataInventorySlot && this.DataInventorySlot.Quantity > 0 ) {
            this.QuantityText.setText(`x${this.DataInventorySlot.Quantity}`);
        }

        this.scene.add.existing(this.QuantityText);

    }

    SetupSprite (scene: UI) {

        // Item sprite
        this.Item = this.scene.add.sprite(this.getCenter().x, this.getCenter().y, null, null) as Phaser.GameObjects.Sprite;

        if ( this.DataInventorySlot ) {
            const BaseItemData = this.Game.DataManager.ItemData[this.DataInventorySlot.ID];
            this.Item.setTexture(BaseItemData.Sprite.split("-")[0], BaseItemData.Sprite.split("-")[1]);
        }

        if ( scene.ActivePanel == "Inventory" && this.DataInventorySlot != null ) {
            this.Item.setVisible(true);
        } else {
            this.Item.setVisible(false);
        }

        this.Item.setOrigin(0.5, 0.5);
        this.Item.setDisplaySize(64, 64);
        this.Item.setInteractive();

        this.Item.on("pointermove", ( pointer: Phaser.Input.Pointer ) => {
            if ( GD.Inventory[this.InventoryIndex] != null ) {
                scene.Tooltip.Move(pointer.x + 40, pointer.y);
            }
        });

        this.Item.on("pointerover", ( pointer: Phaser.Input.Pointer ) => {
            if ( GD.Inventory[this.InventoryIndex] != null ) {
                scene.Tooltip.Show("Item", GD.Inventory[this.InventoryIndex].ID);
            }
        });

        this.Item.on("pointerout", ( pointer: Phaser.Input.Pointer ) => {
            if ( GD.Inventory[this.InventoryIndex] != null ) {
                scene.Tooltip.Hide();
            }
        });

        this.Item.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if ( pointer.leftButtonDown() && Inv.HeldItem == null ) {
                Inv.HeldItem = this.Item;
                this.scene.input.topOnly = false;
                this.scene.sound.play("InventoryPickup");
            }
            if ( pointer.rightButtonDown() && Inv.HeldItem != null) {
                this.scene.sound.play("InventoryPutdown");
                Inv.HeldItem.destroy();
                Inv.HeldItem = null;
                Inv.HoveredOnSlot = null;
                this.SetupSprite(scene);
                this.scene.input.topOnly = true;
                Inv.Items.forEach((item) => {
                    item.clearTint();
                });
            }
        });
        this.Item.setDepth(10000);
        this.Item.setData("slot", this.InventoryIndex);

        if ( this.DataInventorySlot ) {
            const BaseItemData = this.Game.DataManager.ItemData[this.DataInventorySlot.ID];
            const sprite = BaseItemData.Sprite.split("-");
            this.Item.setTexture(sprite[0], sprite[1]);
        }

        if ( GD.Inventory[this.InventoryIndex] == null ) {
            this.Item.setVisible(false);
            this.Item.setTexture(null, null);
        }

    }

    public Refresh () {
        this.DataInventorySlot = GD.Inventory[this.InventoryIndex];
        if ( this.DataInventorySlot && this.DataInventorySlot.Quantity > 1 ) {
            this.QuantityText.setText(`x${this.DataInventorySlot.Quantity}`);
            this.QuantityText.setVisible(true);
        } else {
            GD.Inventory[this.InventoryIndex] = null;
            this.QuantityText.setVisible(false);
        }
        this.SetupSprite(this.scene);
    }

    public Show () {
        this.setVisible(true);
        if ( this.DataInventorySlot && this.DataInventorySlot.Quantity > 0 ) {
            this.Item.setVisible(true);
            if ( this.DataInventorySlot.Quantity > 1 ) {
                this.QuantityText.setVisible(true);
            }
        }
        
        if ( this.Label ) {
            this.Label.setVisible(true);
        }
    }

    public Hide () {
        this.setVisible(false);
        this.Item.setVisible(false);
        this.QuantityText.setVisible(false);
        if ( this.Label ) {
            this.Label.setVisible(false);
        }
    }

}
