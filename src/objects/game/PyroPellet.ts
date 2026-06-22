import Game from "../../scenes/Game";

export default class PyroPellet extends Phaser.Physics.Arcade.Sprite {

    public light: Phaser.GameObjects.Light | null = null;
    public damage: any;
    public velocity: number;
    public scene: Game;
    public Lifetime: number = 5000;
    public Type: string = "PyroPellet";

    constructor ( scene: Game ) {
        super(scene, scene.PlayerCharacter.x, scene.PlayerCharacter.y, "PyroPellet", 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(6, 0, 0);
        this.velocity = 0;
        this.damage = 0;
        this.Type = "PyroPellet";
        this.setTexture("SkillsB", 161);
        this.setSize(8, 8);
        this.setDisplaySize(8, 8);
        let angleToMouse = Phaser.Math.Angle.Between(this.x, this.y, scene.mouseX, scene.mouseY);
        let spread = Phaser.Math.DegToRad(15);
        let randomAngle = angleToMouse + Phaser.Math.FloatBetween(-spread, spread);
        let velocityX = Math.cos(randomAngle) * this.velocity;
        let velocityY = Math.sin(randomAngle) * this.velocity;
        this.setVelocity(velocityX, velocityY);
        this.setCircle(8, 0, 0);
        return this;
    }
    
    update ( time: number, delta: number ) {
        this.Lifetime -= delta;
        if ( this.light ) this.light.setPosition(this.x, this.y);
        if ( this.Lifetime <= 0 )
            this.delete();
    }

    delete () {
        if ( this.light ) 
            this.scene.lights.removeLight(this.light);
        this.scene.Projectiles.remove(this, true, true);
    }

}