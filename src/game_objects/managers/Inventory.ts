import Game from "../../scenes/Game";
import UI from "../../scenes/UI";
import { GD } from "../../scenes/Game";

class ItemSlot extends Phaser.GameObjects.NineSlice {

    public hasItem: boolean = false;
    public Item: Phaser.GameObjects.Sprite;
    public Quantity: number = 0;

    public Label: Phaser.GameObjects.Text | null;
    public QuantityText: Phaser.GameObjects.Text;

    constructor ( scene: UI, x: number, y: number, label?: string ) {

        super(scene, x, y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6);

        // The slot itself
        this.setVisible(false);
        this.setDisplaySize(64, 64);
        this.setOrigin(0, 0);
        this.setInteractive({ dropZone: true });
        this.scene.add.existing(this);

        // Item sprite
        this.Item = this.scene.add.sprite(this.getCenter().x, this.getCenter().y, "Kenney-UI", "buttonSquare_blue_pressed");
        this.Item.setOrigin(0.5, 0.5);
        this.Item.setVisible(false);
        this.Item.setDisplaySize(32, 32);
        this.Item.setInteractive({ draggable: true });

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
        this.scene.add.existing(this.QuantityText);

        this.scene.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite) => {
            if ( gameObject !== this.Item || !this.hasItem ) return;
            //this.quantity.setVisible(false);
            //this.scene.Tooltip.Hide();
        });

        this.scene.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
            if ( gameObject !== this.Item || !this.hasItem ) return;
            this.Item.x = dragX;
            this.Item.y = dragY;
        });

        this.scene.input.on('dragenter', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, slot: ItemSlot) => {
            if ( slot !== this || !slot.hasItem ) return;
            this.setTint(0x00ff00);
        });
    
        this.scene.input.on('dragleave', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image, slot: ItemSlot) => {
            slot.clearTint();
        });

        this.scene.input.on('drop', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, slot: ItemSlot) => {
            if ( gameObject !== this.Item || !this.hasItem ) return;
            this.clearTint();
            this.Item.x = slot.getCenter().x;
            this.Item.y = slot.getCenter().y;
        });

        this.scene.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Sprite, dropped: boolean) => {
            if ( gameObject !== this.Item ) return;
            if ( !dropped ) {
                this.Item.x = this.getCenter().x;
                this.Item.y = this.getCenter().y;
            }
        });

    }

    public UpdateItem (id: string, quantity: number) {
        console.log(id);
        console.log(quantity);
    }

    public Show () {
        this.setVisible(true);
        if ( this.hasItem ) this.Item.setVisible(true);
        if ( this.Quantity > 0 ) this.QuantityText.setVisible(true);
        if ( this.Label ) this.Label.setVisible(true);
    }

    public Hide () {
        this.setVisible(false);
        if ( this.hasItem ) this.Item.setVisible(false);
        if ( this.Quantity > 0 ) this.QuantityText.setVisible(false);
        if ( this.Label ) this.Label.setVisible(false);
    }

}

export default class Inventory {

    public Game: Game;
    public UI: UI;

    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;

    public Items: ItemSlot[] = [];

    public InventoryBackground: Phaser.GameObjects.Rectangle;
    public InventoryHeader: Phaser.GameObjects.Text;
    public CurrentResourceCount: number = 0;
    public MaxResources: number = 20;
    

    public EquipmentBackground: Phaser.GameObjects.Rectangle;
    public EquipmentHeader: Phaser.GameObjects.Text;

    public QuickAccessBackground: Phaser.GameObjects.Rectangle;
    public QuickAccessHeader: Phaser.GameObjects.Text;

    constructor ( game: Game, UI: UI ) {

        this.UI = UI;
        this.Game = game;

        // Inventory Section //
        this.InventoryBackground = this.UI.add.rectangle ( game.cameras.main.width * 0.15, game.cameras.main.height / 2, 300, 400, 0x000000, 1)
        .setOrigin(0.5, 0.5)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        this.InventoryHeader = this.UI.add.text( this.InventoryBackground.getTopLeft().x + 5, this.InventoryBackground.getTopLeft().y + 12, `Inventory (${this.CurrentResourceCount}/${this.MaxResources})`, { 
            fontFamily: "Augusta",
            fontSize: 24 
        })
        .setOrigin(0, 0.5)
        .setVisible(false);

        let X = this.InventoryBackground.getTopLeft().x;
        let Y = this.InventoryBackground.getTopLeft().y + 64;

        // Add 4 rectangles per row to represent inventory slots
        for ( let i = 1; i < this.MaxResources + 1; i++ ) {
            let Slot = new ItemSlot(this.UI, X, Y);
            this.Items.push(Slot);
            X += 64;
            // Every 4 rows, move down 64 pixels and reset X
            if ( i % 4 == 0 ) {
                X = this.InventoryBackground.getTopLeft().x;
                Y += 64;
            }
        }

        // Equipment Section //
        this.EquipmentBackground = this.UI.add.rectangle ( this.InventoryBackground.getTopRight().x + 5, this.InventoryBackground.getTopRight().y, 300, 400, 0x000000, 1)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        this.EquipmentHeader = this.UI.add.text( this.EquipmentBackground.getTopLeft().x + 5, this.EquipmentBackground.getTopLeft().y + 12, `Equipment`, { 
            fontFamily: "Augusta",
            fontSize: 24 
        })
        .setOrigin(0, 0.5)
        .setVisible(false);

        X = this.EquipmentBackground.getTopLeft().x + 10;
        Y = this.EquipmentBackground.getTopLeft().y + 32;

        let I = 1;
        Object.keys(GD.Equipment).forEach( (slot) => {
            let Slot = new ItemSlot(this.UI, X, Y, slot);
            this.Items.push(Slot);
            X += 96;
            if ( I % 2 == 0 ) {
                X = this.EquipmentBackground.getTopLeft().x + 10;
                Y += 96;
            }
            I++;
        });

        // Quick Access Section //
        this.QuickAccessBackground = this.UI.add.rectangle ( this.EquipmentBackground.getTopRight().x + 5, this.EquipmentBackground.getTopRight().y, 300, 400, 0x000000, 1)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        this.QuickAccessHeader = this.UI.add.text( this.QuickAccessBackground.getTopLeft().x + 5, this.QuickAccessBackground.getTopLeft().y + 12, `Quick Access`, { 
            fontFamily: "Augusta",
            fontSize: 24 
        })
        .setOrigin(0, 0.5)
        .setVisible(false);

        // Close Button //
        this.CloseButton = this.UI.add.image(this.QuickAccessBackground.getTopRight().x, this.QuickAccessBackground.getTopRight().y, "panel-small")
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
        //GD.Inventory.forEach( (item: { ID: string, Quantity: number }) => {
            //this.AddItem(item.ID, item.Quantity, false);
        //});

    }

    /*AddItem ( ID: string, quantity: number, playSound: boolean = true ) {

        const ItemData = this.Game.DataManager.ItemData.find((item) => item.ID == ID);

        if ( ItemData == undefined )
            return console.log(`Item does not exist! ID: ${ID}`);

        //if ( ItemData.Category != "Currency" && this.CurrentResourceCount + quantity > this.MaxResources )
            //return this.UI.EventLog.NewEvent("Not enough space in inventory");

        for ( let i = 0; i < quantity; i++ ) {
            // If the item is not stackable, create a new object to display it
            if ( ItemData.Stackable == false ) {
                // Item not stackable, creating new object
                let Slot = this.Items.find((slot) => slot.getData("Item") == null);
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
    }*/

    /*public RemoveItem (ID: string, quantity: number) {
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
    }*/

    Show () {
        this.InventoryBackground.setVisible(true);
        this.EquipmentBackground.setVisible(true);
        this.QuickAccessBackground.setVisible(true);
        this.Items.forEach( (slot) => slot.Show());
        this.InventoryHeader.setVisible(true);
        this.EquipmentHeader.setVisible(true);
        this.QuickAccessHeader.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);

    }

    Hide () {
        this.InventoryBackground.setVisible(false);
        this.EquipmentBackground.setVisible(false);
        this.QuickAccessBackground.setVisible(false);
        this.Items.forEach( (slot) => slot.Hide());
        this.InventoryHeader.setVisible(false);
        this.EquipmentHeader.setVisible(false);
        this.QuickAccessHeader.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.UI.ActivePanel = null;
    }

}