import UI from './UI';
import Building from '../objects/game/Building';
import Enemy from '../objects/game/Character';
import Cursor from '../assets/images/click_cursor.png';
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import { UseSword,   RenderAttackArea as SwordArea   } from '../systems/weapons/Sword';
import { UseAxe,     RenderAttackArea as AxeArea     } from '../systems/weapons/Axe';
import { UseHammer,  RenderAttackArea as HammerArea  } from '../systems/weapons/Hammer';
import { UseSpear,   RenderAttackArea as SpearArea   } from '../systems/weapons/Spear';
import { UseCrossbow }   from '../systems/weapons/Crossbow';
import { UseScattergun } from '../systems/weapons/Scattergun';
import { UsePistol }     from '../systems/weapons/Pistol';
import { UseBow }        from '../systems/weapons/Bow';
import PlayerCharacter from '../objects/game/PlayerCharacter';
import { PlayerRect, EnemyRect } from '../objects/game/QuadTree_Rects';
import Campaigns from '../data/Campaigns';
import ItemData from '../data/ItemData';
import ActionManager from '../systems/ActionManager';
import InputManager from '../systems/InputManager';
import Projectile from '../objects/game/Projectile';
import Grenade from '../objects/game/Grenade';
import GameObjectsMap from '../data/GameObjects';
import ScenarioData from '../data/ScenarioData';
import Inventory from '../systems/Inventory';
import DayNightCycle from '../systems/DayNightCycle';
import NPC from '../objects/game/NPC';
import DataManager from '../systems/DataManager';
import BuildingHelper from '../systems/BuildingHelper';
import QuestManager from '../systems/QuestManager';
import { ApplyOnUseEffects } from '../systems/OnUseProcessor';

// Global copies of various game data for easy access across the codebase
// Dynamic Character/Map Data
export let GD: Character = null;
export let CMD: WorldData = null;
// Static Campaign / Map Data
export let CD: Campaign = null;
export let MD: WorldData = null;
export let Options: GameData['Options'];
// Export systems for use globally;
export let Inv: Inventory;
export let DNC: DayNightCycle;
export let PC: PlayerCharacter;

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
    public Inventory!: Inventory | null;
    public ActionManager!: ActionManager | null;
    public InputManager!: InputManager;

    // Game Object Groups
    public Projectiles: Phaser.GameObjects.Group;
    public EnemyProjectiles: Phaser.GameObjects.Group;
    public Zones: Phaser.GameObjects.Group;
    public Objects: Phaser.GameObjects.Group;
    public Pickups: Phaser.GameObjects.Group;
    public Grenades: Phaser.GameObjects.Group;
    public Enemies: Phaser.GameObjects.Group;
    public Buildings: Phaser.GameObjects.Group;
    public Characters: Phaser.GameObjects.Group;
    public LastHarvestedTreeUpdate = 0;
    public BuildingHelper: BuildingHelper;
    public QuestManager: QuestManager;
    public DataManager: DataManager;

    public HeldObject: { Type: string | null, ID: string | null, Sprite: Phaser.GameObjects.Sprite | null } = {
        Type: null,
        ID: null,
        Sprite: null
    }

    

    constructor () {
        super({ key: "Game" });
    }

    init ( data: { character: string, mode: string } ): void {
        this.CharacterName = data.character;
        this.GameMode = data.mode;
    }

    create () {

        console.log(`Starting game with character: ${this.CharacterName} in mode: ${this.GameMode}`);

        this.DataManager = new DataManager();
        const SavedData = JSON.parse(localStorage.getItem("EvereignData"));

        Options = SavedData.Options;

        if ( this.GameMode == "Scenario" ) {
            let Scenario = ScenarioData[this.CharacterName];
            GD = SavedData.Characters[Scenario.CharacterName];
            MD = Scenario.WorldData;
            GD.WorldData[Scenario.Name] = {};
            Object.keys(MD).forEach( (key) => {
                GD.WorldData[Scenario.Name][key] = MD[key].InitialData;
            });
            CMD = GD.WorldData[Scenario.Name];
            GD.CurrentMap = Scenario.Name;
            GD.X = Scenario.StartingPosition.X;
            GD.Y = Scenario.StartingPosition.Y;
            GD.DaytimeHour = Scenario.DaytimeHour;
            GD.DaytimeMinute = Scenario.DaytimeMinute;
            GD.DaytimeDelta = Scenario.DaytimeDelta;
            GD.CharacterType = "Scenario";
        } else if ( this.GameMode == "Adventure" ) {
            GD = SavedData.Characters[this.CharacterName];
            CMD = GD.WorldData[GD.CurrentMap] ?? null;
            CD = Campaigns.find(c => c.Name == GD.Campaign) ?? null;
            MD = CD.WorldData[GD.CurrentMap] ?? null;
            GD.CharacterType = "Campaign";
            console.log(`Loaded campaign data for ${GD.Campaign}:`, CD);
        }

        // Launch the UI
        this.scene.launch("UI", this);
        this.UI = this.scene.get("UI") as UI;
        this.CameraColourMatrix = this.cameras.main.filters.external.addColorMatrix();

        // Set cursor image
        this.input.setDefaultCursor(`url(${Cursor}), pointer`);

        // Play the specified music for this map
        if ( this.GameMode == "Scenario" ) {
            this.sound.play("theme", { loop: true });
        } else {
            this.sound.play(MD.Information.Music, { loop: true });
        }
        
        this.lights.enable();
        this.Buildings = this.add.group([], { runChildUpdate: true });
        this.Grenades = this.add.group([], { runChildUpdate: true });
        this.Projectiles = this.add.group([], { runChildUpdate: true });
        this.EnemyProjectiles = this.add.group([], { runChildUpdate: true });
        this.Pickups = this.add.group([], { runChildUpdate: true });
        this.Enemies = this.add.group([], { runChildUpdate: true });
        this.Characters = this.add.group([], { runChildUpdate: true });
        this.Objects = this.add.group([]);
        this.MapLights = this.add.group([], { runChildUpdate: true });
        this.Zones = this.add.group([]);
        this.Objects = this.add.group([]);

        // Systems
        this.DaytimeCycleManager = new DayNightCycle(this, this.UI);
        this.ActionManager = new ActionManager(this, this.UI);

        this.Inventory = new Inventory(this, this.UI);
        Inv = this.Inventory;

        this.PlayerCharacter = new PlayerCharacter(this);
        PC = this.PlayerCharacter;
        PC.UpdateStats();

        this.graphics = this.add.graphics();
        this.graphics.setScrollFactor(1);
        this.graphics.setDepth(10000);

        this.cameras.main.startFollow(this.PlayerCharacter, true);

        // Initialize input handling
        this.InputManager = new InputManager(this);

        this.BuildingHelper = new BuildingHelper(this, this.UI);
        this.QuestManager = new QuestManager(this);

        this.input.on( "pointermove", ( pointer: Phaser.Input.Pointer ) => {
            this.mouseX = pointer.worldX;
            this.mouseY = pointer.worldY;
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

            if ( pointer.leftButtonDown() && this.ActionManager.IsTargeting ) {
                this.ActionManager.SelectTarget(pointer.worldX, pointer.worldY);
            }
            else if ( pointer.rightButtonDown() && this.ActionManager.IsTargeting ) {
                this.ActionManager.CancelTargeting();
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
                this.Objects.getChildren().forEach( (object: Phaser.Physics.Arcade.Sprite) => {
                    if ( DepletedHarvestables.includes(object.getData("tiled_id")) ) {
                        (object as any).RespawnTime -= 1;
                        if ( (object as any).RespawnTime <= 0 ) {
                            (object as any).Regenerate();
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

        if ( Options["Aim Indicator"] ) {
            this.UpdateAimIndicator();
        }

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

        this.Grenades.clear(true, true);
        this.EnemyProjectiles.getChildren().forEach((proj: Projectile) => proj.delete());
        this.EnemyProjectiles.clear(true, true);
        this.Objects.clear(true, true);
        this.Enemies.clear(true, true);
        this.Pickups.clear(true, true);

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
        this.Map.objects.forEach( (layer: Phaser.Tilemaps.ObjectLayer) => {
            layer.objects.forEach( (object: Phaser.Types.Tilemaps.TiledObject) => {
                try {
                    console.log(object.id, object.name, object.type);
                    let objectInstance = GameObjectsMap[object.type];
                    if (objectInstance) {
                        const instance = new objectInstance(this, object) as Phaser.GameObjects.GameObject;
                        if ( instance instanceof NPC ) {
                            instance.SetCharacterType(object.type);
                        }
                    }
                    else 
                        console.warn(`No class found for object type: ${object.type}`);
                } catch (error) {
                    console.log(error);
                }
            });
        });
        
        // Spawn Player Buildings
        if ( GD.PlayerTowns[key] !== undefined ) {
            GD.PlayerTowns[key].Buildings.forEach((building) => {
                try {
                    let objectInstance = GameObjectsMap[building.type];
                    if (objectInstance) new objectInstance(this, building) as Phaser.GameObjects.GameObject;
                    else console.warn(`No class found for object type: ${building.type}`);
                } catch (error) {
                    console.log(error);
                }
            });
        }
        
        // Set up collisions
        this.physics.world.setBounds(0, 0, this.Map.widthInPixels, this.Map.heightInPixels);
        
        // Player
        this.PlayerCollisionLayerCollider = this.physics.add.collider(this.PlayerCharacter, this.CollisionLayer);
        this.physics.add.collider(this.PlayerCharacter, this.Buildings);
        this.physics.add.collider(this.PlayerCharacter, this.Objects);
        
        // Enable collision between pickups and collision layer so they dont go out of bounds
        this.physics.add.collider(this.Pickups, this.CollisionLayer);
        
        // Placeholder collisions
        this.physics.add.collider(this.BuildingHelper.Placeholder, this.Objects);
        this.physics.add.collider(this.BuildingHelper.Placeholder, this.Buildings);
        
        this.physics.add.collider(this.Projectiles, this.Objects, (projectile: Projectile, object: any) => {
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
            maxObjects: 50,
            maxLevels: 4
        });
        
        this.DaytimeCycleManager.SetPhase();

        if ( this.GameMode == "Scenario" ) {
            this.DaytimeCycleManager.StopRaining();
        } else {
            // Get default campaign data
            const Campaign = Campaigns.find(c => c.Name == GD.Campaign);
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

    UpdateAimIndicator () {
        if ( this.PlayerCharacter.PlayerIsDead ) return;
        if ( !GD.Inventory.Equipment_MainHand ) return;
        if ( this.BuildingHelper.BuildingPlacementMode ) return;
        if ( !Options["Aim Indicator"] ) return;
        this.graphics.clear();
        const Data = ItemData[GD.Inventory.Equipment_MainHand.ID];
        if ( Data.Type === "Sword" ) SwordArea(this, Data, this.graphics);
        if ( Data.Type === "Hammer" ) HammerArea(this, Data, this.graphics);
        if ( Data.Type === "Axe" ) AxeArea(this, Data, this.graphics);
        if ( Data.Type === "Spear" ) SpearArea(this, Data, this.graphics);
    }

    UseItem ( itemId: string ) {
        if ( this.PlayerCharacter.PlayerIsDead ) return;
        if ( this.BuildingHelper.BuildingPlacementMode ) return;
        if ( this.UI.TownManagementPanel.Background.visible ) return;
        if ( this.ActionManager.IsTargeting ) return;
        const data = ItemData[itemId];
        if (!Inv.HasRequiredQuantity(itemId, 1))
            return this.UI.EventLog.NewEvent(`You have no ${data.Name} left`);
        Inv.RemoveItem(itemId, 1);
        if (data.OnUse)
            ApplyOnUseEffects(this, data.OnUse, data.ID);
    }

    // Weapon type handlers - maps weapon types to their use methods
    private WeaponHandlers: Record<string, (data: any) => void> = {
        "Scattergun": (data) => UseScattergun(this, data),
        "Sword": (data) => UseSword(this, data),
        "Hammer": (data) => UseHammer(this, data),
        "Crossbow": (data) => UseCrossbow(this, data),
        "Pistol": (data) => UsePistol(this, data),
        "Bow": (data) => UseBow(this, data),
        "Spear": (data) => UseSpear(this, data),
        "Axe": (data) => UseAxe(this, data),
        "Grenade": (data) => this.UseItem(data.ID),
    };

    UseMainhandItem () {
        if ( this.PlayerCharacter.PlayerIsDead ) return;
        if ( this.BuildingHelper.BuildingPlacementMode ) return;
        if ( this.UI.TownManagementPanel.Background.visible ) return;
        if ( this.ActionManager.IsTargeting ) return;
        let Weapon = GD.Inventory.Equipment_MainHand;

        if ( !Weapon ) return;
        if ( Weapon.Cooldown && Weapon.Cooldown > 0 ) return;
        
        let Data = ItemData[Weapon.ID] ?? null;

        if ( !Data ) {
            console.warn(`No item data found for mainhand item: ${Weapon.ID}`);
            return;
        }

        let Cooldown = Data.Properties?.Cooldown ?? 0;
        console.log(Cooldown);

        // Dispatch to the appropriate weapon handler
        const handler = this.WeaponHandlers[Data.Type];
        if (handler) {
            handler(Data);
        } else {
            console.warn(`No handler for weapon type: ${Data.Type}`);
        }

        if ( GD.Inventory.Equipment_MainHand )
            GD.Inventory.Equipment_MainHand.Cooldown = Cooldown;

    }

    TransitionToMap () {
        this.PlayerCharacter.PlayerHasControl = false;
        this.UI.HideTransitionScreen();
        this.cameras.main.fadeOut(2000, 0, 0, 0).on('camerafadeoutcomplete', () => {
            const transition = MD[this.ActiveTransition];
            if ( !transition ) return;
            GD.CurrentMap = transition.TransitionToMap;
            GD.X = transition.DestinationX;
            GD.Y = transition.DestinationY;
            this.PlayerCharacter.setPosition(transition.DestinationX, transition.DestinationY);
        });
    }

    UpdateBestiary ( enemy: string ) {
        GD.Bestiary.find( (bestiary) => bestiary.ID == enemy ).Progress++;
    }

    Save () {
        
    }

}
