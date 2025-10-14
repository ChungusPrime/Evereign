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
import DefaultCharacterData from '../data/DefaultCharacter';

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
import BallistaTower from '../game_objects/buildings/BallistaTower';
import Dwelling from '../game_objects/buildings/Dwelling';
import Inn from '../game_objects/buildings/Inn';
import GoblinSlinger from '../game_objects/characters/GoblinSlinger';
import StoneDeposit from "../game_objects/deposits/StoneDeposit";
import IronDeposit from "../game_objects/deposits/IronDeposit";
import GoblinFirepit from '../game_objects/lights/GoblinFirepit';
import Torch from '../game_objects/lights/Torch';
import Bloomberry from '../game_objects/plants/Bloomberry';
import Marigold from '../game_objects/plants/Marigold';
import MunklesBrightcap from '../game_objects/plants/MunklesBrightcap';
import OakTree from '../game_objects/plants/OakTree';
import TriggerZone from '../game_objects/Zones/TriggerZone';
import Chapel from '../game_objects/buildings/Chapel';
import Chest from '../game_objects/Chest';
import Obstacle from '../game_objects/Obstacle';
import Switch from '../game_objects/Switch';
import FishingZone from '../game_objects/Zones/FishingZone';
import RespawnZone from '../game_objects/Zones/Respawn';
import Transition from '../game_objects/Zones/Transition';
import Farm from '../game_objects/buildings/Farm';
import Field from '../game_objects/buildings/Field';
import GoblinOutpost from '../game_objects/buildings/GoblinOutpost';
import Market from '../game_objects/buildings/Market';
import Mine from '../game_objects/buildings/Mine';
import TownCentre from '../game_objects/buildings/TownCentre';
import Warehouse from '../game_objects/buildings/Warehouse';
import WarbossGorgutz from '../game_objects/characters/WarbossGorgutz';
import Grenade from '../game_objects/Grenade';

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

    // Navmesh
    public NavMesh: any;
    //public NavMesh: PhaserNavMesh.NavMesh;
    //public NavMeshDebugGraphics: Phaser.GameObjects.Graphics;
    public navMeshPlugin: any;

    public Map: Phaser.Tilemaps.Tilemap;
    public PlayerCharacter: PlayerCharacter;
    public MapRespawnPoint: Phaser.GameObjects.Rectangle;
    public CollisionLayer: Phaser.Tilemaps.TilemapLayer;
    public MapLights: Phaser.GameObjects.Group;
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

        if ( data.character == "Tutorial" ) {
            //GD = 
            //
            // this.Data.Characters[this.characterNameInput.CurrentValue] = DefaultCharacterData;
            // let Character = this.Data.Characters[this.characterNameInput.CurrentValue];

        } else {
            this.DataManager = new DataManager(this);
            const SavedData = JSON.parse(localStorage.getItem("EvereignData"));
            Options = SavedData.Options;
            GD = SavedData.Characters[data.character];
            CD = Campaigns.find(c => c.Name == GD.Campaign);
        }

    }

    async create () {

        // Launch the UI
        this.scene.launch("UI", this);
        this.UI = this.scene.get("UI") as UI;
        this.CameraColourMatrix = this.cameras.main.postFX.addColorMatrix();

        console.log(this.navMeshPlugin);

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
        this.MapLights = this.add.group([], { runChildUpdate: true });
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

        this.LoadMap();

        //this.MapBuilder.CreateMap(this);
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

    LoadMap () {
    
        this.physics.pause();
        this.physics.disableUpdate();
        this.scene.pause("Game");

        // Clear current map
        // Disable collision between player and collision layer
        if ( this.PlayerCollisionLayerCollider !== undefined ) {
            this.PlayerCollisionLayerCollider.active = false;
        }
        
        // Clean up current map
        this.Projectiles.getChildren().forEach((proj: Projectile) => proj.delete());
        this.Projectiles.clear(true, true);
        this.EnemyProjectiles.clear(true, true);
        this.Trees.clear(true, true);
        this.Nodes.clear(true, true);
        this.Chests.clear(true, true);
        this.Plants.clear(true, true);
        this.Zones.clear(true, true);
        this.Enemies.clear(true, true);
        this.Pickups.clear(true, true);
        this.Switches.clear(true, true);
        this.Obstacles.clear(true, true);
        //this.MapLights.forEach((light: Phaser.GameObjects.Light) => this.lights.removeLight(light));
        
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

        // Get default campaign data
        const Campaign = this.DataManager.CampaignData.find( (campaign) => campaign.ID == GD.Campaign );

        const objectTypeToClass: { [key: string]: any } = {
            "Oak Tree": OakTree,
            "Stone Deposit": StoneDeposit,
            "Marigold": Marigold,
            "Iron Deposit": IronDeposit,
            "Bloomberry": Bloomberry,
            "Munkle's Brightcap": MunklesBrightcap,
            "Torch": Torch,
            "Goblin Firepit": GoblinFirepit,
            "Dwelling": Dwelling,
            "Trigger": TriggerZone,
            "Orc Slinger": GoblinSlinger,
            "Inn": Inn,
            "Ballista Tower": BallistaTower,
            "Chapel": Chapel,
            "Town Centre": TownCentre,
            "Goblin Outpost": GoblinOutpost,
            "Market": Market,
            "Warehouse": Warehouse,
            "Field": Field,
            "Mine": Mine,
            "Farm": Farm,
            "Warboss Gorgutz": WarbossGorgutz,
            "Chest": Chest,
            "Obstacle": Obstacle,
            "Fishing Spot": FishingZone,
            "Graveyard": RespawnZone,
            "Transition": Transition,
            "Switch": Switch
        };

        // Spawn World Objects
        try {
            Map.objects.forEach( (layer: Phaser.Tilemaps.ObjectLayer) => {
                //layer.objects = layer.objects.sort((a, b) => a.id - b.id);
                layer.objects.forEach( (object) => {
                    let objectInstance = objectTypeToClass[object.type];
                    if (objectInstance) {
                        let instance = new objectInstance(this, object, false) as Phaser.GameObjects.GameObject;

                        if ( instance instanceof Building ) {
                            this.Buildings.add(instance);
                        }

                        if ( instance instanceof GoblinSlinger ) {
                            this.Enemies.add(instance);
                        }

                    } else {
                        console.warn(`No class found for object type: ${object.type}`);
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }

        console.log(this.Buildings.getChildren());
        console.log(this.Enemies.getChildren());

        if ( GD.PlayerTowns[GD.CurrentMap] !== undefined ) {
            GD.PlayerTowns[GD.CurrentMap].Buildings.forEach((building: { type: string, x: number, y: number, area: string, level: number }) => {
                let objectInstance = objectTypeToClass[building.type];
                if (objectInstance) {
                    let instance = new objectInstance(this, building, true) as Phaser.GameObjects.GameObject;
                    if ( instance instanceof Building ) {
                        this.Buildings.add(instance);
                    }
                } else {
                    console.warn(`No class found for object type: ${building.type}`);
                }
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
        
        this.physics.add.collider(this.Projectiles, this.Trees, (projectile: Projectile, tree: any) => {
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
        
        this.physics.add.collider(this.EnemyProjectiles, this.PlayerCharacter, (projectile: Projectile, player: PlayerCharacter) => {
            projectile.destroy();
            player.TakeDamage(projectile.damage);
        });
        
        this.physics.add.collider(this.Projectiles, this.Enemies, (projectile: Projectile, enemy: Enemy) => {
            this.lights.removeLight(projectile.light);
            projectile.destroy();
            //this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, { message: `-${projectile.damage}`, x: enemy.x, y: enemy.y }));
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
            this.physics.add.overlap(AggroZone, this.PlayerCharacter, (building: Building, PlayerCharacter: PlayerCharacter) => {
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
        
        let MapType = Campaign.WorldMapInformation[GD.CurrentMap].Type;
        if ( MapType == "Exterior" ) {
            this.DaytimeCycleManager.StartRaining();
        } else {
            this.DaytimeCycleManager.StopRaining();
        }
        
        // Camera
        this.cameras.main
        .setSize(1024, 720)
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

    UseScattergun () {
        console.log("Using scattergun");
    }

    UseOffhandItem () {
        //console.log("Using offhand item");
        //let Item = GD.Inventory.Equipment_OffHand;
        //if (!Item) 
            //return console.log("No offhand item equipped");
    }

    CreateNavMesh () {
        this.NavMesh = this.navMeshPlugin.buildMeshFromTilemap("mesh", this.Map, [ this.CollisionLayer ]);
        //console.log(this.NavMesh);
        /*this.NavMesh.enableDebug(); // Creates a Phaser.Graphics overlay on top of the screen
        this.NavMesh.debugDrawClear(); // Clears the overlay
        // Visualize the underlying navmesh
        this.NavMesh.debugDrawMesh({
            drawCentroid: true,
            drawBounds: false,
            drawNeighbors: true,
            drawPortals: true
        });*/
        // Find a path from one point to another
        //const path = this.NavMesh.findPath({ x: this.PlayerCharacter.x, y: this.PlayerCharacter.y }, { x: 4000, y: 4000 });
        //console.log(path);
        // Visualize an individual path
        //this.NavMesh.debugDrawPath(path, 0xffd900);
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
            if ( BaseItemData.Category == "Ammunition" ) {
                this.ActionManager.ReloadMainhandWeapon();
            }

            if ( BaseItemData.Category == "Throwable" ) {
                this.ThrowItem(BaseItemData.ID);
            }

        }
    }

    ThrowItem (itemId: string) {
        console.log("Throwing item");

        console.log(itemId);

        let data = ItemData[itemId];

        if ( !Inv.HasRequiredQuantity(itemId, 1)  )
            return console.log("You have no more of this item left");


        Inv.RemoveItem(itemId, 1);
        let Proj = new Grenade(this, this.PlayerCharacter.x, this.PlayerCharacter.y, 180, [], data.Sprite);

        // Throw grenade towards mouse cursor
        Proj.rotation = Phaser.Math.Angle.Between( this.PlayerCharacter.x, this.PlayerCharacter.y, this.mouseX, this.mouseY );
        Proj.setVelocity( Math.cos(Proj.rotation) * 80, Math.sin(Proj.rotation) * 180 );
        this.Projectiles.add(Proj);

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
