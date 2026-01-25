import Game from '../../scenes/Game';
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
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;

    // Build radius
    public Radius: Phaser.GameObjects.Arc;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "BallistaTower", object);
        this.Radius = this.scene.add.circle(this.getCenter().x, this.getCenter().y, 200, 0x6666ff, 0).setOrigin(0.5).setStrokeStyle(2, 0x0000ff, 0);
        this.scene.add.existing(this.Radius);
        //this.Attachment = this.scene.add.sprite(this.getCenter().x, this.getCenter().y, "Ballista");
        //this.scene.add.existing(this.Attachment);
        return this;
    }

}