import UI from "../scenes/UI";
import { GD } from "../scenes/Game";
import ItemData from "../data/ItemData";
import AbilityData from "../data/Character/Abilities";

export default class CharacterPanel {

    public scene: UI;
    public Group: Phaser.GameObjects.Group;
    public Background: Phaser.GameObjects.NineSlice;

    // Life Bar
    public LifeBG: Phaser.GameObjects.Rectangle;
    public LifeBar: Phaser.GameObjects.Image;
    public LifeText: Phaser.GameObjects.Text;

    // Mana Bar
    public ManaBG: Phaser.GameObjects.Rectangle;
    public ManaBar: Phaser.GameObjects.Image;
    public ManaText: Phaser.GameObjects.Text;

    // Mainhand Item
    MainhandItemSlot: any;
    MainhandItemInput: any;
    MainhandItemSprite: any;

    // Offhand Item
    OffhandItemSlot: any;
    OffhandItemInput: any;
    OffhandItemSprite: any;

    constructor ( scene: UI ) {
        this.scene = scene;
        this.Group = this.scene.add.group();
        this.SetupPanel();
    }

    SetupPanel () {

        this.Group.clear(true, true);

        this.Background = this.scene.add.nineslice(0, this.scene.cameras.main.height, "Kenney-UI", "panelInset_blue", 1024, 70, 12, 12, 12, 12).setOrigin(0, 1).setDepth(0);

        this.LifeBG = this.scene.add.rectangle(this.Background.getTopLeft().x + 5, this.Background.getTopLeft().y + 3, 220, 25, 0x000000, 1).setOrigin(0, 0);
        this.LifeBar = this.scene.add.image(this.LifeBG.getTopLeft().x, this.LifeBG.getTopLeft().y, "red-bar").setDisplaySize(this.LifeBG.width, 30).setOrigin(0, 0);
        this.LifeText = this.scene.add.text(this.LifeBar.getLeftCenter().x + 5, this.LifeBar.getLeftCenter().y, "LIFE", { fontFamily: "Augusta"} ).setOrigin(0, 0.5);

        this.ManaBG = this.scene.add.rectangle(this.LifeBG.getBottomLeft().x, this.LifeBG.getBottomLeft().y + 3, 220, 25, 0x000000, 1).setOrigin(0, 0);
        this.ManaBar = this.scene.add.image(this.ManaBG.getTopLeft().x, this.ManaBG.getTopLeft().y, "blue-bar").setDisplaySize(this.ManaBG.width, 30).setOrigin(0, 0);
        this.ManaText = this.scene.add.text(this.ManaBar.getLeftCenter().x + 5, this.ManaBar.getLeftCenter().y, "MANA", { fontFamily: "Augusta"}).setOrigin(0, 0.5);
200
        const controls: {[key: string]: string | number } = JSON.parse(localStorage.getItem("EvereignData")).Controls;

        let MainhandItemData = ItemData[GD.Inventory.Equipment_MainHand ? GD.Inventory.Equipment_MainHand.ID : null];
        let MainhandSprite = ["general", "0"] as string[];

        if ( MainhandItemData ) {
            MainhandSprite = MainhandItemData.Sprite.split("-");
        }

        this.MainhandItemSlot = this.scene.add.nineslice(this.LifeBG.getTopRight().x + 4, this.LifeBG.getTopRight().y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6).setOrigin(0, 0);
        this.MainhandItemInput = this.scene.add.image(this.MainhandItemSlot.getTopRight().x, this.MainhandItemSlot.getTopRight().y, "inputs", controls['Weapon_Attack']).setOrigin(1, 0).setDisplaySize(24, 24);
        this.MainhandItemSprite = this.scene.add.sprite(this.MainhandItemSlot.getCenter().x, this.MainhandItemSlot.getCenter().y, MainhandSprite[0], MainhandSprite[1]).setDisplaySize(64, 64).setOrigin(0.5, 0.5);

        let OffhandItemData = ItemData[GD.Inventory.Equipment_OffHand ? GD.Inventory.Equipment_OffHand.ID : null];
        let OffhandSprite = ["general", "0"] as string[];

        if ( OffhandItemData ) {
            OffhandSprite = OffhandItemData.Sprite.split("-");
        }

        this.OffhandItemSlot = this.scene.add.nineslice(this.MainhandItemSlot.getTopRight().x + 10, this.MainhandItemSlot.getTopRight().y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6).setOrigin(0, 0);
        this.OffhandItemInput = this.scene.add.image(this.OffhandItemSlot.getTopRight().x, this.OffhandItemSlot.getTopRight().y, "inputs", controls['Use_Offhand']).setOrigin(1, 0).setDisplaySize(24, 24);
        this.OffhandItemSprite = this.scene.add.sprite(this.OffhandItemSlot.getCenter().x, this.OffhandItemSlot.getCenter().y, OffhandSprite[0], OffhandSprite[1]).setDisplaySize(64, 64).setOrigin(0.5, 0.5);

        this.UpdateVitalsBars();

        this.Group = this.Group.addMultiple([
            this.Background,
            this.LifeBG,
            this.LifeBar,
            this.LifeText,
            this.ManaBG,
            this.ManaBar,
            this.ManaText,
            this.MainhandItemSlot,
            this.MainhandItemInput,
            this.MainhandItemSprite,
            this.OffhandItemSlot,
            this.OffhandItemInput,
            this.OffhandItemSprite
        ]);

        Object.entries(GD.Hotbar).forEach( (slot, index) => {

            let X = this.OffhandItemSlot.getTopRight().x + 10 + (index * 64);
            let Y = this.OffhandItemSlot.getTopRight().y;

            let rect = this.scene.add.nineslice(X, Y, "Kenney-UI", "buttonSquare_blue_pressed", 64, 64, 6, 6, 6, 6).setOrigin(0, 0);
            let input = this.scene.add.image(rect.getTopRight().x, rect.getTopRight().y, "inputs", controls['Use_Hotbar_' + (index + 1)]).setOrigin(1, 0).setDisplaySize(24, 24);
            let sprite = this.scene.add.sprite(rect.getCenter().x, rect.getCenter().y, "general", 0).setDisplaySize(64, 64).setOrigin(0.5, 0.5).setVisible(false);

            if ( slot[1] == null ) return;

            if ( slot[1].Type == "Item" ) {
                const BaseItemData = this.scene.Game.DataManager.ItemData[slot[1].ID];
                sprite.setTexture(BaseItemData.Sprite.split("-")[0], BaseItemData.Sprite.split("-")[1]).setVisible(true);
            }

            if ( slot[1].Type == "Ability" ) {
                const BaseAbilityData = AbilityData[slot[1].ID];
                sprite.setTexture(BaseAbilityData.sprite.split("-")[0], BaseAbilityData.sprite.split("-")[1]).setVisible(true);
            }

            sprite.setInteractive();

            sprite.on('pointerover', () => {
                this.scene.Tooltip.Show(slot[1].Type, slot[1].ID);
            });

            sprite.on('pointerout', () => {
                this.scene.Tooltip.Hide();
            });

            sprite.on('pointermove', ( pointer: Phaser.Input.Pointer ) => {
                this.scene.Tooltip.Move(pointer.x + 40, pointer.y - 300);
            });

        });

    }

    UpdateVitalsBars () {
        let HealthWidth = (GD.CurrentHealth / GD.MaxHealth * this.LifeBG.width);
        this.LifeBar.setDisplaySize(HealthWidth, 30);
        let ManaWidth = (GD.CurrentMana / GD.MaxHealth * this.ManaBG.width);
        this.ManaBar.setDisplaySize(ManaWidth, 30);
    }

}