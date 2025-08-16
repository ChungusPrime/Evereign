import Cursor from '../assets/images/click_cursor.png';
import TextButton from '../game_objects/UI_TextButton';
import MenuSelect from '../game_objects/Menu_Select';
import GameData from '../data/DefaultGameData';
import DefaultCharacterData from '../data/DefaultCharacter';
import RaceData from '../data/Character/Races';
import ClassData from '../data/Character/Classes';
import ItemData from '../data/ItemData';
import Campaigns from '../data/Campaigns';
import Help from '../data/HelpText';
import MenuInput from '../game_objects/Menu_Input';

export default class Menu extends Phaser.Scene {

    public BookOpen: boolean = false;

    // Menus
    public TitleScreen!: Phaser.GameObjects.Group;
    public MainMenuGroup!: Phaser.GameObjects.Group;
    public ControlsGroup!: Phaser.GameObjects.Group;
    public OptionsGroup!: Phaser.GameObjects.Group;
    public CharacterCreationGroup: Phaser.GameObjects.Group;

    // Inputs
    public characterNameInput!: MenuInput;
    public characterRaceSelect!: MenuSelect;
    public characterClassSelect!: MenuSelect;
    public campaignSelect!: MenuSelect;
    public scalingSelect!: MenuSelect;
    public difficultySelect!: MenuSelect;

    public Background: Phaser.GameObjects.NineSlice;
    public ControlObjects: TextButton[] = [];
    public CurrentMenu: string = "";
    public BackButton!: TextButton;
    public RebindInProgress: boolean = false;
    public CharacterList!: Phaser.GameObjects.Group;
    public Data: GameData = null;
    public InfoCamera: Phaser.Cameras.Scene2D.Camera;
    public InfoText: Phaser.GameObjects.Text;
    public InfoBackground: Phaser.GameObjects.NineSlice;
    public Book!: Phaser.GameObjects.Sprite;

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

        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        this.sound.play("track1", { loop: true });

        this.Background = this.add.nineslice(this.cameras.main.width / 2, this.cameras.main.height / 2, "BookBG", 0, 768 * 2, 560 * 2, 30, 30, 30, 30).setOrigin(0.5);

        this.Book = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Journal', '0').setScale(1.5).setOrigin(0.5, 0.55).setVisible(true);

        this.TitleScreen = this.add.group([]);
        let Logo = this.add.image(this.Book.getCenter().x, this.Book.getCenter().y, "logo").setOrigin(0.5, 0.5).setDisplaySize(this.scale.width * 0.2, this.scale.height * 0.45);
        let TitleText = this.add.text(Logo.getTopCenter().x, Logo.getTopCenter().y - 35, "EVEREIGN", { fontSize: 72, align: "center", fontFamily: "Augusta" }).setOrigin(0.5);
        let StartButton = new TextButton(this, Logo.getBottomCenter().x, Logo.getBottomCenter().y + 35, "Click To Start", () => {
            this.ChangeMenu("main");
        }, 48, "#FFFFFF");
        this.TitleScreen.addMultiple([Logo, TitleText, StartButton]);

        // Main Menu Buttons
        let CreateButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.25, "Create Character", () => {
            this.ChangeMenu("create");
        }).setVisible(false);

        let LoadButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.35, "Load Character", () => {
            this.ChangeMenu("load");
        }).setVisible(false);

        let ControlsButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.45, "Controls", () => {
            this.ChangeMenu("controls");
        });

        let OptionsButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.55, "Options", () => {
            this.ChangeMenu("options");
        });

        let CreditsButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.65, "Credits", () => { 
            console.log("credits");
        });

        let QuitGameButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.75, "Quit", () => { 
            window.close();
        });

        this.MainMenuGroup = this.add.group([
            CreateButton,
            LoadButton,
            ControlsButton,
            OptionsButton,
            CreditsButton,
            QuitGameButton
        ]).setVisible(false);

        // Options Menu
        this.ControlsGroup = this.add.group().setVisible(false);
        let Y = this.scale.height * 0.20;
        let HotbarY = Y;
        Object.entries(this.Data.Controls).forEach(control => {
            let X = this.scale.width * 0.32;
            // check if current control contains the word "Hotbar"
            if ( control[0].includes("Hotbar") ) {
                X = this.scale.width * 0.69;
                Y = HotbarY;
            }
            let label = "";
            if ( control[1] == "mouse-0" ) {
                label = "Mouse Left";
            } else if ( control[1] == "mouse-1" ) {
                label = "Mouse Middle";
            } else if ( control[1] == "mouse-2" ) {
                label = "Mouse Right";
            } else {
                label = control[1];
            }
            let ControlBind = new TextButton(this, X, Y, `${control[0]}: ${label}`, () => {
                this.StartRebind(control[0], ControlBind);
            }, 32).setVisible(false);
            this.ControlsGroup.add(ControlBind);
            if ( control[0].includes("Hotbar") ) {
                HotbarY += ControlBind.height + 10;
            } else {
                Y += ControlBind.height + 10;
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

        this.OptionsGroup = this.add.group().setVisible(false);
        Object.entries(this.Data.Options).forEach(option => {
            let X = this.scale.width * 0.32;
            let Y = this.scale.height * 0.17;
            let key = option[0].replace(/_/g, " ");
            let label = option[1].toLocaleString();
            let OptionButton = new TextButton(this, X, Y, `${key}: ${label}`, () => {}, 32).setVisible(false);
            this.OptionsGroup.add(OptionButton);
        });

        // Character Creation
        Y = this.scale.height * 0.22;
        this.CharacterCreationGroup = this.add.group().setVisible(false);
        
        this.CharacterCreationGroup.add(
            this.add.text(this.scale.width * 0.32, Y, "Create Character", { fontSize: 36, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Y = Y + 50;

        // Name
        this.characterNameInput = new MenuInput(this, this.scale.width * 0.32, Y, "Character Name");
        Y = Y + 50;

        // Race
        this.characterRaceSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Race", RaceData.map( r => r.Name ));
        Y = Y + 50;

        // Class
        this.characterClassSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Class", ClassData.map( c => c.Name ));
        Y = Y + 50;

        // Campaign
        this.campaignSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Campaign", Campaigns.map( c => c.Name ));
        Y = Y + 50;

        // Scaling
        this.scalingSelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Scaling", ["Fixed", "Adaptive"]);
        Y = Y + 50;

        // Difficulty
        this.difficultySelect = new MenuSelect(this, this.scale.width * 0.32, Y, "Select Difficulty", ["Standard", "Story", "Ultra"]);
        Y = Y + 50;

        let CreateNewCharButton = new TextButton(this, this.scale.width * 0.32, this.scale.height * 0.73, "Confirm Character", () => {

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

            let Class = ClassData.find( (c) => c.Name == this.characterClassSelect.CurrentValue );
            let Race = RaceData.find( (r) => r.Name == this.characterRaceSelect.CurrentValue );
            let Campaign = Campaigns.find( (c) => c.ID == this.campaignSelect.CurrentValue );

            // Create new character data
            this.Data.Characters[this.characterNameInput.CurrentValue] = DefaultCharacterData;
            let Character = this.Data.Characters[this.characterNameInput.CurrentValue];

            // Set character properties
            Character.Name = this.characterNameInput.CurrentValue;
            Character.Class = this.characterClassSelect.CurrentValue;
            Character.Race = this.characterRaceSelect.CurrentValue;
            Character.Campaign = this.campaignSelect.CurrentValue;
            Character.Scaling = this.scalingSelect.CurrentValue;
            Character.Difficulty = this.difficultySelect.CurrentValue;
            Character.Fortitude = Race.Attributes.Fortitude;
            Character.Versatility = Race.Attributes.Versatility;
            Character.Vigor = Race.Attributes.Vigor;
            Character.Expertise = Race.Attributes.Expertise;
            Character.Personality = Race.Attributes.Personality;
            Character.Fortune = Race.Attributes.Fortune;
            Character.Grit = Race.Attributes.Grit;
            Character.CurrentHealth = 50 + (Race.Attributes.Fortitude * 10);
            Character.CurrentMana = 50 + (Race.Attributes.Expertise * 10);
            Character.MaxHealth = Character.CurrentHealth;
            Character.MaxMana = Character.CurrentMana;
            Character.Level = 1;
            Character.WorldData = Campaign.DefaultWorldData;
            Character.CurrentMap = Campaign.StartingMap;
            Character.X = Campaign.StartingX;
            Character.Y = Campaign.StartingY;
            Character.CreatedAtTimestamp = Date.now().toString();
            Character.LastSaveTimestamp = Date.now().toString();
            
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

            // Add starting abilities from chosen class to character abilities
            Class.Abilities.forEach( (ability) => Character.Abilities.push({ ID: ability, Tier: 1, Cooldown: 0 }));

            // Add starting traits from chosen class to character traits
            Class.Traits.forEach( (trait) => Character.Traits.push({ ID: trait, Tier: 1 }));

            localStorage.setItem("EvereignData", JSON.stringify(this.Data));

            this.Data = JSON.parse(localStorage.getItem("EvereignData"));

            //this.StartGame(this.CharacterName);
            this.RefreshCharacterList();

        }).setVisible(false);

        this.CharacterCreationGroup.add(CreateNewCharButton);

        // Character Validation Errors Text
        let ErrorText = this.add.text(this.scale.width * 0.32, this.scale.height * 0.79, "", { fontSize: 32, align: "center", fontFamily: "Augusta", color: "#cf200c" }).setOrigin(0.5).setVisible(false);
        this.CharacterCreationGroup.add(ErrorText);

        // Info panel background
        this.InfoBackground = this.add.nineslice(this.scale.width * 0.69, this.scale.height * 0.45, "Kenney-UI", "panel_beigeLight", this.scale.width * 0.3, this.scale.height * 0.55, 25, 25, 25, 25)
        .setOrigin(0.5)
        .setVisible(false)
        .setAlpha(0);

        this.CharacterCreationGroup.add(this.InfoBackground);
        this.InfoText = this.add.text(this.InfoBackground.getTopCenter().x, this.InfoBackground.getTopCenter().y, "Click on currently selected option for more information", { 
            fontSize: 32,
            align: "center",
            fontFamily: "Augusta",
            color: "#000",
            wordWrap: { 
                width: this.InfoBackground.width - 10,
                useAdvancedWrap: true 
            }
        })
        .setOrigin(0.5, 0)
        .setVisible(false)
        .setInteractive()
        .on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            console.log("scrolling");
            if ( pointer.deltaY > 0 ) {
                this.InfoCamera.scrollY += 10;
            } else {
                this.InfoCamera.scrollY -= 10;
            }
        });

        this.CharacterCreationGroup.add(this.InfoText);

        this.cameras.main.ignore(this.InfoText);

        // Character List
        // Character Slots
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
        .ignore([this.BackButton, this.Book, this.Background]);

        this.cameras.main.fadeIn(2000);

    }

    ChangeMenu (menu: string) {
        console.log("menu");
        this.CurrentMenu = menu;
        this.TitleScreen.setVisible(false);
        this.MainMenuGroup.setVisible(false);
        this.ControlsGroup.setVisible(false);
        this.OptionsGroup.setVisible(false);
        this.CharacterCreationGroup.setVisible(false);
        this.InfoCamera.setVisible(false);
        this.CharacterList.setVisible(false);

        // Show relevant group based on string
        let menuToGroupMap: { [key: string]: Phaser.GameObjects.Group } = {
            "main": this.MainMenuGroup,
            "controls": this.ControlsGroup,
            "options": this.OptionsGroup,
            "characterCreation": this.CharacterCreationGroup
        };

        let Animation = 'Style 1 Page Flip Right';

        if ( !this.BookOpen ) {
            Animation = "Book Open";
            this.BookOpen = true;
        }

        this.Book.play({ key: Animation, frameRate: 16 }).on('animationcomplete', () => {
            if (menuToGroupMap[this.CurrentMenu])
                menuToGroupMap[this.CurrentMenu].setVisible(true);
            else
                this.MainMenuGroup.setVisible(true);
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

                    let label = "";
                    if ( code == "mouse-0" ) {
                        label = "Mouse Left";
                    } else if ( code == "mouse-1" ) {
                        label = "Mouse Middle";
                    } else if ( code == "mouse-2" ) {
                        label = "Mouse Right";
                    } else {
                        label = code;
                    }

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
            let CharacterButton = new TextButton(this, this.scale.width * 0.32, CharacterListY, `${Character.Name} - Level ${Character.Level} ${Character.Class}`, () => {
                this.StartGame(Character.Name);
            }, 32).setVisible(false);
            this.CharacterList.add(CharacterButton);
            CharacterListY += CharacterButton.height + 16;
        });
    }

    StartGame ( character: string ) {
        this.sound.stopByKey('track1');
        this.scene.start("Game", { character: character });
    }
    
    SetHelpText ( key: string ) {
        let text = Help[key] ?? "No help text available for this key";
        this.InfoText.setText(text);
        this.InfoCamera.setBounds(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoText.height);
        this.InfoCamera.setScroll(0, 0);
    }

    SetError ( message: string ) {

    }
    
}
