import Game from "../../scenes/Game";

export default class IronDeposit extends Phaser.Physics.Arcade.Sprite {

    public Name = "Iron Deposit";
    public Description = "A rocky outcrop rich in iron resources.";

    public Category = "Deposits";
    public IsObstacle = true;
    public IsInteractable = false;

    // Harvesting properties
    public IsHarvestable = true;
    public HarvestAmount = 1;
    public HarvestItem = "iron_ore";
    public HarvestTime = 5000;
    public HarvestSound = "mining";
    public HarvestRequiresToolType = "Pickaxe";
    public HarvestExperienceType = "Mining";
    public HarvestExperienceValue = 10;

    constructor ( scene: Game, x: number, y: number, ID: string, Data: WorldData ) {
        super( scene, x, y, "mining-nodes", 0);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(32, 32)
        .setData("type", "Iron Deposit")
        .setPipeline("Light2D")
        .setDepth(100)
        .setImmovable(true)
        .setInteractive()
        .on('pointerdown', () => {
            console.log(this);
            scene.ActivityManager.StartActivity(this);
        });
        scene.Nodes.add(this);
    }

}