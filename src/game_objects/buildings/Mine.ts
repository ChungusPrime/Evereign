import Game from '../../scenes/Game';
import Building from '../Building';

export default class Mine extends Building {

    public width: number = 128;
    public height: number = 64;

    public PlotWidth: number = 128;
    public PlotHeight: number = 64;

    public ProductsPerTick: { ID: number; Amount: number; }[] = [];

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "mine1", object);
        return this;
    }

}