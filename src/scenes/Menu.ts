import Cursor from '../assets/images/click_cursor.png';
import TextButton from '../game_objects/UI_TextButton';
import GameData from '../data/DefaultGameData';
import Races from '../data/Races';
import Classes from '../data/Classes';
import Campaigns from '../data/Campaigns';
import Title from '../game_objects/menu/Title';
import MainMenu from '../game_objects/menu/MainMenu';
import Controls from '../game_objects/menu/Controls';
import Options from '../game_objects/menu/Options';
import CharacterCreation from '../game_objects/menu/CharacterCreation';
import CharacterList from '../game_objects/menu/CharacterList';

export default class Menu extends Phaser.Scene {

    public Data: GameData = null;

    public Background: Phaser.GameObjects.NineSlice;
    public Book!: Phaser.GameObjects.Sprite;
    public BookOpen: boolean = false;

    // Menus
    public TitleScreen!: Title;
    public MainMenuGroup!: MainMenu;
    public ControlsGroup!: Controls;
    public OptionsGroup!: Options;
    public CharacterCreationGroup!: CharacterCreation;
    public CharacterListGroup!: CharacterList;

    public CurrentMenu: string = "";
    public BackButton!: TextButton;
    public RebindInProgress: boolean = false;

    public MouseButtonMap: { [key: string]: string } = {
        "mouse-0": "Left Mouse",
        "mouse-1": "Middle Mouse",
        "mouse-2": "Right Mouse"
    };

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

        this.Background = this.add.nineslice(this.cameras.main.width / 2, this.cameras.main.height / 2, "BookBG", 0, 1280, 720, 16, 16, 16, 16).setOrigin(0.5);

        this.Book = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'Journal', '0').setScale(1.5).setOrigin(0.5, 0.55).setVisible(true);

        this.add.text(1, 1, this.game.config.gameVersion).setShadow(2, 2, "#000", 1).setOrigin(0).setFontSize(12);

        // Initialize Menus
        this.TitleScreen = new Title(this);
        this.MainMenuGroup = new MainMenu(this);
        this.ControlsGroup = new Controls(this);
        this.OptionsGroup = new Options(this);
        this.CharacterCreationGroup = new CharacterCreation(this);
        this.CharacterListGroup = new CharacterList(this);

        if ( this.Data.Characters['Bithmas'] == undefined )
            this.CharacterCreationGroup.CreateCharacter("Bithmas", "Standard", Campaigns[0], Classes.Agent, Races.Human);

        this.BackButton = new TextButton(this, this.scale.width * 0.69, this.scale.height * 0.8, "Back", () => {
            this.ChangeMenu("main");
        }).setVisible(false);

        // Make sure InfoCamera ignores the back button
        this.CharacterCreationGroup.InfoCamera.ignore(this.BackButton);

        this.cameras.main.fadeIn(2000);

    }

    ChangeMenu (menu: string) {

        this.CurrentMenu = menu;
        this.TitleScreen.setVisible(false);
        this.MainMenuGroup.setVisible(false);
        this.ControlsGroup.setVisible(false);
        this.OptionsGroup.setVisible(false);
        this.CharacterCreationGroup.setVisible(false);
        this.CharacterCreationGroup.InfoCamera.setVisible(false);
        this.CharacterListGroup.setVisible(false);
        this.BackButton.setVisible(false);

        // Show relevant group based on string
        let menuToGroupMap: { [key: string]: Phaser.GameObjects.Group } = {
            "main": this.MainMenuGroup,
            "controls": this.ControlsGroup,
            "options": this.OptionsGroup,
            "create": this.CharacterCreationGroup,
            "load": this.CharacterListGroup,
            "cloud": this.MainMenuGroup,
            "bloodline": this.MainMenuGroup
        };

        let Animation = 'Style 1 Page Flip Right';

        if ( !this.BookOpen ) {
            Animation = "Book Open";
            this.BookOpen = true;
        }

        this.Book.play({ key: Animation, frameRate: 16 }).on('animationcomplete', () => {
            if (menuToGroupMap[this.CurrentMenu]) {
                menuToGroupMap[this.CurrentMenu].setVisible(true);
                if ( this.CurrentMenu == "create" ) {
                    this.CharacterCreationGroup.UpdateScrollbar();
                }
                if ( this.CurrentMenu !== "main" )
                    this.BackButton.setVisible(true);
                if ( this.CurrentMenu == "create" )
                    this.CharacterCreationGroup.InfoCamera.setVisible(true);
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
        this.Data.Controls[key] = value;
        localStorage.setItem("EvereignData", JSON.stringify(this.Data));
    }

    RefreshCharacterList() {
        this.CharacterListGroup.refresh();
    }

    StartGame ( character: string ) {
        this.sound.stopByKey('track1');
        this.Data.LastCharacterPlayed = character;
        localStorage.setItem("EvereignData", JSON.stringify(this.Data));
        this.scene.start("Game", { character: character });
    }

}
