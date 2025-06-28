import Town from '../../scenes/Game';
import Building from '../Building';
import Field from './Field';

export default class Farm extends Building {

    public width: number = 224;
    public height: number = 224;
    
    public AllowWorkers: boolean = true;
    public WorkerSlots: number = 1;
    public WorkerType: string = "Farmer";

    public Skill: string = "Farming";

    public AssignedFields: Field[] = [];

    constructor ( scene: Town, x: number, y: number ) {
        super( scene, x, y, "Buildings", "farm1");
        return this;
    }

}