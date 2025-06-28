import Town from '../../scenes/Game';
import Building from '../Building';

export default class LoggingCamp extends Building {

    public width: number = 128;
    public height: number = 64;

    public PlotWidth: number = 128;
    public PlotHeight: number = 64;

    public ProductsPerTick: { ID: number; Amount: number; }[] = [];

    constructor ( scene: Town, x: number, y: number ) {
        super( scene, x, y, "Buildings", "loggingcamp");
        return this;
    }

}