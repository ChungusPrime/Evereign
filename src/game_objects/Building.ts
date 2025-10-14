import Game from "../scenes/Game";

export default abstract class Building extends Phaser.Physics.Arcade.Sprite {

    // All buildings
    public scene: Game;
    public StaticData: StaticBuildingData | null = null;
    public VariableData: any | null = null;
    public ID: string = "";
    public Level: number = 1;
    public Area: string = "";
    public TickTime: number = 12000;
    public CurrentTickProgress: number = 0;
    public TickProgressBar?: Phaser.GameObjects.Rectangle;
    public IsPlayerOwned: boolean = false;
    public IsHostile: boolean = false;
    public DESTROYING: boolean = false;
    public Type: string;

    // Inherited per building type
    public ProductsPerTick: { ID: number; Amount: number; }[];
    public WorkerSlots: number;
    public WorkerType: string;
    public CurrentJob?: string;
    public BuildZone?: Phaser.GameObjects.Rectangle;

    // Hostile building settings
    public AggroZone?: boolean;
    public AggroRadius?: number;
    public AggroCollider?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    public OnAlert?: boolean;
    public Units?: IUnit[];
    public SpawnInterval?: number;
    public SpawnDelta?: number;
    public MaxSpawnCount?: number;
    public CurrentSpawnCount?: number;
    public CostMultiplier?: number;

    constructor ( scene: Game, x: number, y: number, type: string, frame: string ) {

        super(scene, x, y, "Buildings", frame);
        this.scene = scene;
        this.Type = type;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0, 1);
        this.setInteractive();
        this.setImmovable();
        this.setPipeline("Light2D");

        if ( this.Type == "TownCentre" && this.IsPlayerOwned == true ) {
            let BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 672 + 1, 672  + 1, 0xffffff, 0.2).setVisible(false);
            this.scene.physics.world.enable(BuildZone);
            this.BuildZone = BuildZone;
            this.scene.TownCentre = this;
        }

        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            //if ( !pointer.rightButtonDown() ) return;
            //console.log(this.StaticData);
            //if ( this.IsPlayerOwned == true )
            //    return this.OpenManagementScreen();
            //this.StartDialogue();
        });

        return this;
    }

    StartDialogue () {

        console.log("Start dialogue with this building");

        // Market = Open trade window
        if ( this.Type == "Market")
            this.scene.UI.TradeWindow.Show(this.ID);

        // Town Centre = Start Dialogue with town leader
        if ( this.Type == "Town Centre") {
            // Find town leader
            let Data = this.scene.DataManager.GetBuildingData(this.ID);
            this.scene.UI.DialogueWindow.StartConversation(Data.Person);
        }

    }

    OpenManagementScreen () {
        console.log("Open building management screen");

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