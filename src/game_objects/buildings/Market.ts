import Game from '../../scenes/Game';
import Building from '../Building';

export default class Market extends Building {
    ProductsPerTick: { ID: number; Amount: number; }[] = [];
    width: number = 128;
    height: number = 128;
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;
    public AggroZone: boolean = false;

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "market1", object);
        return this;
    }

}