import Game from '../../scenes/Game';
import Building from '../Building';
import Field from './Field';

export default class Farm extends Building {

    public width: number = 224;
    public height: number = 224;
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;
    
    public AllowWorkers: boolean = true;
    public WorkerSlots: number = 1;
    public WorkerType: string = "Farmer";

    public Skill: string = "Farming";

    public AssignedFields: Field[] = [];

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "farm1" , object);
        return this;
    }

}