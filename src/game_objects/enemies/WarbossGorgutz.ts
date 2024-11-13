import Game from "../../scenes/Game";
import Building from "../Building";
import Enemy from "../Enemy";

export default class WarbossGorgutz extends Enemy {
    
    public AttackRange: number = 35;
    public MovementSpeed: number = 95;
    public Health: number = 250;
    public Type: string = "Melee";
    public VARNAME: string = "Warboss Gorgutz";
    public SpawnLocation: Building | { x: number, y: number };
    public Abilities: string[] = [ 'Summon Guards', 'Big Axe Throw', 'Triple Axe Throw' ];
    public WalkAnimation: string = "WarbossWalk";
    public AttackCooldown: number = 2000;

    public GoldValue: number = 5000;
    public ExpValue: number = 100;
    public LootTable: any = [
        "Gorgutz' Key"
    ];

    constructor ( scene: Game, SpawnLocation: Building | { x: number, y: number } ) {
        super(scene, SpawnLocation, "characters", 7);
        this.SpawnLocation = SpawnLocation;
    }

}