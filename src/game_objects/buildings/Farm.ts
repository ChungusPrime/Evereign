import Town from '../../scenes/Game';
import Building from '../Building';

export default class Farm extends Building {

    public width: number = 224;
    public height: number = 224;
    public AllowWorkers: boolean = true;
    public WorkerSlots: number = 1;
    public WorkerType: string = "Farmer";
    public Skill: string = "Farming";
    public ActiveJob: string = "";
    public Jobs: Job[] = [
        { Name: "Grow Wheat", LevelRequirement: 1 },
        { Name: "Grow Potatoes", LevelRequirement: 1 },
        { Name: "Grow Tea", LevelRequirement: 2 },
        { Name: "Grow Coffee", LevelRequirement: 2 },
        { Name: "Grow Cotton", LevelRequirement: 3 },
        { Name: "Grow Hops", LevelRequirement: 3 }
    ];

    constructor ( scene: Town, x: number, y: number ) {
        super( scene, x, y, "Farm", "farm_1");
        return this;
    }

}