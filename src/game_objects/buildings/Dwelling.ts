import Game from '../../scenes/Game';
import Building from '../Building';

export default class Dwelling extends Building {
    public width: number = 128;
    public height: number = 64;
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    constructor ( scene: Game, x: number, y: number, id: string, data: WorldData ) {
        super( scene, x, y, "Buildings", "dwelling1");
        return this;
    }
}