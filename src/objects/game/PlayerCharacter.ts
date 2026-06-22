import Game, { Inv } from '../../scenes/Game';
import Building from './Building';
import Enemy from './Character';
import { GD } from "../../scenes/Game";
import ItemData from '../../data/ItemData';

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
    public CharacterHeadItem: Phaser.GameObjects.Sprite;
    public CharacterBodyItem: Phaser.GameObjects.Sprite;
    public CharacterLegsItem: Phaser.GameObjects.Sprite;
    public CharacterHandItem: Phaser.GameObjects.Sprite;
    public CharacterFeetItem: Phaser.GameObjects.Sprite;

    public ComputedStats: Stats;
    public CurrentHealth: number;
    public CurrentMana: number;

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
        this.setLighting(true);
        this.flipX = true;
        this.light = this.scene.lights.addLight(this.x, this.y, 228, 0xe3a456, 1);
        this.CurrentHealth = GD.CurrentHealth;
        this.CurrentMana = GD.CurrentMana;
        this.ComputedStats = { ...GD.Stats };
        this.CharacterHeadItem = this.scene.add.sprite(this.x, this.y, "PlayerHead", 0).setOrigin(0.5).setVisible(false).setDepth(100);
        this.CharacterBodyItem = this.scene.add.sprite(this.x, this.y, "PlayerBody", 0).setOrigin(0.5).setVisible(false).setDepth(100);
        this.CharacterLegsItem = this.scene.add.sprite(this.x, this.y, "PlayerLegs", 0).setOrigin(0.5).setVisible(false).setDepth(100);
        this.CharacterHandItem = this.scene.add.sprite(this.x, this.y, "PlayerHands", 0).setOrigin(0.5).setVisible(false).setDepth(100);
        this.CharacterFeetItem = this.scene.add.sprite(this.x, this.y, "PlayerFeet", 0).setOrigin(0.5).setVisible(false).setDepth(100);
        return this;
    }

    ToggleLight () {
        if ( this.light.intensity > 0 )
            return this.light.setIntensity(0);
        this.light.setIntensity(1);
    }

    UpdateStats () {
        let stats = { ...GD.Stats };
        // Apply stats from equipped items
        Object.entries(GD.Inventory).forEach((item) => {
            if ((item[0].includes("Equipment") || item[0].includes("Component")) && item[1] != null) {
                const BaseItemData = ItemData[item[1].ID];
                if (BaseItemData?.Properties) {
                    Object.entries(BaseItemData.Properties).forEach(([statName, value]) => {
                        if (statName in stats) {
                            (stats as any)[statName] += value;
                        }
                    });
                }
            }
        });
        this.ComputedStats = { ...stats };
        Inv.UpdateStatsTexts();
        this.UpdateCharacterAppearance();
    }

    UpdateCharacterAppearance () {
        console.log("Updating character appearance based on equipped items");
        // Update character appearance based on equipped items
        const headItem = GD.Inventory.Equipment_Head ? ItemData[GD.Inventory.Equipment_Head.ID] : null;
        const bodyItem = GD.Inventory.Equipment_Chest ? ItemData[GD.Inventory.Equipment_Chest.ID] : null;
        const legsItem = GD.Inventory.Equipment_Legs ? ItemData[GD.Inventory.Equipment_Legs.ID] : null;
        const handsItem = GD.Inventory.Equipment_Hands ? ItemData[GD.Inventory.Equipment_Hands.ID] : null;
        const feetItem = GD.Inventory.Equipment_Feet ? ItemData[GD.Inventory.Equipment_Feet.ID] : null;

        if (headItem) {
            console.log(`Setting head item texture to ${headItem.Texture}`);
            this.CharacterHeadItem.setFrame(headItem.Texture).setVisible(true);
        } else {
            this.CharacterHeadItem.setVisible(false);
        }

        if (bodyItem) {
            console.log(`Setting body item texture to ${bodyItem.Texture}`);
            this.CharacterBodyItem.setFrame(bodyItem.Texture).setVisible(true);
        } else {
            this.CharacterBodyItem.setVisible(false);
        }

        if (legsItem) {
            console.log(`Setting legs item texture to ${legsItem.Texture}`);
            this.CharacterLegsItem.setFrame(legsItem.Texture).setVisible(true);
        } else {
            this.CharacterLegsItem.setVisible(false);
        }

        if (handsItem) {
            console.log(`Setting hands item texture to ${handsItem.Texture}`);
            this.CharacterHandItem.setFrame(handsItem.Texture).setVisible(true);
        } else {
            this.CharacterHandItem.setVisible(false);
        }

        if (feetItem) {
            console.log(`Setting feet item texture to ${feetItem.Texture}`);
            this.CharacterFeetItem.setFrame(feetItem.Texture).setVisible(true);
        } else {
            this.CharacterFeetItem.setVisible(false);
        }

    }

    update ( delta: number ): void {

        if ( this.MainHandKeyDown == true ) {
            this.scene.UseMainhandItem();
        }
            
        if ( this.CombatDelta > 0 ) {
            this.CombatDelta -= delta;
        }

        if ( this.CombatDelta <= 0 && this.PlayerInCombat ) {
            this.PlayerInCombat = false;
            this.CombatDelta = 0;
        }

        if ( this.PlayerHasControl ) {
            const speed = this.ComputedStats.MovementSpeed;
            if ( this.LeftKeyDown ) {
                this.setVelocityX(-speed);
                this.flipX = true;
            } else if ( this.RightKeyDown ) {
                this.setVelocityX(speed);
                this.flipX = false;
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

        // Sync equipment layer sprites to the player's position and facing direction.
        // Use body.center instead of this.x/this.y because the physics body is stepped
        // before scene.update() but the body→sprite sync (postUpdate) runs after,
        // so this.x/this.y would be one frame behind.
        const equipmentSprites = [
            this.CharacterHeadItem,
            this.CharacterBodyItem,
            this.CharacterLegsItem,
            this.CharacterHandItem,
            this.CharacterFeetItem,
        ];
        for ( const sprite of equipmentSprites ) {
            sprite.setPosition(this.body.center.x, this.body.center.y);
            sprite.flipX = this.flipX;
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
        const stats = this.ComputedStats;
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
        this.CurrentHealth -= total;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();
        this.scene.cameras.main.shake(100, 0.01, true);
        if ( this.CurrentHealth <= 0 )
            this.Die();
    }

    Heal ( amount: number ): void {
        this.CurrentHealth += amount;
        if ( this.CurrentHealth > this.ComputedStats.MaxHealth ) 
            this.CurrentHealth = this.ComputedStats.MaxHealth;
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
        this.CurrentHealth = this.ComputedStats.MaxHealth;
        this.scene.UI.CharacterPanel.UpdateVitalsBars();
        this.scene.UI.DeathScreen.setVisible(false);
        this.scene.UI.EventLog.EventsLogCamera.setVisible(true);
        if ( this.scene.MapRespawnPoint !== null ) {
            this.setX(this.scene.MapRespawnPoint.getCenter().x);
            this.setY(this.scene.MapRespawnPoint.getCenter().y);
        }
    }

}

/*
if ( UsedAbility.name == "Blazing Barrage" ) {

    if ( this.Ability_3_Cooldown <= 0 ) {

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
                const distanceBetweenCircles = 75;
                const initialOffset = 25;
                const circleX = this.x + Math.cos(baseAngle) * (initialOffset + distanceBetweenCircles * i);
                const circleY = this.y + Math.sin(baseAngle) * (initialOffset + distanceBetweenCircles * i);

                let light = this.scene.lights.addLight(circleX, circleY, 128, 0xe3a456, 1);

                let sprite = this.scene.add.sprite(circleX, circleY, "Explosion1Sheet", 0)
                    .setOrigin(0.5, 0.5)
                    .play("explosion-1")
                    .setDisplaySize(radius, radius)
                    .on('animationcomplete', () => {
                        sprite.destroy();
                        this.scene.lights.removeLight(light);
                    });
        
                // Create a new physics circle for each "burst"
                let damageArea = new Phaser.Geom.Circle(circleX, circleY, radius);

                this.scene.sound.play("ExplosionHit");

                // Quadtree enemy hit detection
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
*/

