import Game from "../scenes/Game";
import UI from "../scenes/UI";
import ItemSlot from "../game_objects/UI_ItemSlot";
import { GD } from "../scenes/Game";

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

        // Add 4 rectangles per row to represent inventory slots
        Object.entries(GD.Inventory).forEach( (item, index) => {

            let X = 0;
            let Y = 0;
            let Label = null;

            if ( item[0].includes("Equipment") ) {
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

            let Slot = new ItemSlot(this.Game, this.UI, X, Y, item[0], Label);
            this.Items.push(Slot);

            if ( item[0].includes("Equipment") ) {
                EquipmentX += 96;
                if ( EquipmentCount % 3 == 0 ) {
                    EquipmentX = this.EquipmentBackground.getTopLeft().x + 10;
                    EquipmentY += 96;
                }
                EquipmentCount++;
            } else {
                if ( Slot.DataInventorySlot != null ) this.UsedSlots++;
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
        this.CloseButton = this.UI.add.image(this.EquipmentBackground.getTopRight().x, this.EquipmentBackground.getTopRight().y, "panel-small")
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

    FindNextEmptySlot() {
        return this.Items.find((slot) => slot.DataInventorySlot == null);
    }

    AddItem ( ID: string, quantity: number, playSound: boolean = true ) {

        const BaseItemData = this.Game.DataManager.ItemData[ID];

        if ( BaseItemData == undefined )
            return console.log(`Item does not exist! ID: ${ID}`);

        for ( let i = 0; i < quantity; i++ ) {
            if ( BaseItemData.Stackable ) {
                // If the item is stackable, try to find an existing stack
                let Slot = this.Items.find((slot) => slot.DataInventorySlot !== null && slot.DataInventorySlot.ID === ID && slot.DataInventorySlot.Quantity < BaseItemData.StackSize);
                if ( Slot !== undefined ) {
                    Slot.DataInventorySlot.Quantity++;
                    Slot.Refresh();
                } else {
                    let EmptySlot = this.Items.find((slot) => slot.DataInventorySlot == null);
                    if ( EmptySlot !== undefined ) {
                        GD.Inventory[EmptySlot.InventoryIndex] = { ...BaseItemData.InitialValue };
                        EmptySlot.Refresh();
                    } else {
                        this.UI.EventLog.NewEvent(`Inventory is full!`);
                    }
                }
            } else {
                let EmptySlot = this.Items.find((slot) => slot.DataInventorySlot == null);
                if ( EmptySlot !== undefined ) {
                    GD.Inventory[EmptySlot.InventoryIndex] = { ...BaseItemData.InitialValue };
                    EmptySlot.Refresh();
                } else {
                    this.UI.EventLog.NewEvent(`Inventory is full!`);
                }
            }
        }

        if ( Object.keys(BaseItemData).includes("Sound") && playSound == true )
            this.Game.sound.play(BaseItemData.Sound);

        this.InventoryHeader.setText(`Inventory (${this.Items.length}/${this.InventorySlots})`);
    }

    public RemoveItem (ID: string, quantity: number) {
        /*for ( let i = 0; i < quantity; i++ ) {
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
        }*/
    }

    Show () {
        this.InventoryBackground.setVisible(true);
        this.EquipmentBackground.setVisible(true);
        this.Items.forEach( (slot) => slot.Show());
        this.InventoryHeader.setVisible(true);
        this.EquipmentHeader.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);

    }

    Hide () {
        this.InventoryBackground.setVisible(false);
        this.EquipmentBackground.setVisible(false);
        this.Items.forEach( (slot) => slot.Hide());
        this.InventoryHeader.setVisible(false);
        this.EquipmentHeader.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.UI.ActivePanel = null;
    }

}