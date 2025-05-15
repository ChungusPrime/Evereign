import UI from './UI';
import Building from '../game_objects/Building';
import Enemy from '../game_objects/Enemy';
import Character from '../game_objects/Character';
import Cursor from '../images/click_cursor.png';
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import DataManager from '../game_objects/managers/DataManager';
import ActivityManager from '../game_objects/managers/ActivityManager';
import Inventory from '../game_objects/managers/Inventory';
import BuildingHelper from '../game_objects/managers/BuildingHelper';
import DayNightCycleManager from '../game_objects/managers/DayNightCycleManager';
import EnemyManager from '../game_objects/managers/EnemyManager';
import ControlManager from '../game_objects/managers/ControlManager';
import QuestManager from '../game_objects/managers/QuestManager';
import Projectile from '../game_objects/Projectile';
import Chest from '../game_objects/Chest';
import FloatingText from '../game_objects/FloatingText';
import Flower from '../game_objects/Flower';
import MiningNode from '../game_objects/MiningNode';
import Obstacle from '../game_objects/Obstacle';
import Switch from '../game_objects/Switch';
import Tree from '../game_objects/Tree';
import NoBuildZone from '../game_objects/Zones/NoBuild';
import RespawnZone from '../game_objects/Zones/Respawn';
import Transition from '../game_objects/Zones/Transition';
import TriggerZone from '../game_objects/Zones/TriggerZone';
import FishingZone from '../game_objects/Zones/FishingZone';

class PlayerRect extends Rectangle {};

class EnemyRect extends Rectangle {
    public enemy: any;
    constructor( props: { x: number, y: number, width: number, height: number, data: any } ) {
        super(props);
        this.enemy = props.data;
    }
};

// Global copy of the current game session data
export let GD: GameData;

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
    public PlayerCharacter: Character;
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

    // Game Object Groups
    public Projectiles: Phaser.GameObjects.Group;
    public EnemyProjectiles: Phaser.GameObjects.Group;
    public Zones: Phaser.GameObjects.Group;
    public Trees: Phaser.GameObjects.Group;
    public Nodes: Phaser.GameObjects.Group;
    public Chests: Phaser.GameObjects.Group;
    public Flowers: Phaser.GameObjects.Group;
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
        console.log(GD);
        return;
    }

    create () {

        this.scene.launch("UI", this);
        this.UI = this.scene.get("UI") as UI;
        this.lights.enable();
        this.input.setDefaultCursor(`url(${Cursor}), pointer`);
        this.sound.play(this.DataManager.GetMapData(GD.CurrentMap).Music, { loop: true });

        this.Buildings = this.add.group([], { runChildUpdate: true });
        this.Projectiles = this.add.group([], { runChildUpdate: true });
        this.EnemyProjectiles = this.add.group([], { runChildUpdate: true });
        this.Trees = this.add.group([]);
        this.Nodes = this.add.group([]);
        this.Chests = this.add.group([]);
        this.Flowers = this.add.group([]);
        this.Zones = this.add.group([]);
        this.Obstacles = this.add.group([]);
        this.Switches = this.add.group([]);
        this.Pickups = this.add.group([], { runChildUpdate: true });
        this.Enemies = this.add.group([], { runChildUpdate: true });

        this.EnemyManager = new EnemyManager(this);
        this.ControlManager = new ControlManager(this);
        this.BuildingHelper = new BuildingHelper(this, this.UI);
        this.DaytimeCycleManager = new DayNightCycleManager(this, this.UI);
        this.ActivityManager = new ActivityManager(this, this.UI);
        this.Inventory = new Inventory(this, this.UI);
        this.PlayerCharacter = new Character(this);
        this.QuestManager = new QuestManager(this);
        this.cameras.main.startFollow(this.PlayerCharacter, true);
        
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O).on('down', () => {
            console.log(GD);
            console.log(this.QuestManager.ActiveQuestButtons);
        });

        this.input.on( "pointermove", ( pointer: Phaser.Input.Pointer ) => {
            this.mouseX = pointer.worldX;
            this.mouseY = pointer.worldY;
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

        this.ChangeMap();
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
            const PlayerRectInstance = new PlayerRect({ x: PlayerPos.x, y: PlayerPos.y, width: 16, height: 16 });
            this.Quadtree.retrieve(PlayerRectInstance).forEach( (element) => {
                if ( element instanceof EnemyRect && !element.enemy.InCombat ) {
                    const distance = Phaser.Math.Distance.BetweenPoints(element, { x: PlayerPos.x, y: PlayerPos.y });
                    if ( distance <= 256 ) element.enemy.Aggro();
                }
            });
        }

    }

    CreateNavMesh () {
        this.NavMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", Map, [ this.CollisionLayer ]);
    }

    GetNavMeshPath () {
        const path = this.NavMesh.findPath({ x: 0, y: 0 }, { x: 300, y: 400 });
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
        console.log(this.ActiveTransition);
        this.UI.HideTransitionScreen();
        this.cameras.main.fadeOut(2000, 0, 0, 0).on('camerafadeoutcomplete', () => {
            const transition = this.DataManager.MapData[GD.CurrentMap].Zones.find( (transition) => transition.ID == this.ActiveTransition );
            if ( !transition ) return;
            console.log(transition);
            GD.CurrentMap = transition.TransitionToMap;
            GD.X = transition.DestinationX;
            GD.Y = transition.DestinationY;
            this.PlayerCharacter.setPosition(transition.DestinationX, transition.DestinationY);
            this.ChangeMap();
        });
    }

    UpdateBestiary ( enemy: string ) {
        GD.Bestiary.find( (bestiary) => bestiary.ID == enemy ).Progress++;
    }

    ChangeMap () {
    
        this.physics.pause();
        this.physics.disableUpdate();
        this.scene.pause("Game");
        
        // Disable collision between player and collision layer
        if ( this.PlayerCollisionLayerCollider !== undefined )
            this.PlayerCollisionLayerCollider.active = false;
        
        // Clean up current map
        this.Projectiles.getChildren().forEach((proj: Projectile) => {
            proj.delete();
        });
        
        this.Projectiles.clear(true, true);
        this.EnemyProjectiles.clear(true, true);
        this.Trees.clear(true, true);
        this.Nodes.clear(true, true);
        this.Chests.clear(true, true);
        this.Flowers.clear(true, true);
        this.Zones.clear(true, true);
        this.Enemies.clear(true, true);
        this.Pickups.clear(true, true);
        this.Switches.clear(true, true);
        this.Obstacles.clear(true, true);
        
        this.MapLights.forEach((light: Phaser.GameObjects.Light) => {
            this.lights.removeLight(light);
        });
        
        this.Buildings.getChildren().forEach((building: Building) => {
            if ( building.AggroCollider !== undefined ) 
                building.AggroCollider.destroy();
        });
        
        this.Buildings.clear(true, true);
        
        if ( this.Map !== undefined ) {
            this.Map.destroy();
        }
        
        // Start building new map
        let Map = this.make.tilemap({
            key: GD.CurrentMap
        });
        
        
        // Load Tilesets
        let Tilesets: Phaser.Tilemaps.Tileset[] = [];
        Map.tilesets.forEach( (tileset: Phaser.Tilemaps.Tileset) => {
            if ( tileset.total == 1 ) return;
            Tilesets.push(Map.addTilesetImage(tileset.name, tileset.name, 32, 32));
        });
        
        // Load Layers
        let Layers: Phaser.Tilemaps.TilemapLayer[] = [];
        Map.getTileLayerNames().forEach( (name: string) => {
            let Layer = Map.createLayer(name, Tilesets, 0, 0);
            if ( Layer === null ) return;
            if ( name == "Collision" ) {
                this.CollisionLayer = Layer;
                this.CollisionLayer.setCollisionByExclusion([-1]);
                this.CollisionLayer.setVisible(false);
            }
            Layer.setPipeline("Light2D");
            Layers.push(Layer);
        });
        
        // Objects
        Map.objects.forEach( (layer: Phaser.Tilemaps.ObjectLayer) => {
            
            if ( layer.name == "Trigger Zones" )
                layer.objects.forEach( (zone) => this.Zones.add(new TriggerZone(this, zone.x, zone.y, zone.width, zone.height, zone.id)) );

            if ( layer.name == "Transition Zones" )
                layer.objects.forEach( (zone) => this.Zones.add(new Transition(this, zone.x, zone.y, zone.width, zone.height, zone.id)) );

            if ( layer.name == "Graveyard Zones" )
                layer.objects.forEach( (zone) => this.Zones.add(new RespawnZone(this, zone.x, zone.y, zone.width, zone.height)) );

            if ( layer.name == "Fishing Zones" )
                layer.objects.forEach( (zone) => this.Zones.add(new FishingZone(this, zone.x, zone.y, zone.width, zone.height)) );
            
            if ( layer.name == "Buildings" )
                layer.objects.forEach( (building) => this.BuildingHelper.CreateBuildingFromMapData(this, building.type, building.x, building.y, building.id) );
            
            if ( layer.name == "Mining Nodes" )
                layer.objects.forEach( (node) => this.Nodes.add(new MiningNode(this, node.x, node.y, node.width, node.height, node.type)) );
            
            if ( layer.name == "Trees" )
                layer.objects.forEach( (tree) => this.Trees.add(new Tree(this, tree.x, tree.y, tree.width, tree.height, tree.type)) );
            
            if ( layer.name == "Flowers" ) 
                layer.objects.forEach( (flower) => this.Flowers.add(new Flower(this, flower.x, flower.y, flower.type)) );
            
            if ( layer.name == "Chests" )
                layer.objects.forEach( (chest) => this.Chests.add(new Chest( this, chest.x, chest.y, chest.id )) );
            
            if ( layer.name == "Lights" )
                layer.objects.forEach((light) => this.MapLights.push(this.lights.addLight(light.x, light.y, 160, 0xe3a456, 1)) );
            
            if ( layer.name == "Characters" )
                layer.objects.forEach((enemy) => this.EnemyManager.SpawnMapEnemy(enemy) );
    
            if ( layer.name == "Obstacles" )
                layer.objects.forEach( (obstacle) => this.Obstacles.add(new Obstacle(this, obstacle.x, obstacle.y, obstacle.id, obstacle.properties[1].value, obstacle.properties[0].value)) );
    
            if ( layer.name == "Switches" )
                layer.objects.forEach( (swt) => this.Switches.add(new Switch(this, swt.x, swt.y, swt.id, swt.properties[1].value, swt.properties[0].value)) );
            
        });
        
        if ( GD.PlayerTowns[GD.CurrentMap] !== undefined ) {
            GD.PlayerTowns[GD.CurrentMap].Buildings.forEach((building: { type: string, x: number, y: number, area: string, level: number }) => {
                this.BuildingHelper.CreateSavedPlayerBuilding(this, building);
            });
        }
        
        // Set up collisions
        this.physics.world.setBounds(0, 0, Map.widthInPixels, Map.heightInPixels);
        // Player
        this.PlayerCollisionLayerCollider = this.physics.add.collider(this.PlayerCharacter, this.CollisionLayer);
        this.physics.add.collider(this.PlayerCharacter, this.Buildings);
        this.physics.add.collider(this.PlayerCharacter, this.Obstacles);
        this.physics.add.collider(this.PlayerCharacter, this.Trees);
        this.physics.add.collider(this.PlayerCharacter, this.Nodes);
        
        // Enable collision between pickups and collision layer so they dont go out of bounds
        this.physics.add.collider(this.Pickups, this.CollisionLayer);
        
        // Placeholder collisions
        this.physics.add.collider(this.BuildingHelper.Placeholder, this.Trees);
        this.physics.add.collider(this.BuildingHelper.Placeholder, this.Buildings);
        
        this.physics.add.collider(this.Projectiles, this.Trees, (projectile: Projectile, tree) => {
            this.sound.play("KineticBoltHit");
            projectile.delete();
            let hitSprite = this.add.sprite(projectile.x, projectile.y, "BloodArcaneOne", 0).play('blood-arcane-anim-1');
            hitSprite.once('animationcomplete', () => {
                hitSprite.destroy();
            });
        });
        
        this.physics.add.collider(this.Projectiles, this.Nodes, (projectile: Projectile, node) => {
            projectile.delete();
        });
        
        this.physics.add.collider(this.EnemyProjectiles, this.PlayerCharacter, (projectile: Projectile, player: Character) => {
            projectile.destroy();
            player.TakeDamage(projectile.damage);
        });
        
        this.physics.add.collider(this.Projectiles, this.Enemies, (projectile: Projectile, enemy: Enemy) => {
            this.lights.removeLight(projectile.light);
            projectile.destroy();
            this.UI.FloatingTexts.push(new FloatingText(this, { message: `-${projectile.damage}`, x: enemy.x, y: enemy.y }));
            enemy.TakeDamage(projectile.damage);
            this.sound.play("KineticBoltHit");
            let hitSprite = this.add.sprite(projectile.x, projectile.y, "BloodArcaneOne", 0).play('blood-arcane-anim-1');
            hitSprite.once('animationcomplete', () => {
                hitSprite.destroy();
            });
        });
        
        // Set up aggro zones for each building
        this.Buildings.getChildren().forEach( (Building: Building) => {
            if ( !Building.AggroZone ) return;
            let AggroZone = this.physics.add.sprite(Building.getCenter().x - Building.width * 2, Building.getCenter().y - Building.height * 2, "character", 0).setCircle(300);
            Building.AggroCollider = AggroZone;
            this.physics.add.overlap(AggroZone, this.PlayerCharacter, (building: Building, PlayerCharacter: Character) => {
                if ( Building.OnAlert == false ) {
                    Building.OnAlert = true;
                }
            });
        });
        
        this.Quadtree = new Quadtree({
            width: Map.widthInPixels,
            height: Map.heightInPixels,
            x: 0,
            y: 0,
            maxObjects: 20,
            maxLevels: 4
        });
        
        this.Map = Map;
        this.DaytimeCycleManager.SetPhase();
        
        if ( this.DataManager.MapData[GD.CurrentMap].Type == "Exterior" ) {
            this.DaytimeCycleManager.StartRaining();
        } else {
            this.DaytimeCycleManager.StopRaining();
        }
        
        // Camera
        this.cameras.main
        .setSize(window.innerWidth * 0.80, window.innerHeight)
        .setZoom(1)
        .setBounds(0, 0, Map.widthInPixels, Map.heightInPixels)
        .centerOn(Map.widthInPixels / 2, Map.heightInPixels / 2)
        .fadeIn(2000, 0, 0, 0, () => {})
        .on('camerafadeincomplete', () => {
            this.PlayerCharacter.PlayerHasControl = true;
        });
        
        // Re-enable collision between player and collision layer
        this.PlayerCollisionLayerCollider.active = true;
        this.physics.resume();
        this.physics.enableUpdate();
        this.scene.resume("Game");
    }

}
