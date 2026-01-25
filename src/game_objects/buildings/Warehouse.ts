import Game from '../../scenes/Game';
import Building from '../Building';

export default class Warehouse extends Building {

    public width: number = 128;
    public height: number = 128;
    
    public description: string = `The warehouse provides storage space for all kinds of resources`;
    public PeopleCapacity: number = 0;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    public ResourceStorageIncrease: number = 1000;
    public AggroZone: boolean = false;
    public PlotWidth: number = 128;
    public PlotHeight: number = 128;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "warehouse1", object);
        return this;
    }

}