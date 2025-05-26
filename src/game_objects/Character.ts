import Game from '../scenes/Game';
import Building from './Building';
import Enemy from './Enemy';
import Projectile from './Projectile';
import { GD } from "../scenes/Game";
import { Quadtree, Rectangle, Circle, Line } from '@timohausmann/quadtree-ts';
import FloatingText from './FloatingText';

class EnemyRect extends Rectangle {
    public enemy: any;
    constructor(props: { x: number, y: number, width: number, height: number, data: any}) {
        super(props);
        this.enemy = props.data;
    }
};

export default class Character extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public light!: Phaser.GameObjects.Light;
    public walkAnimation: string = "EvokerWalk";
    public footstepSoundInterval: number = 0;
    public Ability_1_Cooldown: number = 0;
    public Ability_2_Cooldown: number = 0;
    public Ability_3_Cooldown: number = 0;
    public Ability_4_Cooldown: number = 0;
    public CurrentClass: string;
    public PlayerHasControl: boolean = false;
    public PlayerIsDead: boolean = false;
    public PlayerInCombat: boolean = false;
    public CombatDelta: number = 0;

    public Health: number = 25;
    public MaxHealth: number;

    public Mana: number = 50;
    public MaxMana: number;

    public totalMovementSpeed: number = 100;
    public currentExp: number = 0;

    public UpKeyDown: boolean = false;
    public DownKeyDown: boolean = false;
    public LeftKeyDown: boolean = false;
    public RightKeyDown: boolean = false;

    constructor ( scene: Game ) {
        super( scene, GD.X, GD.Y, 'Elyndor', 0 );
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
        this.setBodySize(10, 24, true);
        //this.setCircle(5, 2, 2);

        this.setPipeline("Light2D");
        this.flipX = true;
        this.light = this.scene.lights.addLight(this.x, this.y, 128, 0xe3a456, 0.75);
        this.CurrentClass = GD.Class;
        let ClassData = this.scene.DataManager.ClassData[GD.Class];
        this.Health = GD.CurrentHealth;
        //this.MaxHealth = ClassData.stats.baseHealth + (GD.Classes[GD.CurrentClass].Level * ClassData.stats.healthPerLevel);
        this.Mana = GD.CurrentMana;
        //this.MaxMana = ClassData.stats.baseMana + (GD.Classes[GD.CurrentClass].Level * ClassData.stats.manaPerLevel);

        this.MaxHealth = 100;
        this.MaxMana = 100;

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

            this.light.setPosition(this.x, this.y);
            this.scene.UI.WorldMap.UpdatePlayerIndicator(this.x, this.y);
        }

    }

    UseItem ( item: string ) {

        if ( item == "apprentice_spellbook" ) {
            this.AddXP(50);
        }

        if ( item == "town_centre_blueprint" ) {
            GD.UnlockedBuildings.push("Town Centre");
        }

        //this.scene.Inventory.RemoveItem(item, 1);

    }

    UseAbility ( ability: string ) {

        if ( !this.PlayerHasControl ) return;
        if ( this.PlayerIsDead ) return;
        if ( this.scene.UI.CurrentJournalPage !== null ) return;
        if ( this.scene.BuildingHelper.BuildingPlacementMode == true ) return;

        let ClassAbilities = this.scene.DataManager.GetClass(GD.Class).abilities;
        if ( ClassAbilities == undefined ) return console.info("Couldnt find ability");

        let UsedAbility = ClassAbilities[ability];

        if ( UsedAbility.name == "Kinetic Bolt" ) {
            /*if ( GD.Classes['Evoker'].Ability_1_Unlocked == false )
                return this.scene.UI.EventLog.NewEvent("You have not unlocked this ability yet");
            if ( this.Ability_1_Cooldown <= 0 ) {
                let cooldown = UsedAbility.parameters.cooldown.upgrades[GD.Classes['Evoker'].Ability_1_Param_1_Level].value;
                let damage = UsedAbility.parameters.damage.upgrades[GD.Classes['Evoker'].Ability_1_Param_2_Level].value;
                let velocity = UsedAbility.parameters.velocity.upgrades[GD.Classes['Evoker'].Ability_1_Param_2_Level].value;
                let Proj = new Projectile(this.scene, this.x, this.y, velocity, damage, "Kinetic Bolt");
                this.scene.Projectiles.add(Proj);
                this.scene.sound.play("KineticBoltCast");
                this.Ability_1_Cooldown = cooldown;
                return;
            }
            return this.scene.UI.EventLog.NewEvent(`${UsedAbility.name} on cooldown for ${(this.Ability_1_Cooldown / 1000).toFixed(2)}`);*/
        }

        if ( UsedAbility.name == "Dart Volley" ) {
            /*if ( GD.Classes['Evoker'].Ability_2_Unlocked == false )
                return this.scene.UI.EventLog.NewEvent("You have not unlocked this ability yet");*/
            if ( this.Ability_2_Cooldown <= 0 ) {
                //let projectiles = UsedAbility.parameters.projectiles.upgrades[GD.Classes['Evoker'].Ability_2_Param_1_Level].value;
                //let damage = UsedAbility.parameters.damage.upgrades[GD.Classes['Evoker'].Ability_2_Param_2_Level].value;
                //let resource_cost = UsedAbility.parameters.resource_cost.upgrades[GD.Classes['Evoker'].Ability_2_Param_3_Level].value;
                let projectiles = 5;
                let damage = 5;
                let resource_cost = 10;
                let delayBetweenShots = 100;
                for ( let i = 0; i < projectiles; i++ ) {
                    this.scene.time.delayedCall(i * delayBetweenShots, () => {
                        let Proj = new Projectile(this.scene, this.x, this.y, 400, damage, "Dart Volley");
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

        if ( UsedAbility.name == "Blazing Barrage" ) {

            /*if ( GD.Classes['Evoker'].Ability_3_Unlocked == false )
                return this.scene.UI.EventLog.NewEvent("You have not unlocked this ability yet");*/

            if ( this.Ability_3_Cooldown <= 0 ) {

                //let bursts = UsedAbility.parameters.bursts.upgrades[GD.Classes['Evoker'].Ability_3_Param_1_Level].value;
                //let damage = UsedAbility.parameters.damage.upgrades[GD.Classes['Evoker'].Ability_3_Param_2_Level].value;
                //let radius = UsedAbility.parameters.radius.upgrades[GD.Classes['Evoker'].Ability_3_Param_3_Level].value;

                let bursts = 3;
                let damage = 5;
                let radius = 50;

                let burstDelay = 200;

                let MouseX = this.scene.mouseX;
                let MouseY = this.scene.mouseY;

                for ( let i = 0; i < bursts; i++ ) {

                    this.scene.time.delayedCall(i * burstDelay, () => {

                        // Calculate the angle between the player and the mouse cursor
                        const baseAngle = Phaser.Math.Angle.Between(this.x, this.y, MouseX, MouseY);
                
                        // Calculate the position of each circle along the line
                        const distanceBetweenCircles = 75; // Distance between each circle
                        const initialOffset = 25; // Initial offset to make the first burst appear slightly away from the character
                        const circleX = this.x + Math.cos(baseAngle) * (initialOffset + distanceBetweenCircles * i);
                        const circleY = this.y + Math.sin(baseAngle) * (initialOffset + distanceBetweenCircles * i);

                        let light = this.scene.lights.addLight(circleX, circleY, 128, 0xe3a456, 1);

                        let sprite = this.scene.add.sprite(circleX, circleY, "Explosion1Sheet", 0).setOrigin(0.5, 0.5).play("explosion-1").setDisplaySize(radius, radius).on('animationcomplete', () => {
                            sprite.destroy();
                            this.scene.lights.removeLight(light);
                        });
                
                        // Create a new physics circle for each "burst"
                        let damageArea = new Phaser.Geom.Circle(circleX, circleY, radius);

                        this.scene.sound.play("ExplosionHit");

                        // Same but Quadtree:
                        const enemies = this.scene.Quadtree.retrieve(new Circle({x: circleX, y: circleY, r: radius}));
                        enemies.forEach( (element: EnemyRect) => {
                            if ( Phaser.Geom.Circle.Contains(damageArea, element.enemy.getCenter().x, element.enemy.getCenter().y)) {
                                element.enemy.TakeDamage(damage);
                                this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, { message: `-${damage}`, x: element.x, y: element.y }));
                            }
                        });

                    });

                }

                this.Ability_3_Cooldown = UsedAbility.cooldown;
                return;
            }

            this.scene.UI.EventLog.NewEvent(`${UsedAbility.name} on cooldown for ${this.Ability_3_Cooldown.toFixed(2)}`);

        }

    }
    
    // Function to check if a point is within a cone
    isPointInCone(px: number, py: number, ox: number, oy: number, angle: number, spread: number, length: number): boolean {
        const dx = px - ox;
        const dy = py - oy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > length) {
            return false;
        }

        const pointAngle = Phaser.Math.RadToDeg(Math.atan2(dy, dx));
        const halfSpread = spread / 2;
        const minAngle = angle - halfSpread;
        const maxAngle = angle + halfSpread;

        return pointAngle >= minAngle && pointAngle <= maxAngle;
    }

    // Function to check for game objects within the cone
    checkObjectsInCone(coneOriginX: number, coneOriginY: number, coneAngle: number, coneSpread: number, coneLength: number, gameObjects: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.GameObject[] {
        const objectsInCone: Phaser.GameObjects.GameObject[] = [];

        gameObjects.forEach( (obj) => {
            /*const objX = obj.x;
            const objY = obj.y;

            if (this.isPointInCone(objX, objY, coneOriginX, coneOriginY, coneAngle, coneSpread, coneLength)) {
                objectsInCone.push(obj);
            }*/
        });

        return objectsInCone;
    }

    // Example usage
    checkForEnemiesInCone() {
        const coneOriginX = this.x;
        const coneOriginY = this.y;
        const coneAngle = Phaser.Math.RadToDeg(this.rotation); // Assuming the character's rotation is the direction of the cone
        const coneSpread = 45; // 45 degrees spread
        const coneLength = 200; // 200 pixels length

        const enemies = this.scene.Enemies.getChildren(); // Assuming enemies are stored in a group
        const enemiesInCone = this.checkObjectsInCone(coneOriginX, coneOriginY, coneAngle, coneSpread, coneLength, enemies);

        enemiesInCone.forEach(enemy => {
            // Handle enemies within the cone
        });
    }

    // Some abilities require a charge up time, this function is called when the player is ready to use the ability
    ReadyAbility () {

    }

    AddXP ( amount: number ) {
        this.scene.UI.EventLog.NewEvent(`You earned ${amount} exp points`);
        //GD.Classes[this.CurrentClass].XP += amount;
        //let RequiredXP = GD.Classes[this.CurrentClass].Level * 100;
        //if ( GD.Classes[this.CurrentClass].XP >= RequiredXP ) {
            //GD.Classes[this.CurrentClass].Level++;
            //GD.Classes[this.CurrentClass].XP = 0;
            //this.scene.UI.EventLog.NewEvent(`Evoker leveled up! You are now level ${GD.Classes[this.CurrentClass].Level}`);
        //}
    }

    TakeDamage ( damage: { Type: string, Min: number, Max: number, ApplyDebuff?: string }[] ): void {

        let total = 0;
        let typesString = `(`;
        damage.forEach( (dmg) => {
            let damageAmount = Phaser.Math.Between(dmg.Min, dmg.Max);
            total += damageAmount;
            typesString += `${damageAmount} ${dmg.Type}, `;
        });
        typesString += `)`;

        this.Health -= total;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();

        this.scene.cameras.main.shake(100, 0.01, true);

        let string = `You took ${total} damage ${typesString}`;

        this.scene.UI.EventLog.NewEvent(string);

        if ( this.Health <= 0 ) 
            this.Die();
    }

    Heal ( amount: number ): void {
        this.Health += amount;
        if ( this.Health > this.MaxHealth ) 
            this.Health = this.MaxHealth;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();
        this.scene.UI.EventLog.NewEvent(`You healed for ${amount}`);
    }

    Die (): void {
        this.PlayerIsDead = true;
        this.setPosition(0, 0);
        this.scene.UI.ShowDeathScreen();
        this.scene.Enemies.getChildren().forEach( (enemy) => {
            (enemy as Enemy).LoseAggro();
        });
        this.scene.Buildings.getChildren().forEach( (building) => {
            (building as Building).OnAlert = false;
        });
    }

    Respawn () {
        this.PlayerIsDead = false;
        this.Health = this.MaxHealth;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();
        this.scene.UI.DeathScreen.setVisible(false);
        this.scene.UI.EventLog.EventsLogCamera.setVisible(true);
        if ( this.scene.MapRespawnPoint !== null ) {
            this.setX(this.scene.MapRespawnPoint.getCenter().x);
            this.setY(this.scene.MapRespawnPoint.getCenter().y);
        }
    }

}