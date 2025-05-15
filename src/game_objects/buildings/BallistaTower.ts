import Town from '../../scenes/Game';
import Building from '../Building';

export default class BallistaTower extends Building {

    public width: number = 64;
    public height: number = 64;
    public description: string = `Basic defensive tower, will fire ballistae at enemies within its range`;
    public type: string = "Defensive";
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    public PeopleCapacity: number = 1;
    public Attachment: Phaser.GameObjects.Sprite;
    public AggroZone: boolean = false;

    // Build radius
    public Radius: Phaser.GameObjects.Arc;

    constructor ( scene: Town, x: number, y: number) {
        super( scene, x, y, "Buildings", "dwelling_1");
        this.Radius = this.scene.add.circle(this.getCenter().x, this.getCenter().y, 200, 0x6666ff, 0.2).setOrigin(0.5).setStrokeStyle(2, 0x0000ff, 0.75);
        this.scene.add.existing(this.Radius);
        this.Attachment = this.scene.add.sprite(this.getCenter().x, this.getCenter().y, "Ballista");
        this.scene.add.existing(this.Attachment);
        return this;
    }

}