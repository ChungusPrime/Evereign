import Game from '../../scenes/Game';
import Building from '../Building';
import GoblinSlinger from '../characters/GoblinSlinger';

export default class OrcOutpost extends Building {

    public scene: Game;
    public width: number = 128;
    public height: number = 128;
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];

    // Hostile building settings
    public OnAlert: boolean = false;
    public AggroRadius: number = 300;  // Detection radius in pixels
    public AggroCircle!: Phaser.Geom.Circle;  // Simple geometry circle for detection
    public AggroTimer: number = 0;
    public AggroGraphics!: Phaser.GameObjects.Graphics;

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
        this.AggroCircle = new Phaser.Geom.Circle(this.getCenter().x, this.getCenter().y + 64, this.AggroRadius);
        this.AggroGraphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xff0000, alpha: 0.5 }, fillStyle: { color: 0xff0000, alpha: 0.1 } });
        this.AggroGraphics.fillCircleShape(this.AggroCircle).strokeCircleShape(this.AggroCircle);
        this.setDepth(this.AggroGraphics.depth + 1);
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
        
        // Check if player is in the aggro area
        const playerPos = this.scene.PlayerCharacter.getCenter();
        const playerInArea = this.AggroCircle.contains(playerPos.x, playerPos.y);

        // Log while player is in area
        if ( playerInArea ) {
            this.OnAlert = true;
            this.AggroTimer = 3000;
            console.log("PLAYER STILL IN AREA");
        }

        if ( this.OnAlert && !playerInArea) {
            this.AggroTimer -= delta;
        }

        if (this.OnAlert && !playerInArea && this.AggroTimer <= 0) {
            this.OnAlert = false;
            console.log("BUILDING CALM - Player left aggro zone.");
        }

        if (!this.OnAlert) return;

        if (this.CurrentSpawnCount >= this.MaxSpawnCount) return;

        this.SpawnDelta += delta;

        if (this.areAllUnitsDead()) {
            console.log("All units are dead, destroying building.");
            console.log(this.Units);
            this.AggroGraphics.destroy();
            return this.Kill();
        }

        // Check if we can spawn more units
        let availableUnits = this.Units.filter(unit => this.canSpawnMoreUnits(unit));
        if (availableUnits.length === 0) return;

        if ( this.SpawnDelta >= this.SpawnInterval ) {
            let RandomUnit = availableUnits[Phaser.Math.Between(0, availableUnits.length - 1)];
            let RandomSpawnPoint = this.getBounds().getRandomPoint();

            const EnemyMapping: { [key: string]: any } = {
                "Orc Slinger": GoblinSlinger,
            };

            let EnemyClass = EnemyMapping[RandomUnit.Name];
            let Instance = new EnemyClass(this.scene, this);
            Instance.SpawnLocation = this;
            Instance.ApplyModifiers(RandomUnit.Modifiers || []);
            Instance.ApplyLevel(RandomUnit.Level || 1);
            this.scene.Enemies.add(Instance);
            Instance.Aggro();
            RandomUnit.Alive++;
            this.CurrentSpawnCount += 1;
            this.SpawnDelta = 0;
        }

    }

}