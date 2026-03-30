import Menu from "../../scenes/Menu";
import TextButton from "../UI_TextButton";
import MenuInput from "../Menu_Input";
import MenuSelect from "../Menu_Select";
import Races from "../../data/Races";
import Classes from "../../data/Classes";
import Campaigns from "../../data/Campaigns";
import ItemData from "../../data/ItemData";

import DefaultCharacterData from '../../data/DefaultCharacter';

class CharacterCreation extends Phaser.GameObjects.Group {

    // Inputs
    characterNameInput: MenuInput;
    characterRaceSelect: MenuSelect;
    characterClassSelect: MenuSelect;
    campaignSelect: MenuSelect;
    difficultySelect: MenuSelect;

    // Character Preview
    CharacterSkin: Phaser.GameObjects.Sprite;
    CharacterHeadItem: Phaser.GameObjects.Sprite;
    CharacterBodyItem: Phaser.GameObjects.Sprite;
    CharacterLegsItem: Phaser.GameObjects.Sprite;
    CharacterHandItem: Phaser.GameObjects.Sprite;
    CharacterFeetItem: Phaser.GameObjects.Sprite;
    SoulGemIcon: Phaser.GameObjects.Sprite;
    SoulGemValue: Phaser.GameObjects.Text;

    // Info Panel
    InfoBackground: Phaser.GameObjects.NineSlice;
    InfoText: Phaser.GameObjects.Text;
    InfoBackgroundScrollbarTrack: Phaser.GameObjects.Rectangle;
    InfoBackgroundScrollbarThumb: Phaser.GameObjects.Rectangle;
    InfoCamera: Phaser.Cameras.Scene2D.Camera;

    // Error text
    ErrorText: Phaser.GameObjects.Text;

    scene: Menu;

    constructor(scene: Menu) {

        super(scene);

        this.scene = scene;

        let Y = scene.scale.height * 0.15;

        // Header
        let header = scene.add.text(scene.scale.width * 0.32, Y, "New Character", { fontSize: 36, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false);
        this.add(header);

        Y = Y + 50;

        // Name
        this.characterNameInput = new MenuInput(scene, scene.scale.width * 0.32, Y, "Character Name");
        this.addMultiple([ this.characterNameInput, this.characterNameInput.TextObject ]);

        Y = Y + 40;

        // Race
        this.characterRaceSelect = new MenuSelect(
            scene,
            scene.scale.width * 0.32,
            Y,
            "Select Race",
            Object.values(Races).filter(race => race.Available).map(r => r.Name),
            () => { this.SetHelpText(this.characterRaceSelect.CurrentValue) },
            () => { this.UpdateCharacterPreview() },
            () => { this.UpdateCharacterPreview() }
        );

        this.addMultiple([
            this.characterRaceSelect,
            this.characterRaceSelect.TextObject,
            this.characterRaceSelect.ScrollLeft,
            this.characterRaceSelect.ScrollRight
        ]);

        Y = Y + 40;

        // Class
        this.characterClassSelect = new MenuSelect(
            scene,
            scene.scale.width * 0.32,
            Y,
            "Select Class",
            Object.values(Classes).filter(c => c.Available).map(c => c.Name),
            () => { this.SetHelpText(this.characterClassSelect.CurrentValue) },
            () => { this.UpdateCharacterPreview() },
            () => { this.UpdateCharacterPreview() }
        );

        this.addMultiple([
            this.characterClassSelect,
            this.characterClassSelect.TextObject,
            this.characterClassSelect.ScrollLeft,
            this.characterClassSelect.ScrollRight
        ]);

        Y = Y + 40;

        // Campaign
        this.campaignSelect = new MenuSelect(scene, scene.scale.width * 0.32, Y, "Select Campaign", Campaigns.filter(c => c.Available).map(c => c.Name), () => {
            this.SetHelpText(this.campaignSelect.CurrentValue);
        });

        this.addMultiple([
            this.campaignSelect,
            this.campaignSelect.TextObject,
            this.campaignSelect.ScrollLeft,
            this.campaignSelect.ScrollRight
        ]);

        Y = Y + 40;

        // Difficulty
        this.difficultySelect = new MenuSelect(scene, scene.scale.width * 0.32, Y, "Select Difficulty", ["Standard", "Story", "Ultra"], () => {
            this.SetHelpText(this.difficultySelect.CurrentValue);
        });

        this.addMultiple([
            this.difficultySelect,
            this.difficultySelect.TextObject,
            this.difficultySelect.ScrollLeft,
            this.difficultySelect.ScrollRight
        ]);

        Y = Y + 80;

        // Character Preview Placeholder
        this.CharacterSkin = scene.add.sprite(scene.scale.width * 0.24, Y, "Player", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterHeadItem = scene.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerHead", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterBodyItem = scene.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerBody", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterLegsItem = scene.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerLegs", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterHandItem = scene.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerHands", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterFeetItem = scene.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerFeet", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.SoulGemIcon = scene.add.sprite(scene.scale.width * 0.36, Y, "ownmisc", 8).setOrigin(0.5).setScale(2).setVisible(false);
        let SoulGemRightCenter = this.SoulGemIcon.getRightCenter();
        this.SoulGemValue = scene.add.text(SoulGemRightCenter.x, SoulGemRightCenter.y + 20, "Soul Gems:\nx100", { 
            fontSize: 24,
            align: "left",
            fontFamily: "Augusta",
            color: "#000"
        }).setOrigin(0, 0.5).setVisible(false);

        this.addMultiple([
            this.CharacterSkin,
            this.CharacterHeadItem,
            this.CharacterBodyItem,
            this.CharacterLegsItem,
            this.CharacterHandItem,
            this.CharacterFeetItem,
            this.SoulGemIcon,
            this.SoulGemValue
        ]);

        // Create Character Button
        let CreateNewCharButton = new TextButton(scene, scene.scale.width * 0.32, scene.scale.height * 0.73, "Create", () => {
            this.ErrorText.setVisible(false);
            if ( this.characterNameInput.CurrentValue == "" || scene.Data.Characters[this.characterNameInput.CurrentValue] != null )
                return this.ErrorText.setText("Character name is empty or already exists").setVisible(true);
            let Class = Object.values(Classes).find((c) => c.Name == this.characterClassSelect.CurrentValue);
            let Race = Object.values(Races).find((r) => r.Name == this.characterRaceSelect.CurrentValue);
            let Campaign = Campaigns.find((c) => c.ID == this.campaignSelect.CurrentValue);
            this.CreateCharacter(this.characterNameInput.CurrentValue, this.difficultySelect.CurrentValue, Campaign, Class, Race);
            scene.RefreshCharacterList();
        }).setVisible(false);

        this.add(CreateNewCharButton);

        // Character Validation Errors Text
        this.ErrorText = scene.add.text(scene.scale.width * 0.32, scene.scale.height * 0.79, "", { fontSize: 32, align: "center", fontFamily: "Augusta", color: "#cf200c" }).setOrigin(0.5).setVisible(false);
        this.add(this.ErrorText);

        // Info panel background
        this.InfoBackground = scene.add.nineslice(scene.scale.width * 0.7, scene.scale.height * 0.45, "Kenney-UI", "panel_beigeLight", scene.scale.width * 0.29, scene.scale.height * 0.65, 25, 25, 25, 25)
            .setOrigin(0.5)
            .setVisible(false)
            .setAlpha(0);
        this.add(this.InfoBackground);

        this.InfoBackgroundScrollbarTrack = scene.add.rectangle(this.InfoBackground.getRightCenter().x + 1, this.InfoBackground.getTopCenter().y, 20, this.InfoBackground.height, 0x000000).setOrigin(0, 0).setVisible(false);
        this.InfoBackgroundScrollbarThumb = scene.add.rectangle(this.InfoBackgroundScrollbarTrack.x + 1, this.InfoBackgroundScrollbarTrack.y + 1, 18, 20, 0xffffff).setOrigin(0, 0).setVisible(false);

        this.addMultiple([this.InfoBackgroundScrollbarTrack, this.InfoBackgroundScrollbarThumb]);

        this.InfoText = scene.add.text(this.InfoBackground.getCenter().x, this.InfoBackground.getCenter().y, "Click ? for more information", {
            fontSize: 24,
            align: "justify",
            fontFamily: "Augusta",
            color: "#000",
            wordWrap: {
                width: this.InfoBackground.width,
                useAdvancedWrap: true
            }
        })
            .setOrigin(0.5)
            .setVisible(true)
            .setInteractive()
            .on("wheel", (pointer: Phaser.Input.Pointer) => {
                if (pointer.deltaY > 0) {
                    this.InfoCamera.scrollY += 10;
                    this.UpdateScrollbar();
                } else {
                    this.InfoCamera.scrollY -= 10;
                    this.UpdateScrollbar();
                }
            });

        this.add(this.InfoText);
        scene.cameras.main.ignore(this.InfoText);

        // Create the info camera
        this.InfoCamera = scene.cameras.add(
            this.InfoBackground.getTopLeft().x,
            this.InfoBackground.getTopLeft().y,
            this.InfoBackground.width,
            this.InfoBackground.height,
            false,
            "InfoCamera"
        )
            .setBounds(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoBackground.height)
            .setOrigin(0, 0)
            .setScroll(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y)
            .setVisible(false)
            .ignore([scene.Book, scene.Background, this.InfoBackground]);

        this.setVisible(false);

    }

    UpdateCharacterPreview() {
        
        this.CharacterHeadItem.setVisible(false);
        this.CharacterBodyItem.setVisible(false);
        this.CharacterLegsItem.setVisible(false);
        this.CharacterHandItem.setVisible(false);
        this.CharacterFeetItem.setVisible(false);

        if (this.characterRaceSelect.CurrentValue != null) {
            let Race = Object.values(Races).find((r) => r.Name == this.characterRaceSelect.CurrentValue);
            this.CharacterSkin.setFrame(Race.Skin);
        }

        if (this.characterClassSelect.CurrentValue != null) {
            let Class = Object.values(Classes).find((c) => c.Name == this.characterClassSelect.CurrentValue);
            if (Class.Items.Equipment_Head !== null)
                this.CharacterHeadItem.setTexture("PlayerHead", ItemData[Class.Items.Equipment_Head.ID].Texture).setVisible(true);
            if (Class.Items.Equipment_Chest !== null)
                this.CharacterBodyItem.setTexture("PlayerBody", ItemData[Class.Items.Equipment_Chest.ID].Texture).setVisible(true);
            if (Class.Items.Equipment_Legs !== null)
                this.CharacterLegsItem.setTexture("PlayerLegs", ItemData[Class.Items.Equipment_Legs.ID].Texture).setVisible(true);
            if (Class.Items.Equipment_Hands !== null)
                this.CharacterHandItem.setTexture("PlayerHands", ItemData[Class.Items.Equipment_Hands.ID].Texture).setVisible(true);
            if (Class.Items.Equipment_Feet !== null)
                this.CharacterFeetItem.setTexture("PlayerFeet", ItemData[Class.Items.Equipment_Feet.ID].Texture).setVisible(true);
        }
    }

    SetHelpText(key: string) {
        const Help = require("../../data/HelpText").default;

        this.InfoText.setText(Help[key] ?? "No help text available for this option.");

        if (this.InfoText.height >= this.InfoBackground.height) {
            this.InfoText.setPosition(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y);
            this.InfoText.setOrigin(0, 0);
        } else {
            this.InfoText.setPosition(this.InfoBackground.getCenter().x, this.InfoBackground.getCenter().y);
            this.InfoText.setOrigin(0.5);
        }

        this.InfoCamera.setBounds(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoText.height);
        this.InfoCamera.setScroll(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y);

        this.UpdateScrollbar();
    }

    UpdateScrollbar() {
        // Check if content actually overflows
        if (this.InfoText.height <= this.InfoCamera.height) {
            this.InfoBackgroundScrollbarThumb.setVisible(false);
            this.InfoBackgroundScrollbarTrack.setVisible(false);
            return;
        } else {
            this.InfoBackgroundScrollbarThumb.setVisible(true);
            this.InfoBackgroundScrollbarTrack.setVisible(true);
        }

        let visibleRatio = this.InfoCamera.height / this.InfoText.height;
        this.InfoBackgroundScrollbarThumb.setDisplaySize(this.InfoBackgroundScrollbarThumb.width, this.InfoBackgroundScrollbarTrack.height * visibleRatio);

        // Calculate scroll percentage relative to the bounds' starting position
        let minScrollY = this.InfoBackground.getTopLeft().y;
        let maxScrollY = minScrollY + this.InfoText.height - this.InfoCamera.height;
        let scrollPercent = (this.InfoCamera.scrollY - minScrollY) / (maxScrollY - minScrollY);

        if (scrollPercent < 0) scrollPercent = 0;
        if (scrollPercent > 1) scrollPercent = 1;

        this.InfoBackgroundScrollbarThumb.setY(this.InfoBackgroundScrollbarTrack.y + scrollPercent * (this.InfoBackgroundScrollbarTrack.height - this.InfoBackgroundScrollbarThumb.displayHeight));
    }

    CreateCharacter ( Name: string, Difficulty: string, Campaign: Campaign, Class: Class, Race: Race ) {
    
        // Create new character data
        this.scene.Data.Characters[Name] = DefaultCharacterData;
        let Character = this.scene.Data.Characters[Name];

        Character.CreatedAtTimestamp = Date.now().toString();
        Character.LastSaveTimestamp = null;

        // Set character properties
        Character.Name = Name;
        Character.Class = Class.Name;
        Character.Race = Race.Name;
        Character.Campaign = Campaign.Name;
        Character.Difficulty = Difficulty;
        Character.Reincarnation = 1;
        Character.Stats.Fortitude = Race.Attributes.Fortitude + Class.AttributeBonuses.Fortitude;
        Character.Stats.Versatility = Race.Attributes.Versatility + Class.AttributeBonuses.Versatility;
        Character.Stats.Vigor = Race.Attributes.Vigor + Class.AttributeBonuses.Vigor;
        Character.Stats.Expertise = Race.Attributes.Expertise + Class.AttributeBonuses.Expertise;
        Character.Stats.Personality = Race.Attributes.Personality + Class.AttributeBonuses.Personality;
        Character.Stats.Fortune = Race.Attributes.Fortune + Class.AttributeBonuses.Fortune;
        Character.Stats.Grit = Race.Attributes.Grit + Class.AttributeBonuses.Grit;
        Character.Stats.Arcana = Race.Attributes.Arcana + Class.AttributeBonuses.Arcana;
        Character.Stats.MovementSpeed = 80 + (Race.Attributes.Vigor * 5);
        Character.Stats.CurrentHealth = 20 + (Race.Attributes.Vigor * 5);
        Character.Stats.CurrentMana = 20 + (Race.Attributes.Expertise * 5);
        Character.Stats.MaxHealth = Character.Stats.CurrentHealth;
        Character.Stats.MaxMana = Character.Stats.CurrentMana;
        Character.Level = 1;
        Character.AttributePoints = 0;
        Character.CurrentMap = Campaign.StartingMap;
        Character.X = Campaign.StartingX;
        Character.Y = Campaign.StartingY;

        const CampaignData = Campaigns.find( campaign => campaign.Name == Character.Campaign );

        // Copy only the dynamic InitialData to character save data
        // Static data (Type, Name, Level, etc.) stays in Campaign and is looked up at runtime
        Character.WorldData = {};
        for (const region of Object.keys(CampaignData.WorldData)) {
            Character.WorldData[region] = {};
            for (const objectId of Object.keys(CampaignData.WorldData[region])) {
                const objectDef = CampaignData.WorldData[region][objectId];
                Character.WorldData[region][objectId] = objectDef.InitialData ? { ...objectDef.InitialData } : {};
            }
        }
        
        // Add starting items from chosen class to character inventory
        Object.entries(Class.Items).forEach( (item) => {
            if ( item[1] == null ) return;
            const [slot, info] = item;
            const Data = ItemData[info.ID];
            if ( info.Quantity > 1 )
                Data.InitialValue.Quantity = info.Quantity;
            Character.Inventory[slot] = Data.InitialValue;
        });

        // Set up default hotbar for the character
        Object.entries(Class.Hotbar).forEach( (hotbar) => {
            const [slot, info] = hotbar;
            Character.Hotbar[slot] = info;
        });

        Class.Proficiencies.forEach( (proficiency) => Character.Proficiencies[proficiency] = { Level: 1, Experience: 0, NextLevelExperience: 100 } );

        // Add starting abilities from chosen class to character abilities
        Class.Abilities.forEach( (ability) => Character.Abilities.push({ ID: ability, Tier: 1, Cooldown: 0 }));

        // Add starting traits from chosen class to character traits
        Class.Traits.forEach( (trait) => Character.Traits.push({ ID: trait, Tier: 1 }));

        // Add racial traits to character traits
        Race.Traits.forEach( (trait) => Character.Traits.push({ ID: trait, Tier: 1 }));

        localStorage.setItem("EvereignData", JSON.stringify(this.scene.Data));

        this.scene.Data = JSON.parse(localStorage.getItem("EvereignData"));
    
    }

}

export default CharacterCreation;