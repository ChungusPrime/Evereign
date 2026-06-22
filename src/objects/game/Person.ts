import Town from "../../scenes/Game";

export default class Person extends Phaser.Physics.Arcade.Sprite {

    public scene: Town;
    public targetX: number = 0;
    public targetY: number = 0;
    public moving: boolean = false;
    public job: string = "Idle";
    /*
    Job Descriptions:
    Idle:
    Wander within a small area around the town centre. If there is no town centre, wander around the player instead
    Defend:
    Attack incoming enemies, and man any free defensive structures (ballista towers etc)
    Production:
    Produce resources at a designated building
    */

    public move_speed: number = 40;
    public health: number = 50;
    public attack_speed: number = 4000;

    constructor ( scene: Town, x: number, y: number, sprite: number ) {
        super(scene, x, y, "characters", sprite);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(1);
        //this.scene.People.push(this);
    }

    MoveTo (x: number, y: number) {
        var x = Phaser.Math.Between( this.scene.PlayerCharacter.x - 100, this.scene.PlayerCharacter.x + 100 );
        var y = Phaser.Math.Between( this.scene.PlayerCharacter.y - 100, this.scene.PlayerCharacter.y + 100 );
        this.moving = true
        this.targetX = x;
        this.targetY = y;
        this.scene.physics.moveTo(this, x, y, this.move_speed);
    }

    StopMoving () {
        this.moving = false;
        this.targetX = 0;
        this.targetY = 0;
    }

    update ( delta: number ) {
        if ( this.moving ) {
            const distance = Phaser.Math.Distance.BetweenPoints(this, { x: this.targetX, y: this.targetY });
            if ( distance <= 10 ) {
                this.StopMoving();
            }
        }
    }
}