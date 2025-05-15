import Game from "../../scenes/Game";
import UI from "../../scenes/UI";
import { GD } from "../../scenes/Game";
import DisplayItemObject from "../DisplayItemObject";

export default class Inventory {

    public Game: Game;
    public UI: UI;

    public Header: Phaser.GameObjects.Text;
    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;

    public CurrentResourceCount: number = 0;
    public MaxResources: number = 20;

    public Items: DisplayItemObject[] = [];
    public ItemSlots: Phaser.GameObjects.NineSlice[] = [];
    public EquipmentSlots: Phaser.GameObjects.Image[] = [];
    public EquipmentSlotsLabels: Phaser.GameObjects.Text[] = [];

    public InventoryBackground: Phaser.GameObjects.Rectangle;
    public EquipmentBackground: Phaser.GameObjects.Rectangle;

    constructor ( game: Game, UI: UI ) {

        this.UI = UI;
        this.Game = game;

        this.InventoryBackground = this.UI.add.rectangle ( game.cameras.main.width * 0.40, game.cameras.main.height / 2, 256, 400, 0x000000, 1)
        .setOrigin(0.5, 0.5)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        let X = this.InventoryBackground.getTopLeft().x;
        let Y = this.InventoryBackground.getTopLeft().y + 64;

        for ( let i = 1; i < this.MaxResources + 1; i++ ) {
            // Add 4 rectangles per row to represent inventory slots
            let ItemSlot = this.UI.add.nineslice(X, Y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6)
            .setDisplaySize(64, 64)
            .setOrigin(0, 0)
            .setVisible(false)
            .setData("Index", i)
            .setData("Item", null)
            .setInteractive();
            ItemSlot.input.dropZone = true;
            this.ItemSlots.push(ItemSlot)
            X += 64;

            // Every 4 rows, move down 64 pixels and reset X
            if ( i % 4 == 0 ) {
                X = this.InventoryBackground.getTopLeft().x;
                Y += 64;
            }

        }

        this.EquipmentBackground = this.UI.add.rectangle ( this.InventoryBackground.getTopRight().x + 5, this.InventoryBackground.getTopRight().y, 256, 400, 0x000000, 1)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        X = this.EquipmentBackground.getTopLeft().x + 5;
        Y = this.EquipmentBackground.getTopLeft().y + 5;

        Object.keys(GD.Equipment).forEach( (slot) => {

            let Slot = this.UI.add.image(X, Y, "panel-small")
            .setDisplaySize(64, 64)
            .setOrigin(0, 0)
            .setData("Index", slot)
            .setData("Item", null)
            .setVisible(false)
            .setInteractive();
            Slot.input.dropZone = true;

            let SlotText = this.UI.add.text(Slot.getCenter().x + 20, Slot.getCenter().y, slot, {
                fontFamily: "Augusta",
                fontSize: 16
            })
            .setOrigin(0, 0.5)
            .setVisible(false);

            this.EquipmentSlotsLabels.push(SlotText);
            this.EquipmentSlots.push(Slot);
            X = Slot.getBottomLeft().x;
            Y = Slot.getBottomLeft().y + 5;

        });

        // Header
        this.Header = this.UI.add.text( this.InventoryBackground.getTopLeft().x + 5, this.InventoryBackground.getTopLeft().y + 12, `Inventory (${this.Items.length}/${this.MaxResources})`, { 
            fontFamily: "Augusta",
            fontSize: 24 
        })
        .setOrigin(0, 0.5)
        .setVisible(false);

        this.CloseButton = this.UI.add.image(this.EquipmentBackground.getTopRight().x, this.EquipmentBackground.getTopRight().y, "panel-small")
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

        // Restore inventory from save data
        GD.Inventory.forEach( (item: { ID: string, Quantity: number }) => {
            this.AddItem(item.ID, item.Quantity, false);
        });

    }

    AddItem ( ID: string, quantity: number, playSound: boolean = true ) {

        const ItemData = this.Game.DataManager.ItemData.find((item) => item.ID == ID);

        if ( ItemData == undefined )
            return console.log(`Item does not exist! ID: ${ID}`);

        //if ( ItemData.Category != "Currency" && this.CurrentResourceCount + quantity > this.MaxResources )
            //return this.UI.EventLog.NewEvent("Not enough space in inventory");

        for ( let i = 0; i < quantity; i++ ) {
            // If the item is not stackable, create a new object to display it
            if ( ItemData.Stackable == false ) {
                // Item not stackable, creating new object
                let Slot = this.ItemSlots.find((slot) => slot.getData("Item") == null);
                let SlotItem = this.CreateNewInventoryObject(Slot, ItemData, 1);
                this.Items.push(SlotItem);
            } else if ( ItemData.Stackable == true ) {
                let Exists = this.Items.find((res) => res.getData('ItemID') == ID);
                if ( Exists == undefined ) {
                    // Item does not exist, creating new object
                    let Slot = this.ItemSlots.find((slot) => slot.getData("Item") == null);
                    let SlotItem = this.CreateNewInventoryObject(Slot, ItemData, 1);
                    this.Items.push(SlotItem);
                } else {
                    if ( Exists.getData('ItemQuantity') < ItemData.StackSize || ItemData.StackSize == 0 ) {
                        // Item exists, adding to stack
                        const NewQuantity = Exists.getData('ItemQuantity') + 1;
                        Exists.setData('ItemQuantity', NewQuantity);
                        Exists.quantity.setText(`x${NewQuantity.toString()}`);
                    } else {
                        let Exists = this.Items.find((res) => res.getData('ItemID') == ID && res.getData('ItemQuantity') + 1 < ItemData.StackSize);
                        if ( Exists == undefined ) {
                            // Item exists, but stack is full, creating new object
                            let Slot = this.ItemSlots.find((slot) => slot.getData("Item") == null);
                            let SlotItem = this.CreateNewInventoryObject(Slot, ItemData, 1);
                            this.Items.push(SlotItem);
                        } else {
                            // Item exists, and stack is not full
                            const NewQuantity = Exists.getData('ItemQuantity') + 1;
                            Exists.setData('ItemQuantity', NewQuantity);
                            Exists.quantity.setText(`x${NewQuantity.toString()}`);
                        }
                    }
                }
            }
        }

        if ( Object.keys(ItemData).includes("Sound") && playSound == true )
            this.Game.sound.play(ItemData.Sound);

        this.Header.setText(`Inventory (${this.Items.length}/${this.MaxResources})`);
    }

    public RemoveItem (ID: string, quantity: number) {
        console.log(`Removing ${quantity} of item ID ${ID}`);
        for ( let i = 0; i < quantity; i++ ) {
            this.Items.forEach( (item) => {
                if ( item.getData('ItemID') == ID ) {
                    if ( item.getData('ItemQuantity') == 1 ) {
                        item.quantity.destroy();
                        item.destroy();
                        this.Items.splice(this.Items.indexOf(item), 1);
                        item.CurrentSlot.setData('Item', null);
                    } else {
                        const NewQuantity = item.getData('ItemQuantity') - 1;
                        item.setData('ItemQuantity', NewQuantity);
                        item.quantity.setText(`x${NewQuantity.toString()}`);
                        if ( NewQuantity == 0 ) {
                            item.quantity.destroy();
                            item.destroy();
                            this.Items.splice(this.Items.indexOf(item), 1);
                            item.CurrentSlot.setData('Item', null);
                        }
                    }
                }
            });
        }
    }

    private CreateNewInventoryObject ( Slot: Phaser.GameObjects.NineSlice, ItemData: ItemData, Quantity: number ): DisplayItemObject {

        let SlotItem = new DisplayItemObject(this.UI, Slot.getCenter().x, Slot.getCenter().y, ItemData.Sprite.split("-")[0], ItemData.Sprite.split("-")[1], ItemData.Stackable)
        .setDisplaySize(64, 64)
        .setOrigin(0.5, 0.5)
        .setVisible(this.InventoryBackground.visible);

        if ( ItemData.Stackable == true )
            SlotItem.quantity.setVisible(this.InventoryBackground.visible);
        
        // Assign the slot to the item
        SlotItem.CurrentSlot = Slot;

        // Assign the item to the slot
        Slot.setData("Item", SlotItem);

        SlotItem.setData({
            ItemID: ItemData.ID,
            ItemQuantity: Quantity
        })
        .setInteractive()
        .on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if (pointer.rightButtonDown())
                console.log("Attempt to use item ID " + SlotItem.getData("ItemID"));
        })
        .on('pointerover', ( pointer: Phaser.Input.Pointer ) => {
            this.UI.Tooltip.setPosition(pointer.x + 64, pointer.y + 5);
            this.UI.Tooltip.Show("Item", SlotItem.getData("ItemID"));
        })
        .on('pointermove', ( pointer: Phaser.Input.Pointer ) => {
            this.UI.Tooltip.Move(pointer.x + 64, pointer.y + 5);
        }).on('pointerout', () => {
            this.UI.Tooltip.Hide();
        });

        SlotItem.quantity.setText(`x${Quantity.toString()}`);

        return SlotItem;

    }

    /** When the inventory is shown, move all items into a list */
    Show () {

        this.InventoryBackground.setVisible(true);

        this.ItemSlots.forEach( (slot) => {
            slot.setVisible(true);
        });

        this.Items.forEach( (item) => {
            item.setVisible(true);
            item.quantity.setVisible(true);
        });

        this.EquipmentSlots.forEach( (slot) => {
            slot.setVisible(true);
        });

        this.EquipmentSlotsLabels.forEach( (label) => {
            label.setVisible(true);
        });

        this.EquipmentBackground.setVisible(true);

        this.Header.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);

    }

    Hide () {

        this.InventoryBackground.setVisible(false);

        this.ItemSlots.forEach( (slot) => {
            slot.setVisible(false);
        });

        this.Items.forEach( (item) => {
            item.setVisible(false);
            item.quantity.setVisible(false);
        });

        this.EquipmentSlots.forEach( (slot) => {
            slot.setVisible(false);
        });

        this.EquipmentSlotsLabels.forEach( (label) => {
            label.setVisible(false);
        });

        this.EquipmentBackground.setVisible(false);

        this.Header.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.UI.ActivePanel = null;

    }

}