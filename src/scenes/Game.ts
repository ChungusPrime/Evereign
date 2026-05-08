import UI from './UI';
import Building from '../game_objects/Building';
import Enemy from '../game_objects/Character';
import Cursor from '../assets/images/click_cursor.png';
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import { getObjectsInArc, getObjectsInCircle, createHammerSlam, ArcWidths } from '../utils/geometry';
import PlayerCharacter from '../game_objects/PlayerCharacter';
import MapBuilder from '../systems/MapBuilder';
import { PlayerRect, EnemyRect } from '../game_objects/QuadTree_Rects';
import Campaigns from '../data/Campaigns';
import MapData from '../data/MapData';
import ItemData from '../data/ItemData';
import Abilities from '../data/Abilities';

// Global copies of various game data for easy access across the codebase
// Dynamic Character/Map Data
export let GD: Character = null;
export let CMD: WorldData = null;

// Static Campaign / Map Data
export let CD: Campaign = null;
export let MD: WorldData = null;

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

import QuestManager from '../game_objects/managers/QuestManager';
export let QM: QuestManager;

export let PC: PlayerCharacter;

import ActionManager from '../systems/ActionManager';
import InputManager from '../systems/InputManager';
import Projectile from '../game_objects/Projectile';
import Grenade from '../game_objects/Grenade';
import GameObjectsMap from '../data/GameObjects';

export default class Game extends Phaser.Scene {

    public CharacterName: string;
    public GameMode: string;

    public UI: UI;
    public CurrentSaveSlot!: string;
    public mouseX!: number;
    public mouseY!: number;
    public AimIndicator: Phaser.GameObjects.Line;
    public graphics: Phaser.GameObjects.Graphics;
    public TownCentre: Building = null;
    public Quadtree!: Quadtree<Rectangle | Circle | Line>;
    public Controls: Phaser.Input.Keyboard.Key[] = [];
    public ActiveTransition: number;
    public PlayerCollisionLayerCollider: Phaser.Physics.Arcade.Collider;

    public Map: Phaser.Tilemaps.Tilemap;
    public PlayerCharacter: PlayerCharacter;
    public MapRespawnPoint: Phaser.GameObjects.Rectangle;
    public CollisionLayer: Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer;
    public MapLights: Phaser.GameObjects.Group;
    public SelectedBuilding: string = "";
    public SelectedObject: Phaser.Physics.Arcade.Sprite | Building | null = null;
    public CameraColourMatrix: Phaser.Filters.ColorMatrix = null;

    // Systems
    public DaytimeCycleManager!: DayNightCycle;
    public MapBuilder: MapBuilder;
    public QuestManager: QuestManager;
    public DataManager!: DataManager;
    public Inventory!: Inventory | null;
    public ActionManager!: ActionManager | null;
    public InputManager!: InputManager;
    public BuildingHelper!: BuildingHelper;

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

    public HeldObject: { Type: string | null, ID: string | null, Sprite: Phaser.GameObjects.Sprite | null } = {
        Type: null,
        ID: null,
        Sprite: null
    }

    public LastHarvestedTreeUpdate = 0;

    constructor () {
        super({ key: "Game" });
    }

    init ( data: { character: string, mode: string } ): void {
        this.CharacterName = data.character;
        this.GameMode = data.mode;
    }

    async create () {

        console.log(`Starting game with character: ${this.CharacterName} in mode: ${this.GameMode}`);

        this.DataManager = new DataManager(this);
        const SavedData = JSON.parse(localStorage.getItem("EvereignData"));

        Options = SavedData.Options;

        GD = SavedData.Characters[this.CharacterName];
        CMD = GD.WorldData[GD.CurrentMap] ?? null;

        if ( this.GameMode == "Arena" ) {
            GD.X = 1600;
            GD.Y = 1600;
            GD.CurrentMap = "Arena";
            GD.DaytimeDelta = 0;
            GD.DaytimeHour = 12;
            GD.DaytimeMinute = 0;
            MD = MapData["Arena"];
            GD.WorldData = { 'Arena': {} };
            Object.keys(MD).forEach( (key) => {
                GD.WorldData["Arena"][key] = MD[key].InitialData;
            });
            CMD = GD.WorldData["Arena"];
        } else if ( this.GameMode == "Adventure" ) {
            // Load campaign data
            CD = Campaigns.find(c => c.Name == GD.Campaign) ?? null;
            // Load map-specific data for the current map within the campaign
            MD = Campaigns.find(c => c.Name == GD.Campaign)?.WorldData[GD.CurrentMap] ?? null;
            console.log(`Loaded campaign data for ${GD.Campaign}:`, CD);
        }

        // Launch the UI
        this.scene.launch("UI", this);
        this.UI = this.scene.get("UI") as UI;
        this.CameraColourMatrix = this.cameras.main.filters.external.addColorMatrix();

        // Set cursor image
        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        // Play the specified music for this map
        if ( this.GameMode == "Arena" ) {
            this.sound.play("theme", { loop: true });
        } else {
            this.sound.play(MD.Information.Music, { loop: true });
        }
        
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
        this.DaytimeCycleManager = new DayNightCycle(this, this.UI, GD.DaytimeHour, GD.DaytimeMinute, GD.DaytimeDelta);
        this.MapBuilder = new MapBuilder(this);
        this.ActionManager = new ActionManager(this, this.UI);
        this.BuildingHelper = new BuildingHelper(this, this.UI);

        this.Inventory = new Inventory(this, this.UI);
        Inv = this.Inventory;

        this.PlayerCharacter = new PlayerCharacter(this);
        PC = this.PlayerCharacter;
        PC.UpdateStats();

        this.graphics = this.add.graphics();
        this.graphics.setScrollFactor(1);
        this.graphics.setDepth(10000);

        this.QuestManager = new QuestManager(this);

        //this.AimIndicator = this.add.rope( this.PlayerCharacter.getCenter().x, this.PlayerCharacter.getCenter().y, "Rain", 2 ).setDepth(10000000);
        //this.AimIndicator.setPosition(0, 0);
        //this.AimIndicator.setVisible(Options.Show_Aim_Indicator);

        this.cameras.main.startFollow(this.PlayerCharacter, true);

        // Initialize input handling
        this.InputManager = new InputManager(this);

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

            if ( this.BuildingHelper.BuildingPlacementMode ) {
                this.BuildingHelper.CheckIfPlacementValid();
            }
                
        });

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {

            // If building mode is active, try to place building
            if ( pointer.leftButtonDown() && this.BuildingHelper.BuildingPlacementMode && this.BuildingHelper.ValidPlacement ) {
                const tile = this.Map.worldToTileXY(this.mouseX, this.mouseY);
                const world = this.Map.tileToWorldXY(tile.x, tile.y);
                this.BuildingHelper.CreatePlayerBuilding(this.SelectedBuilding, world.x, world.y);
            }

            // Right click to cancel building mode
            if ( pointer.rightButtonDown() && this.BuildingHelper.BuildingPlacementMode ) {
                this.BuildingHelper.DeactivateBuildingMode();
            }

            if ( pointer.rightButtonDown() && this.HeldObject.Sprite !== null ) {
                this.HeldObject.Sprite.destroy();
                this.HeldObject = { Type: null, ID: null, Sprite: null };
                Inv?.Items.forEach(item => item.Refresh());
            }

        });

        this.LoadMap(GD.CurrentMap);
    }

    update ( time: number, delta: number ): void {

        this.PlayerCharacter.update(delta);
        this.DaytimeCycleManager.update(delta);
        this.ActionManager.update(delta);

        this.LastHarvestedTreeUpdate += delta;
        if ( this.LastHarvestedTreeUpdate >= 1000 ) {
            let DepletedHarvestables = CMD.DepletedHarvestables ?? [];
            if ( DepletedHarvestables.length > 0 ) {
                this.Trees.getChildren().forEach( (tree: Phaser.Physics.Arcade.Sprite) => {
                    if ( DepletedHarvestables.includes(tree.getData("tiled_id")) ) {
                        (tree as any).RespawnTime -= 1;
                        if ( (tree as any).RespawnTime <= 0 ) {
                            (tree as any).Regenerate();
                        }
                    }
                });
            }
            this.LastHarvestedTreeUpdate = 0;
        }

        if ( GD.Inventory.Equipment_MainHand && GD.Inventory.Equipment_MainHand.Cooldown > 0 )
            GD.Inventory.Equipment_MainHand.Cooldown -= delta;

        if ( GD.Inventory.Equipment_MainHand && GD.Inventory.Equipment_MainHand.Cooldown < 0 ) 
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

    LoadMap ( key: string ) {
        
        // Pause the scene while we load the new map
        this.physics.pause();
        this.physics.disableUpdate();
        this.scene.pause("Game");

        if ( this.PlayerCollisionLayerCollider !== undefined )
            this.PlayerCollisionLayerCollider.active = false;

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
        
        this.Buildings.getChildren().forEach((building: Building) => {
            if ( building.AggroCollider !== undefined )
                building.AggroCollider.destroy();
        });
        
        this.Buildings.clear(true, true);
        
        if ( this.Map !== undefined ) {
            this.Map.destroy();
        }
        
        // Start building new map
        this.Map = this.make.tilemap({ key: key });
        
        // Load Tilesets
        let Tilesets: Phaser.Tilemaps.Tileset[] = [];
        this.Map.tilesets.forEach( (tileset: Phaser.Tilemaps.Tileset) => {
            if ( tileset.total == 1 ) return;
            Tilesets.push(this.Map.addTilesetImage(tileset.name, tileset.name, 32, 32));
        });
        
        // Load Layers
        let Layers: (Phaser.Tilemaps.TilemapLayer | Phaser.Tilemaps.TilemapGPULayer)[] = [];
        this.Map.layers.forEach( (layerData: Phaser.Tilemaps.LayerData) => {
            let Layer = this.Map.createLayer(layerData.name, Tilesets, 0, 0);
            if ( Layer === null ) return;
            if ( layerData.name == "Collision" ) {
                this.CollisionLayer = Layer;
                this.CollisionLayer.setCollisionByExclusion([-1]);
                this.CollisionLayer.setVisible(false);
            } else {
                Layer.setLighting(true);
            }
            Layers.push(Layer);
        });

        // Spawn World Objects
        try {
            this.Map.objects.forEach( (layer: Phaser.Tilemaps.ObjectLayer) => {
                layer.objects.forEach( (object: Phaser.Types.Tilemaps.TiledObject) => {
                    let objectInstance = GameObjectsMap[object.type];
                    if (objectInstance) {
                        new objectInstance(this, object) as Phaser.GameObjects.GameObject;
                    } 
                    else if ( object.type == "Boat_1") {
                        let boat = this.add.sprite(object.x, object.y, "boats", 0).setOrigin(0, 1).setLighting(true);
                        if ( object.flippedHorizontal ) {
                            boat.setFlipX(true);
                        }
                    }
                    else {
                        console.warn(`No class found for object type: ${object.type}`);
                    }
                });
            });
        } catch (error) {
            console.log(error);
        }

        // Spawn Player Buildings
        if ( GD.PlayerTowns[key] !== undefined ) {
            GD.PlayerTowns[key].Buildings.forEach((building) => {
                let objectInstance = GameObjectsMap[building.type];
                if (objectInstance) {
                    new objectInstance(this, building) as Phaser.GameObjects.GameObject;
                } else {
                    console.warn(`No class found for object type: ${building.type}`);
                }
            });
        }
        
        // Set up collisions
        this.physics.world.setBounds(0, 0, this.Map.widthInPixels, this.Map.heightInPixels);
        
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

            if (projectile instanceof Grenade) {

            } else {
                this.sound.play("KineticBoltHit");
                projectile.delete();
                let hitSprite = this.add.sprite(projectile.x, projectile.y, "BloodArcaneOne", 0).play('blood-arcane-anim-1');
                hitSprite.once('animationcomplete', () => {
                    hitSprite.destroy();
                });
            }

        });
        
        this.physics.add.collider(this.Projectiles, this.Nodes, (projectile: Projectile, node) => {
            projectile.delete();
        });
        
        // Handle enemy projectile collisions with player
        this.physics.add.collider(this.EnemyProjectiles, this.PlayerCharacter, (projectile: Projectile, player: PlayerCharacter) => {
            projectile.destroy();
            player.TakeDamage(projectile.damage);
        });
        
        // Handle player projectile collisions with enemies
        this.physics.add.collider(this.Projectiles, this.Enemies, (projectile: Projectile, enemy: Enemy) => {
            this.lights.removeLight(projectile.light);
            projectile.destroy();
            enemy.TakeDamage(projectile.damage);
            this.sound.play("KineticBoltHit");
            let hitSprite = this.add.sprite(projectile.x, projectile.y, "BloodArcaneOne", 0).play('blood-arcane-anim-1');
            hitSprite.once('animationcomplete', () => {
                hitSprite.destroy();
            });
        });
        
        this.Quadtree = new Quadtree({
            width: this.Map.widthInPixels,
            height: this.Map.heightInPixels,
            x: 0,
            y: 0,
            maxObjects: 100,
            maxLevels: 4
        });
        
        this.DaytimeCycleManager.SetPhase();

        if ( this.GameMode == "Arena" ) {
            this.DaytimeCycleManager.StopRaining();
        } else {
            // Get default campaign data
            const Campaign = this.DataManager.CampaignData.find( (campaign) => campaign.ID == GD.Campaign );
            let MapType = Campaign.WorldData[GD.CurrentMap].Information.Type;
            if ( MapType == "Exterior" ) {
                this.DaytimeCycleManager.StartRaining();
            } else {
                this.DaytimeCycleManager.StopRaining();
            }
        }
        
        // Camera
        this.cameras.main
        .setSize(1024, 720)
        .setZoom(1)
        .setBounds(0, 0, this.Map.widthInPixels, this.Map.heightInPixels)
        .centerOn(this.Map.widthInPixels / 2, this.Map.heightInPixels / 2)
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

    // Weapon type handlers - maps weapon types to their use methods
    private WeaponHandlers: Record<string, (data: any) => void> = {
        "Scattergun": (data) => this.UseScattergun(data),
        "Sword": (data) => this.UseSword(data),
        "Hammer": (data) => this.UseHammer(data),
        "Crossbow": (data) => this.UseCrossbow(data)
    };

    UseMainhandItem () {

        if ( this.PlayerCharacter.PlayerIsDead ) return;
        if ( this.BuildingHelper.BuildingPlacementMode ) return;
        if ( this.UI.TownManagementPanel.Background.visible ) return;

        console.log("Using mainhand item");

        let Item = GD.Inventory.Equipment_MainHand;

        if (!Item)
            return this.UI.EventLog.NewEvent("No mainhand item equipped!");

        if ( Item.Cooldown && Item.Cooldown > 0 ) {
            //return this.UI.EventLog.NewEvent("Item is on cooldown!");
            return;
        }

        let Data = ItemData[GD.Inventory.Equipment_MainHand.ID];

        // Dispatch to the appropriate weapon handler
        const handler = this.WeaponHandlers[Data.Type];
        if (handler) {
            handler(Data);
        } else {
            console.warn(`No handler for weapon type: ${Data.Type}`);
        }

        GD.Inventory.Equipment_MainHand.Cooldown = Data.Properties.Cooldown;

    }

    UseCrossbow (Data: any) {
        if (GD.Inventory.Equipment_MainHand.CurrentMagazine <= 0) return;
        const ammoData = ItemData[GD.Inventory.Equipment_MainHand.Ammo];
        const baseAngle = Phaser.Math.Angle.Between(this.PlayerCharacter.x, this.PlayerCharacter.y, this.mouseX, this.mouseY);
        const spreadDegrees = 3;  // Small spread for slight inaccuracy
        const spreadAngle = Phaser.Math.DegToRad(Phaser.Math.FloatBetween(-spreadDegrees / 2, spreadDegrees / 2));
        const angle = baseAngle + spreadAngle;
        const velocity = Data.Properties.Velocity;
        this.sound.play("ShotgunFire");
        const proj = new Projectile(this, this.PlayerCharacter.x, this.PlayerCharacter.y, velocity, ammoData.Properties.DamageMod, "CrossbowBolt");
        proj.setVelocity(Math.cos(angle) * velocity, Math.sin(angle) * velocity);
        this.Projectiles.add(proj);
        GD.Inventory.Equipment_MainHand.CurrentMagazine -= 1;
    }

    UseScattergun (Data: any) {
        if ( GD.Inventory.Equipment_MainHand.CurrentMagazine <= 0 ) return;
        const ammoData = ItemData[GD.Inventory.Equipment_MainHand.Ammo];
        const baseAngle = Phaser.Math.Angle.Between(this.PlayerCharacter.x, this.PlayerCharacter.y, this.mouseX, this.mouseY);
        const spreadDegrees = 15;
        const velocity = Data.Properties.Velocity;
        this.sound.play("ShotgunFire");
        for (let i = 0; i < ammoData.Properties.Pellets; i++) {
            const spreadAngle = Phaser.Math.DegToRad(Phaser.Math.FloatBetween(-spreadDegrees / 2, spreadDegrees / 2));
            const angle = baseAngle + spreadAngle;
            const proj = new Projectile(this, this.PlayerCharacter.x, this.PlayerCharacter.y, velocity, ammoData.Properties.DamageMod, "ScattergunPellet");
            proj.setVelocity(Math.cos(angle) * velocity, Math.sin(angle) * velocity);
            this.Projectiles.add(proj);
        }
        GD.Inventory.Equipment_MainHand.CurrentMagazine -= 1;
    }

    UseSword (Data: any) {
        console.log("Using sword");

        const pc = this.PlayerCharacter.getCenter();
        const direction = Phaser.Math.Angle.Between(pc.x, pc.y, this.mouseX, this.mouseY);
        const reach = 48;

        // Get enemies in a 90° arc (wide cone attack)
        const hits = getObjectsInArc<Enemy>(
            new Phaser.Math.Vector2(pc.x, pc.y),
            direction,
            ArcWidths.WIDE,  // 90° cone
            reach,
            this.Enemies,
            true  // sort by distance
        );

        // Visual feedback - draw arc
        this.graphics.clear();
        this.graphics.lineStyle(2, 0x00ff00, 0.5);
        this.graphics.beginPath();
        this.graphics.arc(pc.x, pc.y, reach, direction - ArcWidths.WIDE / 2, direction + ArcWidths.WIDE / 2);
        this.graphics.strokePath();

        // Draw arc edges
        this.graphics.lineBetween(
            pc.x, pc.y,
            pc.x + Math.cos(direction - ArcWidths.WIDE / 2) * reach,
            pc.y + Math.sin(direction - ArcWidths.WIDE / 2) * reach
        );

        this.graphics.lineBetween(
            pc.x, pc.y,
            pc.x + Math.cos(direction + ArcWidths.WIDE / 2) * reach,
            pc.y + Math.sin(direction + ArcWidths.WIDE / 2) * reach
        );

        // Apply damage to hit enemies
        hits.forEach(hit => {
            hit.object.TakeDamage(Data.Properties.Damage || 10);
        });

        console.log(hits.length > 0 ? "Hit enemies:" : "No enemies hit", hits.map(h => h.object));
    }

    UseHammer (Data: any) {
        const pc = this.PlayerCharacter.getCenter();
        const direction = Phaser.Math.Angle.Between(pc.x, pc.y, this.mouseX, this.mouseY);

        // Create hammer slam at impact point
        const slam = createHammerSlam(
            { origin: new Phaser.Math.Vector2(pc.x, pc.y), direction, reach: 32 },
            24  // radius
        );

        // Visual feedback - draw circle
        this.graphics.clear();
        this.graphics.fillStyle(0x0000ff, 0.5);
        this.graphics.fillCircle(slam.center.x, slam.center.y, slam.radius);

        // Get enemies in the impact area
        const hits = getObjectsInCircle<Enemy>(
            slam.center.x, slam.center.y,
            slam.radius,
            this.Enemies
        );

        // Apply damage to hit enemies
        hits.forEach(hit => {
            hit.object.TakeDamage(Data.Properties.Damage || 15);
        });

        console.log(hits.length > 0 ? "Hit enemies:" : "No enemies hit", hits.map(h => h.object));
    }

    UseHotbarSlot (slot: string) {
        console.log(`Using hotbar slot ${slot}`);

        let Item = GD.Hotbar[slot];

        console.log(Item);

        if (!Item) 
            return console.log("No item equipped in hotbar slot " + slot);
        if ( Item.Type == "Ability" ) {
            let Ability = Abilities[Item.ID];
            this.ActionManager.UseAbility(Ability);
        }
        
        if ( Item.Type == "Item" ) {

            let BaseItemData = ItemData[Item.ID];
            console.log(BaseItemData);

            // if its ammo, try to reload weapon
            if ( BaseItemData.Category == "Ammunition" ) {
                if ( GD.Inventory.Equipment_MainHand )
                    this.ActionManager.ReloadMainhandWeapon();
            }

            if ( BaseItemData.Category == "Throwable" ) {
                this.ThrowItem(BaseItemData.ID);
            }

            if ( BaseItemData.Category == "Consumable" ) {
                this.UseConsumable(BaseItemData.ID);
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
        Proj.setVelocity( Math.cos(Proj.rotation) * 160, Math.sin(Proj.rotation) * 360 );
        this.Projectiles.add(Proj);
    }

    UseItem (itemId: string) {
        console.log("Using item" + itemId);
        if ( itemId == "town_centre_blueprint" ) {
            GD.UnlockedBuildings.push("Town Centre");
            Inv.RemoveItem("town_centre_blueprint", 1);
            this.UI.EventLog.NewEvent("You have unlocked the ability to build Town Centres!");
            return;
        }
        if ( itemId == "dwelling_blueprint" ) {
            GD.UnlockedBuildings.push("Dwelling");
            Inv.RemoveItem("dwelling_blueprint", 1);
            this.UI.EventLog.NewEvent("You have unlocked the ability to build Dwellings!");
            return;
        }
    }

    UseAbility () {
        console.log("Using ability");
    }

    UseConsumable (itemId: string) {
        console.log("Using consumable");
        console.log(itemId);

        let data = ItemData[itemId];
        if ( !Inv.HasRequiredQuantity(itemId, 1)  )
            return console.log("You have no more of this item left");
        Inv.RemoveItem(itemId, 1);

        if ( itemId == "health_potion" ) {
            this.PlayerCharacter.Heal(50);
        }

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
