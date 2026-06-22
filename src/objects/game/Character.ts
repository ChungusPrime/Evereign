import Game, { MD } from "../../scenes/Game";
import Building from "./Building";
import Pickup from "./Pickup";
import Projectile from "./Projectile";
import { GD } from "../../scenes/Game";
import FloatingText from "./FloatingText";

export default class Character extends Phaser.Physics.Arcade.Sprite {

    public scene: Game;
    public InCombat: boolean = false;
    public InCombatDelta: number = 0;
    public body!: Phaser.Physics.Arcade.Body;
    public ID: string;
    public OnDestroyAddFlag: number;
    public moving: boolean = false;
    public targetX: number;
    public targetY: number;
    public Temperament: string;
    public Health: number;
    public MaxHealth: number;
    public Type: string;
    public SpawnLocation: Building | { x: number, y: number };
    public AttackRange: number;
    public AttackCooldown: number;
    public MovementSpeed: number;
    public LootTable: number[];
    public GoldValue: number;
    public ExpValue: number;
    public WalkAnimation: string;
    public Name: string;
    public Level: number;
    public Abilities: CharacterAbilities;
    public Faction: string;
    public Defence_Pierce: number;
    public Defence_Impact: number;
    public Defence_Slash: number;
    public Defence_Fire: number;
    public Defence_Cold: number;
    public Defence_Lightning: number;
    public Defence_Poison: number;
    public Defence_Arcane: number;
    public Defence_True: number;
    public Defence_Bleed: number;
    public Defence_Radiant: number;
    public Defence_Corruption: number;
    public Defence_Sonic: number;
    public Modifiers: string[] = [];

    constructor ( scene: Game, object: Phaser.Types.Tilemaps.TiledObject | Building ) {
        super (scene, object.x, object.y, "Orcs", 0);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setDepth(99);
        this.setOrigin(0.5);
        this.setBodySize(18, 24);
        if ( 'properties' in object && object.properties ) {
            this.ID = object.properties[0].value ?? null;
            this.Level = MD[this.ID]?.Level ?? 1;
            this.ApplyLevel(this.Level);
            this.Modifiers = MD[this.ID]?.Modifiers ?? [];
            this.ApplyModifiers(this.Modifiers);
        }
        this.SpawnLocation = object instanceof Building ? object : { x: object.x, y: object.y };
        this.scene.Enemies.add(this);
        this.setImmovable(true);
        this.setLighting(true);
        this.setInteractive().on('pointerdown', () => {
            console.log(this);
        });
    }

    update ( time: number, delta: number ) {

        this.AttackCooldown -= delta;

        Object.values(this.Abilities).forEach(ability => {
            ability.Cooldown -= delta;
        });

        if ( this.InCombat == true ) {

            this.InCombatDelta -= delta;

            if ( this.InCombatDelta <= 0 )
                return this.LoseAggro();

            let DistanceFromSpawnPoint = Phaser.Math.Distance.BetweenPoints(this, { x: this.SpawnLocation.x, y: this.SpawnLocation.y });
            if ( DistanceFromSpawnPoint > 500 )
                return this.LoseAggro();

            let DistanceFromPlayer = Phaser.Math.Distance.BetweenPoints(this, { x: this.scene.PlayerCharacter.x, y: this.scene.PlayerCharacter.y });
            if ( DistanceFromPlayer > this.AttackRange ) {
                this.scene.physics.moveTo(this, this.scene.PlayerCharacter.x, this.scene.PlayerCharacter.y, this.MovementSpeed);
            } else {
                this.body.reset(this.x, this.y);
                if ( this.AttackCooldown <= 0 )
                    this.Attack();
            }

        } 
        
        if ( this.InCombat == false ) {
            if ( this.moving ) {
                const distance = Phaser.Math.Distance.BetweenPoints(this, { x: this.targetX, y: this.targetY });
                if ( distance <= 10 )
                    this.StopMoving();
            }
        }

        if ( this.body!.velocity.x == 0 && this.body!.velocity.y == 0 ) {
            this.stop();
        } else {
            if ( !this.anims.isPlaying )
                this.play(this.WalkAnimation);
        }

    }

    ApplyModifiers ( modifiers: string[] ) {
        this.Modifiers = modifiers;
        modifiers.forEach(mod => {
            switch (mod) {
                case "Fortified":
                    this.MaxHealth *= 1.5;
                    this.Health = this.MaxHealth;
                    break;
                case "Aggressive":
                    this.AttackCooldown *= 0.75;
                    break;
                case "Infested":
                    this.MaxHealth *= 0.75;
                    this.Health = this.MaxHealth;
                    // When killed, explode in a delightfully gruesome fashion, dealing damage to nearby units
                    break;
            }
        });
    }

    ApplyLevel ( level: number ) {
        this.Level = level;
        this.MaxHealth *= 1 + (level - 1) * 0.5;
        this.Health = this.MaxHealth;
    }

    Attack () {

        // Find an ability with a cooldown of 0 or less
        let Ability = null;
        for ( let key in this.Abilities ) {
            if ( this.Abilities[key].Cooldown <= 0 ) {
                this.Abilities[key].Cooldown = this.Abilities[key].CooldownMax;
                Ability = key;
                break;
            }
        }

        if ( Ability == null ) {
            this.AttackCooldown = 1000;
            return console.log("No abilities available to use!");
        }

        console.log("Used ability: ", Ability, " with damage: ", this.Abilities[Ability].Damage[this.Level]);
        // angle to player
        let angle = Phaser.Math.Angle.Between(this.x, this.y, this.scene.PlayerCharacter.x, this.scene.PlayerCharacter.y);
        let projectile = new Projectile(this.scene, this.x, this.y, this.Abilities[Ability].Velocity, this.Abilities[Ability].Damage[this.Level], "Goblin-Arrow", angle);
        this.scene.EnemyProjectiles.add(projectile);

        this.InCombatDelta = 5000;
        this.AttackCooldown = 1000;
    }

    MoveTo (x: number, y: number) {
        var x = Phaser.Math.Between( this.SpawnLocation.x - 50, this.SpawnLocation.x + 50 );
        var y = Phaser.Math.Between( this.SpawnLocation.y - 50, this.SpawnLocation.y + 50 );
        this.moving = true
        this.targetX = x;
        this.targetY = y;
        this.scene.physics.moveTo(this, x, y, this.MovementSpeed);
    }

    StopMoving () {
        this.moving = false;
        this.targetX = 0;
        this.targetY = 0;
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
            this.Die();
    }

    Die () {
        console.log(this.ID, this.SpawnLocation);
        // If the enemy was spawned by a building, update the buildings unit count
        if ( this.SpawnLocation instanceof Building && this.SpawnLocation.CurrentSpawnCount !== undefined ) {
            console.log("Enemy died, updating spawn location unit count.", this.SpawnLocation.ID, this.SpawnLocation.CurrentSpawnCount);
            this.SpawnLocation.CurrentSpawnCount--;
            if ( this.SpawnLocation.Units !== undefined ) {
                let Unit = this.SpawnLocation.Units.find( (e) => (e.Name == this.Name && e.Level == this.Level) );
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