import Game from "../scenes/Game";

export default class Projectile extends Phaser.Physics.Arcade.Sprite {

    public light: Phaser.GameObjects.Light | null = null;
    public damage: number;
    public velocity: number;
    public preFX!: any;
    public scene: Game;
    public Lifetime: number = 5000;

    constructor ( scene: Game, x: number, y: number, velocity: number, damage: any, type: string ) {

        super(scene, x, y, type, 0);
        this.velocity = velocity;
        this.damage = damage;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0.5)
        this.setDisplaySize(10, 10);
        this.setCircle(8, 0, 0);

        if ( type == "Kinetic Bolt" ) {
            this.preFX.addGlow(0x34a4eb, 4, 0, false, 0.1, 10);
            this.play("arcane-dart-anim");
            scene.physics.moveTo(this, scene.mouseX, scene.mouseY, this.velocity, 0);
            let radians = Phaser.Math.Angle.Between(this.x, this.y, scene.mouseX, scene.mouseY);
            this.setRotation(radians);
            this.light = scene.lights.addLight(scene.PlayerCharacter.x, scene.PlayerCharacter.y, 64, 0x34a4eb, 1);
        }

        if ( type == "Goblin-Arrow" ) {
            scene.physics.moveTo(this, scene.PlayerCharacter.x, scene.PlayerCharacter.y, this.velocity, 0);
            let radians = Phaser.Math.Angle.Between(this.x, this.y, scene.PlayerCharacter.x, scene.PlayerCharacter.y);
            this.setRotation(radians);
        }

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