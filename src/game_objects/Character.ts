import Game from '../scenes/Game';
import Building from './Building';
import Enemy from './Enemy';
import Projectile from './Projectile';

export default class Character extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public light!: Phaser.GameObjects.Light;
    public walkAnimation: string = "EvokerWalk";
    public footstepSoundInterval: number = 0;
    public Ability_1_Cooldown: number = 0;
    public Ability_2_Cooldown: number = 0;
    public Ability_3_Cooldown: number = 0;
    public Ability_4_Cooldown: number = 0;
    public CurrentClass: string = "Evoker";
    public PlayerHasControl: boolean = true;
    public PlayerIsDead: boolean = false;
    public PlayerInCombat: boolean = false;
    public CombatDelta: number = 0;
    public Health: number = 50;
    public totalMovementSpeed: number = 100;
    public currentExp: number = 0;

    public UpKeyDown: boolean = false;
    public DownKeyDown: boolean = false;
    public LeftKeyDown: boolean = false;
    public RightKeyDown: boolean = false;

    constructor ( scene: Game ) {
        super( scene, scene.DataManager.GameData.X, scene.DataManager.GameData.Y, 'characters', 12 );
        this.scene = scene;
        this.create();
    }

    create (): Character {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setActive(true);
        this.setCollideWorldBounds(true);
        this.setDepth(99);
        this.setOrigin(0.5);
        this.setScale(2);
        this.setBodySize(6, 10);
        this.setPipeline("Light2D");
        this.light = this.scene.lights.addLight(this.x, this.y, 128, 0xe3a456, 0.75);
        this.CurrentClass = this.scene.DataManager.GameData.CurrentClass;
        return this;
    }

    update ( delta: number ): void {

        if ( this.Ability_1_Cooldown > 0 ) this.Ability_1_Cooldown -= delta;
        if ( this.Ability_2_Cooldown > 0 ) this.Ability_2_Cooldown -= delta;
        if ( this.Ability_3_Cooldown > 0 ) this.Ability_3_Cooldown -= delta;
        if ( this.Ability_4_Cooldown > 0 ) this.Ability_4_Cooldown -= delta;

        if ( this.CombatDelta > 0 ) {
            this.CombatDelta -= delta;
        }

        if ( this.CombatDelta <= 0 && this.PlayerInCombat ) {
            this.PlayerInCombat = false;
            this.CombatDelta = 0;
        }

        if ( this.PlayerHasControl ) {
            if ( this.LeftKeyDown ) {
                this.setVelocityX(-this.totalMovementSpeed);
                this.flipX = true
            } else if ( this.RightKeyDown ) {
                this.setVelocityX(this.totalMovementSpeed);
                this.flipX = false
            } else {
                this.setVelocityX(0);
            }
        
            if ( this.UpKeyDown ) {
                this.setVelocityY(-this.totalMovementSpeed);
            } else if ( this.DownKeyDown ) {
                this.setVelocityY(this.totalMovementSpeed);
            } else {
                this.setVelocityY(0);
            }
        }

        if ( this.body!.velocity.x == 0 && this.body!.velocity.y == 0 ) {
            this.stop();
        } else {
            
            if ( this.scene.ActivityManager.CurrentActivity.Type != "" )
                this.scene.ActivityManager.CancelActivity();
            
            if ( !this.anims.isPlaying )
                this.play(this.walkAnimation);

            this.footstepSoundInterval += delta;

            if ( this.footstepSoundInterval > 600 ) {
                this.scene.sound.play('footstep', { volume: 0.8 });
                this.footstepSoundInterval = 0;
            }
        }

        this.light.setPosition(this.x, this.y);
    }

    UseItem ( item: string ) {

    }

    UseAbility ( ability: string ) {

        if ( !this.PlayerHasControl ) return;
        if ( this.scene.BuildingManager.BuildingPlacementMode == true ) return;

        let ClassAbilities = this.scene.DataManager.GetClass(this.scene.DataManager.GameData.CurrentClass).abilities;

        if ( ClassAbilities == undefined ) {
            console.info("Couldnt find ability");
            return;
        }

        let UsedAbility = ClassAbilities[ability];

        if ( UsedAbility.name == "Kinetic Bolt" ) {
            if ( this.scene.DataManager.GameData.Classes['Evoker'].Ability_1_Unlocked == false ) {
                this.scene.UI.EventLog.NewEvent("You have not unlocked this ability yet");
                return;
            }
            if ( this.Ability_1_Cooldown <= 0 ) {
                let cooldown = UsedAbility.parameters.cooldown.upgrades[this.scene.DataManager.GameData.Classes['Evoker'].Ability_1_Param_1_Level].value;
                let damage = UsedAbility.parameters.damage.upgrades[this.scene.DataManager.GameData.Classes['Evoker'].Ability_1_Param_2_Level].value;
                let velocity = UsedAbility.parameters.velocity.upgrades[this.scene.DataManager.GameData.Classes['Evoker'].Ability_1_Param_2_Level].value;
                let Proj = new Projectile(this.scene, this.x, this.y, velocity, damage, "Kinetic Bolt");
                this.scene.Projectiles.add(Proj);
                this.scene.sound.play("KineticBoltCast");
                this.Ability_1_Cooldown = cooldown;
            } else {
                this.scene.UI.EventLog.NewEvent(`${UsedAbility.name} on cooldown for ${this.Ability_1_Cooldown.toFixed(2)}`);
            }
        }

        if ( UsedAbility.name == "Dart Volley" ) {
            if ( this.scene.DataManager.GameData.Classes['Evoker'].Ability_2_Unlocked == false ) {
                this.scene.UI.EventLog.NewEvent("You have not unlocked this ability yet");
                return;
            }
            if ( this.Ability_2_Cooldown <= 0 ) {
                let projectiles = UsedAbility.parameters.projectiles.upgrades[this.scene.DataManager.GameData.Classes['Evoker'].Ability_2_Param_1_Level].value;
                let damage = UsedAbility.parameters.damage.upgrades[this.scene.DataManager.GameData.Classes['Evoker'].Ability_2_Param_2_Level].value;
                let resource_cost = UsedAbility.parameters.resource_cost.upgrades[this.scene.DataManager.GameData.Classes['Evoker'].Ability_2_Param_3_Level].value;
                let delayBetweenShots = 100;
                for ( let i = 0; i < projectiles; i++ ) {
                    this.scene.time.delayedCall(i * delayBetweenShots, () => {
                        let Proj = new Projectile(this.scene, this.x, this.y, 400, damage, "Kinetic Bolt");
                        this.scene.sound.play("DartVolleyCast");
                        const baseAngle = Phaser.Math.Angle.Between( this.x, this.y, this.scene.mouseX, this.scene.mouseY );
                        const halfSpread = 20 / 2;
                        const randomSpread = Phaser.Math.FloatBetween(-halfSpread, halfSpread);
                        const spreadRadians = Phaser.Math.DegToRad(randomSpread);
                        let angle = baseAngle + spreadRadians;
                        Proj.setVelocity( Math.cos(angle) * 200, Math.sin(angle) * 200 );
                        this.scene.Projectiles.add(Proj);
                    });
                }
                this.Ability_2_Cooldown = UsedAbility.cooldown;
            } else {
                this.scene.UI.EventLog.NewEvent(`${UsedAbility.name} on cooldown for ${this.Ability_2_Cooldown.toFixed(2)}`);
            }
        } 

    }

    AddXP ( amount: number ) {
        this.scene.UI.EventLog.NewEvent(`You earned ${amount} exp points`);
        this.scene.DataManager.GameData.Classes[this.CurrentClass].XP += amount;
    }

    TakeDamage ( amount: number ): void {
        this.Health -= amount;
        let HealthPercentage = (this.Health / 100) * 200 * 2;
        this.scene.UI.LifeBar.setDisplaySize(HealthPercentage, 20);
        this.scene.cameras.main.shake(100, 0.01, true);
        this.scene.UI.EventLog.NewEvent(`You took ${amount} damage`);
        if ( this.Health <= 0 )
            this.Die();
    }

    Die (): void {
        this.PlayerIsDead = true;
        this.setPosition(0, 0);
        this.scene.UI.ShowDeathScreen();
        this.scene.EnemyManager.Enemies.getChildren().forEach( (enemy) => {
            (enemy as Enemy).LoseAggro();
        });
        this.scene.BuildingManager.Buildings.getChildren().forEach( (building) => {
            (building as Building).OnAlert = false;
        });
    }

    Respawn () {
        this.PlayerIsDead = false;
        this.Health = 50;
        let HealthPercentage = (this.Health / 100) * 200 * 2;
        this.scene.UI.LifeBar.setDisplaySize(HealthPercentage, 20);
        this.scene.UI.DeathScreen.setVisible(false);
        this.scene.UI.EventsLogCamera.setVisible(true);
        if ( this.scene.MapManager.MapRespawnPoint !== null ) {
            this.setX(this.scene.MapManager.MapRespawnPoint.getCenter().x);
            this.setY(this.scene.MapManager.MapRespawnPoint.getCenter().y);
        }
    }

}