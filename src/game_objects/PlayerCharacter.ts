import Game from '../scenes/Game';
import Building from './Building';
import Enemy from './Character';
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

export default class PlayerCharacter extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public light: Phaser.GameObjects.Light;
    public walkAnimation: string = "OperativeWalk";
    public footstepSoundInterval: number = 0;
    public PlayerHasControl: boolean = false;
    public PlayerIsDead: boolean = false;
    public PlayerInCombat: boolean = false;
    public CombatDelta: number = 0;
    public UpKeyDown: boolean = false;
    public DownKeyDown: boolean = false;
    public LeftKeyDown: boolean = false;
    public RightKeyDown: boolean = false;

    // Stats
    public Level: number = 1;
    public Experience: number = 0;
    public NextLevelExperience: number = 100;
    public Class: string = "Operative";
    public Health: number;
    public MaxHealth: number;
    public HealthRegeneration: number = 0;
    public Mana: number;
    public MaxMana: number;
    public ManaRegeneration: number = 0;
    public MovementSpeed: number = 100;
    public Defence_Pierce: number = 0;
    public Defence_Impact: number = 0;
    public Defence_Slash: number = 0;
    public Defence_Fire: number = 0;
    public Defence_Cold: number = 0;
    public Defence_Lightning: number = 0;
    public Defence_Poison: number = 0;
    public Defence_Arcane: number = 0;
    public Defence_True: number = 0;
    public Defence_Bleed: number = 0;
    public Defence_Radiant: number = 0;
    public Defence_Corruption: number = 0;
    public Defence_Sonic: number = 0;
    public CriticalStrikeChance: number = 0;
    public CriticalStrikeDamageModifier: number = 0;
    public LifeSteal: number = 0;
    public AttributePoints: number = 0;
    public Fortitude: number = 0;
    public Versatility: number = 0;
    public Vigor: number = 0;
    public Expertise: number = 0;
    public Arcana: number = 0;
    public Personality: number = 0;
    public Fortune: number = 0;
    public Grit: number = 0;

    constructor ( scene: Game ) {
        super( scene, GD.X, GD.Y, 'Operative', 0 );
        this.scene = scene;
        this.create();
    }

    create (): PlayerCharacter {
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
        this.light = this.scene.lights.addLight(this.x, this.y, 228, 0xe3a456, 1);
        this.Health = GD.CurrentHealth;
        this.Mana = GD.CurrentMana;
        this.MaxHealth = GD.MaxHealth;
        this.MaxMana = GD.MaxMana;
        this.Class = GD.Class;
        this.Level = GD.Level;
        this.Experience = GD.Experience;
        this.NextLevelExperience = GD.NextLevelExperience;
        return this;
    }

    ToggleLight () {
        if ( this.light.intensity > 0 ) {
            this.light.setIntensity(0);
        } else {
            this.light.setIntensity(1);
        }
    }

    UpdateStats () {

        // Reset stats to base values from character data
        this.MaxHealth = GD.MaxHealth;
        this.MaxMana = GD.MaxMana;
        this.MovementSpeed = GD.MovementSpeed;
        this.Defence_Pierce = GD.Defence_Pierce;
        this.Defence_Impact = GD.Defence_Impact;
        this.Defence_Slash = GD.Defence_Slash;
        this.Defence_Fire = GD.Defence_Fire;
        this.Defence_Cold = GD.Defence_Cold;
        this.Defence_Lightning = GD.Defence_Lightning;
        this.Defence_Poison = GD.Defence_Poison;
        this.Defence_Arcane = GD.Defence_Arcane;
        this.Defence_True = GD.Defence_True;
        this.Defence_Bleed = GD.Defence_Bleed;
        this.Defence_Radiant = GD.Defence_Radiant;
        this.Defence_Corruption = GD.Defence_Corruption;
        this.Defence_Sonic = GD.Defence_Sonic;
        this.CriticalStrikeChance = GD.CriticalStrikeChance;
        this.CriticalStrikeDamageModifier = GD.CriticalStrikeDamageModifier;
        this.LifeSteal = GD.LifeSteal;
        this.HealthRegeneration = GD.HealthRegeneration;
        this.ManaRegeneration = GD.ManaRegeneration;
        this.Fortitude = GD.Fortitude;
        this.Versatility = GD.Versatility;
        this.Vigor = GD.Vigor;
        this.Expertise = GD.Expertise;
        this.Arcana = GD.Arcana;
        this.Personality = GD.Personality;
        this.Fortune = GD.Fortune;
        this.Grit = GD.Grit;

        // Apply stats from equipped items
        Object.entries(GD.Inventory).forEach( (item) => {
            if ( (item[0].includes("Equipment") || item[0].includes("Component")) && item[1] != null ) {
                const BaseItemData = this.scene.DataManager.ItemData[item[1].ID];
                if ( Object.keys(BaseItemData).includes("Properties") ) {
                    Object.entries(BaseItemData.Properties).forEach( (stat) => {
                        switch (stat[0]) {
                            case "MovementSpeed": this.MovementSpeed += stat[1]; break;
                            case "Defence_Pierce": this.Defence_Pierce += stat[1]; break;
                            case "Defence_Impact": this.Defence_Impact += stat[1]; break;
                            case "Defence_Slash": this.Defence_Slash += stat[1]; break;
                            case "Defence_Fire": this.Defence_Fire += stat[1]; break;
                            case "Defence_Cold": this.Defence_Cold += stat[1]; break;
                            case "Defence_Lightning": this.Defence_Lightning += stat[1]; break;
                            case "Defence_Poison": this.Defence_Poison += stat[1]; break;
                            case "Defence_Arcane": this.Defence_Arcane += stat[1]; break;
                            case "Defence_True": this.Defence_True += stat[1]; break;
                            case "Defence_Bleed": this.Defence_Bleed += stat[1]; break;
                            case "Defence_Radiant": this.Defence_Radiant += stat[1]; break;
                            case "Defence_Corruption": this.Defence_Corruption += stat[1]; break;
                            case "Defence_Sonic": this.Defence_Sonic += stat[1]; break;
                            case "CriticalStrikeChance": this.CriticalStrikeChance += stat[1]; break;
                            case "CriticalStrikeDamageModifier": this.CriticalStrikeDamageModifier += stat[1]; break;
                            case "LifeSteal": this.LifeSteal += stat[1]; break;
                            case "HealthRegeneration": this.HealthRegeneration += stat[1]; break;
                            case "ManaRegeneration": this.ManaRegeneration += stat[1]; break;
                            case "MaxHealth": this.MaxHealth += stat[1]; break;
                            case "MaxMana": this.MaxMana += stat[1]; break;
                            case "Fortitude": this.Fortitude += stat[1]; break;
                            case "Versatility": this.Versatility += stat[1]; break;
                            case "Vigor": this.Vigor += stat[1]; break;
                            case "Expertise": this.Expertise += stat[1]; break;
                            case "Arcana": this.Arcana += stat[1]; break;
                            case "Personality": this.Personality += stat[1]; break;
                            case "Fortune": this.Fortune += stat[1]; break;
                            case "Grit": this.Grit += stat[1]; break;
                        }
                    });
                }
            }
        });

        this.scene.Inventory.UpdateStatsTexts();
    }

    update ( delta: number ): void {

        if ( this.CombatDelta > 0 ) {
            this.CombatDelta -= delta;
        }

        if ( this.CombatDelta <= 0 && this.PlayerInCombat ) {
            this.PlayerInCombat = false;
            this.CombatDelta = 0;
        }

        if ( this.PlayerHasControl ) {
            if ( this.LeftKeyDown ) {
                this.setVelocityX(-this.MovementSpeed);
                this.flipX = true
            } else if ( this.RightKeyDown ) {
                this.setVelocityX(this.MovementSpeed);
                this.flipX = false
            } else {
                this.setVelocityX(0);
            }
        
            if ( this.UpKeyDown ) {
                this.setVelocityY(-this.MovementSpeed);
            } else if ( this.DownKeyDown ) {
                this.setVelocityY(this.MovementSpeed);
            } else {
                this.setVelocityY(0);
            }
        }

        if ( this.body.velocity.x == 0 && this.body.velocity.y == 0 ) {
            this.footstepSoundInterval = 0;
            if ( !this.anims.isPlaying || this.anims.currentAnim.key != "Idle" ) {
                this.play({ key: "Idle" });
            }
        } else {
            
            if ( this.scene.ActionManager.CurrentActivity.Type != "" ) {
                this.scene.ActionManager.CancelActivity();
            }
                
            if ( !this.anims.isPlaying || this.anims.currentAnim.key != "Move" ) {
                this.play("Move");
            }

            this.footstepSoundInterval += delta;

            if ( this.footstepSoundInterval > 500 ) {
                this.scene.sound.play('footstep', { volume: 0.4 });
                this.footstepSoundInterval = 0;
            }

            this.light.setPosition(this.x, this.y);
            this.scene.UI.WorldMap.UpdatePlayerIndicator(this.x, this.y);
        }

    }

    UseItem ( item: string ) {

        if ( item == "apprentice_spellbook" ) {
            //this.AddXP(50);
        }

        if ( item == "town_centre_blueprint" ) {
            GD.UnlockedBuildings.push("Town Centre");
        }

        //this.scene.Inventory.RemoveItem(item, 1);

    }

    UseAbility ( ability: string ) {

        //if ( !this.PlayerHasControl ) return;
        //if ( this.PlayerIsDead ) return;
        //if ( this.scene.UI.CurrentJournalPage !== null ) return;
        //if ( this.scene.BuildingHelper.BuildingPlacementMode == true ) return;

        //let ClassAbilities = this.scene.DataManager.GetClass(GD.Class).abilities;
        //if ( ClassAbilities == undefined ) return console.info("Couldnt find ability");

        //let UsedAbility = ClassAbilities[ability];

        /*if ( UsedAbility.name == "Kinetic Bolt" ) {
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
        //}

        /*if ( UsedAbility.name == "Dart Volley" ) {
            /*if ( GD.Classes['Evoker'].Ability_2_Unlocked == false )
                return this.scene.UI.EventLog.NewEvent("You have not unlocked this ability yet");*/
            //if ( this.Ability_2_Cooldown <= 0 ) {
                //let projectiles = UsedAbility.parameters.projectiles.upgrades[GD.Classes['Evoker'].Ability_2_Param_1_Level].value;
                //let damage = UsedAbility.parameters.damage.upgrades[GD.Classes['Evoker'].Ability_2_Param_2_Level].value;
                //let resource_cost = UsedAbility.parameters.resource_cost.upgrades[GD.Classes['Evoker'].Ability_2_Param_3_Level].value;
                /*let projectiles = 5;
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

        //if ( UsedAbility.name == "Blazing Barrage" ) {

            /*if ( GD.Classes['Evoker'].Ability_3_Unlocked == false )
                return this.scene.UI.EventLog.NewEvent("You have not unlocked this ability yet");*/

            //if ( this.Ability_3_Cooldown <= 0 ) {

                //let bursts = UsedAbility.parameters.bursts.upgrades[GD.Classes['Evoker'].Ability_3_Param_1_Level].value;
                //let damage = UsedAbility.parameters.damage.upgrades[GD.Classes['Evoker'].Ability_3_Param_2_Level].value;
                //let radius = UsedAbility.parameters.radius.upgrades[GD.Classes['Evoker'].Ability_3_Param_3_Level].value;

                /*let bursts = 3;
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

        }*/

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
        gameObjects.forEach( (obj: Phaser.GameObjects.Sprite) => {
            const objX = obj.x;
            const objY = obj.y;
            if (this.isPointInCone(objX, objY, coneOriginX, coneOriginY, coneAngle, coneSpread, coneLength))
                objectsInCone.push(obj);
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

    UseShotgun () {
        if ( !this.PlayerHasControl ) return;
        if ( this.PlayerIsDead ) return;
        if ( this.scene.UI.CurrentJournalPage !== null ) return;
        if ( this.scene.BuildingHelper.BuildingPlacementMode == true ) return;
        let Proj = new Projectile(this.scene, this.x, this.y, 400, 5, "Shotgun Blast");
        this.scene.Projectiles.add(Proj);
        this.scene.sound.play("ShotgunBlast");
        const baseAngle = Phaser.Math.Angle.Between( this.x, this.y, this.scene.mouseX, this.scene.mouseY );
        const halfSpread = 20 / 2;
        const randomSpread = Phaser.Math.FloatBetween(-halfSpread, halfSpread);
        const spreadRadians = Phaser.Math.DegToRad(randomSpread);
        let angle = baseAngle + spreadRadians;
        Proj.setVelocity( Math.cos(angle) * 200, Math.sin(angle) * 200 );
    }

    TakeDamage ( damage: { Type: string, Min: number, Max: number, ApplyDebuff?: string }[] ): void {
        let total = 0;
        let typesArray: string[] = [];
        damage.forEach((dmg) => {
            let damageAmount = Phaser.Math.Between(dmg.Min, dmg.Max);
            switch (dmg.Type) {
                case "Pierce": damageAmount -= this.Defence_Pierce; break;
                case "Impact": damageAmount -= this.Defence_Impact; break;
                case "Slash": damageAmount -= this.Defence_Slash; break;
                case "Fire": damageAmount -= this.Defence_Fire; break;
                case "Cold": damageAmount -= this.Defence_Cold; break;
                case "Lightning": damageAmount -= this.Defence_Lightning; break;
                case "Poison": damageAmount -= this.Defence_Poison; break;
                case "Arcane": damageAmount -= this.Defence_Arcane; break;
                case "True": damageAmount -= this.Defence_True; break;
                case "Bleed": damageAmount -= this.Defence_Bleed; break;
                case "Radiant": damageAmount -= this.Defence_Radiant; break;
                case "Corruption": damageAmount -= this.Defence_Corruption; break;
                case "Sonic": damageAmount -= this.Defence_Sonic; break;
            }
            if (damageAmount <= 0) 
                damageAmount = 0;
            else
                typesArray.push(`${damageAmount} ${dmg.Type} damage`);
            total += damageAmount;
        });

        let output = `You took ${typesArray.join(', ')}`;
        this.scene.UI.EventLog.NewEvent(output);
        this.Health -= total;
        GD.CurrentHealth = this.Health;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();
        this.scene.cameras.main.shake(100, 0.01, true);
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