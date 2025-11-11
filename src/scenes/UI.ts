import Game from "./Game";
import FloatingText from "../game_objects/FloatingText";
import Tooltip from "../game_objects/Tooltip";
import Button from "../game_objects/button";
import TownManagement from "../game_objects/UI_TownManagement";
import EventLog from "../game_objects/UI_EventLog";
import DialogueWindow from "../game_objects/UI_DialogueWindow";
import LootWindow from "../game_objects/UI_LootWindow";
import CharacterPanel from "../game_objects/UI_CharacterPanel";
import WorldMap from "../game_objects/UI_WorldMap";
import JournalButton from "../game_objects/JournalButton";
import { GD } from "./Game";
import TradeWindow from "../game_objects/UI_TradeWindow";
import RestMenu from "../game_objects/UI_RestMenu";

export default class UI extends Phaser.Scene {

    public Game!: Game;
    public SelectedBuilding!: string;
    public ActivePanel!: string | null;
    public PanelCamera!: Phaser.Cameras.Scene2D.Camera;
    public SidePanelX!: number;
    public SidePanelWidth!: number;
    public FloatingTexts: FloatingText[] = [];

    public VersionText!: Phaser.GameObjects.Text;

    public TownManagementPanel!: TownManagement;
    public DialogueWindow: DialogueWindow;
    public LootWindow: LootWindow;
    public WorldMap: WorldMap;

    public UILayer!: Phaser.GameObjects.Layer;
    public WorldMapLayer!: Phaser.GameObjects.Layer;
    public DeathScreen!: Phaser.GameObjects.Layer;
    public TransitionScreen: Phaser.GameObjects.Layer;
    public BuidlingPlacementModeHelpText!: Phaser.GameObjects.Text;

    public EventLog: EventLog;

    public DayTimeText!: Phaser.GameObjects.Text;
    public CharacterPanel: CharacterPanel;

    public SaveButton: any;
    public BuildButton: Button;
    public CharacterButton: Button;
    public InventoryButton: Button;
    public JournalButton: Button;
    public WorldMapButton: Button;
    public SidePanelBackground: Phaser.GameObjects.Rectangle;

    public Tooltip: Tooltip;

    public Book!: Phaser.GameObjects.Sprite;
    public LeftBackground: Phaser.GameObjects.Rectangle;
    public RightBackground: Phaser.GameObjects.Rectangle;

    public CurrentJournalPage: string = null;
    public QuestButton: JournalButton;
    

    public Reputation: JournalButton;
    public Lore: JournalButton;
    public Bestiary: JournalButton;
    public Research: JournalButton;
    public Character: JournalButton;
    public Skills: JournalButton;
    public Classes: JournalButton;
    public Equipment: JournalButton;
    public Runes: JournalButton;
    public JournalNavButtons: JournalButton[] = [];

    public QuestView: QuestData;

    public CurrentPage: number = 1;
    public ObjectsPerPage: number = 10;

    public ColourWheel: Phaser.Types.Display.ColorObject[];

    public JournalTextConfig = {
        align: "center",
        fontFamily: "Augusta",
        fontSize: 36 
    };
    BackButton: Phaser.GameObjects.Text;
    NextPage: Phaser.GameObjects.Text;
    PreviousPage: Phaser.GameObjects.Text;
    TradeWindow: TradeWindow;
    QuestObjectivesHeader: Phaser.GameObjects.Text;
    QuestInformationHeader: Phaser.GameObjects.Text;
    ActiveQuestsHeader: Phaser.GameObjects.Text;
    RestMenu: RestMenu;
    Traits: JournalButton;

    constructor () {
        super("UI");
    }

    async create ( Game: Game ) {

        this.Game = Game;

        this.ColourWheel = Phaser.Display.Color.HSVColorWheel();

        this.input.topOnly = true;

        // Main UI Camera
        this.cameras.main.setOrigin(0.5, 0.5);
        this.cameras.main.setPosition(0, 0);
        this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);

        // Set up character panel
        this.CharacterPanel = new CharacterPanel(this);

        this.SidePanelX = this.scale.width * 0.8;

        // Setup Side Panel
        let SidePanel = this.add.group();

        this.SidePanelBackground = this.add.rectangle(this.scale.width * 0.8, 0, this.scale.width * 0.2, this.scale.height, 0x000000, 0.8).setOrigin(0)
        SidePanel.add(this.SidePanelBackground);

        const map = this.make.tilemap({ tileWidth: 82, tileHeight: 82, width: this.scale.width * 0.2, height: this.scale.height});
        const tiles = map.addTilesetImage('wood-tile');
        let SidebarBackground = map.createBlankLayer('layer1', tiles, this.SidePanelBackground.getTopLeft().x, 0, 4, 9).randomize(0, 0, map.width, map.height, [0]);
        SidePanel.add(SidebarBackground);

        let TopBackground = this.add.rectangle(this.SidePanelBackground.getTopLeft().x, this.SidePanelBackground.getTopLeft().y, this.SidePanelBackground.width, 20, 0x000000, 0.8)
        .setOrigin(0);
        SidePanel.add(TopBackground);

        this.VersionText = this.add.text(1, 1, this.game.config.gameVersion).setShadow(2, 2, "#000", 1).setOrigin(0).setFontSize(12);
        SidePanel.add(this.VersionText);

        this.DayTimeText = this.add.text(this.SidePanelBackground.getTopRight().x - 2, 2, `${GD.DaytimeHour.toString().padStart(2, '0')}:${GD.DaytimeMinute.toString().padStart(2, '0')}`, { fontFamily: "Augusta", fontSize: 18 })
        .setOrigin(1, 0)
        .setDepth(3);
        SidePanel.add(this.DayTimeText);

        let RegionText = this.add.text(this.SidePanelBackground.getTopLeft().x + 2, 2, GD.CurrentMap, { fontFamily: "Augusta", fontSize: 18 }).setOrigin(0);
        SidePanel.add(RegionText);

        this.BuildButton = new Button(this, this.SidePanelBackground.getTopLeft().x + 7, this.SidePanelBackground.getTopLeft().y + 25, "Town Management", () => {
            this.ActivePanel = "Buildings";
            this.Game.Inventory.Hide();
            this.TownManagementPanel.Show();
        });

        SidePanel.add(this.BuildButton);
        SidePanel.add(this.BuildButton.text);

        this.InventoryButton = new Button(this, this.SidePanelBackground.getTopLeft().x + 7, this.BuildButton.getBottomLeft().y + 5, "Inventory", () => {
            this.ActivePanel = "Inventory";
            this.Game.Inventory.Show();
        });

        SidePanel.add(this.InventoryButton);
        SidePanel.add(this.InventoryButton.text);

        this.JournalButton = new Button(this, this.SidePanelBackground.getTopLeft().x + 7, this.InventoryButton.getBottomLeft().y + 5, "Journal", () => {
            if ( this.Book.visible == true ) {
                this.LeftBackground.setVisible(false);
                this.RightBackground.setVisible(false);
                this.JournalNavButtons.forEach((button) => {
                    button.setVisible(false);
                });
                this.Book.play('Book Close').once('animationcomplete', () => {
                    this.Book.setVisible(false);
                });
                this.CurrentJournalPage = null;
                this.Game.QuestManager.HideQuestLog();
                this.Game.QuestManager.HideQuestView();
                this.ActiveQuestsHeader.setVisible(false);
                this.QuestObjectivesHeader.setVisible(false);
                this.QuestInformationHeader.setVisible(false);
                return;
            }
            this.Book.setVisible(true);
            this.Book.play('Book Open').once('animationcomplete', () => {
                this.LeftBackground.setVisible(true);
                this.RightBackground.setVisible(true);
                this.JournalNavButtons.forEach((button) => {
                    button.setVisible(true);
                });
                this.CurrentJournalPage = "Journal";
            });
        });

        SidePanel.add(this.JournalButton);
        SidePanel.add(this.JournalButton.text);

        this.WorldMapButton = new Button(this, this.SidePanelBackground.getTopLeft().x + 7, this.JournalButton.getBottomLeft().y + 5, "World Map", () => {
            this.WorldMap.Toggle();
        });

        SidePanel.add(this.WorldMapButton);
        SidePanel.add(this.WorldMapButton.text);
        
        this.SaveButton = new Button(this, this.SidePanelBackground.getTopLeft().x + 7, this.WorldMapButton.getBottomLeft().y + 5, "Save", () => {
            this.Game.DataManager.SaveGame();
        });

        SidePanel.add(this.SaveButton);
        SidePanel.add(this.SaveButton.text);

        // Set up event log
        this.EventLog = new EventLog(this);
        SidePanel.add(this.EventLog.EventLogBackground);

        // Set up World Map
        this.WorldMap = new WorldMap(this);

        // Journal Setup
        this.Book = this.add.sprite(this.Game.cameras.main.width / 2, this.Game.cameras.main.height * 0.45, 'Journal', '0').setDisplaySize(this.scale.width, this.scale.height * 1.5).setOrigin(0.5).setVisible(false);

        // Background sections
        this.LeftBackground = this.add.rectangle(102, 102, 359, 500, 0x000000, 0.05).setOrigin(0, 0).setVisible(false);
        this.RightBackground = this.add.rectangle(572, 102, 359, 500, 0x000000, 0.05).setOrigin(0, 0).setVisible(false);

        this.RestMenu = new RestMenu(this);

        this.QuestObjectivesHeader = this.add.text(this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 20, "Tasks", { 
            fontFamily: "Augusta",
            fontSize: 32
        })
        .setTint(0x000000)
        .setOrigin(0.5, 0)
        .setVisible(false);

        this.QuestInformationHeader = this.add.text(this.RightBackground.getTopCenter().x, this.RightBackground.getTopCenter().y + 20, "Information", { 
            fontFamily: "Augusta",
            fontSize: 32
        })
        .setTint(0x000000)
        .setOrigin(0.5, 0)
        .setVisible(false);

        this.ActiveQuestsHeader = this.add.text(this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 20, "Active Quests", { 
            fontFamily: "Augusta",
            fontSize: 32
        })
        .setTint(0x000000)
        .setOrigin(0.5, 0)
        .setVisible(false);

        // Journal page buttons
        this.Character = new JournalButton( this, this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 50, "Character");
        this.QuestButton = new JournalButton( this, this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 100, "Quests");
        this.Bestiary = new JournalButton( this, this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 150, "Bestiary");
        this.Traits = new JournalButton( this, this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 150, "Traits");
        this.Skills = new JournalButton( this, this.LeftBackground.getTopCenter().x, this.LeftBackground.getTopCenter().y + 150, "Skills");

        //this.Skills = new JournalButton( this, this.Character.getBottomCenter().x, this.Character.getBottomCenter().y + 50, "Skills");
        //this.Classes = new JournalButton( this, this.Skills.getBottomCenter().x, this.Skills.getBottomCenter().y + 50, "Classes & Skills");
        //this.Equipment = new JournalButton( this, this.Classes.getBottomCenter().x, this.Classes.getBottomCenter().y + 50, "Equipment");
        //this.Runes = new JournalButton( this, this.Equipment.getBottomCenter().x, this.Equipment.getBottomCenter().y + 50, "Runes");
        //this.Reputation = new JournalButton( this, this.Milestones.getBottomCenter().x, this.Milestones.getBottomCenter().y + 50, "Reputation");
        //this.Lore = new JournalButton( this, this.Reputation.getBottomCenter().x, this.Reputation.getBottomCenter().y + 50, "Lore");
        //this.Research = new JournalButton( this, this.Bestiary.getBottomCenter().x, this.Bestiary.getBottomCenter().y + 50, "Research");

        this.JournalNavButtons.push(this.Character, this.QuestButton, this.Bestiary);
        this.TownManagementPanel = new TownManagement(this);
        this.BuidlingPlacementModeHelpText = this.add.text(this.scale.displaySize.width * 0.5, this.scale.displaySize.height * 0.9, "Left Click to Place Building\nRight Click to Cancel", { align: "center" }).setOrigin(0.5).setVisible(false);
        this.DialogueWindow = new DialogueWindow(this);
        this.LootWindow = new LootWindow(this);
        this.TradeWindow = new TradeWindow(this);

        /* Map Transition Screen */
        this.TransitionScreen = this.add.layer().setVisible(false);
        let TransitionScreenBackground = this.add.rectangle(this.scale.width / 2, this.scale.height / 2, 300, 400, 0x000000, 0.9).setOrigin(0.5, 0.5);
        let TransitionText = this.add.text(TransitionScreenBackground.getTopCenter().x + 3, TransitionScreenBackground.getTopCenter().y + 5, "Travel to Willowvale Caverns?", { fontSize: 24, align: "center", wordWrap: {
            useAdvancedWrap: true,
            width: TransitionScreenBackground.width - 3
        }}).setOrigin(0.5, 0);
        let CancelTravelButton = new Button(this, TransitionScreenBackground.getBottomCenter().x, TransitionScreenBackground.getBottomCenter().y - 50, "No", () => {
            this.HideTransitionScreen();
            this.Game.ActiveTransition = null;
        });

        CancelTravelButton.setOrigin(0.5, 0);
        Phaser.Display.Align.In.Center(CancelTravelButton.text, CancelTravelButton);

        let TravelButton = new Button(this, CancelTravelButton.getTopCenter().x, CancelTravelButton.getTopCenter().y - 50, "Yes", () => {
            this.Game.TransitionToMap();
        });

        TravelButton.setOrigin(0.5, 0);
        Phaser.Display.Align.In.Center(TravelButton.text, TravelButton);

        this.TransitionScreen.add(TransitionScreenBackground);
        this.TransitionScreen.add(TransitionText);
        this.TransitionScreen.add(TravelButton);
        this.TransitionScreen.add(CancelTravelButton);
        this.TransitionScreen.add(TravelButton.text);
        this.TransitionScreen.add(CancelTravelButton.text);

        // Death Screen
        this.DeathScreen = this.add.layer();
        let DeathScreenBackground = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000, 1).setOrigin(0, 0);
        let DeathScreenText = this.add.text(DeathScreenBackground.getCenter().x, DeathScreenBackground.getCenter().y, "YOU HAVE BEEN SLAIN", { fontSize: 48, align: "center" }).setOrigin(0.5, 0.5);
        let DeathScreenRespawnButton = new Button(this, DeathScreenText.getBottomCenter().x, DeathScreenText.getBottomCenter().y + 20, "Resurrect", () => {
            this.Game.PlayerCharacter.Respawn();
        });
        DeathScreenRespawnButton.x = DeathScreenRespawnButton.x - DeathScreenRespawnButton.width / 2
        DeathScreenRespawnButton.text.x = DeathScreenRespawnButton.text.x - DeathScreenRespawnButton.width / 2
        let Limmy = this.add.sprite(DeathScreenRespawnButton.getBottomCenter().x, DeathScreenRespawnButton.getBottomCenter().y + 40, "Limmy", 0).play("Limmy-Anim");
        this.DeathScreen.add(DeathScreenBackground);
        this.DeathScreen.add(DeathScreenText);
        this.DeathScreen.add(DeathScreenRespawnButton);
        this.DeathScreen.add(DeathScreenRespawnButton.text);
        this.DeathScreen.add(Limmy);
        this.DeathScreen.setVisible(false).setDepth(1001);

        this.Tooltip = new Tooltip(this);

        /**** Camera set up ****/
        // Main Camera
        this.cameras.main.ignore(this.WorldMap.MapImages);
        this.cameras.main.ignore(this.EventLog.EventLogMessages);
        this.cameras.main.ignore(this.DialogueWindow.Text);

        // World Map Camera
        this.WorldMap.Camera.ignore(SidePanel);
        this.WorldMap.Camera.ignore(this.EventLog.EventLogMessages);
        this.WorldMap.Camera.ignore(this.EventLog.EventLogBackground);
        this.WorldMap.Camera.ignore(this.Game.DaytimeCycleManager.RainEmitter);
        this.WorldMap.Camera.ignore(this.DialogueWindow.DialogueLayer);
        this.WorldMap.Camera.ignore(this.DialogueWindow.Text);

        // Event Log Camera
        this.EventLog.EventsLogCamera.ignore(SidePanel);
        this.EventLog.EventsLogCamera.ignore(this.TownManagementPanel.BackgroundObjects);
        this.EventLog.EventsLogCamera.ignore(this.TownManagementPanel.TownListObjects);
        this.EventLog.EventsLogCamera.ignore(this.WorldMap.MapImages);
        this.EventLog.EventsLogCamera.ignore(this.WorldMap.Background);
        this.EventLog.EventsLogCamera.ignore(this.Game.DaytimeCycleManager.RainEmitter);
        this.EventLog.EventsLogCamera.ignore(this.DialogueWindow.DialogueLayer);
        this.EventLog.EventsLogCamera.ignore(this.DialogueWindow.Text);
        this.EventLog.EventsLogCamera.ignore(this.Tooltip);
        this.EventLog.EventsLogCamera.ignore(this.Tooltip.Header);
        this.EventLog.EventsLogCamera.ignore(this.Tooltip.Text);

        this.DialogueWindow.DialogueCamera.ignore(this.WorldMap.MapImages);
        this.DialogueWindow.DialogueCamera.ignore(this.DialogueWindow.DialogueLayer);
        this.DialogueWindow.DialogueCamera.ignore(this.Game.DaytimeCycleManager.RainEmitter);
        this.DialogueWindow.DialogueCamera.ignore(this.CharacterPanel.Group);

        this.Game.events.on('Building-Mode-Deactivated', () => {
            this.ActivePanel = null;
        });

    }

    update(time: number, delta: number): void {
        if ( this.Game.Inventory.HeldItem ) {
            this.Game.Inventory.HeldItem.setPosition(this.input.x, this.input.y);
        }
    }

    ChangeJournalMenu ( page: string ) {

        //this.BackButton.setVisible(true);
        //this.NextPage.setVisible(true);
        //this.PreviousPage.setVisible(true);

        this.CurrentJournalPage = page;

        this.JournalNavButtons.forEach((button) => {
            button.setVisible(false)
        });

        this.Game.QuestManager.HideQuestLog();

        if ( this.CurrentJournalPage == "Quests" ) {
            this.Game.QuestManager.ShowQuestLog();
        }

    }

    ShowDeathScreen () {
        this.DeathScreen.setVisible(true);
        this.EventLog.EventsLogCamera.setVisible(false);
    }

    ShowTransitionScreen () {
        this.TransitionScreen.setVisible(true);
    }

    HideTransitionScreen () {
        this.TransitionScreen.setVisible(false);
    }

}
