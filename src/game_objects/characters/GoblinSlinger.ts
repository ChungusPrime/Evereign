import Game from "../../scenes/Game";
import Building from "../Building";
import Character from "../Character";

export default class GoblinSlinger extends Character {

    public Name: string = "Orc Slinger";
    public WalkAnimation: string = "GoblinSlingerWalk";
    public AttackRange: number = 200;
    public Type: string = "Ranged";
    public SpawnLocation: Building | { x: number, y: number };
    public GoldValue: number = 3;
    public ExpValue: number = 5;
    
    public Level: number = 1;
    public Data: any;
    public MovementCooldown: number = 3000;
    public Health: number = 6;
    public MaxHealth: number = 6;
    public MovementSpeed: number = 50;
    public AttackCooldown: number = 1000;
    public Temperament: string = "Hostile";
    public Faction: string = "Klan Gorgutz";

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

    public LootTable: any = {
        'orc_bow_1': 1,
        'orc_ear': 1,
        'orcish_arrow': 1
    };

    public Abilities: CharacterAbilities = {
        'Pinning Shot': {
            Cooldown: 5000,
            CooldownMax: 5000,
            Damage: {
                1: [
                    { Type: "Pierce", Min: 1, Max: 5, ApplyDebuff: "Slow" }
                ],
                2: [
                    { Type: "Pierce", Min: 3, Max: 7, ApplyDebuff: "Slow" }
                ],
                3: [
                    { Type: "Pierce", Min: 11, Max: 19, ApplyDebuff: "Slow" }
                ],
                4: [
                    { Type: "Pierce", Min: 27, Max: 45, ApplyDebuff: "Slow" }
                ],
                5: [
                    { Type: "Pierce", Min: 84, Max: 125, ApplyDebuff: "Slow" }
                ],
            }
        },
        'Bow Shot': {
            Cooldown: 2000,
            CooldownMax: 2000,
            Damage: {
                1: [
                    { Type: "Pierce", Min: 15, Max: 25 }
                ],
                2: [
                    { Type: "Pierce", Min: 7, Max: 11 }
                ],
                3: [
                    { Type: "Pierce", Min: 14, Max: 35 }
                ],
                4: [
                    { Type: "Pierce", Min: 42, Max: 56 }
                ],
                5: [
                    { Type: "Pierce", Min: 61, Max: 70 }
                ],
            }
        },
    };
    
    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | Building ) {
        super(scene, { x: object.x, y: object.y }, "Orcs", 0);

        if ( 'properties' in object && object.properties ) {
            this.ID = object.properties[0].value ?? null;
        }

        this.SpawnLocation = object instanceof Building ? object : { x: object.x, y: object.y };
        this.MaxHealth = this.Health;
        this.setPipeline('Light2D');
        this.scene.Enemies.add(this);

        console.log("Created Goblin Slinger at", this.x, this.y, this.SpawnLocation);
    }

    update ( time: number, delta: number ) {

        this.AttackCooldown -= delta;
        this.MovementCooldown -= delta;

        Object.values(this.Abilities).forEach(ability => {
            ability.Cooldown -= delta;
        });

        if ( this.InCombat == true ) {

            this.InCombatDelta -= delta;

            if ( this.InCombatDelta <= 0 )
                return this.LoseAggro();

            let DistanceFromSpawnPoint = Phaser.Math.Distance.BetweenPoints(this, { x: this.SpawnLocation.x, y: this.SpawnLocation.y });
            if ( DistanceFromSpawnPoint > 500 )
                return this.LoseAggro();

            let DistanceFromPlayer = Phaser.Math.Distance.BetweenPoints(this, { x: this.scene.PlayerCharacter.x, y: this.scene.PlayerCharacter.y });
            if ( DistanceFromPlayer > this.AttackRange ) {
                this.scene.physics.moveTo(this, this.scene.PlayerCharacter.x, this.scene.PlayerCharacter.y, this.MovementSpeed);
            } else {
                this.body.reset(this.x, this.y);
                if ( this.AttackCooldown <= 0 )
                    this.Attack();
            }

        } 
        
        if ( this.InCombat == false ) {
            if ( this.moving ) {
                const distance = Phaser.Math.Distance.BetweenPoints(this, { x: this.targetX, y: this.targetY });
                if ( distance <= 10 )
                    this.StopMoving();
            }
        }

        if ( this.body!.velocity.x == 0 && this.body!.velocity.y == 0 ) {
            this.stop();
        } else {
            if ( !this.anims.isPlaying )
                this.play(this.WalkAnimation);
        }

    }

}