import Game from '../../scenes/Game';
import Building from '../Building';
import Obstacle from '../Obstacle';
import { GD } from "../../scenes/Game";
import GameObjectsMap from '../../data/GameObjects';

export default class OrcOutpost extends Building {

    public scene: Game;
    public width: number = 128;
    public height: number = 128;
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];

    // Hostile building settings
    public AggroZone: boolean = true;
    public AggroRadius: number = 250;
    public AggroCollider!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    public OnAlert: boolean = false;
    public Units!: IUnit[];
    public SpawnInterval: number = 3000;
    public SpawnDelta: number = 3000;
    public MaxSpawnCount: number = 3;
    public CurrentSpawnCount: number = 0;
    
    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "orc_outpost_1", object);
        this.IsPlayerOwned = false;
        this.scene = scene;
        this.setOrigin(0, 1);
    }

    private areAllUnitsDead(): boolean {
        // Check if the amount of dead units is equal to the total amount of units
        return this.Units.every(unit => unit.Dead === unit.Total);
    }

    private canSpawnMoreUnits(unit: IUnit): boolean {
        // Check if the amount of alive and dead units is less than the total amount of units
        return unit.Alive + unit.Dead < unit.Total;
    }

    Alert () {
        this.OnAlert = true;
    }

    update ( time: number, delta: number ) {
        
        if ( this.OnAlert == false ) return;
        if ( this.CurrentSpawnCount == this.MaxSpawnCount ) return;

        this.SpawnDelta += delta;

        if (this.areAllUnitsDead()) {

            if ( this.AggroCollider !== undefined ) {
                this.AggroCollider.body.destroy();
                this.AggroCollider.setActive(false);
                this.AggroCollider.setVisible(false);
            }
            
            this.StaticData.OnDestroyDisableObstacle.forEach((objectID: number) => {
                this.scene.Obstacles.getChildren().forEach( (object: Obstacle) => {
                    if ( object.ID == objectID )
                        object.Destroy();
                });
            });

            GD.WorldData[GD.CurrentMap][this.ID].Destroyed = true;

            this.scene.Buildings.remove(this, true, true);
            return;
        }

        // Check if we can spawn more units
        let availableUnits = this.Units.filter(unit => this.canSpawnMoreUnits(unit));
        if (availableUnits.length === 0) return;

        if ( this.SpawnDelta >= this.SpawnInterval ) {
            let RandomUnit = availableUnits[Phaser.Math.Between(0, availableUnits.length - 1)];
            let RandomSpawnPoint = this.getBounds().getRandomPoint();
            const EnemyClass = GameObjectsMap[RandomUnit.Name];
            let Instance = new EnemyClass(this.scene, { x: RandomSpawnPoint.x, y: RandomSpawnPoint.y });
            Instance.SpawnLocation = this;
            this.scene.Enemies.add(Instance);
            Instance.Aggro();
            RandomUnit.Alive++;
            this.CurrentSpawnCount += 1;
            this.SpawnDelta = 0;
        }
    }

}