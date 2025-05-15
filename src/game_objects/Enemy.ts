import Game from "../scenes/Game";
import Building from "./Building";
import Pickup from "./Pickup";
import Projectile from "./Projectile";
import { GD } from "../scenes/Game";

export default abstract class Enemy extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public InCombat: boolean = false;
    public InCombatDelta: number = 0;
    public body!: Phaser.Physics.Arcade.Body;
    public ID: number;
    public OnDestroyAddFlag: number;

    // These properties are unique per enemy type
    abstract Health: number;
    abstract MaxHealth: number;
    abstract Type: string;
    
    abstract SpawnLocation: Building | { x: number, y: number };
    abstract AttackRange: number;
    abstract AttackCooldown: number;
    abstract MovementSpeed: number;
    abstract LootTable: number[];
    abstract GoldValue: number;
    abstract ExpValue: number;
    abstract WalkAnimation: string;
    abstract Name: string;
    abstract Level: number;

    abstract Abilities: { 
        [key: string]: { 
            Description: string,
            Cooldown: number
        }
    };

    constructor (scene: Game, SpawnLocation: Building | { x: number, y: number }, Spritesheet: string, SpriteIndex: number ) {
        super (scene, SpawnLocation.x, SpawnLocation.y, Spritesheet, SpriteIndex);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.Enemies.add(this);
        this.setDepth(99);
        this.setOrigin(0.5);
        this.setScale(2);
        this.setInteractive();
        this.setBodySize(6, 10);
        this.setImmovable(true);
    }

    Aggro () {
        this.InCombat = true;
        this.InCombatDelta = 5000;
    }

    LoseAggro () {
        this.clearTint();
        this.InCombat = false;
        this.InCombatDelta = 5000;
        this.Health = this.MaxHealth;
        this.setVelocity(0, 0);
        if ( this.SpawnLocation instanceof Building ) {
            let RandomPoint = this.SpawnLocation.getBounds().getRandomPoint();
            this.body.reset(RandomPoint.x, RandomPoint.y);
            this.setPosition(RandomPoint.x, RandomPoint.y);
        } else {
            this.body.reset(this.SpawnLocation.x, this.SpawnLocation.y);
            this.setPosition(this.SpawnLocation.x, this.SpawnLocation.y);
        }
    }

    TakeDamage ( amount: number ) {
        this.Health -= amount;
        if ( this.Health <= 0 )
            this.die();
    }

    die () {

        // If the enemy was spawned by a building, update the buildings unit count
        if ( this.SpawnLocation instanceof Building && this.SpawnLocation.CurrentSpawnCount !== undefined ) {

            this.SpawnLocation.CurrentSpawnCount--;

            if ( this.SpawnLocation.Units !== undefined ) {
                let Unit = this.SpawnLocation.Units.find( (e) => e.Name == this.Name );
                if ( Unit !== undefined ) {
                    Unit.Alive--;
                    Unit.Dead++;
                }
            }

        }

        this.scene.PlayerCharacter.AddXP(this.ExpValue);
        const GoldPickup = new Pickup(this.scene, this.x, this.y, "bonus1", 8, "gold", this.GoldValue, true);
        this.scene.Pickups.add(GoldPickup);
        this.scene.Enemies.remove(this, true, true);

        if ( !(this.SpawnLocation instanceof Building) ) {
            GD.Maps[GD.CurrentMap].Enemies.find((e) => e.ID == this.ID).Alive = false;
        }

    }

}