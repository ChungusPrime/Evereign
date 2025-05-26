import Game from "../../scenes/Game";

export default class Bloomberry extends Phaser.Physics.Arcade.Sprite {

    public Name = "Bloomberry";
    public Description = "A rare flower known for its vibrant colors and sweet fragrance, often sought after by herbalists and gardeners.";

    public Category = "Plants";
    public IsObstacle = true;
    public IsInteractable = false;

    // Harvesting properties
    public IsHarvestable = true;
    public HarvestAmount = 1;
    public HarvestItem = "bloomberry";
    public HarvestTime = 3000;
    public HarvestSound = "harvesting";
    public HarvestRequiresToolType = "Botany Kit";
    public HarvestExperienceType = "Botany";
    public HarvestExperienceValue = 5;

    constructor ( scene: Game, x: number, y: number, width: number = 80, height: number = 120 ) {
        super( scene, x, y, "RA_Jungle", 1179);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setData('type', "Bloomberry")
        .setDisplaySize(width, height)
        this.setOrigin(0, 1)
        .setPipeline("Light2D")
        .setDepth(100)
        .setInteractive()
        .on('pointerdown', () => {
            console.log(this);
            scene.ActivityManager.StartActivity(this);
        })
        .setImmovable(true);
    }

}