import Game from '../scenes/Game';
import Building from './Building';
import Enemy from './Character';
import { GD } from "../scenes/Game";
import Proficiencies from '../data/Proficiencies';

export default class PlayerCharacter extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public light: Phaser.GameObjects.Light;
    public walkAnimation: string = "OperativeWalk";

    // Time intervals
    public footstepSoundInterval: number = 0;
    public CombatDelta: number = 0;

    // State flags
    public PlayerHasControl: boolean = false;
    public PlayerIsDead: boolean = false;
    public PlayerInCombat: boolean = false;

    // Input state
    public UpKeyDown: boolean = false;
    public DownKeyDown: boolean = false;
    public LeftKeyDown: boolean = false;
    public RightKeyDown: boolean = false;
    public MainHandKeyDown: boolean = false;

    // Sprites for equipped items
    public HelmetArmourSprite: Phaser.GameObjects.Sprite;
    public ChestArmourSprite: Phaser.GameObjects.Sprite
    public LegArmourSprite: Phaser.GameObjects.Sprite;
    public BootArmourSprite: Phaser.GameObjects.Sprite
    public HandArmourSprite: Phaser.GameObjects.Sprite;

    constructor ( scene: Game ) {
        super( scene, GD.X, GD.Y, 'Player', 0 );
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
        this.setPipeline("Light2D");
        this.flipX = true;
        this.light = this.scene.lights.addLight(this.x, this.y, 228, 0xe3a456, 1);
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
        const stats = GD.ComputedStats;

        // Reset to base values from character data
        stats.MaxHealth = GD.Stats.MaxHealth;
        stats.MaxMana = GD.Stats.MaxMana;
        stats.MovementSpeed = GD.Stats.MovementSpeed;
        stats.HealthRegeneration = GD.Stats.HealthRegeneration;
        stats.ManaRegeneration = GD.Stats.ManaRegeneration;
        stats.CriticalStrikeChance = GD.Stats.CriticalStrikeChance;
        stats.CriticalStrikeDamageModifier = GD.Stats.CriticalStrikeDamageModifier;
        stats.LifeSteal = GD.Stats.LifeSteal;
        stats.Defence_Pierce = GD.Stats.Defence_Pierce;
        stats.Defence_Impact = GD.Stats.Defence_Impact;
        stats.Defence_Slash = GD.Stats.Defence_Slash;
        stats.Defence_Fire = GD.Stats.Defence_Fire;
        stats.Defence_Cold = GD.Stats.Defence_Cold;
        stats.Defence_Lightning = GD.Stats.Defence_Lightning;
        stats.Defence_Poison = GD.Stats.Defence_Poison;
        stats.Defence_Arcane = GD.Stats.Defence_Arcane;
        stats.Defence_True = GD.Stats.Defence_True;
        stats.Defence_Bleed = GD.Stats.Defence_Bleed;
        stats.Defence_Radiant = GD.Stats.Defence_Radiant;
        stats.Defence_Corruption = GD.Stats.Defence_Corruption;
        stats.Defence_Sonic = GD.Stats.Defence_Sonic;
        stats.Fortitude = GD.Stats.Fortitude;
        stats.Versatility = GD.Stats.Versatility;
        stats.Vigor = GD.Stats.Vigor;
        stats.Expertise = GD.Stats.Expertise;
        stats.Arcana = GD.Stats.Arcana;
        stats.Personality = GD.Stats.Personality;
        stats.Fortune = GD.Stats.Fortune;
        stats.Grit = GD.Stats.Grit;

        // Apply stats from equipped items
        Object.entries(GD.Inventory).forEach((item) => {
            if ((item[0].includes("Equipment") || item[0].includes("Component")) && item[1] != null) {
                const BaseItemData = this.scene.DataManager.ItemData[item[1].ID];
                if (BaseItemData?.Properties) {
                    Object.entries(BaseItemData.Properties).forEach(([statName, value]) => {
                        if (statName in stats) {
                            (stats as any)[statName] += value;
                        }
                    });
                }
            }
        });

        this.scene.Inventory.UpdateStatsTexts();
    }

    update ( delta: number ): void {

        if ( this.MainHandKeyDown )
            this.scene.UseMainhandItem();

        if ( this.CombatDelta > 0 ) {
            this.CombatDelta -= delta;
        }

        if ( this.CombatDelta <= 0 && this.PlayerInCombat ) {
            this.PlayerInCombat = false;
            this.CombatDelta = 0;
        }

        if ( this.PlayerHasControl ) {
            const speed = GD.ComputedStats.MovementSpeed;
            if ( this.LeftKeyDown ) {
                this.setVelocityX(-speed);
                this.flipX = true
            } else if ( this.RightKeyDown ) {
                this.setVelocityX(speed);
                this.flipX = false
            } else {
                this.setVelocityX(0);
            }
        
            if ( this.UpKeyDown ) {
                this.setVelocityY(-speed);
            } else if ( this.DownKeyDown ) {
                this.setVelocityY(speed);
            } else {
                this.setVelocityY(0);
            }
        }

        if ( this.body.velocity.x == 0 && this.body.velocity.y == 0 ) {
            this.footstepSoundInterval = 0;
            if ( !this.anims.isPlaying || this.anims.currentAnim.key != "Idle" ) {
                //this.play({ key: "Idle" });
            }
        } else {
            
            if ( this.scene.ActionManager.CurrentActivity.Type != "" && this.scene.ActionManager.CurrentActivity.Type != "Reloading" ) {
                this.scene.ActionManager.CancelActivity();
            }
                
            if ( !this.anims.isPlaying || this.anims.currentAnim.key != "Move" ) {
                //this.play("Move");
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

    UseAbility ( abilityId: string ) {
        // TODO: Implement data-driven ability system using AbilityData
        // Will check ability type and execute based on properties
        //const ability = AbilityData[abilityId];
        //if (!ability) return;
        
        // Common checks
        //if (ability.mana_cost > GD.Stats.CurrentMana) 
            //return this.scene.UI.EventLog.NewEvent("Not enough mana!");
        
        // Check cooldown from GD.Abilities
        // Check required weapon/trait
        
        // Execute based on type
        //switch (ability.type) {
            //case "Buff": this.applyBuff(ability); break;
            //case "Projectile": this.fireProjectile(ability); break;
            //case "MultiAreaOfEffect": this.castAoE(ability); break;
            //case "Spawn": this.spawnEntity(ability); break;
        //}
    }

    // Some abilities require a charge up time, this function is called when the player is ready to use the ability
    ReadyAbility () {

    }

    AddXP ( amount: number ) {
        this.scene.UI.EventLog.NewEvent(`You earned ${amount} exp points`);
        GD.Experience += amount;
        if ( GD.Experience >= GD.NextLevelExperience ) {
            GD.Experience -= GD.NextLevelExperience;
            GD.Level += 1;
            GD.AttributePoints += 2;
            GD.NextLevelExperience = Math.floor(GD.NextLevelExperience * 2);
            this.scene.UI.EventLog.NewEvent(`You leveled up to level ${GD.Level}! You gained 2 attribute points.`);
        }
    }

    TakeDamage ( damage: { Type: string, Min: number, Max: number, ApplyDebuff?: string }[] ): void {
        let total = 0;
        let typesArray: string[] = [];
        const stats = GD.ComputedStats;

        damage.forEach((dmg) => {
            let damageAmount = Phaser.Math.Between(dmg.Min, dmg.Max);
            const defenceKey = `Defence_${dmg.Type}` as keyof Stats;
            const defence = (stats[defenceKey] as number) ?? 0;
            damageAmount -= defence;
            if (damageAmount <= 0) 
                damageAmount = 0;
            else
                typesArray.push(`${damageAmount} ${dmg.Type} damage`);
            total += damageAmount;
        });

        let output = `You took ${typesArray.join(', ')}`;
        this.scene.UI.EventLog.NewEvent(output);
        GD.Stats.CurrentHealth -= total;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();
        this.scene.cameras.main.shake(100, 0.01, true);
        if ( GD.Stats.CurrentHealth <= 0 )
            this.Die();
    }

    Heal ( amount: number ): void {
        GD.Stats.CurrentHealth += amount;
        if ( GD.Stats.CurrentHealth > GD.ComputedStats.MaxHealth ) 
            GD.Stats.CurrentHealth = GD.ComputedStats.MaxHealth;
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
        GD.Stats.CurrentHealth = GD.ComputedStats.MaxHealth;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();
        this.scene.UI.DeathScreen.setVisible(false);
        this.scene.UI.EventLog.EventsLogCamera.setVisible(true);
        if ( this.scene.MapRespawnPoint !== null ) {
            this.setX(this.scene.MapRespawnPoint.getCenter().x);
            this.setY(this.scene.MapRespawnPoint.getCenter().y);
        }
    }

}