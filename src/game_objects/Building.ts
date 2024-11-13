import Game from "../scenes/Game";

export default abstract class Building extends Phaser.Physics.Arcade.Sprite {

    // All buildings
    public scene: Game;
    public Level: number = 1;
    public Area: string = "";
    public TickTime: number = 12000;
    public CurrentTickProgress: number = 0;
    public TickProgressBar?: Phaser.GameObjects.Rectangle;
    public IsPlayerOwned: boolean = false;
    public DESTROYING: boolean = false;
    public Type: string;
    public Data: any = null;
    public ID: number;

    // Inherited per building type
    abstract ProductsPerTick: { ID: number; Amount: number; }[];
    CurrentJob?: string;
    BuildZone?: Phaser.GameObjects.Rectangle;

    // Hostile building settings
    AggroZone?: boolean;
    AggroRadius?: number;
    AggroCollider?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    OnAlert?: boolean;
    Units?: IUnit[];
    SpawnInterval?: number;
    SpawnDelta?: number;
    MaxSpawnCount?: number;
    CurrentSpawnCount?: number;
    CostMultiplier?: number;

    constructor ( scene: Game, x: number, y: number, type: string, frame: number ) {
        super(scene, x, y, type, frame);
        this.scene = scene;
        this.setOrigin(0);
        this.Type = type;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setInteractive();
        this.setImmovable();
        this.setPipeline("Light2D");
        this.ID = 0;

        if ( this.Type == "TownCentre" && this.IsPlayerOwned == true ) {
            let BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 640 + 32 + 1, 640 + 32  + 1, 0xffffff, 0.2).setVisible(false);
            this.scene.physics.world.enable(BuildZone);
            this.BuildZone = BuildZone;
            this.scene.TownCentre = this;
        }

        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.rightButtonDown() ) {
                console.log(this.Data);
                if ( this.IsPlayerOwned == true ) {
                    console.log("Open building management screen");
                } else {
                    console.info("Start dialogue with this building");
                }
            }
        });

        return this;
    }

    CreateBuildZone () {
        let BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 640 + 32 + 1, 640 + 32  + 1, 0xffffff, 0.2).setVisible(false);
        this.scene.physics.world.enable(BuildZone);
        this.BuildZone = BuildZone;
    }
 
    SetPlayerOwned () {
        this.IsPlayerOwned = true;
    }

    public SetTier ( tier: number ) {
        this.setFrame(tier);
    }

}