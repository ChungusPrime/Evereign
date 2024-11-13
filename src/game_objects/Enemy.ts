import Game from "../scenes/Game";
import Building from "./Building";
import GoblinOutpost from "./buildings/GoblinOutpost";
import Character from "./Character";
import Projectile from "./Projectile";

export default abstract class Enemy extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;

    public InCombat: boolean = false;
    public InCombatDelta: number = 0;

    public body!: Phaser.Physics.Arcade.Body;

    // These properties are unique per enemy type
    abstract Health: number;
    abstract Type: string;
    abstract Abilities: Array<string>;
    abstract SpawnLocation: Building | { x: number, y: number };
    abstract AttackRange: number;
    abstract AttackCooldown: number;
    abstract MovementSpeed: number;
    abstract LootTable: any;
    abstract GoldValue: number;
    abstract ExpValue: number;
    abstract WalkAnimation: string;
    abstract VARNAME: string;

    constructor (scene: Game, SpawnLocation: Building | { x: number, y: number }, Spritesheet: string, SpriteIndex: number ) {
        super (scene, SpawnLocation.x, SpawnLocation.y, Spritesheet, SpriteIndex);
        this.scene = scene;
        this.create();
    }

    create () {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.EnemyManager.Enemies.add(this);
        this.setDepth(99);
        this.setOrigin(0.5);
        this.setScale(2);
        this.setInteractive();
        this.setBodySize(6, 10);
        this.setImmovable(true);
        this.on('pointerdown', ( pointer: Phaser.Input.Pointer ) => {
            if ( pointer.rightButtonDown() ) {
                console.log(this.getData(['ID', 'OnDestroyAddFlag']));
            }
        });

    }

    Aggro () {
        this.InCombat = true;
        this.InCombatDelta = 5000;
        const hsv = Phaser.Display.Color.HSVColorWheel();
        this.setTint(hsv[128].color);
    }

    LoseAggro () {
        this.clearTint();
        this.InCombat = false;
        this.InCombatDelta = 5000;

        if ( this.SpawnLocation instanceof Building ) {
            let RandomPoint = this.SpawnLocation.getBounds().getRandomPoint();
            this.body.reset(RandomPoint.x, RandomPoint.y);
            this.setPosition(RandomPoint.x, RandomPoint.y);
        } else {
            this.body.reset(this.SpawnLocation.x, this.SpawnLocation.y);
            this.setPosition(this.SpawnLocation.x, this.SpawnLocation.y);
        }



        this.setVelocity(0, 0);
    }

    TakeDamage ( amount: number ) {
        this.Health -= amount;
        if ( this.Health <= 0 ) {
            this.die();
        }
    }

    Attack () {
        this.InCombatDelta = 5000;
        let projectile = new Projectile(this.scene, this.x, this.y, 150, 0, "Goblin-Arrow");
        this.scene.EnemyProjectiles.add(projectile);
        this.AttackCooldown = 2000;
    }

    die () {
        if ( this.SpawnLocation instanceof Building && this.SpawnLocation.CurrentSpawnCount !== undefined ) {
            this.SpawnLocation.CurrentSpawnCount--;
            if ( this.SpawnLocation.Units !== undefined ) {
                let Unit = this.SpawnLocation.Units.find( (e) => e.Name == this.VARNAME );
                if ( Unit !== undefined ) {
                    Unit.Alive--;
                    Unit.Remaining--;
                    Unit.Dead++;
                }
                console.log(this.SpawnLocation.Units);
            }
        }

        this.scene.PlayerCharacter.AddXP(this.ExpValue);
        this.scene.InventoryManager.AddGold(this.GoldValue);

        let Flag = this.getData('OnDestroyAddFlag');

        if ( Flag !== undefined ) {
            this.scene.DataManager.AddFlag(Flag);
        }

        this.scene.EnemyManager.Enemies.remove(this, true, true);
    }

}