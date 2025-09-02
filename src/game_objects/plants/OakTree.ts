import Game from "../../scenes/Game";

export default class OakTree extends Phaser.Physics.Arcade.Sprite {

    public Name = "Oak Tree";
    public Description = "A sturdy oak tree, providing shade and resources.";

    public Category = "Trees";
    public IsObstacle = true;
    public IsInteractable = false;

    // Harvesting properties
    public IsHarvestable = true;
    public HarvestAmount = 1;
    public HarvestItem = "log_oak";
    public HarvestTime = 3000;
    public HarvestSound = "woodcutting";
    public HarvestRequiresToolType = "Felling Axe";
    public HarvestExperienceType = "Forestry";
    public HarvestExperienceValue = 5;

    constructor ( scene: Game, x: number, y: number, ID: string, Data: WorldData ) {
        super( scene, x, y, "tree03_s_01_animation", 0);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setOrigin(0, 1)
        .setDisplaySize(100, 125)
        .setData("type", "Oak Tree")
        .setDisplaySize(100, 120)
        .setPipeline("Light2D")
        .setDepth(100)
        .setBodySize(40, 60)
        .play('tree-03-anim')
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