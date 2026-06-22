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

    constructor ( scene: Game, object: { x: number, y: number, width: number, height: number }, isPlayerOwned: boolean = false ) {
        super( scene, object.x, object.y, "RA_Jungle", 1075);
        scene.physics.add.existing(this);
        scene.add.existing(this);
        this.setData('type', "Marigold")
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