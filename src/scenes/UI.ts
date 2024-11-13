import Game from "./Game";
import Button from "../game_objects/button";
import BuildMenu from "../game_objects/BuildMenu";
import FloatingText from "../game_objects/FloatingText";
import EventLog from "../game_objects/EventLog";
import MilestonesMenu from "../game_objects/MilestoneMenu";
import Tooltip from "../game_objects/Tooltip";
import DialogueWindow from "../game_objects/DialogueWindow";

export default class UI extends Phaser.Scene {

    public Game!: Game;
    public UILayer!: Phaser.GameObjects.Layer;
    public WorldMapLayer!: Phaser.GameObjects.Layer;
    public DeathScreen!: Phaser.GameObjects.Layer;
    public BuidlingPlacementModeHelpText!: Phaser.GameObjects.Text;
    public SelectedBuilding!: string;
    public ActivePanel!: string | null;
    public PanelCamera!: Phaser.Cameras.Scene2D.Camera;
    public SidePanelX!: number;
    public SidePanelWidth!: number;
    public FloatingTexts: FloatingText[] = [];
    public EventLog!: EventLog;
    public Tooltip!: Tooltip
    public VersionText!: Phaser.GameObjects.Text;

    public ActivityProgressBar!: Phaser.GameObjects.Image;
    public ActivityProgressText!: Phaser.GameObjects.Text;
    public ActivityProgressBarBG!: Phaser.GameObjects.Rectangle;

    public BuildMenu!: BuildMenu;
    public SkillMenu!: BuildMenu;
    public MilestonesMenu!: MilestonesMenu;

    public DialogueWindow: DialogueWindow;

    public Book!: Phaser.GameObjects.Sprite;

    public WorldMapCamera!: Phaser.Cameras.Scene2D.Camera;
    public WorldMap!: Phaser.GameObjects.Image;

    public WorldMapRegions: any = [
        { name: "Willowvale", rect: null },
        { name: "Willowvale North", rect: null },
        { name: "Willowvale East", rect: null },
    ];

    public EventsLogCamera!: Phaser.Cameras.Scene2D.Camera;
    public EventLogMessages!: Phaser.GameObjects.Layer;
    public EventLogBackground!: Phaser.GameObjects.Rectangle;
    public DayTimeText!: Phaser.GameObjects.Text;
    LifeBar: Phaser.GameObjects.Image;

    constructor () {
        super("UI");
    }

    create ( Game: Game ) {

        this.Game = Game;
        
        this.Tooltip = new Tooltip(this);
        
        this.VersionText = this.add.text(3, 3, this.game.config.gameVersion);

        // Layers
        this.EventLogMessages = this.add.layer();
        this.WorldMapLayer = this.add.layer();
        this.UILayer = this.add.layer();
        this.DeathScreen = this.add.layer();

        let WillowvaleMap = this.add.image(this.scale.width / 2, this.scale.height / 2, "WillowvaleMap").setOrigin(0.5).setDisplaySize(2000, 2000).setInteractive()
        .on('pointerover', () => {
            let data = this.Game.DataManager.GetMapData("Willowvale");
            console.log(data);
            const hsv = Phaser.Display.Color.HSVColorWheel();
            WillowvaleMap.setTint(hsv[192].color);
        })
        .on('pointerout', () => {
            WillowvaleMap.clearTint();
        })
        this.WorldMapLayer.add(WillowvaleMap);

        this.UILayer.add(this.VersionText);

        this.WorldMapCamera = this.cameras.add(this.Game.cameras.main.width / 2 - 400, this.Game.cameras.main.height / 2 - 300, 800, 600, false, "World-Map-Camera")
        .setOrigin(0.5, 0.5)
        .setBackgroundColor({ r: 0, g: 0, b: 0, a: 255 })
        .setVisible(false)
        .setZoom(0.1)
        .ignore(this.UILayer)
        .ignore(this.EventLogMessages)
        .ignore(this.DeathScreen)

        this.input.on("pointermove", (p: Phaser.Input.Pointer ) => {
            if (p.isDown) {
                this.WorldMapCamera.scrollX -= (p.x - p.prevPosition.x) / this.WorldMapCamera.zoom;
                this.WorldMapCamera.scrollY -= (p.y - p.prevPosition.y) / this.WorldMapCamera.zoom;
            }
        }).on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            const current_zoom = this.WorldMapCamera.zoom;
            if ( pointer.deltaY > 0 ) {
                if ( current_zoom < 0.2 ) return;
                this.WorldMapCamera.zoom -= 0.02;
            } else {
                if ( current_zoom > 1.5 ) return;
                this.WorldMapCamera.zoom += 0.02;
            }
        });
        // End World Map //

        // Main UI Camera
        this.cameras.main.setOrigin(0.5, 0.5);
        this.cameras.main.setPosition(0, 0);
        this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
        this.cameras.main.ignore(this.WorldMapLayer);
        this.cameras.main.ignore(this.EventLogMessages);

        this.ActivityProgressBarBG = this.add.rectangle(this.cameras.main.width / 2 - 200, this.cameras.main.height * 0.9, 200, 20, 0x000000, 0.9).setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressBar = this.add.image(this.cameras.main.width / 2 - 200, this.cameras.main.height * 0.9, "blue-bar").setDisplaySize(200, 20).setOrigin(0, 0.5).setVisible(false);
        this.ActivityProgressText = this.add.text(this.ActivityProgressBar.getTopCenter().x, this.ActivityProgressBar.getTopCenter().y - this.ActivityProgressBar.height, "Current Activity").setOrigin(0.5).setVisible(false);

        this.BuidlingPlacementModeHelpText = this.add.text(this.scale.displaySize.width * 0.5, this.scale.displaySize.height * 0.9, "Left Click to Place Building\nRight Click to Cancel", { align: "center" }).setOrigin(0.5).setVisible(false);

        this.SidePanelX = this.scale.width * 0.8;
        this.SidePanelWidth = this.scale.width * 0.2;

        const map = this.make.tilemap({ tileWidth: 82, tileHeight: 82, width: this.scale.width * 0.2, height: this.scale.height});
        const tiles = map.addTilesetImage('wood-tile');

        let layer = null;

        if ( tiles !== null ) {
            layer = map.createBlankLayer('layer1', tiles, this.scale.width * 0.8, 0, 4, 9);
        }

        if ( layer ) {
            layer.randomize(0, 0, map.width, map.height, [0]);
        }

        let Divider = this.add.rectangle(this.scale.width * 0.8, 0, 3, this.scale.height, 0x000000, 1).setOrigin(0);
        let TopBackground = this.add.rectangle(this.scale.width * 0.8, 0, this.scale.width * 0.2, 20, 0x000000, 1).setOrigin(0);

        // Gold
        //let GoldIcon = this.add.sprite(this.scale.width * 0.8, 0, "items", 3).setOrigin(0);
        //let GoldText = this.add.text(GoldIcon.x + GoldIcon.width + 5, 8, `${this.Game.ResourceManager.Gold}gp`, { fontSize: 20 }).setOrigin(0);

        let RegionText = this.add.text(this.scale.width * 0.8 + 2, 2, this.Game.DataManager.GameData.CurrentMap).setOrigin(0);

        this.BuildMenu = new BuildMenu(this);

        this.EventLog = new EventLog(this);

        this.SkillMenu = new BuildMenu(this);
        this.MilestonesMenu = new MilestonesMenu(this);
        
        // Buttons
        let BuildButton = new Button(this, this.SidePanelX + 10, TopBackground.getBottomLeft().y + 5, "Buildings", this.ChangeActivePanel.bind(this, "Buildings"));
        let CharacterButton = new Button(this, this.SidePanelX + 10, BuildButton.getBottomLeft().y + 5, "Character", this.ChangeActivePanel.bind(this, "Character"));
        let ResourcesButton = new Button(this, this.SidePanelX + 10, CharacterButton.getBottomLeft().y + 5, "Inventory", this.ChangeActivePanel.bind(this, "Resources"));

        let JournalButton = new Button(this, this.SidePanelX + 10, ResourcesButton.getBottomLeft().y + 5, "Journal", () => {
            this.Book.setVisible(true);
            this.Book.play('Book Open').on('animationcomplete', () => {
                //this.Book.setFrame("0");
                console.log("book open");
            });
        });

        let WorldMapButton = new Button(this, this.SidePanelX + 10, JournalButton.getBottomLeft().y + 5, "World Map", this.ShowWorldMap.bind(this));
        
        let SaveButton = new Button(this, this.SidePanelX + 10, WorldMapButton.getBottomLeft().y + 5, "Save", () => {
            this.Game.DataManager.SaveGame();
        });
        
        // Merge into "Buildings":
        //let PeopleButton = new Button(this, this.scale.width * 0.8 + 5, 95, "People", this.ChangeActivePanel.bind(this, "People"));
        //let ResearchButton = new Button(this, this.scale.width * 0.8 + 5, 260, "Research", this.ChangeActivePanel.bind(this, "Research"));

        // Merge into "Character":
        //let SkillsButton = new Button(this, this.SidePanelX + 10, CharacterButton.getBottomLeft().y + 5, "Skills", this.ChangeActivePanel.bind(this, "Skills"));

        // Merge into "Journal":
        //let MilestonesButton = new Button(this, this.SidePanelX + 10, ResourcesButton.getBottomLeft().y + 5, "Milestones", this.ChangeActivePanel.bind(this, "Milestones"));
        //let InfoButton = new Button(this, (ResourcesButton.x + ResourcesButton.button.width) + 5, 150, "Game Info", this.ChangeActivePanel.bind(this, "Game Info"));
        //let BestiaryButton = new Button(this, (MilestonesButton.x + MilestonesButton.button.width) + 5, 205, "Bestiary", this.ChangeActivePanel.bind(this, "Bestiary"));
        //let FactionsButton = new Button(this, (ResearchButton.x + ResearchButton.button.width) + 5, 260, "Factions", this.ChangeActivePanel.bind(this, "Factions"));

        this.EventLogBackground = this.add.rectangle(this.SidePanelX + 10, SaveButton.getBottomLeft().y + 5, this.SidePanelWidth - 20, 420, 0x000000, 0.8)
        .setOrigin(0)
        .setInteractive()
        .on("wheel", ( pointer: Phaser.Input.Pointer ) => {
            this.EventsLogCamera.scrollY += (pointer.deltaY * 0.1);
        })
        .setStrokeStyle(2, 0xffffff, 1);

        this.DayTimeText = this.add.text(
            this.scale.width * 1 - 2,
            2,
            `${this.Game.DataManager.GameData.DaytimeHour.toString().padStart(2, '0')}:${this.Game.DataManager.GameData.DaytimeMinute.toString().padStart(2, '0')}`
        ).setOrigin(1, 0).setDepth(10000);
        this.UILayer.add(this.DayTimeText);

        this.UILayer.add([
            layer,
            this.ActivityProgressBarBG,
            this.ActivityProgressBar,
            this.ActivityProgressText,
            this.BuidlingPlacementModeHelpText,
            Divider,
            TopBackground,
            RegionText,
            this.DayTimeText,
            BuildButton,
            BuildButton.text,
            CharacterButton,
            CharacterButton.text,
            ResourcesButton,
            ResourcesButton.text,
            JournalButton,
            JournalButton.text,
            WorldMapButton,
            WorldMapButton.text,
            SaveButton,
            SaveButton.text,
            this.EventLogBackground
        ]);

        this.UILayer.setDepth(999);
        this.EventLogMessages.setDepth(1000);

        this.EventsLogCamera = this.cameras.add(this.EventLogBackground.getTopLeft().x, this.EventLogBackground.getTopLeft().y, this.SidePanelWidth - 20, 420, false, "Event-Log-Camera")
        .setVisible(true)
        .setZoom(1)
        .ignore(this.WorldMapLayer)
        .ignore(this.UILayer)
        .ignore(this.DeathScreen)
        .setBounds(this.EventLogBackground.getTopLeft().x, this.EventLogBackground.getTopLeft().y, this.SidePanelWidth - 20, 400)
        .setBackgroundColor({ r: 100, b: 100, g: 100, a: 100 })

        this.DialogueWindow = new DialogueWindow(this);
        this.DialogueWindow.Create();

        if ( !this.Game.DataManager.GameData.ProgressFlags.includes(1) ) {
            this.DialogueWindow.Show("IntroText");
        }

        // Bottom Left Character Panel;
        let CurrentClass = this.Game.DataManager.GameData.CurrentClass;
        let ClassAbilities = this.Game.DataManager.GetClass(CurrentClass).abilities;
        if ( ClassAbilities !== undefined ) {
            let X = 5;
            for (const [key, value] of Object.entries(ClassAbilities)) {
                //if ( key == "Passive" ) continue;
                let rect = this.add.image(X, this.cameras.main.height - 5, "panel-small").setOrigin(0, 1);
                this.UILayer.add(rect);
                const sprite = value.sprite.split("-");
                let icon = this.add.sprite(rect.getCenter().x, rect.getCenter().y, sprite[0], sprite[1]).setOrigin(0.5);
                this.UILayer.add(icon);
                let input_icon = null;
                if ( key == "Passive" ) {
                    input_icon = this.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 94).setOrigin(0);
                } else if ( key == "Ability_1" ) {
                    input_icon = this.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 77).setOrigin(0);
                } else if ( key == "Ability_2" ) {
                    input_icon = this.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 85).setOrigin(0);
                } else if ( key == "Ability_3" ) {
                    input_icon = this.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 52).setOrigin(0);
                } else if ( key == "Ability_4" ) {
                    input_icon = this.add.sprite(rect.getTopLeft().x, rect.getTopLeft().y, "inputs", 87).setOrigin(0);
                }
                this.UILayer.add(input_icon);
                X += 48;
            }
        }

        // Health
        let LifeBG = this.add.rectangle(5, this.cameras.main.height - 100, 200, 20, 0x000000, 0.9).setDisplaySize(200, 20).setOrigin(0, 1);
        this.UILayer.add(LifeBG);
        this.LifeBar = this.add.image(5, this.cameras.main.height - 100, "red-bar").setDisplaySize(LifeBG.width, 20).setOrigin(0, 1);
        this.UILayer.add(this.LifeBar);
        let LifeText = this.add.text(this.LifeBar.getTopLeft().x, this.LifeBar.getTopLeft().y, "LIFE").setOrigin(0, 0);
        this.UILayer.add(LifeText);

        // Resource
        let ManaBG = this.add.rectangle(5, this.cameras.main.height - 75, 200, 20, 0x000000, 0.9).setDisplaySize(200, 20).setOrigin(0, 1);
        this.UILayer.add(ManaBG);
        let ManaBar = this.add.image(5, this.cameras.main.height - 75, "blue-bar").setDisplaySize(200, 20).setOrigin(0, 1);
        this.UILayer.add(ManaBar);
        let ManaText = this.add.text(ManaBar.getTopLeft().x, ManaBar.getTopLeft().y, "MANA").setOrigin(0, 0);
        this.UILayer.add(ManaText);

        this.Book = this.add.sprite(this.Game.cameras.main.width / 2, this.Game.cameras.main.height * 0.45, 'Journal', '0').setDisplaySize(this.scale.width, this.scale.height * 1.5).setOrigin(0.5).setVisible(false);
        this.UILayer.add(this.Book);

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

        // Side tab
        //this.add.nineslice(this.scale.width / 2, this.scale.height / 2, 'book', '5.png').setOrigin(0.5);

        this.Game.events.on('Building-Mode-Deactivated', () => {
            this.ActivePanel = null;
        });

        this.Game.events.on('Activity-Started', (activity: any) => {
            console.log("Activity started", activity);
            this.ActivityProgressBar.setDisplaySize(0, 20);
            this.ActivityProgressBar.setVisible(true);
            this.ActivityProgressText.setText(activity.Type).setVisible(true);
            this.ActivityProgressBarBG.setVisible(true);
        });

        this.Game.events.on('Activity-Update', (activity: any) => {
            console.log("Activity tick", activity);
            this.ActivityProgressBar.setDisplaySize(0, 20);
            let ev = { message: "", sprite1: "", sprite2: 0, x: this.Game.PlayerCharacter.x, y: this.Game.PlayerCharacter.y };
            if ( activity.Type == "Cutting wood" ) {
                ev.message = "+1 Oak Log";
                ev.sprite1 = "general";
                ev.sprite2 = 21;
            } else if ( activity.Type == "Mining stone" ) {
                ev.message = "+1 Rough Stone";
                ev.sprite1 = "general";
                ev.sprite2 = 60;
            } else if ( activity.Type == "Mining iron" ) {
                ev.message = "+1 Iron Ore";
                ev.sprite1 = "general";
                ev.sprite2 = 62;
            }
            this.FloatingTexts.push(new FloatingText(this.Game, ev));
        });

        this.Game.events.on('Activity-Ended', (activity: any) => {
            console.log("Activity ended", activity);
            this.ActivityProgressBar.setDisplaySize(0, 20);
            this.ActivityProgressBar.setVisible(false);
            this.ActivityProgressText.setVisible(false);
            this.ActivityProgressBarBG.setVisible(false);
        });

    }

    update ( time: number, delta: number ): void {
        if ( this.Game.ActivityManager.CurrentActivity.Type != "" )
            this.ActivityProgressBar.setDisplaySize( this.Game.ActivityManager.CurrentActivity.Delta / 5000 * 200 , 20 );
    }

    ChangeActivePanel ( PanelName: string ): void {
        if ( this.ActivePanel != null ) return;
        this.ActivePanel = PanelName;
        switch ( PanelName ) {
            case "Buildings": this.BuildMenu.Show(); break;
            case "Skills": this.SkillMenu.Show(); break;
            case "Resources": this.Game.InventoryManager.Show(); break;
            case "Milestones": this.MilestonesMenu.Show(); break;
        }
    }

    HideActivePanel () {
        if ( this.ActivePanel == null ) return;
        switch ( this.ActivePanel ) {
            case "Buildings": this.BuildMenu.Hide(); break;
            case "Skills": this.SkillMenu.Hide(); break;
            case "Resources": this.Game.InventoryManager.Hide(); break;
            case "Milestones": this.MilestonesMenu.Hide(); break;
        }
    }
    
    ShowWorldMap () {
        if ( this.WorldMapCamera.visible == true ) {
            this.WorldMapCamera.setVisible(false);
        } else {
            this.WorldMapCamera.setVisible(true);
        }
    }

    SelectBuilding ( buildingName: string ) {
        this.Game.BuildingManager.ActivateBuildingMode(buildingName);
    }

    ShowDeathScreen () {
        this.DeathScreen.setVisible(true);
        this.EventsLogCamera.setVisible(false);
    }

}
