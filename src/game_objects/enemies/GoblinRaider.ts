import Game from "../../scenes/Game";
import Building from "../Building";
import Enemy from "../Enemy";

export default class GoblinRaider extends Enemy {

    public scene: Game;
    public AttackRange: number = 20;
    public MovementSpeed: number = 75;
    public Health: number = 12;
    public Type: string = "Melee";
    public VARNAME: string = "Goblin Raider";
    public SpawnLocation: Building | { x: number, y: number };
    public Abilities: string[] = [ 'Axe Strike' ];
    public WalkAnimation: string = "GoblinRaiderWalk";
    public AttackCooldown: number = 2000;

    public GoldValue: number = 3;
    public ExpValue: number = 5;
    public LootTable: any = [];

    constructor ( scene: Game, SpawnLocation: Building | { x: number, y: number } ) {
        super(scene, SpawnLocation, "characters", 5);
        this.scene = scene
        this.SpawnLocation = SpawnLocation;
    }

}