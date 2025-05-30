import Game from "../../scenes/Game";
import UI from "../../scenes/UI";
import { GD } from "../../scenes/Game";
import ItemSlot from "../../game_objects/UI_ItemSlot";

export default class Inventory {

    public Game: Game;
    public UI: UI;

    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;

    public Items: ItemSlot[] = [];

    public InventoryBackground: Phaser.GameObjects.Rectangle;
    public InventoryHeader: Phaser.GameObjects.Text;
    
    public UsedSlots: number = 0;
    public InventorySlots: number = 20;

    public EquipmentBackground: Phaser.GameObjects.Rectangle;
    public EquipmentHeader: Phaser.GameObjects.Text;

    public QuickAccessBackground: Phaser.GameObjects.Rectangle;
    public QuickAccessHeader: Phaser.GameObjects.Text;

    public HeldItem: Phaser.GameObjects.Sprite | null = null;

    constructor ( game: Game, UI: UI ) {

        this.UI = UI;
        this.Game = game;

        // Inventory Section //
        this.InventoryBackground = this.UI.add.rectangle ( 15, 200, 320, 420, 0x000000, 1)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        this.InventoryHeader = this.UI.add.text( this.InventoryBackground.getTopLeft().x + 5, this.InventoryBackground.getTopLeft().y + 12, `Inventory`, { 
            fontFamily: "Augusta",
            fontSize: 24 
        })
        .setOrigin(0, 0.5)
        .setVisible(false);

        let X = this.InventoryBackground.getTopLeft().x;
        let Y = this.InventoryBackground.getTopLeft().y + 64;

        // Add 4 rectangles per row to represent inventory slots
        Object.entries(GD.Inventory).forEach( (item, index) => {
            console.log(item, index);
        });
        
        for ( let i = 1; i < this.InventorySlots + 1; i++ ) {
            let Slot = new ItemSlot(this.UI, X, Y, i);
            this.Items.push(Slot);
            X += 64;
            // Every 4 rows, move down 64 pixels and reset X
            if ( i % 5 == 0 ) {
                X = this.InventoryBackground.getTopLeft().x;
                Y += 64;
            }
            if ( Slot.ItemData != null ) {
                this.UsedSlots++;
            }
        }

        this.InventoryHeader.setText(`Inventory (${this.UsedSlots}/${this.InventorySlots})`);

        // Equipment Section //
        this.EquipmentBackground = this.UI.add.rectangle ( this.InventoryBackground.getTopRight().x + 5, this.InventoryBackground.getTopRight().y, 300, 420, 0x000000, 1)
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

        /*let I = 1;
        Object.keys(GD.Equipment).forEach( (slot) => {
            let Slot = new ItemSlot(this.UI, X, Y, slot, slot.replace("_", " "));
            this.Items.push(Slot);
            X += 96;
            if ( I % 3 == 0 ) {
                X = this.EquipmentBackground.getTopLeft().x + 10;
                Y += 96;
            }
            I++;
        });*/

        // Quick Access Section //
        this.QuickAccessBackground = this.UI.add.rectangle ( this.EquipmentBackground.getTopRight().x + 5, this.EquipmentBackground.getTopRight().y, 300, 420, 0x000000, 1)
        .setOrigin(0, 0)
        .setStrokeStyle(1, 0xffffff, 1)
        .setVisible(false);

        this.QuickAccessHeader = this.UI.add.text( this.QuickAccessBackground.getTopLeft().x + 5, this.QuickAccessBackground.getTopLeft().y + 12, `Quick Access`, { 
            fontFamily: "Augusta",
            fontSize: 24 
        })
        .setOrigin(0, 0.5)
        .setVisible(false);

        /*X = this.QuickAccessBackground.getTopLeft().x + 10;
        Y = this.QuickAccessBackground.getTopLeft().y + 32;
        I = 1;
        Object.keys(GD.QuickSlots).forEach( (slot) => {
            let Slot = new ItemSlot(this.UI, X, Y, slot, `Slot ${slot}`);
            this.Items.push(Slot);
            X += 96;
            if ( I % 3 == 0 ) {
                X = this.QuickAccessBackground.getTopLeft().x + 10;
                Y += 96;
            }
            I++;
        });*/

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

        this.CloseButtonText = this.UI.add.text(this.CloseButton.getCenter().x, this.CloseButton.getCenter().y, "X", { 
            fontFamily: "Augusta",
            fontSize: 16
        })
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setDepth(11);

    }

    EquipItem ( slot: string, itemID: string ) {
        const ItemData = this.Game.DataManager.ItemData.find((item) => item.ID == itemID);
        if ( ItemData == undefined )
            return console.log(`Item does not exist! ID: ${itemID}`);
        //if ( !Object.keys(GD.Equipment).includes(slot) )
            //return console.log(`Invalid equipment slot: ${slot}`);
        /*if ( GD.Equipment[slot] != null ) {
            // Remove the currently equipped item from the slot
            const CurrentItem = this.Items.find((item) => item.getData('ItemID') == GD.Equipment[slot]);
            if ( CurrentItem ) {
                CurrentItem.setData('ItemID', null);
                CurrentItem.setData('ItemQuantity', 0);
                CurrentItem.QuantityText.setText(`x0`);
                CurrentItem.Hide();
            }
        }*/
        // Equip the new item
        /*const NewItem = this.Items.find((item) => item.getData('ItemID') == itemID);
        if ( NewItem ) {
            NewItem.setData('ItemID', itemID);
            NewItem.setData('ItemQuantity', 1);
            NewItem.QuantityText.setText(`x1`);
            NewItem.Show();
            GD.Equipment[slot] = itemID; // Update the equipment slot in the game data
        }*/
        console.log(`Equipped item ${itemID} to slot ${slot}`);
        this.UI.EventLog.NewEvent(`Equipped ${ItemData.Name} to ${slot}`);
    }

    AddItem ( ID: string, quantity: number, playSound: boolean = true ) {

        const ItemData = this.Game.DataManager.ItemData.find((item) => item.ID == ID);
        if ( ItemData == undefined )
            return console.log(`Item does not exist! ID: ${ID}`);

        //if ( ItemData.Category != "Currency" && this.CurrentResourceCount + quantity > this.MaxResources )
            //return this.UI.EventLog.NewEvent("Not enough space in inventory");

        for ( let i = 0; i < quantity; i++ ) {

            if ( ItemData.Stackable == false ) {
                let Slot = this.Items.find((slot) => slot.ItemData == null);
                if ( Slot !== undefined ) {
                    Slot.UpdateItem(ID, 1);
                }
                continue;
            }
            
            if ( ItemData.Stackable == true ) {

                let Exists = this.Items.find((res) => res.ItemData.ID == ID);

                if ( Exists == undefined ) {

                    // Item does not exist, creating new object
                    let Slot = this.Items.find((slot) => slot.ItemData == null);
                    if ( Slot !== undefined ) {
                        Slot.UpdateItem(ID, 1);
                    }

                } else {

                    if ( Exists.ItemData.Quantity < ItemData.StackSize || ItemData.StackSize == 0 ) {
                        // Item exists, adding to stack
                        const NewQuantity = Exists.ItemData.Quantity + 1;
                        Exists.ItemData.Quantity = NewQuantity;
                        Exists.QuantityText.setText(`x${NewQuantity.toString()}`);
                    } else {
                        let Exists = this.Items.find((res) => res.ItemData.ID == ID && res.ItemData.Quantity + 1 < ItemData.StackSize);
                        if ( Exists == undefined ) {
                            // Item exists, but stack is full, creating new object
                            let Slot = this.Items.find((slot) => slot.ItemData.ID == null);
                            Slot.UpdateItem(ID, 1);
                        } else {
                            // Item exists, and stack is not full
                            const NewQuantity = Exists.ItemData.Quantity + 1;
                            Exists.ItemData.Quantity = NewQuantity;
                            Exists.QuantityText.setText(`x${NewQuantity.toString()}`);
                        }
                    }

                }

            }

        }

        if ( Object.keys(ItemData).includes("Sound") && playSound == true )
            this.Game.sound.play(ItemData.Sound);

        //this.Header.setText(`Inventory (${this.Items.length}/${this.MaxResources})`);
    }

    SwapItems ( slot1: string | number, slot2: string | number ) {

        console.log(`Swapping items between ${slot1} and ${slot2}`);

        const Item1 = this.Items.find((item) => item.InventoryIndex == slot1);
        const Item2 = this.Items.find((item) => item.InventoryIndex == slot2);

        const TempItemData = Item1.ItemData;

        if ( Item2.SlotType == "equipment" && Item1.SlotType == "equipment" ) {
            //GD.Equipment[slot1] = Item2.ItemData;
            //GD.Equipment[slot2] = TempItemData;
        } else if ( Item2.SlotType == "inventory" && Item1.SlotType == "inventory" ) {
           // GD.Inventory[slot1] = Item2.ItemData;
            //GD.Inventory[slot2] = TempItemData;
        } else if ( Item2.SlotType == "inventory" && Item1.SlotType == "equipment" ) {
            //GD.Inventory[slot2] = Item1.ItemData;
            //GD.Equipment[slot1] = TempItemData;
        } else if ( Item2.SlotType == "equipment" && Item1.SlotType == "inventory" ) {
            //GD.Inventory[slot1] = Item2.ItemData;
            //GD.Equipment[slot2] = TempItemData;
        }

        Item1.Refresh();
        Item2.Refresh();
    }

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