import Game from "../../scenes/Game";
import Building from "../Building";
import Character from "../Character";
import Projectile from "../Projectile";

export default class GoblinSlinger extends Character {

    public Name: string = "Goblin Slinger";
    public WalkAnimation: string = "GoblinSlingerWalk";
    public AttackRange: number = 200;
    public Type: string = "Ranged";
    public SpawnLocation: Building | { x: number, y: number };
    public GoldValue: number = 3;
    public ExpValue: number = 5;
    public LootTable: any = [];
    public Level: number = 1;
    public Data: any;
    public moving: boolean = false;
    public targetX: number;
    public targetY: number;
    public MovementCooldown: number = 3000;
    public Health: number = 6;
    public MaxHealth: number;
    public MovementSpeed: number = 50;
    public AttackCooldown: number = 1000;
    public Temperament: string = "Hostile";
    public Faction: string = "Goblin";

    public Abilities: CharacterAbilities = {
        'Pinning Shot': {
            Cooldown: 5000,
            CooldownMax: 5000,
            Damage: {
                1: [
                    { Type: "Pierce", Min: 12, Max: 18, ApplyDebuff: "Slow" }
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
    
    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject, isPlayerOwned: boolean = false ) {
        super(scene, { x: object.x, y: object.y }, "Orcs", 0);

        if ( object.properties ) {
            this.ID = object.properties[0].value ?? null;
        }

        this.SpawnLocation = { x: object.x, y: object.y };
        this.MaxHealth = this.Health;
        //this.setPipeline('Light2D');
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

    Attack () {

        // Find an ability with a cooldown of 0 or less
        let Ability = null;
        for ( let key in this.Abilities ) {
            if ( this.Abilities[key].Cooldown <= 0 ) {
                this.Abilities[key].Cooldown = this.Abilities[key].CooldownMax;
                Ability = key;
                break;
            }
        }

        if ( Ability == null ) {
            this.AttackCooldown = 1000;
            return console.log("No abilities available to use!");
        }

        if ( Ability == 'Bow Shot' ) {
            console.log("Bow Shot fired");
            this.scene.EnemyProjectiles.add(new Projectile(this.scene, this.x, this.y, 150, this.Abilities[Ability].Damage[this.Level], "Goblin-Arrow"));
        }

        if ( Ability == 'Pinning Shot' ) {
            console.log("Pinning Shot fired");
            this.scene.EnemyProjectiles.add(new Projectile(this.scene, this.x, this.y, 125, this.Abilities[Ability].Damage[this.Level], "Goblin-Arrow"));
        }

        this.InCombatDelta = 5000;
        this.AttackCooldown = 1000;
    }

    MoveTo (x: number, y: number) {
        var x = Phaser.Math.Between( this.SpawnLocation.x - 50, this.SpawnLocation.x + 50 );
        var y = Phaser.Math.Between( this.SpawnLocation.y - 50, this.SpawnLocation.y + 50 );
        this.moving = true
        this.targetX = x;
        this.targetY = y;
        this.scene.physics.moveTo(this, x, y, this.MovementSpeed);
    }

    StopMoving () {
        this.moving = false;
        this.targetX = 0;
        this.targetY = 0;
    }

}