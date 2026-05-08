import UI from "../scenes/UI";
import { GD, Inv } from "../scenes/Game";
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
            .setInteractive()
            .on("pointermove", (pointer: Phaser.Input.Pointer) => {
                if (this.DataInventorySlot && !this.scene.Game.HeldObject.Type)
                    this.scene.Tooltip.Move(pointer.x + 40, pointer.y);
            })
            .on("pointerover", () => {
                if (this.scene.Game.HeldObject.Type === "Item") {
                    const isSameSlot = this.scene.Game.HeldObject.Sprite.getData("slot") === this.InventoryIndex;
                    this.setTint(this.DataInventorySlot || isSameSlot ? 0xd6293d : 0x00ff00);
                    if (!this.DataInventorySlot && !isSameSlot)
                        Inv.HoveredOnSlot = this.InventoryIndex;
                } else if (this.DataInventorySlot) {
                    this.scene.Tooltip.Show("Item", this.DataInventorySlot.ID);
                }
            })
            .on("pointerout", () => {
                this.clearTint();
                Inv.HoveredOnSlot = null;
                if (this.DataInventorySlot) {
                    this.scene.Tooltip.Hide();
                }
            })
            .on("pointerdown", (pointer: Phaser.Input.Pointer) => {
                const held = this.scene.Game.HeldObject;
                if (pointer.leftButtonDown() && held.Type === "Item") {
                    const sourceSlot = held.Sprite.getData("slot");
                    if (sourceSlot === this.InventoryIndex) return;
                    Inv.SwapItems(sourceSlot, this.InventoryIndex);
                } else if (pointer.leftButtonDown() && !held.Type && this.DataInventorySlot) {
                    const ghost = this.scene.add.sprite(pointer.x, pointer.y, this.Item.texture.key, this.Item.frame.name)
                        .setOrigin(0.5).setDisplaySize(64, 64).setDepth(10001)
                        .setData("slot", this.InventoryIndex);
                    this.Item.setVisible(false);
                    this.scene.Game.HeldObject = { Type: "Item", ID: this.DataInventorySlot.ID, Sprite: ghost };
                    this.scene.input.topOnly = false;
                    this.scene.sound.play("InventoryPickup");
                } else if (pointer.rightButtonDown() && !held.Type && this.DataInventorySlot) {
                    this.scene.Game.UseItem(this.DataInventorySlot.ID);
                } else if (pointer.rightButtonDown() && held.Type === "Item") {
                    this.scene.sound.play("InventoryPutdown");
                    held.Sprite.destroy();
                    this.scene.Game.HeldObject = { Type: null, ID: null, Sprite: null };
                    Inv.HoveredOnSlot = null;
                    this.scene.input.topOnly = true;
                    Inv.Items.forEach(item => item.Refresh());
                }
            });

        this.scene.add.existing(this);

        const center = this.getCenter();

        this.Item = this.scene.add.sprite(center.x, center.y, null, null)
            .setOrigin(0.5, 0.5)
            .setDisplaySize(64, 64)
            .setDepth(10000) as Phaser.GameObjects.Sprite;

        this.updateItemTexture();

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

    private updateItemTexture(): void {
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
