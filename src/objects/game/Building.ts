import Game from '../../scenes/Game';
import { CMD, GD } from '../../scenes/Game';
import BuildingData from '../../data/BuildingData';
import NPC from './NPC';

export default class Building extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public Key: string = "";
    public ID: string | null = null;
    public Level: number = 1;
    public Area: string = "";
    public TickTime: number = 12000;
    public CurrentTickProgress: number = 0;
    public TickProgressBar?: Phaser.GameObjects.Rectangle;
    public IsPlayerOwned: boolean = false;
    public IsHostile: boolean = false;
    public DESTROYING: boolean = false;
    public Type: string = "";
    public PlotWidth: number = 64;
    public PlotHeight: number = 64;

    // Worker / production
    public ProductsPerTick?: { ID: number; Amount: number; }[];
    public WorkerSlots?: number;
    public WorkerType?: string;
    public CurrentJob?: string;

    // Build zone
    public BuildZone?: Phaser.GameObjects.Rectangle;
    public CostMultiplier?: number;

    // Hostile buildings
    public AggroZone?: boolean;
    public AggroRadius?: number;
    public AggroCollider?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    public OnAlert?: boolean;
    public Units?: IUnit[];
    public SpawnInterval?: number;
    public SpawnDelta?: number;
    public MaxSpawnCount?: number;
    public CurrentSpawnCount?: number;

    // BallistaTower
    public Radius?: Phaser.GameObjects.Arc;

    // Dwelling
    public Data?: WorldData;

    // Farm
    public AssignedFields?: Building[];

    // Field
    public ActiveJob?: string;
    public Jobs?: { Name: string; LevelRequirement: number }[];

    // Hostile buildings (OrcOutpost / OrcTower)
    public AggroCircle?: Phaser.Geom.Circle;
    public AggroTimer?: number;
    public AggroGraphics?: Phaser.GameObjects.Graphics;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {

        const buildingKey = object.type ?? "";
        const data = BuildingData[buildingKey];
        super(scene, object.x, object.y, data?.Spritesheet ?? "Buildings", data?.Sprite ?? buildingKey);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.Key = buildingKey;

        // Apply data-driven properties
        if (data) {
            this.Type          = data.Type          ?? "";
            this.AggroZone     = data.AggroZone;
            this.IsHostile     = data.IsHostile      ?? false;
            this.AggroRadius   = data.AggroRadius    ?? this.AggroRadius;
            this.SpawnInterval = data.SpawnInterval  ?? this.SpawnInterval;
            this.MaxSpawnCount = data.MaxSpawnCount  ?? this.MaxSpawnCount;
            this.WorkerSlots   = data.WorkerSlots    ?? this.WorkerSlots;
            this.WorkerType    = data.WorkerType     ?? this.WorkerType;
            if (data.PlotSize) {
                this.PlotWidth  = data.PlotSize.Width;
                this.PlotHeight = data.PlotSize.Height;
            }
        }

        // If the object is from Tiled, take ID from the first property
        if ( 'properties' in object && object.properties ) {
            this.ID = object.properties[0].value ?? null;
            this.IsPlayerOwned = false;
            this.Units = CMD[this.ID]?.Units;
            this.setOrigin(0, 1);
        }
        // If the object is from PlayerData, take the ID directly
        else if ( 'id' in object ) {
            this.ID = object.id as string ?? null;
            this.IsPlayerOwned = true;
            this.setOrigin(0, 0);
        }

        this.setInteractive()
            .setImmovable()
            .setLighting(true);

        this.scene.Buildings.add(this);

        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {

            if ( pointer.rightButtonDown() ) {
                console.log(this);
            }

            if ( this.IsPlayerOwned == true ) {
                return this.OpenManagementPanel();
            }

            if ( this.Key == "Inn" )
                this.scene.UI.RestMenu.showMenu();

            if ( this.Type == "Market" )
                this.scene.UI.TradeWindow.Show(this.ID);

            if ( this.Type == "Town Centre" ) {
                let Data = this.scene.DataManager.GetBuildingData(this.ID);
                this.scene.UI.DialogueWindow.StartConversation(Data.Person);
            }

        });

        this.setType(buildingKey);

        return this;
    }

    public setType ( key: string ) {
        switch (key) {
            case "Ballista Tower": return this.initBallistaTower();
            case "Dwelling":       return this.initDwelling();
            case "Farm":           return this.initFarm();
            case "Field":          return this.initField();
            case "Port":           return this.initPort();
            case "Town Centre":    return this.initTownCentre();
            case "Orc Outpost":
            case "Orc Tower":      return this.initHostileBuilding();
        }
    }

    private initBallistaTower () {
        this.Radius = this.scene.add.circle(this.getCenter().x, this.getCenter().y, 200, 0x6666ff, 0)
            .setOrigin(0.5)
            .setStrokeStyle(2, 0x0000ff, 0);
        this.scene.add.existing(this.Radius);
    }

    private initDwelling () {
        this.Data = GD.WorldData[GD.CurrentMap]?.[this.ID] ?? null;
    }

    private initFarm () {
        this.AssignedFields = [];
    }

    private initField () {
        this.ActiveJob = "";
        this.Jobs = BuildingData["Field"]?.Jobs ?? [];
    }

    private initPort () {
        this.body.setSize(this.PlotWidth, this.PlotHeight);
        this.body.offset.x = 0;
    }

    private initTownCentre () {
        this.CostMultiplier = 5;
        if ( this.IsPlayerOwned ) {
            this.BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 641, 641, 0xffffff, 0.2).setVisible(false);
            this.scene.physics.world.enable(this.BuildZone);
            this.scene.TownCentre = this;
            console.log("Player Town Centre created at " + this.x + ", " + this.y);
        }
    }

    private initHostileBuilding () {
        this.SpawnDelta = 3000;
        this.CurrentSpawnCount = 0;
        this.AggroTimer = 0;
        this.AggroCircle = new Phaser.Geom.Circle(this.getCenter().x, this.getCenter().y + 64, this.AggroRadius);
        this.AggroGraphics = this.scene.add.graphics({ lineStyle: { width: 1, color: 0xff0000, alpha: 0.5 }, fillStyle: { color: 0xff0000, alpha: 0.1 } });
        this.AggroGraphics.fillCircleShape(this.AggroCircle).strokeCircleShape(this.AggroCircle);
        this.setDepth(this.AggroGraphics.depth + 1);
    }

    public Alert () {
        this.OnAlert = true;
    }

    private areAllUnitsDead (): boolean {
        return this.Units?.every(unit => unit.Dead === unit.Total) ?? true;
    }

    private canSpawnMoreUnits (unit: IUnit): boolean {
        return unit.Alive + unit.Dead < unit.Total;
    }

    update ( time: number, delta: number ) {
        if ( !this.IsHostile || !this.AggroCircle ) return;

        const playerPos = this.scene.PlayerCharacter.getCenter();
        const playerInArea = this.AggroCircle.contains(playerPos.x, playerPos.y);

        if ( playerInArea ) {
            this.OnAlert = true;
            this.AggroTimer = 3000;
        }

        if ( this.OnAlert && !playerInArea )
            this.AggroTimer -= delta;

        if ( this.OnAlert && !playerInArea && this.AggroTimer <= 0 )
            this.OnAlert = false;

        if ( !this.OnAlert ) return;
        if ( this.CurrentSpawnCount >= this.MaxSpawnCount ) return;

        this.SpawnDelta += delta;

        if ( this.areAllUnitsDead() ) {
            this.AggroGraphics?.destroy();
            return this.Kill();
        }

        const availableUnits = this.Units.filter(unit => this.canSpawnMoreUnits(unit));
        if ( availableUnits.length === 0 ) return;

        if ( this.SpawnDelta >= this.SpawnInterval ) {
            const RandomUnit = availableUnits[Phaser.Math.Between(0, availableUnits.length - 1)];
            const RandomSpawnPoint = this.getBounds().getRandomPoint();
            const Instance = new NPC(this.scene, this);
            Instance.SpawnLocation = this;
            Instance.setPosition(RandomSpawnPoint.x, RandomSpawnPoint.y);
            Instance.SetCharacterType(RandomUnit.Name);
            Instance.ApplyModifiers(RandomUnit.Modifiers || []);
            Instance.ApplyLevel(RandomUnit.Level || 1);
            this.scene.Enemies.add(Instance);
            Instance.Aggro();
            RandomUnit.Alive++;
            this.CurrentSpawnCount += 1;
            this.SpawnDelta = 0;
        }
    }

    public OpenManagementPanel () {
        console.log("Open building management screen for building with ID: " + this.ID);
    }

    public CreateBuildZone () {
        this.BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 673, 673, 0xffffff, 0.2).setVisible(false);
        this.scene.physics.world.enable(this.BuildZone);
    }

    public SetPlayerOwned () {
        this.IsPlayerOwned = true;
    }

    public SetTier ( tier: number ) {
        this.setFrame(tier);
    }

    Kill () {
        this.DESTROYING = true;
        this.scene.physics.world.disable(this);
        this.setVisible(false);
        CMD[this.ID].Destroyed = true;
        this.scene.Buildings.remove(this, true, true);
    }

}
