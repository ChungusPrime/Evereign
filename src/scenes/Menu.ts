import Cursor from '../assets/images/click_cursor.png';
import TextButton from '../objects/ui/UI_TextButton';
import Title from '../objects/menu/Title';
import MainMenu from '../objects/menu/MainMenu';
import Controls from '../objects/menu/Controls';
import Options from '../objects/menu/Options';
import CharacterCreation from '../objects/menu/CharacterCreation';
import CharacterList from '../objects/menu/CharacterList';
import Bloodline from '../objects/menu/Bloodline';
import DataManager from '../systems/DataManager';
import ScenarioMenu from '../objects/menu/Scenario';

export default class Menu extends Phaser.Scene {

    public Background: Phaser.GameObjects.NineSlice;
    public Book!: Phaser.GameObjects.Sprite;
    public BookOpen: boolean = false;

    // Sub menus
    public MainMenuGroup!: MainMenu;
    public TitleScreen!: Title;
    public ControlsGroup!: Controls;
    public OptionsGroup!: Options;
    public CharacterCreationGroup!: CharacterCreation;
    public CharacterListGroup!: CharacterList;
    public BloodlineGroup!: Bloodline;
    public ScenariosGroup!: ScenarioMenu;

    public CurrentMenu: string = "";
    public BackButton!: TextButton;

    public Data: GameData = null;
    public DataManager: DataManager = null;

    constructor () {
        super({ key: "Menu" });
    }

    preload (): void {
        this.DataManager = new DataManager();
        this.Data = this.DataManager.GetLocalStorageData();
        console.log(this.Data);
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
        this.BloodlineGroup = new Bloodline(this);
        this.ScenariosGroup = new ScenarioMenu(this);

        /*if ( this.Data.Characters['Bithmas'] == undefined ) {
            console.log("Creating default character Bithmas");
            this.CharacterCreationGroup.CreateCharacter("Bithmas", "Standard", Campaigns[0], Classes.Agent, Races.Human);
        }*/

        this.BackButton = new TextButton(this, this.scale.width * 0.06, this.scale.height * 0.5, "Back", () => {
            this.ChangeMenu("main");
        }, 48, "white", "yellow").setVisible(false);

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
        this.BloodlineGroup.setVisible(false);
        this.BackButton.setVisible(false);
        this.ScenariosGroup.setVisible(false);

        // Show relevant group based on string
        let menuToGroupMap: { [key: string]: Phaser.GameObjects.Group } = {
            "main": this.MainMenuGroup,
            "controls": this.ControlsGroup,
            "options": this.OptionsGroup,
            "create": this.CharacterCreationGroup,
            "load": this.CharacterListGroup,
            "scenarios": this.ScenariosGroup,
            "bloodline": this.BloodlineGroup
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

                if ( this.CurrentMenu !== "main" ) {
                    this.BackButton.setVisible(true);
                }
                    
                if ( this.CurrentMenu == "create" ) {
                    this.CharacterCreationGroup.InfoCamera.setVisible(true);
                    this.CharacterCreationGroup.UpdateCharacterPreview();
                }

                if ( this.CurrentMenu == "options" ) {
                    this.OptionsGroup.checkboxes.forEach(checkbox => {
                        checkbox.show();
                    });
                }

            } else {
                this.TitleScreen.setVisible(true);
                this.BookOpen = false;
                this.Book.play({ key: "Book Close", frameRate: 16 });
            }
        });
    }

    RefreshCharacterList() {
        this.CharacterListGroup.refresh();
    }

    StartGame ( character: string, mode: string ) {
        this.sound.stopByKey('track1');
        this.Data.LastCharacterPlayed = character;
        this.scene.start("Game", { character: character, mode: mode });
    }

}
