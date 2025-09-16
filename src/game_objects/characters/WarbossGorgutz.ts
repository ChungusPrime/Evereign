import Game from "../../scenes/Game";
import Building from "../Building";
import Enemy from "../Character";

export default class WarbossGorgutz extends Enemy {
    
    public Name: string = "Warboss Gorgutz";
    public AttackRange: number = 35;
    public MovementSpeed: number = 95;
    public Health: number = 250;
    public MaxHealth: number = 250;
    public Type: string = "Melee";
    public SpawnLocation: Building | { x: number, y: number };
    public Temperament: string = "Hostile";
    public Faction: string = "Goblin";

    public Abilities: CharacterAbilities = {
        'Big Axe Throw': {
            //Description: "The Warboss hurls a huge axe towards the target. The axe deals damage in a small area when it lands.",
            Cooldown: 4000
        },
        'Fistful o Axes': {
            //Description: "The Warboss throws a handful of axes at the target.",
            Cooldown: 3000
        },
        'Rally Guards': {
            //Description: "The Warboss calls for reinforcements, summoning a group of goblins to his aid.",
            Cooldown: 6000
        },
    };

    public WalkAnimation: string = "WarbossWalk";
    public AttackCooldown: number = 2000;
    public Level: number;

    public GoldValue: number = 5000;
    public ExpValue: number = 100;
    public LootTable: number[] = [10];

    constructor ( scene: Game, SpawnLocation: Building | { x: number, y: number }, level: number ) {
        super(scene, SpawnLocation, "characters", 7);
        this.Level = level;
        this.SpawnLocation = SpawnLocation;
    }

}