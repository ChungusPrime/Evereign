import UI from './UI';
import Building from '../game_objects/Building';
import Enemy from '../game_objects/Enemy';
import Character from '../game_objects/Character';
import DataManager from '../game_objects/DataManager';
import MapManager from '../game_objects/MapManager';
import ActivityManager from '../game_objects/ActivityManager';
import MilestoneManager from '../game_objects/MilestoneManager';
import InventoryManager from '../game_objects/InventoryManager';
import BuildingManager from '../game_objects/BuildingManager';
import DayNightCycleManager from '../game_objects/DayNightCycleManager';
import Cursor from '../images/click_cursor.png';
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import Projectile from '../game_objects/Projectile';
import FloatingText from '../game_objects/FloatingText';
import EnemyManager from '../game_objects/EnemyManager';
import ControlManager from '../game_objects/ControlManager';

class PlayerRect extends Rectangle {};

class EnemyRect extends Rectangle {
    enemy: any;
    constructor(props: { x: number, y: number, width: number, height: number, data: any}) {
        super(props);
        this.enemy = props.data;
    }
};

export default class Game extends Phaser.Scene {

    public CurrentSaveSlot!: string;
    public UI!: UI;
    public MapManager!: MapManager;
    public DataManager!: DataManager;
    public MilestoneManager!: MilestoneManager;
    public InventoryManager!: InventoryManager;
    public ActivityManager!: ActivityManager;
    public BuildingManager!: BuildingManager;
    public EnemyManager!: EnemyManager;
    public DaytimeCycleManager!: DayNightCycleManager;
    public Projectiles!: Phaser.GameObjects.Group;
    public EnemyProjectiles!: Phaser.GameObjects.Group;
    public PlayerCharacter!: Character;
    public mouseX!: number;
    public mouseY!: number;
    public ControlManager: ControlManager
    public TownCentre!: Building;
    public Map!: Phaser.Tilemaps.Tilemap;
    public Quadtree!: Quadtree<Rectangle | Circle | Line>;
    public Controls: Phaser.Input.Keyboard.Key[] = [];

    public SelectedBuilding: string = "";
    public SelectedObject: Phaser.Physics.Arcade.Sprite | null = null;
    
    constructor () {
        super({ key: "Game" });
    }

    init ( data: { slot: string } ): void {
        this.CurrentSaveSlot = data.slot;
    }

    create () {

        this.lights.enable();
        this.input.setDefaultCursor(`url(${Cursor}), pointer`);
        this.sound.play('theme', { loop: true });

        this.DataManager = new DataManager(this);

        this.scene.launch( "UI", this );
        this.UI = this.scene.get("UI") as UI;

        this.InventoryManager = new InventoryManager(this, this.UI);
        this.EnemyManager = new EnemyManager(this, this.UI);
        this.ControlManager = new ControlManager(this);
        this.BuildingManager = new BuildingManager(this, this.UI);
        this.DaytimeCycleManager = new DayNightCycleManager(this, this.UI);
        this.MilestoneManager = new MilestoneManager();
        this.ActivityManager = new ActivityManager(this);

        this.Projectiles = this.add.group([], { runChildUpdate: true, classType: Projectile });
        this.EnemyProjectiles = this.add.group([], { runChildUpdate: true, classType: Projectile });
        
        this.MapManager = new MapManager(this);
        this.Map = this.MapManager.create("Willowvale");
        this.physics.world.setBounds(0, 0, this.Map.widthInPixels, this.Map.heightInPixels);
        
        this.PlayerCharacter = new Character(this);
        this.cameras.main.startFollow(this.PlayerCharacter, true);

        this.Quadtree = new Quadtree({
            width: this.Map.widthInPixels,
            height: this.Map.heightInPixels,
            x: 0,
            y: 0,
            maxObjects: 20,
            maxLevels: 4
        });

        // Set up physics collisions:
        this.physics.add.collider(this.PlayerCharacter, this.MapManager.CollisionLayer);
        this.physics.add.collider(this.PlayerCharacter, this.BuildingManager.Buildings);
        this.physics.add.collider(this.PlayerCharacter, this.MapManager.MapObjects);
        this.physics.add.collider(this.PlayerCharacter, this.MapManager.Trees);
        this.physics.add.collider(this.PlayerCharacter, this.MapManager.Nodes);

        this.physics.add.collider(this.Projectiles, this.MapManager.Trees, (projectile: Projectile, tree) => {
            projectile.delete();
        });

        this.physics.add.collider(this.Projectiles, this.MapManager.Nodes, (projectile: Projectile, node) => {
            projectile.delete();
        });

        this.physics.add.collider(this.EnemyProjectiles, this.PlayerCharacter, (projectile: Projectile, player: Character) => {
            projectile.destroy();
            player.TakeDamage(5);
        });

        this.physics.add.collider(this.Projectiles, this.EnemyManager.Enemies, (projectile: Projectile, enemy: Enemy) => {
            this.lights.removeLight(projectile.light);
            projectile.destroy();
            this.UI.FloatingTexts.push(new FloatingText(this, { message: `-${projectile.damage}`, x: enemy.x, y: enemy.y }));
            enemy.TakeDamage(projectile.damage);
            let hitSprite = this.add.sprite(enemy.x, enemy.y, "BloodOne", 0).play('blood-anim').setDepth(enemy.depth + 1);
            hitSprite.once('animationcomplete', () => {
                hitSprite.destroy();
            });
        });

        // Set up aggro zones for each building
        this.BuildingManager.Buildings.getChildren().forEach( (Building: Building) => {
            if ( !Building.AggroZone ) return;
            let AggroZone = this.physics.add.sprite(Building.getCenter().x - Building.width * 2, Building.getCenter().y - Building.height * 2, "character", 0).setCircle(300);
            Building.AggroCollider = AggroZone;
            this.physics.add.overlap(AggroZone, this.PlayerCharacter, (building: Building, PlayerCharacter: Character) => {
                if ( Building.OnAlert == false )
                    Building.OnAlert = true;
            });
        });

        this.input.on( "pointermove", ( pointer: Phaser.Input.Pointer ) => {
            this.mouseX = pointer.worldX;
            this.mouseY = pointer.worldY;
            this.BuildingManager.CheckIfPlacementValid();
        });

        this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {

            if ( !this.BuildingManager.BuildingPlacementMode ) return;

            if ( pointer.leftButtonDown() && this.BuildingManager.ValidPlacement ) {
                const tile = this.Map.worldToTileXY(this.mouseX, this.mouseY);
                const world = this.Map.tileToWorldXY(tile.x, tile.y);
                this.BuildingManager.CreateNewPlayerBuilding(this, this.SelectedBuilding, world.x, world.y);
                this.BuildingManager.DeactivateBuildingMode();
            }

            if ( pointer.rightButtonDown() ) {
                this.BuildingManager.DeactivateBuildingMode();
            }
            
        });

        // Camera
        this.cameras.main
        .setSize(window.innerWidth * 0.80, window.innerHeight)
        .setZoom(1)
        .setBounds(0, 0, this.Map.widthInPixels, this.Map.heightInPixels)
        .centerOn(this.Map.widthInPixels / 2, this.Map.heightInPixels / 2)
        .fadeIn(2000, 0, 0, 0, () => {

        })
        .on('camerafadeinstart', () => {

        })
        .on('camerafadeincomplete', () => {

        });

    }

    update ( time: number, delta: number ): void {

        this.PlayerCharacter.update(delta);
        this.DaytimeCycleManager.update(delta);
        this.ActivityManager.UpdateCurrentActivity(delta);

        // Update quadtree
        this.Quadtree.clear();

        this.EnemyManager.Enemies.getChildren().forEach( (enemy: Enemy) => {
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
            
            const PlayerRectInstance = new PlayerRect({
                x: this.PlayerCharacter.x,
                y: this.PlayerCharacter.y,
                width: 32,
                height: 32
            });
    
            this.Quadtree.retrieve(PlayerRectInstance).forEach( (element: EnemyRect) => {
    
                if ( element instanceof EnemyRect && !element.enemy.InCombat ) {
                    const distance = Phaser.Math.Distance.BetweenPoints(element, { x: this.PlayerCharacter.x, y: this.PlayerCharacter.y });
                    if ( distance <= 256 ) element.enemy.Aggro();
                }
    
            });

        }

    }

}
