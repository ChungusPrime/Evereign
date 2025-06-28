import UI from './UI';
import Building from '../game_objects/Building';
import Enemy from '../game_objects/Enemy';
import Cursor from '../images/click_cursor.png';
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import DataManager from '../game_objects/managers/DataManager';
import ActivityManager from '../game_objects/managers/ActivityManager';
import Inventory from '../game_objects/UI_Inventory';
import BuildingHelper from '../game_objects/managers/BuildingHelper';
import DayNightCycleManager from '../game_objects/managers/DayNightCycleManager';
import EnemyManager from '../game_objects/managers/EnemyManager';
import ControlManager from '../game_objects/managers/ControlManager';
import QuestManager from '../game_objects/managers/QuestManager';
import PlayerCharacter from '../game_objects/Character';
import MapManager from '../game_objects/MapManager';

class PlayerRect extends Rectangle {
    
}

class EnemyRect extends Rectangle {
    public enemy: any;
    constructor( props: { x: number, y: number, width: number, height: number, data: any } ) {
        super(props);
        this.enemy = props.data;
    }
}

// Global copy of the current game session data
export let GD: Character;

export default class Game extends Phaser.Scene {

    public CharacterName: string;

    public UI: UI;
    public CurrentSaveSlot!: string;

    public mouseX!: number;
    public mouseY!: number;
    
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

    // Managers/Helpers
    public QuestManager: QuestManager;
    public DataManager!: DataManager;
    public Inventory!: Inventory | null;
    public ActivityManager!: ActivityManager | null;
    public BuildingHelper!: BuildingHelper;
    public EnemyManager!: EnemyManager;
    public DaytimeCycleManager!: DayNightCycleManager;
    public ControlManager: ControlManager;
    public MapManager: MapManager;

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

    constructor () {
        super({ key: "Game" });
    }

    init ( data: { character: string } ): void {
        this.CharacterName = data.character;
        this.DataManager = new DataManager(this);
        GD = this.DataManager.CharacterData;
        let Campaign = this.DataManager.CampaignData.find( (campaign) => campaign.ID == GD.Campaign );
        console.log(Campaign);
    }

    create () {

        this.scene.launch("UI", this);
        this.UI = this.scene.get("UI") as UI;
        this.lights.enable();
        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        let Campaign = this.DataManager.CampaignData.find( (campaign) => campaign.ID == GD.Campaign );
        let MapMusic = Campaign.WorldMapInformation[GD.CurrentMap].Music;
        this.sound.play(MapMusic, { loop: true });

        this.Buildings = this.add.group([], { runChildUpdate: true });
        this.Projectiles = this.add.group([], { runChildUpdate: true });
        this.EnemyProjectiles = this.add.group([], { runChildUpdate: true });
        this.Pickups = this.add.group([], { runChildUpdate: true });
        this.Enemies = this.add.group([], { runChildUpdate: true });

        this.Trees = this.add.group([]);
        this.Nodes = this.add.group([]);
        this.Chests = this.add.group([]);
        this.Plants = this.add.group([]);
        this.Zones = this.add.group([]);
        this.Obstacles = this.add.group([]);
        this.Switches = this.add.group([]);

        this.EnemyManager = new EnemyManager(this);
        this.ControlManager = new ControlManager(this);
        this.BuildingHelper = new BuildingHelper(this, this.UI);
        this.DaytimeCycleManager = new DayNightCycleManager(this, this.UI);
        this.ActivityManager = new ActivityManager(this, this.UI);
        this.Inventory = new Inventory(this, this.UI);
        this.PlayerCharacter = new PlayerCharacter(this);
        this.QuestManager = new QuestManager(this);
        this.MapManager = new MapManager(this);
        this.cameras.main.startFollow(this.PlayerCharacter, true);

        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O).on('down', () => console.log(GD));

        this.input.on( "pointermove", ( pointer: Phaser.Input.Pointer ) => {
            this.mouseX = pointer.worldX;
            this.mouseY = pointer.worldY;
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

        this.MapManager.CreateMap(this);

        //this.CreateMap();
        //this.CreateNavMesh();
        //this.GetNavMeshPath(this.PlayerCharacter.x, this.PlayerCharacter.y, GD.X, GD.Y);
    }

    update ( time: number, delta: number ): void {

        this.PlayerCharacter.update(delta);
        this.DaytimeCycleManager.update(delta);
        this.ActivityManager.update(delta);

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
                    if ( distance <= 256 ) {
                        element.enemy.Aggro();
                    }
                }

            });

        }

    }

    CreateNavMesh () {
        this.NavMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", this.Map, [ this.CollisionLayer ]);
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
        //console.log(this.ActiveTransition);
        this.UI.HideTransitionScreen();
        this.cameras.main.fadeOut(2000, 0, 0, 0).on('camerafadeoutcomplete', () => {
            const transition = this.DataManager.MapData[GD.CurrentMap][this.ActiveTransition];
            if ( !transition ) return;
            //console.log(transition);
            GD.CurrentMap = transition.TransitionToMap;
            GD.X = transition.DestinationX;
            GD.Y = transition.DestinationY;
            this.PlayerCharacter.setPosition(transition.DestinationX, transition.DestinationY);
            this.MapManager.CreateMap(this);
        });
    }

    UpdateBestiary ( enemy: string ) {
        GD.Bestiary.find( (bestiary) => bestiary.ID == enemy ).Progress++;
    }

}
