import Game from "../../scenes/Game";
import Building from "../Building";
import Enemy from "../Character";

export default class GoblinRaider extends Enemy {

    public Name: string = "Goblin Raider";
    public Health: number = 12;
    public MaxHealth: number = 12;
    public AttackRange: number = 60;
    public MovementSpeed: number = 75;
    public Type: string = "Melee";
    public SpawnLocation: Building | { x: number, y: number };
    public WalkAnimation: string = "GoblinRaiderWalk";
    public AttackCooldown: number = 2000;
    public GoldValue: number = 3;
    public ExpValue: number = 5;
    public LootTable: any = [];
    public Data: any;
    public Level: number;
    public Temperament: string = "Hostile";
    public Faction: string = "Goblin";

    public Abilities: CharacterAbilities = {
        'Bleed them dry': {
            //Description: "The goblin raider slashes at the player, applying a bleed effect.",
            Cooldown: 2000
        } 
    };

    constructor ( scene: Game, SpawnLocation: Building | { x: number, y: number }, level: number ) {
        super(scene, SpawnLocation, "characters", 5);
        this.Level = level;
        this.SpawnLocation = SpawnLocation;
    }

    update ( time: number, delta: number ) {

        this.AttackCooldown -= delta;

        if ( this.InCombat ) {

            this.InCombatDelta -= delta;

            let SpawnDistance = Phaser.Math.Distance.BetweenPoints(this, { x: this.SpawnLocation.x, y: this.SpawnLocation.y });
            if ( SpawnDistance > 500 ) {
                this.LoseAggro();
                return;
            }

            if ( this.InCombatDelta <= 0 ) {
                this.LoseAggro();
                return;
            }

            const distance = Phaser.Math.Distance.BetweenPoints(this, { x: this.scene.PlayerCharacter.x, y: this.scene.PlayerCharacter.y });

            if ( distance > this.AttackRange ) {
                this.scene.physics.moveTo(this, this.scene.PlayerCharacter.x, this.scene.PlayerCharacter.y, this.MovementSpeed);
            } else {
                this.body.reset(this.x, this.y);
                if ( this.AttackCooldown <= 0 ) {
                    //this.Attack();
                }
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