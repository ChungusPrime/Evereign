import Game from "../../scenes/Game";

export default class WillowTree extends Phaser.Physics.Arcade.Sprite {

    public Name = "Willow Tree";
    public Description = "A sturdy willow tree, providing shade and resources.";

    public Category = "Trees";
    public IsObstacle = true;
    public IsInteractable = false;

    // Harvesting properties
    public IsHarvestable = true;
    public HarvestAmount = 1;
    public HarvestItem = "log_willow";
    public HarvestTime = 3000;
    public HarvestSound = "woodcutting";
    public HarvestRequiresToolType = "Felling Axe";
    public HarvestExperienceType = "Forestry";
    public HarvestExperienceValue = 5;

    constructor ( scene: Game, object: { x: number, y: number, width: number, height: number }, isPlayerOwned: boolean = false ) {
        super( scene, object.x, object.y, "WillowTree", 0);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(object.width, object.height)
        .setData("type", "Willow Tree")
        .setDisplaySize(object.width, object.height)
        .setPipeline("Light2D")
        .setDepth(100)
        .setBodySize(40, 60)
        //.play('tree-03-anim')
        .setImmovable(true)
        .setInteractive()
        .on('pointerdown', () => {
            console.log(this);
            scene.ActionManager.StartActivity(this);
        });

        this.body.setOffset(40, 80);

        scene.Trees.add(this);

    }

}