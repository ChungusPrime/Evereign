import Game from '../../scenes/Game';
import Building from '../Building';

export default class Field extends Building {

    public width: number = 224;
    public height: number = 224;
    public AllowWorkers: boolean = true;
    public WorkerSlots: number = 1;
    public WorkerType: string = "Farmer";
    public Skill: string = "Farming";
    public ActiveJob: string = "";
    public PlotWidth: number = 128;
    public PlotHeight: number = 64;

    public Jobs: Job[] = [
        { Name: "Grow Wheat", LevelRequirement: 1 },
        { Name: "Grow Potatoes", LevelRequirement: 1 },
        { Name: "Grow Tea", LevelRequirement: 2 },
        { Name: "Grow Coffee", LevelRequirement: 2 },
        { Name: "Grow Cotton", LevelRequirement: 3 },
        { Name: "Grow Hops", LevelRequirement: 3 }
    ];

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | PlayerBuilding ) {
        super( scene, "field", object);
        return this;
    }

}