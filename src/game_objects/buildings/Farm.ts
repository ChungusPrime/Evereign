import Town from '../../scenes/Game';
import Building from '../Building';

export default class Farm extends Building {

    public width: number = 224;
    public height: number = 224;
    public Jobs: Array<string> = [];
    public ActiveJob: string = "";
    public ProductsPerTick: { ID: number; Amount: number; }[] = [];
    public AllowWorkers: boolean = true;
    public WorkerSlots: number = 1;

    constructor ( scene: Town, x: number, y: number ) {
        super( scene, x, y, "Farm", 1 );
        return this;
    }

}