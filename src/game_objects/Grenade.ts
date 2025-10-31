import { Physics } from "phaser";
import Game from "../scenes/Game";
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import { EnemyRect } from "./QuadTree_Rects";

export default class Grenade extends Phaser.Physics.Arcade.Sprite {

    public light: Phaser.GameObjects.Light | null = null;
    public damage: any;
    public velocity: number;
    public preFX!: any;
    public scene: Game;
    public Lifetime: number = 3000;

    constructor ( scene: Game, x: number, y: number, velocity: number, damage: any, sprite: string ) {
        super(scene, x, y, sprite, 0);
        let spr = sprite.split("-");
        this.setTexture(spr[0]);
        this.setFrame(spr[1]);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setCircle(12, 0, 0);
        this.velocity = velocity;
        this.damage = damage;
        this.setDrag(0.2);
        this.setAngularDrag(2);
        this.setDamping(true);
        return this;
    }
    
    update ( time: number, delta: number ) {
        this.Lifetime -= delta;
        if ( this.light ) this.light.setPosition(this.x, this.y);
        if ( this.Lifetime <= 0 ) {
            this.explode();
        }
    }

    explode () {
        
        this.scene.sound.play("KineticBoltHit");

        let ExplosionSprite = this.scene.add.sprite(this.x, this.y, "Explosion1Sheet", 0)
        .play("explosion-1")
        .on('animationcomplete', () => {
            ExplosionSprite.destroy();
        }).setOrigin(0.5);

        this.light = this.scene.lights.addLight(ExplosionSprite.x, ExplosionSprite.y, 160, 0xFE9900, 1);

        this.scene.add.tween({
            targets: this.light,
            intensity: { from: 1, to: 0 },
            radius: { from: 160, to: 0 },
            duration: 1000,
            yoyo: false,
            repeat: 0,
            ease: 'Sine.easeInOut'
        });

        this.scene.time.delayedCall(1000, () => {
            if (this.light) {
                this.scene.lights.removeLight(this.light);
            }
        });

        let damageArea = new Phaser.Geom.Circle(this.x, this.y, 128);
        const enemies = this.scene.Quadtree.retrieve(new Circle({x: damageArea.x, y: damageArea.y, r: damageArea.radius}));
        enemies.forEach( (element: EnemyRect) => {
            if ( Phaser.Geom.Circle.Contains(damageArea, element.enemy.getCenter().x, element.enemy.getCenter().y)) {
                console.log(element.enemy);
            }
        });

        this.destroy();

    }

}