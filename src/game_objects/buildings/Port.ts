import Game from '../../scenes/Game';
import Building from '../Building';

export default class Port extends Building {

    public width: number = 192;
    public height: number = 192;
    
    public description: string = `The port provides docking space for ships and facilitates trade`;
    public PeopleCapacity: number = 0;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    public ResourceStorageIncrease: number = 1000;
    public AggroZone: boolean = false;
    public PlotWidth: number = 96;
    public PlotHeight: number = 128;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "port", object);
        this.body.setSize(this.PlotWidth, this.PlotHeight);
        this.body.offset.x = 0;
        return this;
    }

}