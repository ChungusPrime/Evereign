import Game from "../scenes/Game";

export default abstract class Building extends Phaser.Physics.Arcade.Sprite {

    // All buildings
    public scene: Game;
    public ID: string | null = null;
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

    constructor ( scene: Game, frame: string, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {

        super(scene, object.x, object.y, "Buildings", frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        console.log(object);
        
        if ( 'properties' in object && object.properties ) {
            // If the object is from Tiled, take the ID from the first index of properties
            this.ID = object.properties[0].value ?? null;
            this.IsPlayerOwned = false;
        }
        else if ( 'id' in object ) {
            // If the object is from PlayerData, take the ID directly from the object
            this.ID = object.id as string ?? null;
            this.IsPlayerOwned = true;
        }
        
        console.log(this.ID, this.IsPlayerOwned);

        this.setOrigin(0, 1).setInteractive().setImmovable().setPipeline("Light2D");

        this.scene.Buildings.add(this);

        /*if ( this.Type == "TownCentre" && this.IsPlayerOwned == true ) {
            let BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 672 + 1, 672  + 1, 0xffffff, 0.2).setVisible(false);
            this.scene.physics.world.enable(BuildZone);
            this.BuildZone = BuildZone;
            this.scene.TownCentre = this;
        }*/

        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {

            if ( pointer.rightButtonDown() ) {
                console.log(this.ID, this.IsPlayerOwned);
            }

            if ( this.IsPlayerOwned == true ) {
                return this.OpenManagementPanel();
            }

            // Market = Open trade window
            if ( this.Type == "Market")
                this.scene.UI.TradeWindow.Show(this.ID);

            // Town Centre = Start Dialogue with town leader
            if ( this.Type == "Town Centre") {
                // Find town leader
                let Data = this.scene.DataManager.GetBuildingData(this.ID);
                this.scene.UI.DialogueWindow.StartConversation(Data.Person);
            }
                

        });

        return this;
    }

    OpenManagementPanel () {
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