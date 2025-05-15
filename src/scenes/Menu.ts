class TextButton extends Phaser.GameObjects.Text {
    public scene: Menu;
    constructor ( scene: Menu, x: number, y: number, text: string, callback: Function, fontsize: number = 32 ) {
        super(scene, x, y, text, { fontSize: fontsize, align: "center", fontFamily: "Augusta" });
        this.setOrigin(0.5);
        this.scene = scene;
        this.setInteractive();
        this.setTint(0x000000);
        this.on('pointerover', () => {
            this.setTint(0xffffff);
        }).on('pointerout', () => {
            this.setTint(0x000000);
        }).on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.leftButtonDown() ) {
                callback();
                this.scene.sound.play('click');
            }
        });
        this.scene.add.existing(this);
    }
}

import Cursor from '../images/click_cursor.png';
import GameData from '../data/DefaultGameData';
import DefaultCharacterData from '../data/DefaultCharacterData';
import RaceData from '../data/Character/Races';
import ClassData from '../data/ClassData';

export default class Menu extends Phaser.Scene {

    public BookOpen: boolean = false;
    public MainMenuGroup!: Phaser.GameObjects.Group;
    public NewGameText!: TextButton;
    public QuitGameButton!: TextButton;
    public OptionsText!: TextButton;
    public CreditsButton!: TextButton;
    public SaveSlotGroup!: Phaser.GameObjects.Group;
    public SaveSlotOne!: TextButton;
    public SaveSlotTwo!: TextButton;
    public SaveSlotThree!: TextButton;
    public ControlsGroup!: Phaser.GameObjects.Group;
    
    public CurrentMenu: string = "";
    public TitleText!: Phaser.GameObjects.Text;
    public BackButton!: TextButton;
    public RebindKey: string | null = null;
    public RebindInProgress: boolean = false;
    public RebindTextObject: TextButton | null = null;
    public Action: string = "";
    public Book!: Phaser.GameObjects.Sprite;
    public logo!: Phaser.GameObjects.Image;
    public toptext!: Phaser.GameObjects.Text;
    public bottomtext!: Phaser.GameObjects.Text;
    public CharacterList!: Phaser.GameObjects.Group;
    public Data: GameDataInterface = null;

    // Character Creation Values
    public CharacterName: string = "";
    public CharacterClass: string = "";
    public CharacterRace: string = "";
    public CharacterCampaign: any;
    public CharacterScaling: any;

    public characterNameInput!: Phaser.GameObjects.DOMElement;

    public createNewCharacterButton!: TextButton;
    public loadExistingCharacterButton!: TextButton;
    CharacterCreationGroup: Phaser.GameObjects.Group;
    characterRaceSelect: Phaser.GameObjects.DOMElement;
    characterClassSelect: Phaser.GameObjects.DOMElement;
    campaignSelect: Phaser.GameObjects.DOMElement;

    scalingSelect: any;
    CharacterDifficulty: any;
    difficultySelect: Phaser.GameObjects.DOMElement;

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

        this.add.nineslice(0, 0, "BookBG", 0, this.scale.width, this.scale.height, 30, 30, 30, 30).setOrigin(0);

        this.Book = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height * 0.45, 'Journal', '0').setDisplaySize(this.scale.width, this.scale.height * 1.5).setOrigin(0.5).setVisible(true);

        this.logo = this.add.image(this.Book.getCenter().x, this.Book.getCenter().y, "logo").setOrigin(0.5, 0.5).setDisplaySize(this.scale.width * 0.2, this.scale.height * 0.45);
        this.toptext = this.add.text(this.logo.getTopCenter().x, this.logo.getTopCenter().y - 35, "EVEREIGN", { fontSize: 72, align: "center", fontFamily: "Augusta" }).setOrigin(0.5);

        this.createNewCharacterButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.45, "Create Character", () => {
            this.createNewCharacterButton.setVisible(false);
            this.loadExistingCharacterButton.setVisible(false);
            this.BackButton.setVisible(false);
            this.MainMenuGroup.setVisible(false);
            this.CurrentMenu = "CreateCharacter";
            this.Book.play({ key: 'Style 1 Page Flip Left', frameRate: 24}).on('animationcomplete', () => {
                if ( this.CurrentMenu == "CreateCharacter" ) {
                    this.CharacterCreationGroup.setVisible(true);
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
            this.Book.play({ key: 'Style 1 Page Flip Left', frameRate: 24}).on('animationcomplete', () => {
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
                this.Book.play({
                    key: 'Book Open',
                    frameRate: 5,
                }).on('animationcomplete', () => {
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
            this.Book.play({ key: 'Style 1 Page Flip Left', frameRate: 24}).on('animationcomplete', () => {
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

        Y = Y + 38;

        this.ControlsGroup.add(
            this.add.text(this.scale.width * 0.32, Y, "Click on a control to start rebinding it", { fontSize: 24, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Y = Y + 42;

        let UpBind = new TextButton(this, this.scale.width * 0.32, Y, `Move Up: ${this.Data.Controls.Controls_Move_Up}`, () => {}, 24).setVisible(false);
        this.ControlsGroup.add(UpBind);
        Y += UpBind.height + 10;

        let DownBind = new TextButton(this, this.scale.width * 0.32, Y, `Move Down: ${this.Data.Controls.Controls_Move_Down}`, () => {}, 24).setVisible(false);
        this.ControlsGroup.add(DownBind);
        Y += DownBind.height + 10;

        let LeftBind = new TextButton(this, this.scale.width * 0.32, Y, `Move Left: ${this.Data.Controls.Controls_Move_Left}`, () => {}, 24).setVisible(false);
        this.ControlsGroup.add(LeftBind);
        Y += LeftBind.height + 10;

        let RightBind = new TextButton(this, this.scale.width * 0.32, Y, `Move Right: ${this.Data.Controls.Controls_Move_Right}`, () => {}, 24).setVisible(false);
        this.ControlsGroup.add(RightBind);
        Y += RightBind.height + 10;

        let InteractBind = new TextButton(this, this.scale.width * 0.32, Y, `Interact: ${this.Data.Controls.Controls_Interact}`, () => {}, 24).setVisible(false);
        this.ControlsGroup.add(InteractBind);
        Y += InteractBind.height + 10;

        let WeaponAttackBind = new TextButton(this, this.scale.width * 0.32, Y, `Weapon Attack: ${this.Data.Controls.Controls_Weapon_Attack}`, () => {}, 24).setVisible(false);
        this.ControlsGroup.add(WeaponAttackBind);
        Y += WeaponAttackBind.height + 10;


        
        // Character Creation
        Y = this.scale.height * 0.2;
        this.CharacterCreationGroup = this.add.group().setVisible(false);
        
        this.CharacterCreationGroup.add(
            this.add.text(this.scale.width * 0.32, Y, "Create Character", { fontSize: 36, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Y = Y + 45;

        let style = {
           'width': "250px",
           "height": "35px",
           "font-size": "28px",
           "text-align": "center",
           "border": "0",
           "outline": "0",
           "border-bottom": "2px solid #000",
           "background-color": "#b88b5d",
           "color": "#000"
        };

        // Name
        this.characterNameInput = this.add.dom(this.scale.width * 0.32, Y)
        .createFromHTML('<input type="text" placeholder="Enter Character Name" style="width: 300px; height: 35px; font-size: 28px; text-align: center; border: 0; outline: 0; border-bottom: 2px solid #000; background-color: #daa475; color: #000;" />')
        .setOrigin(0.5)
        .setVisible(false)
        .addListener('input').on('input', (event: any) => {
            this.CharacterName = event.target.value;
        });

        this.CharacterCreationGroup.add(this.characterNameInput);

        Y = Y + 45;

        // Race
        this.characterRaceSelect = this.add.dom(this.scale.width * 0.32, Y)
        .createFromHTML(`<select style="width: 300px; height: 35px; font-size: 28px; text-align: center; border: 0; outline: 0; border-bottom: 2px solid #000; background-color: #daa475; color: #000;">
            <option value="">Select Race</option>
            <option value="human">Human</option>
            <option value="elf">Elf</option>
            <option value="dwarf">Dwarf</option>
            <option value="protostruct">Proto-Struct</option>
            <option value="gnome">Gnome</option>
            <option value="halforc">Half-Orc</option>
            <option value="gnome">Gnome</option>
            <option value="kirupean">Kirupean</option>
            <option value="thogac">Thogac</option>
            <option value="morvenite">Morvenite</option>
            <option value="tiseri">Tiseri</option>
            <option value="drakonid">Drakonid</option>
        </select>`)
        .setOrigin(0.5)
        .setVisible(false);

        this.characterRaceSelect.addListener('change').on('change', (event: any) => {
            this.CharacterRace = event.target.value;
        });

        this.CharacterCreationGroup.add(this.characterRaceSelect);

        Y = Y + 45;

        // Class
        this.characterClassSelect = this.add.dom(this.scale.width * 0.32, Y)
        .createFromHTML(`<select style="width: 300px; height: 35px; font-size: 28px; text-align: center; border: 0; outline: 0; border-bottom: 2px solid #000; background-color: #daa475; color: #000;">
            <option value="">Select Class</option>
            <option value="evoker">Evoker</option>
            <option value="godsworn">Godsworn</option>
            <option value="operative">Operative</option>
            <option value="gladiator">Gladiator</option>
            <option value="captain">Captain</option>
            <option value="harbinger">Harbinger</option>
            <option value="enginewright">Enginewright</option>
        </select>`)
        .setOrigin(0.5)
        .setVisible(false);

        this.characterClassSelect.addListener('change').on('change', (event: any) => {
            this.CharacterClass = event.target.value;
        });

        this.CharacterCreationGroup.add(this.characterClassSelect);

        Y = Y + 45;

        // Campaign
        this.campaignSelect = this.add.dom(this.scale.width * 0.32, Y)
        .createFromHTML(`<select style="width: 300px; height: 35px; font-size: 28px; text-align: center; border: 0; outline: 0; border-bottom: 2px solid #000; background-color: #daa475; color: #000;">
            <option value="">Select Campaign</option>
            <option value="twilight">The Twilight Accord</option>
        </select>`)
        .setOrigin(0.5)
        .setVisible(false);

        this.campaignSelect.addListener('change').on('change', (event: any) => {
            this.CharacterCampaign = event.target.value;
        });

        this.CharacterCreationGroup.add(this.campaignSelect);

        Y = Y + 45;

        // Scaling
        this.scalingSelect = this.add.dom(this.scale.width * 0.32, Y)
        .createFromHTML(`<select style="width: 300px; height: 35px; font-size: 28px; text-align: center; border: 0; outline: 0; border-bottom: 2px solid #000; background-color: #daa475; color: #000;">
            <option value="">Select Scaling Type</option>
            <option value="fixed">Fixed</option>
            <option value="scaled">Scaled</option>
        </select>`)
        .setOrigin(0.5)
        .setVisible(false);

        this.scalingSelect.addListener('change').on('change', (event: any) => {
            this.CharacterScaling = event.target.value;
        });

        this.CharacterCreationGroup.add(this.scalingSelect);

        Y = Y + 45;

        // Difficulty
        this.difficultySelect = this.add.dom(this.scale.width * 0.32, Y)
        .createFromHTML(`<select style="width: 300px; height: 35px; font-size: 28px; text-align: center; border: 0; outline: 0; border-bottom: 2px solid #000; background-color: #daa475; color: #000;">
            <option value="">Select Difficulty</option>
            <option value="story">Story</option>
            <option value="standard">Standard</option>
            <option value="ultra">Ultra</option>
        </select>`)
        .setOrigin(0.5)
        .setVisible(false);

        this.difficultySelect.addListener('change').on('change', (event: any) => {
            this.CharacterDifficulty = event.target.value;
        });

        this.CharacterCreationGroup.add(this.difficultySelect);

        Y = Y + 45;


        // Info panel background
        let infobg = this.add.nineslice(this.scale.width * 0.69, this.scale.height * 0.45, "Kenney-UI", "panel_beigeLight", this.scale.width * 0.3, this.scale.height * 0.55, 25, 25, 25, 25).setOrigin(0.5).setVisible(false);

        this.CharacterCreationGroup.add(infobg);

        let CreateNewCharButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.75, "Confirm Character", () => {

            console.log("Create Character", this.CharacterName, this.CharacterRace, this.CharacterClass);

            if ( this.CharacterName == "" ) return console.warn("Enter a name");
            if ( this.CharacterRace == "" ) return console.warn("Choose a race");
            if ( this.CharacterClass == "" ) return console.warn("Choose a class");
            if ( this.CharacterCampaign == "" ) return console.warn("Choose a campaign");
            if ( this.CharacterScaling == "" ) return console.warn("Choose a scaling type");
            if ( this.CharacterDifficulty == "" ) return console.warn("Choose a difficulty");
            /*if ( this.CharacterName.length < 3 ) return console.warn("Name must be at least 3 characters long");
            if ( this.CharacterName.length > 20 ) return console.warn("Name must be less than 20 characters long");
            if ( this.CharacterName.match(/[^a-zA-Z]/) ) return console.warn("Name can only contain letters");
            if ( this.CharacterName.match(/^\d/) ) return console.warn("Name cannot start with a number");
            if ( this.CharacterName.match(/^\s/) ) return console.warn("Name cannot start with a space");
            if ( this.CharacterName.match(/\s$/) ) return console.warn("Name cannot end with a space");*/
            
            if ( this.CreateCharacter() ) {

            }

        }).setVisible(false);

        this.CharacterCreationGroup.add(CreateNewCharButton);

        // Character List
        // Character Slots

        Y = this.scale.height * 0.2;
        this.CharacterList = this.add.group().setVisible(false);
        this.CharacterList.add(
            this.add.text(this.scale.width * 0.32, Y, "Characters", { fontSize: 32, align: "center", fontFamily: "Augusta", color: "#000" }).setOrigin(0.5).setVisible(false)
        );

        Object.keys(this.Data.Characters).forEach(element => {
            let Data = this.Data.Characters[element];
            let CharacterButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.35, Data.Name, () => {
                this.StartGame(Data.Name);
            }).setVisible(false);
            this.CharacterList.add(CharacterButton);
        });

        this.BackButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.8, "Back", () => {
            this.BackButton.setVisible(false);
            this.CurrentMenu = "";
            this.ControlsGroup.setVisible(false);
            this.CharacterCreationGroup.setVisible(false);
            this.CharacterList.setVisible(false);
            this.Book.play('Style 1 Page Flip Right').on('animationcomplete', () => {
                if ( this.CurrentMenu == "" ) {
                    this.MainMenuGroup.setVisible(true);
                }
            });
        }).setVisible(false);

        this.cameras.main.fadeIn(2000);

    }

    StartRebind(key: string, control: TextButton) {
        this.RebindKey = key;
        this.RebindTextObject = control;
    }

    BindKey (key: string, value: string) {
        console.log(key, value);
        //this.Data[key] = value;
        localStorage.setItem("EvereignControls", JSON.stringify(this.Data));
        this.RebindKey = null;
        this.RebindInProgress = false;
        this.RebindTextObject?.setText(`${key}: ${value}`);
        this.RebindTextObject = null;
    }

    CreateCharacter (): boolean {

        try {
            if ( this.Data.Characters[this.CharacterName] ) {
                console.warn("Character already exists");
                return false;
            }
        }
        catch (e) {
            console.warn("Character already exists", e);
            return false;
        }

        // Create new character data
        this.Data.Characters[this.CharacterName] = DefaultCharacterData;
        this.Data.Characters[this.CharacterName].Name = this.CharacterName;
        this.Data.Characters[this.CharacterName].Class = this.CharacterClass;
        this.Data.Characters[this.CharacterName].Race = this.CharacterRace;
        this.Data.Characters[this.CharacterName].Campaign = this.CharacterCampaign;
        this.Data.Characters[this.CharacterName].Scaling = this.CharacterScaling;
        this.Data.Characters[this.CharacterName].Difficulty = this.CharacterDifficulty;
        this.Data.Characters[this.CharacterName].Level = 1;
        this.Data.Characters[this.CharacterName].CurrentMap = "Willowvale";

        localStorage.setItem("EvereignData", JSON.stringify(this.Data));

        return true;
    }

    StartGame ( character: string ) {
        this.sound.stopByKey('track1');
        this.scene.start("Game", { character: character });
    }

    update ( time: number, delta: number ): void {

        if ( this.RebindKey != null && !this.RebindInProgress ) {
            this.RebindInProgress = true;
            this.time.delayedCall(100, () => {

                this.RebindInProgress = true;
                this.RebindTextObject?.setText(`${this.RebindKey}: waiting for input...`);

                // Listen for keyboard inputs
                this.input.keyboard!.once('keydown', (event: any) => {
                    if ( !this.RebindInProgress || this.RebindKey == null ) return;
                    this.BindKey(this.RebindKey, event.key);
                });

                // Listen for mouse inputs
                this.input.once('pointerdown', (event: any) => {
                    if ( !this.RebindInProgress || this.RebindKey == null ) return;
                    this.BindKey(this.RebindKey, `mouse-${event.button}`);
                });

            }, [], this);
        }

    }

}
