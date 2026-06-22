import Game from "../../scenes/Game";

export default class ChargedSlug extends Phaser.Physics.Arcade.Sprite {

    public light: Phaser.GameObjects.Light | null = null;
    public damage: any;
    public velocity: number;
    public scene: Game;
    public Lifetime: number = 5000;
    public Type: string = "ChargedSlug";

    constructor ( scene: Game) {
        super(scene, scene.PlayerCharacter.x, scene.PlayerCharacter.y, "ChargedSlug", 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(6, 0, 0);
        this.velocity = 250;
        this.damage = 0;
        this.Type = "ChargedSlug";
        this.setTexture("SkillsB", 160);
        this.setSize(8, 8);
        this.setDisplaySize(8, 8);
        scene.physics.moveTo(this, scene.mouseX, scene.mouseY, this.velocity, 0);
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