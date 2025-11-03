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

    public Defence_Pierce: number = 0;
    public Defence_Impact: number = 0;
    public Defence_Slash: number = 0;
    public Defence_Fire: number = 0;
    public Defence_Cold: number = 0;
    public Defence_Lightning: number = 0;
    public Defence_Poison: number = 0;
    public Defence_Arcane: number = 0;
    public Defence_True: number = 0;
    public Defence_Bleed: number = 0;
    public Defence_Radiant: number = 0;
    public Defence_Corruption: number = 0;
    public Defence_Sonic: number = 0;

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