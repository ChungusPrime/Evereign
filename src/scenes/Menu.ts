import Cursor from '../images/click_cursor.png';
import TextButton from '../game_objects/UI_TextButton';

// Default New Game Data
import GameData from '../data/DefaultGameData';
import DefaultCharacterData from '../data/DefaultCharacter';

// Game Data
import RaceData from '../data/Character/Races';
import ClassData from '../data/Character/Classes';
import ItemData from '../data/ItemData';
import FirstNames from '../data/Character/FirstNames';
import Campaigns from '../data/Campaigns';
import Help from '../data/HelpText';
import Menu_Select from '../game_objects/Menu_Select';

export default class Menu extends Phaser.Scene {

    public BookOpen: boolean = false;
    public MainMenuGroup!: Phaser.GameObjects.Group;
    public NewGameText!: TextButton;
    public QuitGameButton!: TextButton;
    public OptionsText!: TextButton;
    public CreditsButton!: TextButton;
    public ControlsGroup!: Phaser.GameObjects.Group;

    public Background: Phaser.GameObjects.NineSlice;

    public ControlObjects: TextButton[] = [];
    
    public CurrentMenu: string = "";
    public TitleText!: Phaser.GameObjects.Text;
    public BackButton!: TextButton;
    public RebindInProgress: boolean = false;
    public Book: Phaser.GameObjects.Sprite;
    public logo: Phaser.GameObjects.Image;
    public toptext!: Phaser.GameObjects.Text;
    public bottomtext!: Phaser.GameObjects.Text;
    public CharacterList!: Phaser.GameObjects.Group;
    public Data: GameData = null;

    // Info Camera and Text
    public InfoCamera: Phaser.Cameras.Scene2D.Camera;
    public InfoText: Phaser.GameObjects.Text;
    public InfoBackground: Phaser.GameObjects.NineSlice;

    // Character Creation Values
    public CharacterName: string = "";
    public CharacterClass: string = "";
    public CharacterRace: string = "";
    public CharacterCampaign: any;
    public CharacterScaling: any;

    public characterNameInput!: Phaser.GameObjects.DOMElement;

    public createNewCharacterButton!: TextButton;
    public loadExistingCharacterButton!: TextButton;

    public CharacterCreationGroup: Phaser.GameObjects.Group;

    public characterRaceSelect: Menu_Select;
    public characterClassSelect: Menu_Select;
    public campaignSelect: Menu_Select;
    public scalingSelect: Menu_Select;
    public CharacterDifficulty: string;
    public difficultySelect: Menu_Select;

    constructor () {
        super({ key: "Menu" });
    }

    preload (): void {
        const ExistingData: string | null = localStorage.getItem("EvereignData");
        if ( !(ExistingData) ) {
            const Encoded = JSON.stringify(GameData);
            localStorage.setItem("EvereignData", Encoded);
            this.Data = JSON.parse(Encoded);
        } else {
            this.Data = JSON.parse(ExistingData);
        }
    }

    create (): void {

        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        this.sound.play("track1", { loop: true } );

        this.Background = this.add.nineslice(0, 0, "BookBG", 0, this.scale.width, this.scale.height, 30, 30, 30, 30).setOrigin(0);

        this.Book = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height * 0.45, 'Journal', '0').setDisplaySize(this.scale.width, this.scale.height * 1.5).setOrigin(0.5).setVisible(true);

        this.logo = this.add.image(this.Book.getCenter().x, this.Book.getCenter().y, "logo").setOrigin(0.5, 0.5).setDisplaySize(this.scale.width * 0.2, this.scale.height * 0.45);
        this.toptext = this.add.text(this.logo.getTopCenter().x, this.logo.getTopCenter().y - 35, "EVEREIGN", { fontSize: 72, align: "center", fontFamily: "Augusta" }).setOrigin(0.5);

        this.createNewCharacterButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.45, "Create Character", () => {
            this.createNewCharacterButton.setVisible(false);
            this.loadExistingCharacterButton.setVisible(false);
            this.BackButton.setVisible(false);
            this.MainMenuGroup.setVisible(false);
            this.CurrentMenu = "CreateCharacter";
            this.Book.play({ key: 'Style 1 Page Flip Left', frameRate: 12}).on('animationcomplete', () => {
                if ( this.CurrentMenu == "CreateCharacter" ) {
                    this.CharacterCreationGroup.setVisible(true);
                    this.InfoCamera.setVisible(true);
                    this.BackButton.setVisible(true);
                }
            });
        }).setVisible(false);

        this.loadExistingCharacterButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.55, "Load Character", () => {
            this.createNewCharacterButton.setVisible(false);
            this.loadExistingCharacterButton.setVisible(false);
            this.BackButton.setVisible(false);
            this.MainMenuGroup.setVisible(false);
            this.CurrentMenu = "LoadCharacter";
            this.Book.play({ key: 'Style 1 Page Flip Left', frameRate: 12}).on('animationcomplete', () => {
                if ( this.CurrentMenu == "LoadCharacter" ) {
                    this.CharacterList.setVisible(true);
                    this.BackButton.setVisible(true);
                }
            });
        }).setVisible(false);

        this.bottomtext = this.add.text(this.logo.getBottomCenter().x, this.logo.getBottomCenter().y + 35, "Click To Start", { 
            fontSize: 32, align: "center", fontFamily: "Augusta" 
        })
        .setInteractive()
        .on('pointerdown', () => {
            if ( this.BookOpen == false ) {
                this.BookOpen = true;
                this.logo.setVisible(false);
                this.toptext.setVisible(false);
                this.bottomtext.setVisible(false);
                this.Book.play({ key: 'Book Open', frameRate: 12 }).on('animationcomplete', () => {
                    if ( this.CurrentMenu == "" ) 
                        this.MainMenuGroup.setVisible(true);
                });
            }
        })
        .on('pointerover', () => {
            this.bottomtext.setTint(0x03dbfc);
        })
        .on('pointerout', () => {
            this.bottomtext.clearTint();
        })
        .setOrigin(0.5);

        this.TitleText = this.add.text(this.scale.width * 0.65, this.scale.height * 0.1, "New Game", { align: "center", fontSize: 32, fontFamily: "Augusta" }).setVisible(false).setOrigin(0.5);
        
        // Main Menu Buttons
        this.NewGameText = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.35, "Play", () => {
            this.MainMenuGroup.setVisible(false);
            this.CurrentMenu = "Play";
            this.Book.play({ key: 'Style 1 Page Flip Left', frameRate: 12}).on('animationcomplete', () => {
                if ( this.CurrentMenu == "Play" ) {
                    this.createNewCharacterButton.setVisible(true);
                    this.loadExistingCharacterButton.setVisible(true);
                    this.BackButton.setVisible(true);
                }
            });
        });

        this.OptionsText = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.45, "Controls", () => {
            this.MainMenuGroup.setVisible(false);
            this.CurrentMenu = "Options";
            this.Book.play('Style 1 Page Flip Left').on('animationcomplete', () => {
                if ( this.CurrentMenu == "Options" ) {
                    this.ControlsGroup.setVisible(true);
                    this.BackButton.setVisible(true);
                }
                    
            });
        });

        this.CreditsButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.55, "Credits", () => {
            console.log("show credits");
        });

        this.QuitGameButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.65, "Quit", () => {
            window.close();
        });

        this.MainMenuGroup = this.add.group([
            this.NewGameText,
            this.OptionsText,
            this.CreditsButton,
            this.QuitGameButton
        ]).setVisible(false);

        // Options Menu
        // Controls
        this.ControlsGroup = this.add.group().setVisible(false);

        let Y = this.scale.height * 0.2;

        this.ControlsGroup.add(
            this.add.text(this.scale.width * 0.32, Y, "Controls", { fontSize: 32, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        this.ControlsGroup.add(
            this.add.text(this.scale.width * 0.69, Y, "Hotbar Bindings", { fontSize: 32, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Y = Y + 38;

        this.ControlsGroup.add(
            this.add.text(this.scale.width * 0.32, Y, "Click on a control to start rebinding it", { fontSize: 24, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Y = Y + 42;
        let HotbarY = Y - 38;

        // Controls Bindings
        Object.entries(this.Data.Controls).forEach(control => {

            let X = this.scale.width * 0.32;

            // check if current control contains the word "Hotbar"
            if ( control[0].includes("Hotbar") ) {
                X = this.scale.width * 0.69;
                Y = HotbarY;
            }

            let ControlBind = new TextButton(this, X, Y, `${control[0]}: ${control[1]}`, () => {
                this.StartRebind(control[0], ControlBind);
            }, 28).setVisible(false);

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

        // Character Creation
        Y = this.scale.height * 0.2;
        this.CharacterCreationGroup = this.add.group().setVisible(false);
        
        this.CharacterCreationGroup.add(
            this.add.text(this.scale.width * 0.32, Y, "Create Character", { fontSize: 36, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Y = Y + 45;

        // Name
        this.characterNameInput = this.add.dom(this.scale.width * 0.3, Y)
        .createFromHTML(`<input type="text" placeholder="Enter Character Name" style="cursor: url(${Cursor}), pointer; width: 300px; height: 35px; font-size: 28px; text-align: center; border: 0; outline: 0; border-bottom: 2px solid #000; background-color: #daa475; color: #000;" />`)
        .setOrigin(0.5)
        .setVisible(false)
        .addListener('input')
        .on('input', (event: any) => {
            this.CharacterName = event.target.value;
        });

        this.CharacterCreationGroup.add(this.characterNameInput);

        let RandomNameButton = new TextButton(this, this.scale.width * 0.32 + 160, Y, "Rnd.", () => {
            let Name = FirstNames[Math.floor(Math.random() * FirstNames.length)];
            ((this.characterNameInput.node as HTMLElement).firstChild as HTMLSelectElement).value = Name;
            this.CharacterName = Name;
        }, 32).setVisible(false);

        this.CharacterCreationGroup.add(RandomNameButton);

        Y = Y + 50;

        // Race
        this.characterRaceSelect = new Menu_Select(this, this.scale.width * 0.3, Y, "Select Race", RaceData.map( r => r.name ));
        Y = Y + 50;

        // Class
        this.characterClassSelect = new Menu_Select(this, this.scale.width * 0.3, Y, "Select Class", ClassData.map( c => c.name ));
        Y = Y + 50;

        // Campaign
        this.campaignSelect = new Menu_Select(this, this.scale.width * 0.3, Y, "Select Campaign", Campaigns.map( c => c.Name ));
        Y = Y + 50;

        // Scaling
        this.scalingSelect = new Menu_Select(this, this.scale.width * 0.3, Y, "Select Scaling", ["Fixed", "Adaptive"]);
        Y = Y + 50;

        // Difficulty
        this.difficultySelect = new Menu_Select(this, this.scale.width * 0.3, Y, "Select Difficulty", ["Standard", "Story", "Ultra"]);
        Y = Y + 50;

        let CreateNewCharButton = new TextButton(this, this.scale.width * 0.32, this.scale.height * 0.69, "Confirm Character", () => {

            ErrorText.setVisible(false);

            if ( this.CharacterName == "" )
                return ErrorText.setText("Enter a character name").setVisible(true);
            if ( this.CharacterRace == "" )
                return ErrorText.setText("Choose a Race").setVisible(true);
            if ( this.CharacterClass == "" )
                return ErrorText.setText("Choose a Class").setVisible(true);
            if ( this.CharacterCampaign == "" )
                return ErrorText.setText("Choose a Campaign").setVisible(true);
            if ( this.CharacterScaling == "" )
                return ErrorText.setText("Choose a scaling type").setVisible(true);
            if ( this.CharacterDifficulty == "" )
                return ErrorText.setText("Choose a difficulty").setVisible(true);
            if ( this.Data.Characters[this.CharacterName] )
                return ErrorText.setText("Character name already exists").setVisible(true);

            let Class = ClassData.find( (c) => c.name == this.CharacterClass );
            let Race = RaceData.find( (r) => r.name == this.CharacterRace );
            let Campaign = Campaigns.find( (c) => c.ID == this.CharacterCampaign );

            // Create new character data
            this.Data.Characters[this.CharacterName] = DefaultCharacterData;

            // Set character properties
            this.Data.Characters[this.CharacterName].Name = this.CharacterName;
            this.Data.Characters[this.CharacterName].Class = this.CharacterClass;
            this.Data.Characters[this.CharacterName].Race = this.CharacterRace;
            this.Data.Characters[this.CharacterName].Campaign = this.CharacterCampaign;
            this.Data.Characters[this.CharacterName].Scaling = this.CharacterScaling;
            this.Data.Characters[this.CharacterName].Difficulty = this.CharacterDifficulty;
            this.Data.Characters[this.CharacterName].Fortitude = Race.base_attributes.Fortitude;
            this.Data.Characters[this.CharacterName].Versatility = Race.base_attributes.Versatility;
            this.Data.Characters[this.CharacterName].Vigor = Race.base_attributes.Vigor;
            this.Data.Characters[this.CharacterName].Expertise = Race.base_attributes.Expertise;
            this.Data.Characters[this.CharacterName].Personality = Race.base_attributes.Personality;
            this.Data.Characters[this.CharacterName].Fortune = Race.base_attributes.Fortune;
            this.Data.Characters[this.CharacterName].Grit = Race.base_attributes.Grit;
            this.Data.Characters[this.CharacterName].CurrentHealth = 20 + (Race.base_attributes.Fortitude * 10);
            this.Data.Characters[this.CharacterName].CurrentMana = 20 + (Race.base_attributes.Expertise * 10);
            this.Data.Characters[this.CharacterName].MaxHealth = this.Data.Characters[this.CharacterName].CurrentHealth;
            this.Data.Characters[this.CharacterName].MaxMana = this.Data.Characters[this.CharacterName].CurrentMana;
            this.Data.Characters[this.CharacterName].Level = 1;

            // Set campaign data
            this.Data.Characters[this.CharacterName].WorldData = Campaign.DefaultWorldData;
            this.Data.Characters[this.CharacterName].CurrentMap = Campaign.StartingMap;
            this.Data.Characters[this.CharacterName].X = Campaign.StartingX;
            this.Data.Characters[this.CharacterName].Y = Campaign.StartingY;
            
            // Add starting items from chosen class to character inventory
            let s = 1;
            Class.starting_items.forEach( (item) => {
                let data = ItemData[item.ID];
                if ( data.Category == "Helmet" )
                    this.Data.Characters[this.CharacterName].Inventory.Equipment_Head = data.InitialValue;
                else if ( data.Category == "Chest" )
                    this.Data.Characters[this.CharacterName].Inventory.Equipment_Chest = data.InitialValue;
                else if ( data.Category == "Weapon" )
                    this.Data.Characters[this.CharacterName].Inventory.Equipment_MainHand = data.InitialValue;
                else if ( item.Quantity > 1 ) {
                    let InitialValue = data.InitialValue;
                    if ( item.Quantity > 1 )
                        InitialValue.Quantity = item.Quantity;
                    this.Data.Characters[this.CharacterName].Inventory[s] = InitialValue;
                    s++;
                }
            });

            // Add starting abilities from chosen class to character abilities
            Class.starting_abilities.forEach( (ability) => this.Data.Characters[this.CharacterName].Abilities.push({ ID: ability, Tier: 1, Cooldown: 0 }));

            // Add starting traits from chosen class to character traits
            Class.starting_traits.forEach( (trait) => this.Data.Characters[this.CharacterName].Traits.push({ ID: trait, Tier: 1 }));

            localStorage.setItem("EvereignData", JSON.stringify(this.Data));

            //this.StartGame(this.CharacterName);
            this.RefreshCharacterList();

        }).setVisible(false);

        this.CharacterCreationGroup.add(CreateNewCharButton);

        // Character Validation Errors Text
        let ErrorText = this.add.text(this.scale.width * 0.32, this.scale.height * 0.75, "", { fontSize: 32, align: "center", fontFamily: "Augusta", color: "#cf200c" }).setOrigin(0.5).setVisible(false);
        this.CharacterCreationGroup.add(ErrorText);

        // Info panel background
        this.InfoBackground = this.add.nineslice(this.scale.width * 0.69, this.scale.height * 0.45, "Kenney-UI", "panel_beigeLight", this.scale.width * 0.3, this.scale.height * 0.55, 25, 25, 25, 25)
        .setOrigin(0.5)
        .setVisible(false)
        .setAlpha(0);

        this.CharacterCreationGroup.add(this.InfoBackground);
        this.InfoText = this.add.text(this.InfoBackground.getTopCenter().x, this.InfoBackground.getTopCenter().y, "Click the '?' next to each option for more information", { 
            fontSize: 24,
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
            this.BackButton.setVisible(false);
            this.CurrentMenu = "";
            this.ControlsGroup.setVisible(false);
            this.CharacterCreationGroup.setVisible(false);
            this.InfoCamera.setVisible(false);
            this.CharacterList.setVisible(false);
            this.createNewCharacterButton.setVisible(false);
            this.loadExistingCharacterButton.setVisible(false);
            this.Book.play('Style 1 Page Flip Right').on('animationcomplete', () => {
                if ( this.CurrentMenu == "" ) {
                    this.MainMenuGroup.setVisible(true);
                }
            });
        }).setVisible(false);

        
        this.InfoCamera = this.cameras.add(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoBackground.height, false, "InfoCamera")
        .setBounds(this.InfoBackground.getTopLeft().x, this.InfoBackground.getTopLeft().y, this.InfoBackground.width, this.InfoBackground.height)
        .setOrigin(0, 0)
        .setScroll(0, 0)
        .setVisible(false)
        //.setBackgroundColor('rgba(233, 80, 80, 0.5)')
        .ignore([
            this.BackButton,
            this.Book,
            this.Background,
        ]);

        this.cameras.main.fadeIn(2000);

    }

    StartRebind(key: string, button: TextButton) {

        this.RebindInProgress = true;

        this.time.delayedCall(100, () => {

            button.setText(`${key}: waiting for input...`);

            if ( this.RebindInProgress ) {

                // Keyboard
                let keyboardlisten = this.input.keyboard.once('keydown', (event: any) => {
                    keyboardlisten.removeAllListeners();
                    mouselisten.removeAllListeners();
                    button.setText(`${key}: ${event.key}`);
                    this.RebindKey(key, event.key);
                    this.RebindInProgress = false;
                });

                // Mouse
                let mouselisten = this.input.once('pointerdown', (event: any) => {
                    keyboardlisten.removeAllListeners();
                    mouselisten.removeAllListeners();
                    button.setText(`${key}: ${event.button}`);
                    this.RebindKey(key, event.key);
                    this.RebindInProgress = false;
                });

                return;
            }

        }, [], this);
    }

    RebindKey(key: string, value: string) {
        this.Data.Controls[key] = value;
        localStorage.setItem("EvereignData", JSON.stringify(this.Data));
    }

    RefreshCharacterList() {
        
        this.CharacterList.clear(true, true);

        let Y = this.scale.height * 0.2;

        this.CharacterList = this.add.group().setVisible(false);
        this.CharacterList.add(
            this.add.text(this.scale.width * 0.32, Y, "Characters", { fontSize: 40, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

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
    
}
