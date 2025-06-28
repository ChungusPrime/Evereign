import Game from '../../scenes/Game';
import Building from '../Building';
import Obstacle from '../Obstacle';
import { GD } from "../../scenes/Game";

export default class GoblinTower extends Building {

    public width: number = 64;
    public height: number = 64;
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

    constructor ( scene: Game, x: number, y: number ) {
        super( scene, x, y, "Buildings", "goblin_tower_1");
        this.setOrigin(0, 1);
    }

    // Check if the amount of dead units is equal to the total amount of units
    private areAllUnitsDead(): boolean {
        return this.Units.every(unit => unit.Dead === unit.Total);
    }

    // Check if the amount of alive and dead units is less than the total amount of units
    private canSpawnMoreUnits(unit: IUnit): boolean {
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
    
            

            // Process any relevant triggers when this building is destroyed
            this.StaticData.OnDestroyDisableObstacle.forEach((objectID: number) => {
                this.scene.Obstacles.getChildren().forEach( (object: Obstacle) => {
                    if ( object.ID == objectID )
                        object.Destroy();
                });
            });

            //GD.WorldData[GD.CurrentMap][this.ID].Destroyed = true;

            this.scene.Buildings.remove(this, true, true);
            return;
        }

        // Check if we can spawn more units
        let availableUnits = this.Units.filter(unit => this.canSpawnMoreUnits(unit));
        if (availableUnits.length === 0) return;

        if ( this.SpawnDelta >= this.SpawnInterval ) {
            let RandomUnit = availableUnits[Phaser.Math.Between(0, availableUnits.length - 1)];
            let RandomSpawn = this.getBounds().getRandomPoint();
            this.scene.EnemyManager.SpawnBuildingEnemy(RandomUnit.Name, RandomSpawn.x, RandomSpawn.y, this).Aggro();
            RandomUnit.Alive++;
            this.CurrentSpawnCount += 1;
            this.SpawnDelta = 0;
        }
    }

}