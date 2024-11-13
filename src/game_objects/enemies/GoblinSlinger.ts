import Game from "../../scenes/Game";
import Building from "../Building";
import Enemy from "../Enemy";

export default class GoblinSlinger extends Enemy {

    public AttackRange: number = 200;
    public MovementSpeed: number = 50;
    public Health: number = 6;
    public Type: string = "Ranged";
    public VARNAME: string = "Goblin Slinger";
    public SpawnLocation: Building | { x: number, y: number };
    public Abilities: string[] = [ 'Sling Shot' ];
    public WalkAnimation: string = "GoblinSlingerWalk";
    public AttackCooldown: number = 2000;
    public GoldValue: number = 3;
    public ExpValue: number = 5;
    public LootTable: any = [];
    public Data: any;

    constructor ( scene: Game, SpawnLocation: Building | { x: number, y: number } ) {
        super(scene, SpawnLocation, "characters", 118);
        this.SpawnLocation = SpawnLocation;
    }

    update ( time: number, delta: number ) {

        this.AttackCooldown -= delta;

        if ( this.InCombat ) {

            this.InCombatDelta -= delta;

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
                    this.Attack();
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