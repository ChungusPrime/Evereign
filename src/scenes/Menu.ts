import Cursor from '../assets/images/click_cursor.png';
import TextButton from '../game_objects/UI_TextButton';
import MenuSelect from '../game_objects/Menu_Select';
import GameData from '../data/DefaultGameData';
import DefaultCharacterData from '../data/DefaultCharacter';
import Races from '../data/Races';
import Classes from '../data/Classes';
import ItemData from '../data/ItemData';
import Campaigns from '../data/Campaigns';
import Help from '../data/HelpText';
import MenuInput from '../game_objects/Menu_Input';

export default class Menu extends Phaser.Scene {

    public Data: GameData = null;

    public Background: Phaser.GameObjects.NineSlice;
    public Book!: Phaser.GameObjects.Sprite;
    public BookOpen: boolean = false;

    // Menus
    public TitleScreen!: Phaser.GameObjects.Group;
    public MainMenuGroup!: Phaser.GameObjects.Group;
    public ControlsGroup!: Phaser.GameObjects.Group;
    public OptionsGroup!: Phaser.GameObjects.Group;
    public CharacterCreationGroup: Phaser.GameObjects.Group;
    public CharacterList!: Phaser.GameObjects.Group;

    // Inputs
    public characterNameInput!: MenuInput;
    public characterRaceSelect!: MenuSelect;
    public characterClassSelect!: MenuSelect;
    public campaignSelect!: MenuSelect;
    public scalingSelect!: MenuSelect;
    public difficultySelect!: MenuSelect;

    public ControlObjects: TextButton[] = [];
    public CurrentMenu: string = "";
    public BackButton!: TextButton;
    public RebindInProgress: boolean = false;

    public InfoCamera: Phaser.Cameras.Scene2D.Camera;
    public InfoText: Phaser.GameObjects.Text;
    public InfoBackground: Phaser.GameObjects.NineSlice;

    public MouseButtonMap: { [key: string]: string } = {
        "mouse-0": "Left Mouse",
        "mouse-1": "Middle Mouse",
        "mouse-2": "Right Mouse"
    };

    RaceInfoButton: TextButton;
    ClassInfoButton: TextButton;
    CampaignInfoButton: TextButton;
    ScalingInfoButton: TextButton;
    DifficultyInfoButton: TextButton;

    // Menu Buttons
    ContinueButton: TextButton;
    CreateButton: TextButton;
    LoadButton: TextButton;
    ControlsButton: TextButton;
    OptionsButton: TextButton;
    CreditsButton: TextButton;
    QuitGameButton: TextButton;
    TutorialButton: TextButton;
    ReincarnationButton: TextButton;
    CloudButton: TextButton;

    CharacterSkin: Phaser.GameObjects.Sprite;
    CharacterHeadItem: Phaser.GameObjects.Sprite;
    CharacterBodyItem: Phaser.GameObjects.Sprite;
    CharacterLegsItem: Phaser.GameObjects.Sprite;
    CharacterHandItem: Phaser.GameObjects.Sprite;
    CharacterFeetItem: Phaser.GameObjects.Sprite;

    SoulGemIcon: Phaser.GameObjects.Sprite;
    SoulGemValue: Phaser.GameObjects.Text;

    constructor () {
        super({ key: "Menu" });
    }

    preload (): void {
        const ExistingData: string | null = localStorage.getItem("EvereignData");
        if ( !(ExistingData) ) {
            const Encoded = JSON.stringify(GameData);
            localStorage.setItem("EvereignData", Encoded);
            return this.Data = JSON.parse(Encoded);
        }
        this.Data = JSON.parse(ExistingData);
    }

    create (): void {

        if ( this.Data.Characters['Bithmas'] == undefined ) {
            this.CreateCharacter("Bithmas", "Standard", "Fixed", Campaigns[0], Classes[0], Races[0]);
        }

        this.input.setDefaultCursor(`url(${Cursor}), pointer`);
        this.sound.play("track1", { loop: true });

        this.Background = this.add.nineslice(this.cameras.main.width / 2, this.cameras.main.height / 2, "BookBG", 0, 1280, 720, 16, 16, 16, 16).setOrigin(0.5);

        this.Book = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Journal', '0').setScale(1.5).setOrigin(0.5, 0.55).setVisible(true);

        this.add.text(1, 1, this.game.config.gameVersion).setShadow(2, 2, "#000", 1).setOrigin(0).setFontSize(12);

        // Title Screen
        this.TitleScreen = this.add.group([]);
        let Logo = this.add.image(this.Book.getCenter().x, this.Book.getCenter().y, "logo").setOrigin(0.5, 0.5).setDisplaySize(this.scale.width * 0.2, this.scale.height * 0.45);
        let TitleText = this.add.text(Logo.getTopCenter().x, Logo.getTopCenter().y - 35, "EVEREIGN", { fontSize: 72, align: "center", fontFamily: "Augusta" }).setOrigin(0.5);
        let StartButton = new TextButton(this, Logo.getBottomCenter().x, Logo.getBottomCenter().y + 35, "Click To Start", () => { this.ChangeMenu("main") }, 48, "#FFFFFF");
        this.TitleScreen.addMultiple([Logo, TitleText, StartButton]);

        // Main Menu Buttons
        this.ContinueButton = new TextButton(this, this.scale.width * 0.31, this.scale.height * 0.25, `Load Last Played`, () => { this.StartGame(this.Data.LastCharacterPlayed) });
        this.CreateButton = new TextButton(this, this.scale.width * 0.31, this.scale.height * 0.35, "New Game", () => { this.ChangeMenu("create") });
        this.LoadButton = new TextButton(this, this.scale.width * 0.31, this.scale.height * 0.45, "Load Game", () => { this.ChangeMenu("load") });
        this.TutorialButton = new TextButton(this, this.scale.width * 0.31, this.scale.height * 0.55, "Tutorial", () => { this.StartGame("Bithmas") });
        this.CloudButton = new TextButton(this, this.scale.width * 0.31, this.scale.height * 0.65, "Cloud Saves", () => { this.ChangeMenu("cloud") });

        this.ReincarnationButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.25, "Bloodline", () => { this.ChangeMenu("reincarnation") });
        this.ControlsButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.35, "Controls", () => { this.ChangeMenu("controls") });
        this.OptionsButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.45, "Options", () => { this.ChangeMenu("options") });
        this.CreditsButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.55, "Credits", () => { console.log("credits") });
        this.QuitGameButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.65, "Quit", () => { window.close() });

        this.MainMenuGroup = this.add.group([
            this.CreateButton,
            this.LoadButton,
            this.TutorialButton,
            this.ControlsButton,
            this.OptionsButton,
            this.CloudButton,
            this.ReincarnationButton,
            this.CreditsButton,
            this.QuitGameButton,
            this.ContinueButton
        ]).setVisible(false);

        // Controls Menu
        this.ControlsGroup = this.add.group().setVisible(false);
        let Y = this.scale.height * 0.18;
        let X = this.scale.width * 0.32;
        
        Object.entries(this.Data.Controls).forEach(control => {

            let label = control[1];
            if (this.MouseButtonMap[control[1]])
                label = this.MouseButtonMap[control[1]];

            let ControlBind = new TextButton(this, X, Y, `${control[0]}: ${label}`, () => {
                this.StartRebind(control[0], ControlBind);
            }, 32).setVisible(false);

            this.ControlsGroup.add(ControlBind);

            Y += ControlBind.height + 10;

            if ( Y > this.scale.height * 0.7 ) {
                X = this.scale.width * 0.69;
                Y = this.scale.height * 0.18;
            }

            this.ControlObjects.push(ControlBind);
        });

        let ResetControlsButton = new TextButton(this, this.scale.width * 0.32, this.scale.height * 0.8, "Reset to default", () => {
            this.Data.Controls = JSON.parse(JSON.stringify(GameData.Controls));
            localStorage.setItem("EvereignData", JSON.stringify(this.Data));
            this.ControlObjects.forEach(control => {
                control.setText(`${control.text.split(':')[0]}: ${this.Data.Controls[control.text.split(':')[0]]}`);
            });
        }).setVisible(false);
        this.ControlsGroup.add(ResetControlsButton);

        // Options Menu
        this.OptionsGroup = this.add.group().setVisible(false);
        X = this.scale.width * 0.32;
        Y = this.scale.height * 0.17;
        Object.entries(this.Data.Options).forEach(option => {
            let label = option[1].toLocaleString();
            let OptionButton = new TextButton(this, X, Y, `${option[0]}: ${label}`, () => {}, 32).setVisible(false);
            this.OptionsGroup.add(OptionButton);
            Y += OptionButton.height + 15;
        });

        // Character Creation
        Y = this.scale.height * 0.15;
        this.CharacterCreationGroup = this.add.group().setVisible(false);
        
        this.CharacterCreationGroup.add(
            this.add.text(this.scale.width * 0.32, Y, "New Character", { fontSize: 36, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Y = Y + 50;

        // Name
        this.characterNameInput = new MenuInput(this, this.scale.width * 0.32, Y, "Character Name");
        Y = Y + 40;

        // Race
        this.characterRaceSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Race", Object.values(Races).filter( race => race.Available ).map( r => r.Name ));
        this.RaceInfoButton = new TextButton(this, this.characterRaceSelect.ScrollRight.getRightCenter().x + 15, Y, "?", () => {
            this.SetHelpText(this.characterRaceSelect.CurrentValue);
        }, 32).setVisible(false);
        this.CharacterCreationGroup.add(this.RaceInfoButton);
        Y = Y + 40;

        // Class
        this.characterClassSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Class", Object.values(Classes).filter( c => c.Available ).map( c => c.Name ));
        this.ClassInfoButton = new TextButton(this, this.characterClassSelect.ScrollRight.getRightCenter().x + 15, Y, "?", () => {
            this.SetHelpText(this.characterClassSelect.CurrentValue);
        }, 32).setVisible(false);
        this.CharacterCreationGroup.add(this.ClassInfoButton);
        Y = Y + 40;

        // Campaign
        this.campaignSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Campaign", Campaigns.filter( c => c.Available ).map( c => c.Name ));
        this.CampaignInfoButton = new TextButton(this, this.campaignSelect.ScrollRight.getRightCenter().x + 15, Y, "?", () => {
            this.SetHelpText(this.campaignSelect.CurrentValue);
        }, 32).setVisible(false);
        this.CharacterCreationGroup.add(this.CampaignInfoButton);
        Y = Y + 40;

        // Scaling
        this.scalingSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Scaling", ["Fixed", "Adaptive"]);
        this.ScalingInfoButton = new TextButton(this, this.scalingSelect.ScrollRight.getRightCenter().x + 15, Y, "?", () => {
            this.SetHelpText(this.scalingSelect.CurrentValue);
        }, 32).setVisible(false);
        this.CharacterCreationGroup.add(this.ScalingInfoButton);
        Y = Y + 40;

        // Difficulty
        this.difficultySelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Difficulty", ["Standard", "Story", "Ultra"]);
        this.DifficultyInfoButton = new TextButton(this, this.difficultySelect.ScrollRight.getRightCenter().x + 15, Y, "?", () => {
            this.SetHelpText(this.difficultySelect.CurrentValue);
        }, 32).setVisible(false);
        this.CharacterCreationGroup.add(this.DifficultyInfoButton);
        Y = Y + 80;

        // Character Preview Placeholder
        this.CharacterSkin = this.add.sprite(this.scale.width * 0.24, Y, "Player", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterHeadItem = this.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerHead", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterBodyItem = this.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerBody", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterLegsItem = this.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerLegs", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterHandItem = this.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerHands", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.CharacterFeetItem = this.add.sprite(this.CharacterSkin.x, this.CharacterSkin.y, "PlayerFeet", 0).setOrigin(0.5).setScale(4).setVisible(false);
        this.SoulGemIcon = this.add.sprite(this.scale.width * 0.36, Y, "ownmisc", 8).setOrigin(0.5).setScale(2).setVisible(false);
        this.SoulGemValue = this.add.text(this.SoulGemIcon.getRightCenter().x, this.SoulGemIcon.getRightCenter().y + 20, "Soul Gems:\nx100", { fontSize: 24, align: "left", fontFamily: "Augusta", color: "#000" }).setOrigin(0, 0.5).setVisible(false);

        this.CharacterCreationGroup.addMultiple([
            this.CharacterSkin,
            this.CharacterHeadItem,
            this.CharacterBodyItem,
            this.CharacterLegsItem,
            this.CharacterHandItem,
            this.CharacterFeetItem,
            this.SoulGemIcon,
            this.SoulGemValue
        ]);

        let CreateNewCharButton = new TextButton(this, this.scale.width * 0.32, this.scale.height * 0.73, "Create", () => {

            ErrorText.setVisible(false);

            if ( this.characterNameInput.CurrentValue == "" )
                return ErrorText.setText("Enter a character name").setVisible(true);

            if ( this.Data.Characters[this.characterNameInput.CurrentValue] )
                return ErrorText.setText("Character name already exists").setVisible(true);

            if ( this.characterRaceSelect.CurrentValue == "" || this.characterRaceSelect.CurrentValue == null )
                return ErrorText.setText("Choose a Race").setVisible(true);

            if ( this.characterClassSelect.CurrentValue == "" || this.characterClassSelect.CurrentValue == null )
                return ErrorText.setText("Choose a Class").setVisible(true);

            if ( this.campaignSelect.CurrentValue == "" || this.campaignSelect.CurrentValue == null )
                return ErrorText.setText("Choose a Campaign").setVisible(true);

            if ( this.scalingSelect.CurrentValue == "" || this.scalingSelect.CurrentValue == null )
                return ErrorText.setText("Choose a scaling type").setVisible(true);

            if ( this.difficultySelect.CurrentValue == "" || this.difficultySelect.CurrentValue == null )
                return ErrorText.setText("Choose a difficulty").setVisible(true);

            let Class = Object.values(Classes).find( (c) => c.Name == this.characterClassSelect.CurrentValue );
            let Race = Object.values(Races).find( (r) => r.Name == this.characterRaceSelect.CurrentValue );
            let Campaign = Campaigns.find( (c) => c.ID == this.campaignSelect.CurrentValue );

            this.CreateCharacter(this.characterNameInput.CurrentValue, this.difficultySelect.CurrentValue, this.scalingSelect.CurrentValue, Campaign, Class, Race);
            this.RefreshCharacterList();

        }).setVisible(false);

        this.CharacterCreationGroup.add(CreateNewCharButton);

        // Character Validation Errors Text
        let ErrorText = this.add.text(this.scale.width * 0.32, this.scale.height * 0.79, "", { fontSize: 32, align: "center", fontFamily: "Augusta", color: "#cf200c" }).setOrigin(0.5).setVisible(false);
        this.CharacterCreationGroup.add(ErrorText);

        // Info panel background
        this.InfoBackground = this.add.nineslice(this.scale.width * 0.7, this.scale.height * 0.45, "Kenney-UI", "panel_beigeLight", this.scale.width * 0.29, this.scale.height * 0.65, 25, 25, 25, 25)
        .setOrigin(0.5)
        .setVisible(false)
        .setAlpha(0);
        this.CharacterCreationGroup.add(this.InfoBackground);

        this.InfoText = this.add.text(this.InfoBackground.getCenter().x, this.InfoBackground.getCenter().y, "Click ? for more information", { 
            fontSize: 24,
            align: "center",
            fontFamily: "Augusta",
            color: "#000",
            wordWrap: { 
                width: this.InfoBackground.width - 10,
                useAdvancedWrap: true 
            }
        })
        .setOrigin(0.5)
        .setVisible(true)
        .setInteractive()
        .on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.deltaY > 0 ) {
                this.InfoCamera.scrollY += 10;
            } else {
                this.InfoCamera.scrollY -= 10;
            }
        });

        this.CharacterCreationGroup.add(this.InfoText);
        this.cameras.main.ignore(this.InfoText);
        
        this.CharacterList = this.add.group().setVisible(false);
        this.RefreshCharacterList();

        this.BackButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.8, "Back", () => {
            this.ChangeMenu("main");
        }).setVisible(false);

        this.InfoCamera = this.cameras.add(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoBackground.height, false, "InfoCamera")
        .setBounds(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoBackground.height)
        .setOrigin(0, 0)
        .setScroll(0, 0)
        .setVisible(false)
        .ignore([this.BackButton, this.Book, this.Background, this.InfoBackground]);

        this.cameras.main.fadeIn(2000);

    }

    UpdateCharacterPreview () {

        if ( this.characterRaceSelect.CurrentValue != null ) {
            let Race = Object.values(Races).find( (r) => r.Name == this.characterRaceSelect.CurrentValue );
            this.CharacterSkin.setFrame(Race.Skin);
        }

        if ( this.characterClassSelect.CurrentValue != null ) {
            let Class = Object.values(Classes).find( (c) => c.Name == this.characterClassSelect.CurrentValue );

            console.log(Class);

            if ( Class.Items.Equipment_Head == null ) {
                this.CharacterHeadItem.setVisible(false);
            } else {
                this.CharacterHeadItem.setTexture("PlayerHead", ItemData[Class.Items.Equipment_Head.ID].Texture);
                this.CharacterHeadItem.setVisible(true);
            }

            if ( Class.Items.Equipment_Chest == null ) {
                this.CharacterBodyItem.setVisible(false);
            } else {
                this.CharacterBodyItem.setTexture("PlayerBody", ItemData[Class.Items.Equipment_Chest.ID].Texture);
                this.CharacterBodyItem.setVisible(true);
            }

            if ( Class.Items.Equipment_Legs == null ) {
                this.CharacterLegsItem.setVisible(false);
            } else {
                this.CharacterLegsItem.setTexture("PlayerLegs", ItemData[Class.Items.Equipment_Legs.ID].Texture);
                this.CharacterLegsItem.setVisible(true);
            }

            if ( Class.Items.Equipment_Hands == null ) {
                this.CharacterHandItem.setVisible(false);
            } else {
                this.CharacterHandItem.setTexture("PlayerHands", ItemData[Class.Items.Equipment_Hands.ID].Texture);
                this.CharacterHandItem.setVisible(true);
            }

            if ( Class.Items.Equipment_Feet == null ) {
                this.CharacterFeetItem.setVisible(false);
            } else {
                this.CharacterFeetItem.setTexture("PlayerFeet", ItemData[Class.Items.Equipment_Feet.ID].Texture);
                this.CharacterFeetItem.setVisible(true);
            }
        }

    }

    CreateCharacter ( Name: string, Difficulty: string, Scaling: string, Campaign: Campaign, Class: Class, Race: Race ) {

            // Create new character data
            this.Data.Characters[Name] = DefaultCharacterData;
            let Character = this.Data.Characters[Name];

            Character.CreatedAtTimestamp = Date.now().toString();
            Character.LastSaveTimestamp = null;

            // Set character properties
            Character.Name = Name;
            Character.Class = Class.Name;
            Character.Race = Race.Name;
            Character.Campaign = Campaign.Name;
            Character.Scaling = Scaling;
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

            localStorage.setItem("EvereignData", JSON.stringify(this.Data));

            this.Data = JSON.parse(localStorage.getItem("EvereignData"));

    }

    ChangeMenu (menu: string) {

        this.CurrentMenu = menu;
        this.TitleScreen.setVisible(false);
        this.MainMenuGroup.setVisible(false);
        this.ControlsGroup.setVisible(false);
        this.OptionsGroup.setVisible(false);
        this.CharacterCreationGroup.setVisible(false);
        this.InfoCamera.setVisible(false);
        this.CharacterList.setVisible(false);
        this.BackButton.setVisible(false);

        // Show relevant group based on string
        let menuToGroupMap: { [key: string]: Phaser.GameObjects.Group } = {
            "main": this.MainMenuGroup,
            "controls": this.ControlsGroup,
            "options": this.OptionsGroup,
            "create": this.CharacterCreationGroup,
            "load": this.CharacterList
        };

        let Animation = 'Style 1 Page Flip Right';

        if ( !this.BookOpen ) {
            Animation = "Book Open";
            this.BookOpen = true;
        }

        this.Book.play({ key: Animation, frameRate: 16 }).on('animationcomplete', () => {
            if (menuToGroupMap[this.CurrentMenu]) {
                menuToGroupMap[this.CurrentMenu].setVisible(true);
                if ( this.CurrentMenu !== "main" )
                    this.BackButton.setVisible(true);
                if ( this.CurrentMenu == "create" )
                    this.InfoCamera.setVisible(true);
            } else {
                this.TitleScreen.setVisible(true);
                this.BookOpen = false;
                this.Book.play({ key: "Book Close", frameRate: 16 });
            }
        });
    }

    StartRebind(key: string, button: TextButton) {
        this.RebindInProgress = true;
        this.time.delayedCall(100, () => {
            button.setText(`${key}: waiting for input...`);
            if ( this.RebindInProgress ) {

                let code = null;

                // Keyboard
                let keyboardlisten = this.input.keyboard.once('keydown', (event: any) => {
                    code = event.key;
                    if ( event.code )
                        code = event.code;
                    keyboardlisten.removeAllListeners();
                    mouselisten.removeAllListeners();
                    button.setText(`${key}: ${code}`);
                    this.RebindKey(key, code);
                    this.RebindInProgress = false;
                });

                // Mouse
                let mouselisten = this.input.on('pointerdown', (event: any) => {
                    code = `mouse-${event.button}`;
                    keyboardlisten.removeAllListeners();
                    mouselisten.removeAllListeners();
                    let label = code;
                    if (this.MouseButtonMap[code])
                        label = this.MouseButtonMap[code];
                    button.setText(`${key}: ${label}`);
                    this.RebindKey(key, code);
                    this.RebindInProgress = false;
                });

                return;
            }

        }, [], this);
    }

    RebindKey(key: string, value: string) {
        console.log(`Rebinding ${key} to ${value}`);
        this.Data.Controls[key] = value;
        localStorage.setItem("EvereignData", JSON.stringify(this.Data));
    }

    RefreshCharacterList() {
        this.CharacterList.clear(true, true);
        let Y = this.scale.height * 0.2;
        this.CharacterList = this.add.group().setVisible(false);
        let header = this.add.text(this.scale.width * 0.32, Y, "Characters", { fontSize: 40, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false);
        this.CharacterList.add(header);
        let CharacterListY = this.scale.height * 0.28;
        Object.keys(this.Data.Characters).forEach(element => {
            let Character = this.Data.Characters[element];
            let CharacterButton = new TextButton(this, this.scale.width * 0.32, CharacterListY, `${Character.Name}\nLevel ${Character.Level} ${Character.Class}`, () => {
                this.StartGame(Character.Name);
            }, 32).setVisible(false);
            this.CharacterList.add(CharacterButton);
            CharacterListY += CharacterButton.height + 16;
        });
    }

    StartGame ( character: string ) {
        this.sound.stopByKey('track1');
        this.Data.LastCharacterPlayed = character;
        localStorage.setItem("EvereignData", JSON.stringify(this.Data));
        this.scene.start("Game", { character: character });
    }
    
    SetHelpText ( key: string ) {

        this.InfoText.setText(Help[key] ?? "No help text available for this option.");

        if ( this.InfoText.height >= this.InfoBackground.height ) {
            this.InfoText.setPosition(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y);
            this.InfoText.setOrigin(0, 0);
        } else {
            this.InfoText.setPosition(this.InfoBackground.getCenter().x, this.InfoBackground.getCenter().y);
            this.InfoText.setOrigin(0.5);
        }

        this.InfoCamera.setBounds(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoText.height);
        this.InfoCamera.setScroll(0, 0);
    }

}
