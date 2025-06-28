import Game from "../scenes/Game";
import UI from "../scenes/UI";
import { GD } from "../scenes/Game";
import ItemSlot from "./UI_ItemSlot";

export default class Inventory {

    public Game: Game;
    public UI: UI;

    public CloseButton: Phaser.GameObjects.Image;
    public CloseButtonText: Phaser.GameObjects.Text;

    public Items: ItemSlot[] = [];

    public InventoryBackground: Phaser.GameObjects.NineSlice;
    public InventoryHeader: Phaser.GameObjects.Text;
    
    public UsedSlots: number = 0;
    public InventorySlots: number = 20;

    public EquipmentBackground: Phaser.GameObjects.NineSlice;
    public EquipmentHeader: Phaser.GameObjects.Text;

    public QuickAccessBackground: Phaser.GameObjects.NineSlice;
    public QuickAccessHeader: Phaser.GameObjects.Text;

    public HeldItem: Phaser.GameObjects.Sprite | null = null;
    public HoveredOnSlot: any;

    constructor ( game: Game, UI: UI ) {

        this.UI = UI;
        this.Game = game;

        let HeaderStyle = { fontFamily: "Augusta", fontSize: 28 };

        // Inventory Section //
        this.InventoryBackground = this.UI.add.nineslice ( 65, 175, "Kenney-UI", "panel_blue", 330, 420, 16, 16, 16, 16)
        .setOrigin(0, 0)
        .setVisible(false);

        this.InventoryHeader = this.UI.add.text( this.InventoryBackground.getTopLeft().x + 10, this.InventoryBackground.getTopLeft().y + 20, `Inventory`, HeaderStyle)
        .setOrigin(0, 0.5)
        .setVisible(false);

        let InventoryCount = 1;
        let InventoryX = this.InventoryBackground.getTopLeft().x + 5;
        let InventoryY = this.InventoryBackground.getTopLeft().y + 36;

        // Equipment Section //
        this.EquipmentBackground = this.UI.add.nineslice ( this.InventoryBackground.getTopRight().x + 5, this.InventoryBackground.getTopRight().y, "Kenney-UI", "panel_blue", 280, 420, 16, 16, 16, 16)
        .setOrigin(0, 0)
        .setVisible(false);

        this.EquipmentHeader = this.UI.add.text( this.EquipmentBackground.getTopLeft().x + 10, this.EquipmentBackground.getTopLeft().y + 20, `Equipment`, HeaderStyle)
        .setOrigin(0, 0.5)
        .setVisible(false);

        let EquipmentCount = 1;
        let EquipmentX = this.EquipmentBackground.getTopLeft().x + 10;
        let EquipmentY = this.EquipmentBackground.getTopLeft().y + 36;

        // Quick Access Section //
        this.QuickAccessBackground = this.UI.add.nineslice ( this.EquipmentBackground.getTopRight().x + 5, this.EquipmentBackground.getTopRight().y, "Kenney-UI", "panel_blue", 280, 420, 16, 16, 16, 16)
        .setOrigin(0, 0)
        .setVisible(false);

        this.QuickAccessHeader = this.UI.add.text( this.QuickAccessBackground.getTopLeft().x + 10, this.QuickAccessBackground.getTopLeft().y + 20, `Quick Access`, HeaderStyle)
        .setOrigin(0, 0.5)
        .setVisible(false);

        let QuickAccessCount = 1;
        let QuickAccessX = this.QuickAccessBackground.getTopLeft().x + 10;
        let QuickAccessY = this.QuickAccessBackground.getTopLeft().y + 36;

        // Add 4 rectangles per row to represent inventory slots
        Object.entries(GD.Inventory).forEach( (item, index) => {

            let X = 0;
            let Y = 0;
            let Label = null;

            if ( item[0].includes("Quickslot") ) {
                X = QuickAccessX;
                Y = QuickAccessY;
                Label = item[0].replace("_", " ");
            } else if ( item[0].includes("Equipment") ) {
                X = EquipmentX;
                Y = EquipmentY;
                Label = item[0].replace("Equipment_", "");
                if ( Label == "MainHand" ) Label = "Main Hand";
                if ( Label == "OffHand" ) Label = "Off Hand";
                if ( Label == "Ring_1" ) Label = "Left Ring";
                if ( Label == "Ring_2" ) Label = "Right Ring";
            } else {
                X = InventoryX;
                Y = InventoryY;
            }

            let Slot = new ItemSlot(this.UI, X, Y, item[0], Label);
            this.Items.push(Slot);

            if ( item[0].includes("Quickslot") ) {
                QuickAccessX += 96;
                if ( QuickAccessCount % 3 == 0 ) {
                    QuickAccessX = this.QuickAccessBackground.getTopLeft().x + 10;
                    QuickAccessY += 96;
                }
                QuickAccessCount++;
            } else if ( item[0].includes("Equipment") ) {
                EquipmentX += 96;
                if ( EquipmentCount % 3 == 0 ) {
                    EquipmentX = this.EquipmentBackground.getTopLeft().x + 10;
                    EquipmentY += 96;
                }
                EquipmentCount++;
            } else {
                if ( Slot.ItemData != null ) this.UsedSlots++;
                InventoryX += 64;
                // Every 4 rows, move down 64 pixels and reset X
                if ( InventoryCount % 5 == 0 ) {
                    InventoryX = this.InventoryBackground.getTopLeft().x + 5;
                    InventoryY += 64;
                }
                InventoryCount++;
            }

        });

        this.InventoryHeader.setText(`Inventory (${this.UsedSlots}/${this.InventorySlots})`);

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

        //console.log(this.Items)

    }

    AddItem ( ID: string, quantity: number, playSound: boolean = true ) {

        const ItemData = this.Game.DataManager.ItemData[ID];
        if ( ItemData == undefined )
            return console.log(`Item does not exist! ID: ${ID}`);

        //if ( ItemData.Category != "Currency" && this.CurrentResourceCount + quantity > this.MaxResources )
            //return this.UI.EventLog.NewEvent("Not enough space in inventory");

        for ( let i = 0; i < quantity; i++ ) {

            if ( ItemData.Stackable == false ) {
                let Slot = this.Items.find((slot) => slot.ItemData == null);
                if ( Slot !== undefined ) {
                    //Slot.UpdateItem(ID, 1);
                }
                continue;
            }
            
            if ( ItemData.Stackable == true ) {

                let Exists = this.Items.find((res) => res.ItemData.ID == ID);

                if ( Exists == undefined ) {

                    // Item does not exist, creating new object
                    let Slot = this.Items.find((slot) => slot.ItemData == null);
                    if ( Slot !== undefined ) {
                        //Slot.UpdateItem(ID, 1);
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
                            //Slot.UpdateItem(ID, 1);
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