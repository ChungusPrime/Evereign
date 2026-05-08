import Game, { PC } from "../scenes/Game";
import UI from "../scenes/UI";
import ItemSlot from "../game_objects/UI_ItemSlot";
import { GD } from "../scenes/Game";
import DamageTypes from "../data/DamageTypes";
import TextButton from "../game_objects/UI_TextButton";

export default class Inventory {

    public Game: Game;
    public UI: UI;
    public CloseButton: Phaser.GameObjects.NineSlice;
    public CloseButtonText: Phaser.GameObjects.Text;
    public Items: ItemSlot[] = [];
    public InventoryBackground: Phaser.GameObjects.NineSlice;
    public InventoryHeader: Phaser.GameObjects.Text;
    public UsedSlots: number = 0;
    public InventorySlots: number = 20;
    public EquipmentBackground: Phaser.GameObjects.NineSlice;
    public EquipmentHeader: TextButton;
    public ComponentHeader: TextButton;
    public HoveredOnSlot: any;
    public CharacterPanelBackground: Phaser.GameObjects.NineSlice;
    public CharacterPanelHeader: Phaser.GameObjects.Text;
    public LevelClassText: Phaser.GameObjects.Text;
    public EquipmentWindow = "Equipment";
    public StatsWindow = "Character";
    public FortitudeText: Phaser.GameObjects.Text;
    public VersatilityText: Phaser.GameObjects.Text;
    public VigorText: Phaser.GameObjects.Text;
    public ExpertiseText: Phaser.GameObjects.Text;
    public ArcanaText: Phaser.GameObjects.Text;
    public PersonalityText: Phaser.GameObjects.Text;
    public FortuneText: Phaser.GameObjects.Text;
    public GritText: Phaser.GameObjects.Text;
    public ExperienceText: Phaser.GameObjects.Text;
    public HealthText: Phaser.GameObjects.Text;
    public ManaText: Phaser.GameObjects.Text;
    public StatsTexts: Phaser.GameObjects.Group;
    public DefencesHeader: any;
    public DefencesTexts: Phaser.GameObjects.Group;
    public PierceText: any;
    public ImpactText: any;
    public SlashText: any;
    public FireText: any;
    public ColdText: any;
    public LightningText: any;
    public PoisonText: any;
    public ArcaneText: any;
    public BleedText: any;
    public RadiantText: any;
    public CorruptionText: any;
    public SonicText: any;
    public DefencesButton: any;
    public CharacterButton: any;
    public AttributesTexts: any;
    public CharacterTexts: any;
    public MovementSpeedText: any;
    public BackpackSlot: Phaser.GameObjects.NineSlice;
    public BackpackSprite: Phaser.GameObjects.Sprite;
    public BackpackLabel: any;

    constructor ( game: Game, UI: UI ) {

        this.UI = UI;
        this.Game = game;

        let HeaderStyle = { fontFamily: "Augusta", fontSize: 28 };

        // Inventory Section //
        this.InventoryBackground = this.UI.add.nineslice ( 65, 120, "Kenney-UI", "panel_blue", 330, 440, 16, 16, 16, 16)
        .setOrigin(0, 0)
        .setVisible(false);

        this.InventoryHeader = this.UI.add.text( this.InventoryBackground.getTopLeft().x + 10, this.InventoryBackground.getTopLeft().y + 20, `Inventory`, HeaderStyle)
        .setOrigin(0, 0.5)
        .setVisible(false);

        let InventoryCount = 1;
        let InventoryX = this.InventoryBackground.getTopLeft().x + 5;
        let InventoryY = this.InventoryBackground.getTopLeft().y + 36;

        Object.entries(GD.Inventory).forEach( (item, index) => {
            if ( item[0].includes("Equipment") || item[0].includes("Component") ) return;
            let Slot = new ItemSlot(this.Game, this.UI, InventoryX, InventoryY, item[0], null, "Inventory");
            this.Items.push(Slot);
            if ( Slot.DataInventorySlot != null ) this.UsedSlots++;
            InventoryX += 64;
            // Every 4 rows, move down 64 pixels and reset X
            if ( InventoryCount % 5 == 0 ) {
                InventoryX = this.InventoryBackground.getTopLeft().x + 5;
                InventoryY += 64;
            }
            InventoryCount++;
        });

        // Equipment Section //
        this.EquipmentBackground = this.UI.add.nineslice ( this.InventoryBackground.getTopRight().x + 10, this.InventoryBackground.getTopRight().y, "Kenney-UI", "panel_blue", 280, 440, 16, 16, 16, 16)
        .setOrigin(0, 0)
        .setVisible(false);

        this.EquipmentHeader = new TextButton( this.UI, this.EquipmentBackground.getTopLeft().x + 10, this.EquipmentBackground.getTopLeft().y + 20, `Equipment`, () => {
            this.EquipmentWindow = "Equipment";
            this.BackpackLabel.setVisible(true);
            this.BackpackSlot.setVisible(true);
            this.BackpackSprite.setVisible(true);
            this.Items.forEach( (slot) => {
                if ( slot.Type == "Equipment" ) slot.Show();
                if ( slot.Type == "Component" ) slot.Hide();
            });
        }, 20, '#ffffff')
        .setOrigin(0, 0.5)
        .setVisible(false)

        this.ComponentHeader = new TextButton( this.UI, this.EquipmentBackground.getTopLeft().x + 180, this.EquipmentBackground.getTopLeft().y + 20, `Components`, () => {
            this.EquipmentWindow = "Components";
            this.BackpackLabel.setVisible(false);
            this.BackpackSlot.setVisible(false);
            this.BackpackSprite.setVisible(false);
            this.Items.forEach( (slot) => {
                if ( slot.Type == "Equipment" ) slot.Hide();
                if ( slot.Type == "Component" ) slot.Show();
            });
        }, 20, '#ffffff')
        .setOrigin(0, 0.5)
        .setVisible(false)

        let EquipmentCount = 1;
        let EquipmentX = this.EquipmentBackground.getTopLeft().x + 10;
        let EquipmentY = this.EquipmentBackground.getTopLeft().y + 36;

        // Equipment Slots
        Object.entries(GD.Inventory).forEach( (item, index) => {
            if ( !item[0].includes("Equipment") ) return;
            let Label = item[0].replace("Equipment_", "");
            if ( Label == "MainHand" ) Label = "Main Hand";
            if ( Label == "OffHand" ) Label = "Off Hand";
            if ( Label == "Ring_1" ) Label = "Left Ring";
            if ( Label == "Ring_2" ) Label = "Right Ring";
            if ( Label == "Back" ) Label = "Cape";
            let Slot = new ItemSlot(this.Game, this.UI, EquipmentX, EquipmentY, item[0], Label, "Equipment");
            this.Items.push(Slot);
            EquipmentX += 96;
            if ( EquipmentCount % 3 == 0 ) {
                EquipmentX = this.EquipmentBackground.getTopLeft().x + 10;
                EquipmentY += 96;
            }
            EquipmentCount++;
        });

        this.BackpackSlot = this.UI.add.nineslice(EquipmentX, EquipmentY, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6).setVisible(false).setOrigin(0, 0);
        this.BackpackSprite = this.UI.add.sprite(this.BackpackSlot.getCenter().x, this.BackpackSlot.getCenter().y, "general", 465).setDisplaySize(48, 48).setVisible(false);
        this.BackpackLabel = this.UI.add.text(this.BackpackSlot.getBottomCenter().x, this.BackpackSlot.getBottomCenter().y + 5, `Backpack`, { fontFamily: "Augusta", fontSize: 16, align: "center", color: '#ffffff' }).setOrigin(0.5, 0).setVisible(false);

        let ComponentCount = 1;
        let ComponentX = this.EquipmentBackground.getTopLeft().x + 10;
        let ComponentY = this.EquipmentBackground.getTopLeft().y + 36;

        // Component Slots
        Object.entries(GD.Inventory).forEach( (item, index) => {
            if ( !item[0].includes("Component") ) return;
            let Label = item[0];
            let Slot = new ItemSlot(this.Game, this.UI, ComponentX, ComponentY, item[0], Label, "Component");
            this.Items.push(Slot);
            ComponentX += 96;
            if ( ComponentCount % 3 == 0 ) {
                ComponentX = this.EquipmentBackground.getTopLeft().x + 10;
                ComponentY += 96;
            }
            ComponentCount++;
        });

        this.InventoryHeader.setText(`Inventory (${this.UsedSlots}/${this.InventorySlots})`);

        // Character Stats //
        this.CharacterPanelBackground = this.UI.add.nineslice ( this.EquipmentBackground.getTopRight().x + 5, this.EquipmentBackground.getTopRight().y, "Kenney-UI", "panel_blue", 280, 440, 16, 16, 16, 16).setOrigin(0, 0).setVisible(false);
        this.CharacterPanelHeader = this.UI.add.text( this.CharacterPanelBackground.getTopLeft().x + 10, this.CharacterPanelBackground.getTopLeft().y + 20, `${GD.Name}`, HeaderStyle).setOrigin(0, 0.5).setVisible(false);

        let CPB = this.CharacterPanelBackground.getTopLeft();

        this.CharacterButton = new TextButton(this.UI, CPB.x + 10, CPB.y + 20, `Character`, () =>{
            this.CharacterTexts.setVisible(true);
            this.DefencesTexts.setVisible(false);
            this.StatsWindow = "Character";
        }, 20, '#ffffff').setOrigin(0, 0.5).setVisible(false);

        this.DefencesButton = new TextButton(this.UI, CPB.x + 180, CPB.y + 20, `Defences`, () =>{
            this.CharacterTexts.setVisible(false);
            this.DefencesTexts.setVisible(true);
            this.StatsWindow = "Defences";
        }, 20, '#ffffff').setOrigin(0, 0.5).setVisible(false);

        // General Character Information
        let TopLeft = this.CharacterPanelBackground.getTopLeft();
        this.LevelClassText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 50, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.ExperienceText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 80, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.HealthText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 110, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.ManaText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 140, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.MovementSpeedText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 170, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.FortitudeText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 200, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.VersatilityText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 200, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.VigorText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 230, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.ExpertiseText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 230, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.ArcanaText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 260, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.PersonalityText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 260, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.FortuneText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 290, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.GritText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 290, ``, { fontFamily: "Augusta", fontSize: 20 }).setOrigin(0, 0.5).setVisible(false);
        this.CharacterTexts = this.UI.add.group().setVisible(false).addMultiple([
            this.LevelClassText,
            this.ExperienceText,
            this.HealthText,
            this.ManaText,
            this.MovementSpeedText,
            this.FortitudeText,
            this.VersatilityText,
            this.VigorText,
            this.ExpertiseText,
            this.ArcanaText,
            this.PersonalityText,
            this.FortuneText,
            this.GritText
        ]);

        // Defences Menu
        this.DefencesHeader = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 330, `Defences`, { fontFamily: "Augusta", fontSize: 22 }).setOrigin(0, 0.5).setVisible(false);
        this.PierceText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 50, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Pierce'] }).setOrigin(0, 0.5).setVisible(false);
        this.ImpactText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 50, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Impact'] }).setOrigin(0, 0.5).setVisible(false);
        this.SlashText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 100, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Slash'] }).setOrigin(0, 0.5).setVisible(false);
        this.FireText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 100, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Fire']}).setOrigin(0, 0.5).setVisible(false);
        this.ColdText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 150, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Cold'] }).setOrigin(0, 0.5).setVisible(false);
        this.LightningText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 150, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Lightning'] }).setOrigin(0, 0.5).setVisible(false);
        this.PoisonText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 200, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Poison'] }).setOrigin(0, 0.5).setVisible(false);
        this.ArcaneText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 200, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Arcane'] }).setOrigin(0, 0.5).setVisible(false);
        this.BleedText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 250, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Bleed'] }).setOrigin(0, 0.5).setVisible(false);
        this.RadiantText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 250, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Radiant'] }).setOrigin(0, 0.5).setVisible(false);
        this.CorruptionText = this.UI.add.text( TopLeft.x + 10, TopLeft.y + 300, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Corruption'] }).setOrigin(0, 0.5).setVisible(false);
        this.SonicText = this.UI.add.text( TopLeft.x + 140, TopLeft.y + 300, ``, { fontFamily: "Augusta", fontSize: 24, color: DamageTypes['Sonic'] }).setOrigin(0, 0.5).setVisible(false);
        
        this.DefencesTexts = this.UI.add.group().setVisible(false).addMultiple([
            this.PierceText,
            this.ImpactText,
            this.SlashText,
            this.FireText,
            this.ColdText,
            this.LightningText,
            this.PoisonText,
            this.ArcaneText,
            this.BleedText,
            this.RadiantText,
            this.CorruptionText,
            this.SonicText
        ]);

        // Close Button //
        this.CloseButton = this.UI.add.nineslice(
            this.CharacterPanelBackground.getTopRight().x, 
            this.CharacterPanelBackground.getTopRight().y, "Kenney-UI", "buttonSquare_blue_pressed", 24, 24, 4, 4, 4, 4
        )
        .setOrigin(0.5, 0.5)
        .setVisible(false)
        .setInteractive()
        .setDepth(10)
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

    UpdateSlot (index: string) {
        let Slot = this.Items.find((slot) => slot.InventoryIndex === index);
        if ( Slot !== undefined ) Slot.Refresh();
    }

    FindNextEmptySlot() {
        return this.Items.find((slot) => slot.DataInventorySlot == null);
    }

    AddItem ( ID: string, quantity: number, playSound: boolean = true ) {

        const BaseItemData = this.Game.DataManager.ItemData[ID];

        console.log(`Adding Item to Inventory. ID: ${ID}, Quantity: ${quantity}`, BaseItemData);

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
                    console.log(EmptySlot);
                    if ( EmptySlot !== undefined ) {
                        GD.Inventory[EmptySlot.InventoryIndex] = { ...BaseItemData.InitialValue };
                        console.log(BaseItemData.InitialValue);
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

        if ( !this.HasRequiredQuantity(ID, quantity) ) {
            return console.info(`Player does not have required quantity ID: ${ID}, Quantity: ${quantity}`);
        }

        for ( let i = 0; i < quantity; i++ ) {
            let Slot = this.Items.find((slot) => slot.DataInventorySlot !== null && slot.DataInventorySlot.ID === ID);
            if ( Slot !== undefined ) {
                if ( Slot.DataInventorySlot.Quantity > 1 ) {
                    Slot.DataInventorySlot.Quantity--;
                    Slot.Refresh();
                } else {
                    GD.Inventory[Slot.InventoryIndex] = null;
                    Slot.Refresh();
                }
            }
        }

    }

    public SwapItems (slotA: string, slotB: string) {
        GD.Inventory[slotB] = GD.Inventory[slotA];
        GD.Inventory[slotA] = null;
        this.Items.find((item) => item.InventoryIndex == slotA).Refresh();
        this.Items.find((item) => item.InventoryIndex == slotB).Refresh();
        this.UI.input.topOnly = true;
        this.Game.HeldObject.Sprite.destroy();
        this.Game.HeldObject = { Type: null, ID: null, Sprite: null };
        this.HoveredOnSlot = null;
        this.UI.sound.play("InventoryPutdown");
        this.UI.Game.PlayerCharacter.UpdateStats();
    }

    HasRequiredQuantity ( ID: string, quantity: number ) {
        let total = 0;
        this.Items.forEach((slot) => {
            if ( slot.DataInventorySlot !== null && slot.DataInventorySlot.ID === ID ) {
                total += slot.DataInventorySlot.Quantity;
            }
        });
        return total >= quantity;
    }

    public UpdateStatsTexts () {
        const stats = PC.ComputedStats;
        this.MovementSpeedText.setText(`Movement Speed: ${stats.MovementSpeed}`);
        this.LevelClassText.setText(`Level ${GD.Level} ${GD.Race} ${GD.Class}`);
        this.ExperienceText.setText(`Experience: ${GD.Experience}/${GD.NextLevelExperience}`);
        this.HealthText.setText(`Health: ${PC.CurrentHealth}/${stats.MaxHealth} (+${stats.HealthRegeneration})`);
        this.ManaText.setText(`Mana: ${PC.CurrentMana}/${stats.MaxMana} (+${stats.ManaRegeneration})`);
        this.FortitudeText.setText(`Fortitude: ${stats.Fortitude}`);
        this.VersatilityText.setText(`Versatility: ${stats.Versatility}`);
        this.VigorText.setText(`Vigor: ${stats.Vigor}`);
        this.ExpertiseText.setText(`Expertise: ${stats.Expertise}`);
        this.ArcanaText.setText(`Arcana: ${stats.Arcana}`);
        this.PersonalityText.setText(`Personality: ${stats.Personality}`);
        this.FortuneText.setText(`Fortune: ${stats.Fortune}`);
        this.GritText.setText(`Grit: ${stats.Grit}`);
        this.PierceText.setText(`Pierce: ${stats.Defence_Pierce}`);
        this.ImpactText.setText(`Impact: ${stats.Defence_Impact}`);
        this.SlashText.setText(`Slash: ${stats.Defence_Slash}`);
        this.FireText.setText(`Fire: ${stats.Defence_Fire}`);
        this.ColdText.setText(`Cold: ${stats.Defence_Cold}`);
        this.LightningText.setText(`Lightning: ${stats.Defence_Lightning}`);
        this.PoisonText.setText(`Poison: ${stats.Defence_Poison}`);
        this.ArcaneText.setText(`Arcane: ${stats.Defence_Arcane}`);
        this.BleedText.setText(`Bleed: ${stats.Defence_Bleed}`);    
        this.RadiantText.setText(`Radiant: ${stats.Defence_Radiant}`);
        this.CorruptionText.setText(`Corruption: ${stats.Defence_Corruption}`);
        this.SonicText.setText(`Sonic: ${stats.Defence_Sonic}`);
    }

    Show () {
        this.InventoryBackground.setVisible(true);
        this.EquipmentBackground.setVisible(true);

        if ( this.EquipmentWindow == "Equipment" ) {
            this.BackpackLabel.setVisible(true);
            this.BackpackSlot.setVisible(true);
            this.BackpackSprite.setVisible(true);
        }

        this.Items.forEach( (slot) => {
            if ( this.EquipmentWindow == "Equipment" ) {
                if ( slot.Type == "Equipment" ) slot.Show();
                if ( slot.Type == "Inventory" ) slot.Show();
            } else {
                if ( slot.Type == "Component" ) slot.Show();
                if ( slot.Type == "Inventory" ) slot.Show();
            }
        });
        this.InventoryHeader.setVisible(true);
        this.EquipmentHeader.setVisible(true);
        this.CharacterPanelBackground.setVisible(true);
        this.CharacterPanelHeader.setVisible(false);
        this.CharacterButton.setVisible(true);
        this.ComponentHeader.setVisible(true);
        this.DefencesButton.setVisible(true);
        this.CloseButton.setVisible(true);
        this.CloseButtonText.setVisible(true);
        this.BackpackSlot.setVisible(true);
        this.BackpackSprite.setVisible(true);
        this.BackpackLabel.setVisible(true);

        if ( this.StatsWindow == "Character" ) {
            this.CharacterTexts.setVisible(true);
        } else {
            this.DefencesTexts.setVisible(true);
        }

    }

    Hide () {
        this.DefencesTexts.setVisible(false);
        this.BackpackLabel.setVisible(false);
        this.BackpackSlot.setVisible(false);
        this.BackpackSprite.setVisible(false);
        this.InventoryBackground.setVisible(false);
        this.EquipmentBackground.setVisible(false);
        this.Items.forEach( (slot) => slot.Hide());
        this.CharacterPanelBackground.setVisible(false);
        this.CharacterPanelHeader.setVisible(false);
        this.InventoryHeader.setVisible(false);
        this.CharacterButton.setVisible(false);
        this.ComponentHeader.setVisible(false);
        this.DefencesButton.setVisible(false);
        this.EquipmentHeader.setVisible(false);
        this.CloseButton.setVisible(false);
        this.CloseButtonText.setVisible(false);
        this.CharacterTexts.setVisible(false);
        this.UI.ActivePanel = null;
    }

}