import Game from '../../scenes/Game';
import Building from '../Building';

export default class TownCentre extends Building {

    public scene: Game;
    public Size: number = 224;
    public HousingSlots: number = 5;
    public AggroZone: boolean = false;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    public CurrentJob: string = "";
    public CostMultiplier: number = 5;
    public BuildZone!: Phaser.GameObjects.Rectangle;
    public PlotWidth: number = 256;
    public PlotHeight: number = 256;
    public Type = "Town Centre";

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "towncentre1", object);
        this.scene = scene;
        if ( this.IsPlayerOwned ) {
            let BuildZone = this.scene.add.rectangle(this.getCenter().x, this.getCenter().y, 640 + 1, 640 + 1, 0xffffff, 0.2).setVisible(false);
            this.scene.physics.world.enable(BuildZone);
            this.BuildZone = BuildZone;
            this.scene.TownCentre = this;
            console.log("Player Town Centre created at " + this.x + ", " + this.y);
        }
        return this;
    }

}