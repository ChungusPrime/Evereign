const Scatterguns: Proficiency = {

    ID: "scatterguns",
    Name: "Scatterguns",

    Description: `Scatterguns are ranged weapons that are characterized by their slow rate of fire and heavy recoil, but 
    they make up for this with high damage output and the ability to hit multiple targets at once.
    
    Scatterguns are a type of ranged weapon that fire multiple projectiles in a spread pattern.
    They are most effective at close range, and can deal significant damage to multiple enemies at once.
    A scatterguns effectiveness is determined by the type of ammunition currently loaded, as well as the character's Versatility attribute.
    Different ammo types can be used to modify the spread, damage, rate of fire or other effects of the scattergun.
    All Scatterguns, as a base, inflict Pierce and Impact damage.`,

    Abilities: [

        {
            ID: "voltaic_net",
            Name: "Voltaic Net",
            mana_cost: 5,
            sprite: "SkillsB-13",
            type: "Buff",
            cooldown: 8000,
            Description: "Load your Scattergun with a slug containing an electrically charged net. If it hits an enemy, that enemy is pinned and will periodically release a burst of electricity that damages nearby enemies.",
        },

        {
            ID: "splinter_shells",
            Name: "Splinter Shells",
            mana_cost: 5,
            sprite: "SkillsB-15",
            type: "Buff",
            cooldown: 8000,
            Description: "Load your Scattergun with splinter shells, causing pellets to deal Bleed damage over time.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            apply_effect: "bleed",
            apply_effect_duration: 5000,
            requires_trait: "scattergun_novice",
        },

        {
            ID: "fragmentation_shell",
            Name: "Fragmentation Shell",
            mana_cost: 10,
            sprite: "SkillsB-14",
            type: "Buff",
            cooldown: 10000,
            Description: "Load your Scattergun with fragmentation shells, causing pellets to explode on hit, dealing area damage.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            apply_effect: "fragmentation_explosion",
            apply_effect_duration: 0,
            requires_trait: "scattergun_novice",
        },

        {
            ID: "piercing_shot",
            Name: "Piercing Shot",
            mana_cost: 20,
            sprite: "SkillsB-20",
            type: "Buff",
            cooldown: 20000,
            Description: "Load your Scattergun with piercing shot, allowing pellets to pierce through enemies and hit additional targets behind them.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            apply_effect: "piercing_shot",
            apply_effect_duration: 10000,
            requires_trait: "scattergun_novice",
        },

        {
            ID: "shockwave_shell",
            Name: "Shockwave Shell",
            mana_cost: 25,
            sprite: "SkillsB-21",
            type: "Buff",
            cooldown: 25000,
            Description: "Load your Scattergun with shockwave shells, causing pellets to create a shockwave on hit that knocks back enemies and deals damage based on the distance knocked back.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            apply_effect: "shockwave_shell",
            apply_effect_duration: 0,
            requires_trait: "scattergun_novice",
        },

        {
            ID: "incendiary_shot",
            Name: "Incendiary Shot",
            mana_cost: 10,
            sprite: "SkillsB-16",
            type: "Buff",
            cooldown: 10000,
            Description: "Load your Scattergun with incendiary shot, causing pellets to deal fire damage each second for 5 seconds.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            apply_effect: "incendiary_shot",
            apply_effect_duration: 5000,
            requires_trait: "scattergun_novice",
        },

        {
            ID: "concussive_shot",
            Name: "Concussive Shot",
            mana_cost: 40,
            sprite: "SkillsB-44",
            type: "Buff",
            cooldown: 40000,
            Description: "Load your Scattergun with concussive shot, causing pellets to create a concussive blast on hit that damages and disorients enemies in the area.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            apply_effect: "concussive_shot",
            apply_effect_duration: 5000,
            requires_trait: "scattergun_novice",
        },

        {
            ID: "defensive_blast",
            Name: "Defensive Blast",
            mana_cost: 70,
            sprite: "SkillsB-50",
            type: "Buff",
            cooldown: 70000,
            Description: "RapIDly fire a blast of pellets in all directions, dealing damage to nearby enemies and knocking them back, while also granting you a temporary shield that absorbs damage.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            apply_effect: "defensive_blast",
            apply_effect_duration: 5000,
            requires_trait: "scattergun_novice",
        },

    ],

    Traits: [
        {
            ID: "scattergun_novice",
            Name: "Scattergun Novice",
            Description: "Your Scattergun abilities have a chance to not consume mana.",
        },

        {
            ID: "scattergun_expert",
            Name: "Scattergun Expert",
            Description: "Your Scattergun abilities have a higher chance to not consume mana.",
        },

        {
            ID: "scattergun_master",
            Name: "Scattergun Master",
            Description: "Your Scattergun abilities have a very high chance to not consume mana.",
        },

        {
            ID: "scattergun_apprentice",
            Name: "Scattergun Apprentice",
            Description: `Intermediate training on how to use Scatterguns.
            - The number of pellets fired per shot is increased by 2.
            - Each base damage type of Scatterguns is increased by 2.`,
            RequiredTraits: [
                "scattergun_novice",
            ],
            RequiredAttributes: {
                Versatility: 10,
            }
        },

        {
            ID: "scattergun_journeyman",
            Name: "Scattergun Journeyman",
            Description: `Advanced training on how to use Scatterguns.
            - The number of pellets fired per shot is increased by 2.
            - Each base damage type of Scatterguns is increased by 2.`,
            RequiredTraits: [
                "scattergun_apprentice",
            ],
        },

        {
            ID: "scattergun_adept",
            Name: "Scattergun Adept",
            Description: `Expert training on how to use Scatterguns.
            - The number of pellets fired per shot is increased by 2.
            - Each base damage type of Scatterguns is increased by 2.`,
            RequiredTraits: [
                "scattergun_journeyman",
            ],
        },

        {
            ID: "scattergun_guru",
            Name: "Scattergun Guru",
            Description: `Master training on how to use Scatterguns.
            - The number of pellets fired per shot is increased by 2.
            - Each base damage type of Scatterguns is increased by 2.`,
            RequiredTraits: [
                "scattergun_adept",
            ],
        },

        {
            ID: "shoot-n-scoot",
            Name: "Shoot-n-Scoot",
            Description: `After emptying your Scattergun, gain a 20% movement speed boost for 3 seconds.`,
        },

        {
            ID: "double_tap",
            Name: "Double Tap",
            Description: `Fire an additional shot immediately after firing a Scattergun. This effect has a cooldown of 10 seconds.`,
        },

        {
            ID: "scattershot",
            Name: "Scattershot",
            Description: `Scattergun shots have a 20% chance to fire an additional pellet in a random direction.`,
        },

        {
            ID: "buckshot",
            Name: "Buckshot",
            Description: `Scattergun shots have a 20% chance to fire an additional pellet directly forward.`,
        },

        {
            ID: "ricochet",
            Name: "Ricochet",
            Description: `Scattergun pellets have a 20% chance to ricochet off surfaces, hitting additional targets.`,
        },

        {
            ID: "close_quarters_expert",
            Name: "Close Quarters Expert",
            Description: `Scattergun shots have a 20% chance to deal increased damage based on how close the target is.`,
        },

        {
            ID: "scatter_and_pray",
            Name: "Scatter and Pray",
            Description: `Scattergun shots have a 20% chance to ignore a portion of the target's armor.`,
        },

        {
            ID: "overpenetration",
            Name: "Overpenetration",
            Description: `Scattergun pellets have a 20% chance to pass through targets, hitting additional enemies in a line.`,
        },

        {
            ID: "shotgun_rain",
            Name: "Shotgun Rain",
            Description: `After firing a Scattergun, there is a 20% chance to create a small area of effect at the target location that deals damage over time for 5 seconds.`,
        },

        {
            ID: "scattergun_slinger",
            Name: "Scattergun Slinger",
            Description: `Gain a 20% chance to fire an additional Scattergun shot that targets a random nearby enemy.`,
        },

        {
            ID: "shotgunner's_luck",
            Name: "Shotgunner's Luck",
            Description: `Scattergun shots have a 20% chance to critically strike, dealing increased damage.`,
        },

        {
            ID: "scattergunner's_doom",
            Name: "Scattergunner's Doom",
            Description: `Scattergun shots have a 20% chance to apply a debuff to the target that increases the damage they take from all sources for 5 seconds.`,
        },

        {
            ID: "scattergunner's_fortune",
            Name: "Scattergunner's Fortune",
            Description: `Scattergun shots have a 20% chance to apply a buff to you that increases the damage you deal with Scatterguns for 5 seconds.`,
        },

        {
            ID: "close_range_expert",
            Name: "Close Range Expert",
            Description: `Scattergun shots have a 20% chance to deal increased damage based on how close the target is.`,
        }

    ],

}

export default Scatterguns;