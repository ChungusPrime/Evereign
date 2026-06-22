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
            ID: "pyro_blast",
            Name: "Pyro Blast",
            mana_cost: 15,
            sprite: "SkillsB-15",
            type: "Buff",
            cooldown: 12000,
            ActiviationType: "Channeled",
            ChannelInterval: 500,
            MaxChannelTime: 2000,
            Description: "Rapidly fire shells filled with volatile incendiary material, dealing fire damage and applying a burning effect to enemies hit.",
            OnUse: {
                SpawnProjectile: { Type: "PyroPellet", Quantity: 6, Velocity: 100, Damage: [{ Type: "Fire", Amount: 10 }] }
            },
        },

        {
            ID: "charged_slug",
            Name: "Voltaic Slug",
            mana_cost: 10,
            sprite: "SkillsB-14",
            type: "Buff",
            cooldown: 10000,
            ActiviationType: "Charge",
            ChargeTime: 2000,
            Description: "Fire a electrically charged slug round. If it hits an enemy, that enemy is pinned and will periodically release a burst of electricity that damages nearby enemies.",
            OnUse: {
                SpawnProjectile: { Type: "ChargedSlug", Quantity: 1, Velocity: 300, Damage: [{ Type: "Electric", Amount: 15 }] }
            },

        },

        {
            ID: "defensive_blast",
            Name: "Defensive Blast",
            mana_cost: 70,
            sprite: "SkillsB-50",
            type: "Buff",
            cooldown: 70000,
            targeting: "Self",
            ActiviationType: "Instant",
            Description: "Rapidly fire a blast of pellets in all directions, dealing damage to nearby enemies and knocking them back, while also granting you a temporary shield that absorbs damage.",
            requires_weapon_equipped: true,
            weapon_type: "Scattergun",
            requires_trait: "scattergun_novice",
            OnUse: [
                { KnockBack: { Radius: 200, Force: 400 } },
                { ApplyEffect: { ID: "defensive_blast_shield", Duration: 5000 } }
            ],
        },

    ],

    Traits: [

        {
            ID: "scattergun_apprentice",
            Name: "Scattergun Apprentice",
            Description: `Allows you to equip and use Scatterguns.`,
            sprite: "SkillsB-24",
            RequiredTraits: [
                "scattergun_novice",
            ],
            RequiredAttributes: {
                Versatility: 10,
            }
        },

        {
            ID: "scattergun_novice",
            Name: "Scattergun Novice",
            sprite: "SkillsB-21",
            Description: `Basic training on how to use Scatterguns.
            - The number of pellets fired per shot is increased by 1.
            - Scattergun pellets deal an additional 4 Impact damage.`,
            RequiredTraits: [
                "scattergun_apprentice",
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
            - Scattergun pellets deal an additional 8 Impact damage.`,
            sprite: "SkillsB-25",
            RequiredTraits: [
                "scattergun_novice",
            ],
            RequiredAttributes: {
                Versatility: 15,
            }
        },

        {
            ID: "scattergun_expert",
            Name: "Scattergun Expert",
            Description: `Expert training on how to use Scatterguns.
            - The number of pellets fired per shot is increased by 3.
            - Reload speed is reduced by 200ms.
            - Scattergun pellets deal an additional 12 Impact damage.`,
            sprite: "SkillsB-22",
            RequiredTraits: [
                "scattergun_journeyman",
            ],
            RequiredAttributes: {
                Versatility: 20,
            }
        },

        {
            ID: "scattergun_master",
            Name: "Scattergun Master",
            Description: `Master training on how to use Scatterguns.
            - The number of pellets fired per shot is increased by 4.
            - Reload speed is reduced by 400ms.
            - Scattergun pellets deal an additional 16 Impact damage.
            - Scattergun Abilities have a small chance to not consume mana when used.`,
            sprite: "SkillsB-23",
            RequiredTraits: [
                "scattergun_expert",
            ],
            RequiredAttributes: {
                Versatility: 25,
            }
        },

    ],

}

export default Scatterguns;