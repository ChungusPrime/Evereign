import UI from './UI';
import Building from '../game_objects/Building';
import Enemy from '../game_objects/Character';
import Cursor from '../assets/images/click_cursor.png';
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import PlayerCharacter from '../game_objects/PlayerCharacter';
import MapBuilder from '../systems/MapBuilder';
import { PlayerRect, EnemyRect } from '../game_objects/QuadTree_Rects';
import Campaigns from '../data/Campaigns';
import ItemData from '../data/ItemData';

// Global copy of the current character data
export let GD: Character;
export let CD: Campaign;
export let Options: GameData['Options'];

// Export systems for use globally;
import DataManager from '../game_objects/managers/DataManager';
export let DM: DataManager;

import Inventory from '../systems/Inventory';
export let Inv: Inventory;

import BuildingHelper from '../game_objects/managers/BuildingHelper';
export let BH: BuildingHelper;

import DayNightCycle from '../systems/DayNightCycle';
export let DNC: DayNightCycle;

import EnemyManager from '../game_objects/managers/EnemyManager';
export let EM: EnemyManager;

import QuestManager from '../game_objects/managers/QuestManager';

import ActionManager from '../systems/ActionManager';
import Projectile from '../game_objects/Projectile';

export let QM: QuestManager;

export default class Game extends Phaser.Scene {

    public CharacterName: string;
    public UI: UI;
    public CurrentSaveSlot!: string;
    public mouseX!: number;
    public mouseY!: number;
    //public AimIndicator: Phaser.GameObjects.Rope;
    public graphics: Phaser.GameObjects.Graphics;
    public TownCentre: Building = null;
    public Quadtree!: Quadtree<Rectangle | Circle | Line>;
    public Controls: Phaser.Input.Keyboard.Key[] = [];
    public ActiveTransition: number;
    public PlayerCollisionLayerCollider: Phaser.Physics.Arcade.Collider;
    public NavMesh: any;
    public navMeshPlugin: any;
    public Map: Phaser.Tilemaps.Tilemap;
    public PlayerCharacter: PlayerCharacter;
    public MapRespawnPoint: Phaser.GameObjects.Rectangle;
    public CollisionLayer: Phaser.Tilemaps.TilemapLayer;
    public MapLights: Phaser.GameObjects.Light[] = [];
    public SelectedBuilding: string = "";
    public SelectedObject: Phaser.Physics.Arcade.Sprite | Building | null = null;

    public CameraColourMatrix: Phaser.FX.ColorMatrix = null;

    // Systems
    public DaytimeCycleManager!: DayNightCycle;
    public MapBuilder: MapBuilder;
    public QuestManager: QuestManager;
    public DataManager!: DataManager;
    public Inventory!: Inventory | null;
    public ActionManager!: ActionManager | null;
    public BuildingHelper!: BuildingHelper;
    public EnemyManager!: EnemyManager;

    // Game Object Groups
    public Projectiles: Phaser.GameObjects.Group;
    public EnemyProjectiles: Phaser.GameObjects.Group;
    public Zones: Phaser.GameObjects.Group;
    public Trees: Phaser.GameObjects.Group;
    public Nodes: Phaser.GameObjects.Group;
    public Chests: Phaser.GameObjects.Group;
    public Plants: Phaser.GameObjects.Group;
    public Pickups: Phaser.GameObjects.Group;
    public Enemies: Phaser.GameObjects.Group;
    public Buildings: Phaser.GameObjects.Group;
    public Obstacles: Phaser.GameObjects.Group;
    public Switches: Phaser.GameObjects.Group;
    public Characters: Phaser.GameObjects.Group;

    constructor () {
        super({ key: "Game" });
    }

    init ( data: { character: string } ): void {
        this.CharacterName = data.character;
        this.DataManager = new DataManager(this);
        const SavedData = JSON.parse(localStorage.getItem("EvereignData"));
        Options = SavedData.Options;
        GD = SavedData.Characters[data.character];
        CD = Campaigns.find(c => c.Name == GD.Campaign);
    }

    async create () {

        // Launch the UI
        this.scene.launch("UI", this);
        this.UI = this.scene.get("UI") as UI;
        this.CameraColourMatrix = this.cameras.main.postFX.addColorMatrix();

        // Set cursor image
        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        // Play the specified music for this map
        this.sound.play(CD.WorldMapInformation[GD.CurrentMap].Music, { loop: true });

        this.lights.enable();
        this.Buildings = this.add.group([], { runChildUpdate: true });
        this.Projectiles = this.add.group([], { runChildUpdate: true });
        this.EnemyProjectiles = this.add.group([], { runChildUpdate: true });
        this.Pickups = this.add.group([], { runChildUpdate: true });
        this.Enemies = this.add.group([], { runChildUpdate: true });
        this.Characters = this.add.group([], { runChildUpdate: true });
        this.Trees = this.add.group([]);
        this.Nodes = this.add.group([]);
        this.Chests = this.add.group([]);
        this.Plants = this.add.group([]);
        this.Zones = this.add.group([]);
        this.Obstacles = this.add.group([]);
        this.Switches = this.add.group([]);

        // Systems
        this.DaytimeCycleManager = new DayNightCycle(this, this.UI);
        this.MapBuilder = new MapBuilder(this);
        this.ActionManager = new ActionManager(this, this.UI);
        this.EnemyManager = new EnemyManager(this);
        this.BuildingHelper = new BuildingHelper(this, this.UI);
        this.PlayerCharacter = new PlayerCharacter(this);

        this.Inventory = new Inventory(this, this.UI);
        Inv = this.Inventory;

        this.PlayerCharacter.UpdateStats();

        this.graphics = this.add.graphics();
        this.graphics.setScrollFactor(1);
        this.graphics.setDepth(10000);

        this.QuestManager = new QuestManager(this);

        //this.AimIndicator = this.add.rope( this.PlayerCharacter.getCenter().x, this.PlayerCharacter.getCenter().y, "Rain", 2 ).setDepth(10000000);
        //this.AimIndicator.setPosition(0, 0);
        //this.AimIndicator.setVisible(Options.Show_Aim_Indicator);

        this.cameras.main.startFollow(this.PlayerCharacter, true);

        const ControlMapping: {[key: string]: string | number } = JSON.parse(localStorage.getItem("EvereignData")).Controls;

        const keyCodeMap: {[key: string]: number} = {
            "1": Phaser.Input.Keyboard.KeyCodes.ONE,
            "2": Phaser.Input.Keyboard.KeyCodes.TWO,
            "3": Phaser.Input.Keyboard.KeyCodes.THREE,
            "4": Phaser.Input.Keyboard.KeyCodes.FOUR,
            "5": Phaser.Input.Keyboard.KeyCodes.FIVE,
            "6": Phaser.Input.Keyboard.KeyCodes.SIX,
            "7": Phaser.Input.Keyboard.KeyCodes.SEVEN,
            "8": Phaser.Input.Keyboard.KeyCodes.EIGHT,
            "9": Phaser.Input.Keyboard.KeyCodes.NINE,
            "0": Phaser.Input.Keyboard.KeyCodes.ZERO
        };
        
        for (const [key, value] of Object.entries(ControlMapping)) {
            if ( typeof value === 'string' ) {
                if ( value.includes("mouse") ) {
                    this.input.on('pointerdown', (event: any) => {
                        if ( value == `mouse-${event.button}`) {
                            if ( key == "Weapon_Attack" ) this.UseMainhandItem();
                            if ( key == "Use_Offhand" ) this.UseOffhandItem();
                        }
                    });
                } else {

                    let KeyObject;

                    if ( keyCodeMap[value] ) {
                        KeyObject = this.input.keyboard.addKey(keyCodeMap[value], true, true);
                    } else {
                        KeyObject = this.input.keyboard.addKey(value, true, true);
                    }

                    this.Controls.push(KeyObject);
                    KeyObject.on('down', (event: any) => {
                        if ( key == "Move_Left" ) this.PlayerCharacter.LeftKeyDown = true;
                        if ( key == "Move_Right" ) this.PlayerCharacter.RightKeyDown = true;
                        if ( key == "Move_Up" ) this.PlayerCharacter.UpKeyDown = true;
                        if ( key == "Move_Down" ) this.PlayerCharacter.DownKeyDown = true;
                        if ( key == "Toggle_Light" ) this.PlayerCharacter.ToggleLight();
                        if ( key == "Interact" ) this.ActionManager.StartActivity(this.SelectedObject);
                        if ( key == "Use_Hotbar_1" ) this.UseHotbarSlot("1");
                        if ( key == "Use_Hotbar_2" ) this.UseHotbarSlot("2");
                        if ( key == "Use_Hotbar_3" ) this.UseHotbarSlot("3");
                        if ( key == "Use_Hotbar_4" ) this.UseHotbarSlot("4");
                        if ( key == "Use_Hotbar_5" ) this.UseHotbarSlot("5");
                        if ( key == "Use_Hotbar_6" ) this.UseHotbarSlot("6");
                        if ( key == "Use_Hotbar_7" ) this.UseHotbarSlot("7");
                        if ( key == "Use_Hotbar_8" ) this.UseHotbarSlot("8");
                        if ( key == "Use_Hotbar_9" ) this.UseHotbarSlot("9");
                        if ( key == "Use_Hotbar_10" ) this.UseHotbarSlot("10");
                    });
                    KeyObject.on('up', (event: any) => {
                        if ( key == "Move_Left" ) this.PlayerCharacter.LeftKeyDown = false;
                        if ( key == "Move_Right" ) this.PlayerCharacter.RightKeyDown = false;
                        if ( key == "Move_Up" ) this.PlayerCharacter.UpKeyDown = false;
                        if ( key == "Move_Down" ) this.PlayerCharacter.DownKeyDown = false;
                    });
                }
            }
        }

        console.log(this.Controls);

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O).on('down', () => console.log(GD));
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P).on('down', () => console.log(this.Inventory.Items));
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N).on('down', () => this.UI.RestMenu.showMenu());

        this.input.on( "pointermove", ( pointer: Phaser.Input.Pointer ) => {
            this.mouseX = pointer.worldX;
            this.mouseY = pointer.worldY;

            if ( Options.Show_Aim_Indicator ) {
                this.graphics.clear();
                this.graphics.lineStyle(6, 0xff0000, 1);
                this.graphics.beginPath();
                this.graphics.moveTo(this.PlayerCharacter.getCenter().x, this.PlayerCharacter.getCenter().y);
                this.graphics.lineTo(pointer.worldX, pointer.worldY);
                this.graphics.strokePath();
            }

            if ( !this.BuildingHelper.BuildingPlacementMode ) return;
            this.BuildingHelper.CheckIfPlacementValid();
        });

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
            if ( !this.BuildingHelper.BuildingPlacementMode ) return;
            if ( pointer.leftButtonDown() && this.BuildingHelper.ValidPlacement ) {
                const tile = this.Map.worldToTileXY(this.mouseX, this.mouseY);
                const world = this.Map.tileToWorldXY(tile.x, tile.y);
                this.BuildingHelper.CreateNewPlayerBuilding(this, this.SelectedBuilding, world.x, world.y);
                this.BuildingHelper.DeactivateBuildingMode();
            }
            if ( pointer.rightButtonDown() ) {
                this.BuildingHelper.DeactivateBuildingMode();
            }
        });

        this.MapBuilder.CreateMap(this);
        
        //this.CreateNavMesh();
        //this.GetNavMeshPath(this.PlayerCharacter.x, this.PlayerCharacter.y, GD.X, GD.Y);
    }

    update ( time: number, delta: number ): void {

        this.PlayerCharacter.update(delta);
        this.DaytimeCycleManager.update(delta);
        this.ActionManager.update(delta);

        if ( GD.Inventory.Equipment_MainHand && GD.Inventory.Equipment_MainHand.Cooldown > 0 )
            GD.Inventory.Equipment_MainHand.Cooldown -= delta;
        if ( GD.Inventory.Equipment_MainHand.Cooldown < 0 ) 
            GD.Inventory.Equipment_MainHand.Cooldown = 0;

        /*let PC = this.PlayerCharacter.getCenter();
        this.AimIndicator.setPoints([
            { x: PC.x, y: PC.y },
            { x: this.mouseX, y: this.mouseY }
        ]).setDirty();*/

        // Update quadtree
        this.Quadtree.clear();

        this.Enemies.getChildren().forEach( (enemy: Enemy) => {
            const EnemyRectInstance = new EnemyRect({
                x: enemy.x,
                y: enemy.y,
                width: enemy.width,
                height: enemy.height,
                data: enemy
            });
            this.Quadtree.insert(EnemyRectInstance);
        });

        if ( !this.PlayerCharacter.PlayerIsDead ) {
            let PlayerPos = this.PlayerCharacter.getCenter();
            const PlayerRectInstance = new PlayerRect({ x: PlayerPos.x, y: PlayerPos.y, width: 32, height: 32 });
            this.Quadtree.retrieve(PlayerRectInstance).forEach( (element) => {
                if ( element instanceof EnemyRect && !element.enemy.InCombat ) {
                    const distance = Phaser.Math.Distance.BetweenPoints(element, { x: PlayerPos.x, y: PlayerPos.y });
                    if ( distance <= 256 )
                        element.enemy.Aggro();
                }

            });
        }

    }

    UseMainhandItem () {

        console.log("Using mainhand item");

        let Item = GD.Inventory.Equipment_MainHand;

        if (!Item)
            return console.log("No mainhand item equipped");

        if ( Item.Cooldown && Item.Cooldown > 0 )
            return console.log("Item is on cooldown");

        let Data = ItemData[GD.Inventory.Equipment_MainHand.ID];

        if ( Data.Type == "Scattergun" ) {

            if (GD.Inventory.Equipment_MainHand.CurrentMagazine <= 0) {
                console.log("Out of ammo");
                return false;
            }

            let AmmoData = ItemData[GD.Inventory.Equipment_MainHand.Ammo];
            this.sound.play("ShotgunFire");

            for ( let i = 0; i < AmmoData.Properties.Pellets; i++ ) {
                let Proj = new Projectile(this, this.PlayerCharacter.x, this.PlayerCharacter.y, Data.Properties.Velocity, AmmoData.Properties.DamageMod, "ScattergunPellet");
                const baseAngle = Phaser.Math.Angle.Between( this.PlayerCharacter.x, this.PlayerCharacter.y, this.mouseX, this.mouseY );
                const halfSpread = 15 / 2;
                const randomSpread = Phaser.Math.FloatBetween(-halfSpread, halfSpread);
                const spreadRadians = Phaser.Math.DegToRad(randomSpread);
                let angle = baseAngle + spreadRadians;
                Proj.setVelocity( Math.cos(angle) * 400, Math.sin(angle) * 400 );
                this.Projectiles.add(Proj);
            }

            GD.Inventory.Equipment_MainHand.Cooldown = Data.Properties.Cooldown;
            GD.Inventory.Equipment_MainHand.CurrentMagazine = GD.Inventory.Equipment_MainHand.CurrentMagazine - 1;
            console.table(GD.Inventory.Equipment_MainHand);
        }

    }

    UseOffhandItem () {
        console.log("Using offhand item");
        let Item = GD.Inventory.Equipment_OffHand;
        if (!Item) 
            return console.log("No offhand item equipped");
    }

    CreateNavMesh () {
        this.NavMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", this.Map, [ this.CollisionLayer ]);
    }

    UseHotbarSlot (slot: string) {
        console.log("Using hotbar slot");
        let Item = GD.Hotbar[slot];
        console.log(Item);
        if (!Item) 
            return console.log("No item equipped in hotbar slot " + slot);
        if ( Item.Type == "Ability" ) {
            //this.PlayerCharacter.UseAbility(Item.ID);
        }
        
        if ( Item.Type == "Item" ) {

            let BaseItemData = ItemData[Item.ID];
            console.log(BaseItemData);

            // if its ammo, try to reload weapon
            if ( BaseItemData.Type == "Scattergun" ) {
                // Try to reload mainhand weapon
                let MainhandItem = ItemData[GD.Inventory.Equipment_MainHand.ID];
                let CurrentLoadedAmmo = GD.Inventory.Equipment_MainHand.Ammo;
                let MaxMagazine = MainhandItem.Properties.MagazineSize;
                console.log(MainhandItem, CurrentLoadedAmmo, MaxMagazine);
                // Try to find ammo in inventory
                Object.entries(GD.Inventory).find( ([key, invItem]) => {
                    if ( invItem && invItem.ID == CurrentLoadedAmmo ) {
                        GD.Inventory.Equipment_MainHand.CurrentMagazine = MaxMagazine;
                        this.Inventory.RemoveItem(CurrentLoadedAmmo, MaxMagazine);
                        console.log("Reloaded!");
                        return true;
                    }
                });
                console.log("No ammo!");
            }


        }
    }

    GetNavMeshPath (x: number, y: number, targetX: number, targetY: number) {
        const path = this.NavMesh.findPath({ x: x, y: y }, { x: targetX, y: targetY });
        this.NavMesh.enableDebug();
        this.NavMesh.debugDrawClear();
        this.NavMesh.debugDrawMesh({
            drawCentroid: true,
            drawBounds: false,
            drawNeighbors: true,
            drawPortals: true
        });
        this.NavMesh.debugDrawPath(path, 0xffd900);
    }

    TransitionToMap () {
        this.PlayerCharacter.PlayerHasControl = false;
        this.UI.HideTransitionScreen();
        this.cameras.main.fadeOut(2000, 0, 0, 0).on('camerafadeoutcomplete', () => {
            const transition = this.DataManager.MapData[GD.CurrentMap][this.ActiveTransition];
            if ( !transition ) return;
            GD.CurrentMap = transition.TransitionToMap;
            GD.X = transition.DestinationX;
            GD.Y = transition.DestinationY;
            this.PlayerCharacter.setPosition(transition.DestinationX, transition.DestinationY);
            this.MapBuilder.CreateMap(this);
        });
    }

    UpdateBestiary ( enemy: string ) {
        GD.Bestiary.find( (bestiary) => bestiary.ID == enemy ).Progress++;
    }

    Save () {
        
    }

}
