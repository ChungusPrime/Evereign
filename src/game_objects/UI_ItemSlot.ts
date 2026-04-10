import UI from "../scenes/UI";
import { CMD, GD, Inv } from "../scenes/Game";
import Game from "../scenes/Game";

export default class ItemSlot extends Phaser.GameObjects.NineSlice {

    public scene: UI;
    public Game: Game;
    public InventoryIndex: string;
    public Item: Phaser.GameObjects.Sprite;
    public DataInventorySlot: InventoryItem | null = null;
    public Label: Phaser.GameObjects.Text | null = null;
    public QuantityText: Phaser.GameObjects.Text;
    public Type: "Inventory" | "Equipment" | "Component";

    constructor(Game: Game, scene: UI, x: number, y: number, index: string, label: string | null = null, type: "Inventory" | "Equipment" | "Component" = "Inventory") {
        super(scene, x, y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6);

        this.scene = scene;
        this.Game = Game;
        this.Type = type;
        this.InventoryIndex = index;
        this.DataInventorySlot = GD.Inventory[this.InventoryIndex] ?? null;

        this.setVisible(false)
            .setDisplaySize(64, 64)
            .setOrigin(0, 0)
            .setInteractive();

        this.setupSlotEvents();
        this.scene.add.existing(this);

        this.createItemSprite();
        this.setupItemEvents();

        if (label) {
            const bottom = this.getBottomCenter();
            this.Label = this.scene.add.text(bottom.x, bottom.y + 5, label, { fontFamily: "Augusta", fontSize: 16, align: "center" })
                .setOrigin(0.5, 0)
                .setVisible(false);
        }

        const bottomRight = this.getBottomRight();
        this.QuantityText = this.scene.add.text(bottomRight.x - 5, bottomRight.y - 5, "", { fontFamily: "Augusta", fontSize: 20 })
            .setOrigin(1, 1)
            .setDepth(10001)
            .setVisible(false);

        this.updateQuantityDisplay();

        this.Hide();
    }

    private setupSlotEvents(): void {
        this.on("pointerover", () => {
            if (!Inv.HeldItem) return;
            this.setTint(this.DataInventorySlot ? 0xd6293d : 0x00ff00);
            if (!this.DataInventorySlot) Inv.HoveredOnSlot = this.InventoryIndex;
        });

        this.on("pointerout", () => {
            this.clearTint();
            Inv.HoveredOnSlot = null;
        });

        this.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if (pointer.leftButtonDown() && Inv.HeldItem && !this.DataInventorySlot) {
                Inv.SwapItems(Inv.HeldItem.getData("slot"), this.InventoryIndex);
            }
        });
    }

    private createItemSprite(): void {
        const center = this.getCenter();
        this.Item = this.scene.add.sprite(center.x, center.y, null, null)
            .setOrigin(0.5, 0.5)
            .setDisplaySize(64, 64)
            .setDepth(10000)
            .setData("slot", this.InventoryIndex)
            .setInteractive() as Phaser.GameObjects.Sprite;

        this.updateItemTexture();
    }

    private setupItemEvents(): void {
        this.Item.on("pointermove", (pointer: Phaser.Input.Pointer) => {
            if (this.DataInventorySlot) {
                this.scene.Tooltip.Move(pointer.x + 40, pointer.y);
            }
        });

        this.Item.on("pointerover", () => {
            if (this.DataInventorySlot) {
                this.scene.Tooltip.Show("Item", this.DataInventorySlot.ID);
            }
        });

        this.Item.on("pointerout", () => {
            if (this.DataInventorySlot) {
                this.scene.Tooltip.Hide();
            }
        });

        this.Item.on("pointerdown", (pointer: Phaser.Input.Pointer) => {

            if ( pointer.rightButtonDown() && !Inv.HeldItem ) {
                if ( this.DataInventorySlot.ID == "town_centre_blueprint" ) {
                    GD.UnlockedBuildings.push("Town Centre");
                    Inv.RemoveItem("town_centre_blueprint", 1);
                    this.scene.EventLog.NewEvent("You have unlocked the ability to build Town Centres!");
                    return;
                }
            }
            else if (pointer.leftButtonDown() && !Inv.HeldItem) {
                Inv.HeldItem = this.Item;
                this.scene.input.topOnly = false;
                this.scene.sound.play("InventoryPickup");
            } else if (pointer.rightButtonDown() && Inv.HeldItem) {
                this.scene.sound.play("InventoryPutdown");
                Inv.HeldItem.destroy();
                Inv.HeldItem = null;
                Inv.HoveredOnSlot = null;
                this.createItemSprite();
                this.setupItemEvents();
                this.scene.input.topOnly = true;
                Inv.Items.forEach(item => item.clearTint());
            }
        });
    }

    private updateItemTexture(): void {
        console.log(this.DataInventorySlot);
        if (this.DataInventorySlot) {
            const baseItemData = this.Game.DataManager.ItemData[this.DataInventorySlot.ID];
            const [atlas, frame] = baseItemData.Sprite.split("-");
            this.Item.setTexture(atlas, frame);
            this.Item.setVisible(this.scene.ActivePanel === "Inventory");
        } else {
            this.Item.setTexture(null, null).setVisible(false);
        }
    }

    private updateQuantityDisplay(): void {
        const quantity = this.DataInventorySlot?.Quantity ?? 0;
        if (quantity > 1) {

            this.QuantityText.setText(`x${quantity}`).setVisible(true);
        } else {
            this.QuantityText.setVisible(false);
        }
    }

    public Refresh(): void {
        this.DataInventorySlot = GD.Inventory[this.InventoryIndex] ?? null;
        
        // Recreate the item sprite if it was destroyed (e.g., when moved to another slot)
        if (!this.Item.scene) {
            this.createItemSprite();
            this.setupItemEvents();
        }
        
        this.updateQuantityDisplay();
        this.updateItemTexture();
    }

    public Show(): void {
        this.setVisible(true);
        this.Label?.setVisible(true);

        if (this.DataInventorySlot && this.DataInventorySlot.Quantity > 0) {
            this.Item.setVisible(true);
            if (this.DataInventorySlot.Quantity > 1) {
                this.QuantityText.setVisible(true);
            }
        }
    }

    public Hide(): void {
        this.setVisible(false);
        this.Item.setVisible(false);
        this.QuantityText.setVisible(false);
        this.Label?.setVisible(false);
    }
}
