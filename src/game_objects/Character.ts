import Game from "../scenes/Game";
import Building from "./Building";
import Pickup from "./Pickup";
import Projectile from "./Projectile";
import { GD } from "../scenes/Game";
import FloatingText from "./FloatingText";

export default abstract class Character extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public InCombat: boolean = false;
    public InCombatDelta: number = 0;
    public body!: Phaser.Physics.Arcade.Body;
    public ID: string;
    public OnDestroyAddFlag: number;

    // These properties are unique per character type
    abstract Temperament: string;
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
    abstract Abilities: CharacterAbilities;
    abstract Faction: string;

    abstract Defence_Pierce: number;
    abstract Defence_Impact: number;
    abstract Defence_Slash: number;
    abstract Defence_Fire: number;
    abstract Defence_Cold: number;
    abstract Defence_Lightning: number;
    abstract Defence_Poison: number;
    abstract Defence_Arcane: number;
    abstract Defence_True: number;
    abstract Defence_Bleed: number;
    abstract Defence_Radiant: number;
    abstract Defence_Corruption: number;
    abstract Defence_Sonic: number;

    constructor (scene: Game, SpawnLocation: Building | { x: number, y: number }, Spritesheet: string, SpriteIndex: number ) {
        super (scene, SpawnLocation.x, SpawnLocation.y, Spritesheet, SpriteIndex);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setDepth(99);
        this.setOrigin(0.5);
        this.setBodySize(18, 24);
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

    TakeDamage ( damage: { Type: string, Min: number, Max: number }[] ) {
        console.log(damage);
        let total = 0;
        let string = `You dealt `;
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

            if (damageAmount <= 0) {
                damageAmount = 0;
            }
                
            total += damageAmount;

            string += `${damageAmount} ${dmg.Type} damage, `;
        });

        string = string.slice(0, -2);

        this.scene.UI.EventLog.NewEvent(string);

        this.scene.UI.FloatingTexts.push(new FloatingText(this.scene, { message: `-${total}`, x: this.x, y: this.y }));

        this.Health -= total;
        if ( this.Health <= 0 )
            this.die();
    }

    die () {

        console.log(this.ID);

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
            GD.WorldData[GD.CurrentMap][this.ID].Alive = false;
        }

    }

}