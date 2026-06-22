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

    constructor ( scene: Game, object: { x: number, y: number, width: number, height: number }, isPlayerOwned: boolean = false ) {
        super( scene, object.x, object.y, "RA_Jungle", 1179);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setData('type', "Bloomberry")
        .setDisplaySize(32, 32)
        .setOrigin(0, 1)
        .setLighting(true)
        .setDepth(100)
        .setInteractive()
        .on('pointerdown', () => {
            console.log(this);
            scene.ActionManager.StartHarvesting(this);
        })
        .setImmovable(true);
        scene.Plants.add(this);
    }

}