import Game from "../../scenes/Game";

export default class Marigold extends Phaser.Physics.Arcade.Sprite {

    public Name = "Marigold";
    public Description = "A vibrant flower known for its bright orange and yellow petals, often used in gardens and herbal remedies.";

    public Category = "Plants";
    public IsObstacle = true;
    public IsInteractable = false;

    // Harvesting properties
    public IsHarvestable = true;
    public HarvestAmount = 1;
    public HarvestItem = "marigold";
    public HarvestTime = 3000;
    public HarvestSound = "harvesting";
    public HarvestRequiresToolType = "Botany Kit";
    public HarvestExperienceType = "Botany";
    public HarvestExperienceValue = 5;

    constructor ( scene: Game, x: number, y: number, width: number = 80, height: number = 120 ) {
        super( scene, x, y, "RA_Jungle", 1075);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setData('type', "Marigold")
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