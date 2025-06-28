const AbilityData: any = [

    {
        id: "incendiary_shot",
        name: "Incendiary Shot",
        mana_cost: 10,
        sprite: "SkillsA-3",
        type: "Buff",
        cooldown: 10000,
        description: "Load your Scattergun with incendiary rounds, causing pellets to deal fire damage each second for 5 seconds.",
        requires_weapon_equipped: true,
        weapon_type: "Scattergun",
        apply_effect: "incendiary_shot",
        apply_effect_duration: 5000,
        requires_trait: "Scattergun_novice",
    },

    {
        id: "shrap_bomb",
        name: "Shrap Bomb",
        mana_cost: 10,
        sprite: "SkillsA-3",
        type: "AreaOfEffect",
        cooldown: 12000,
        description: "Throw a grenade at the target area, on impact, exploding and dealing damage to all enemies in the area.",
        requires_weapon_equipped: false,
        requires_trait: "explosives_novice",
    },

    {
        id: "observer_struct",
        name: "Deploy Observer Struct",
        mana_cost: 15,
        sprite: "SkillsA-3",
        type: "Spawn",
        cooldown: 15000,
        description: `Deploy a controllable, invisible observation drone. Activate the ability again to destroy the drone, marking targets in an area around it, causing them to take extra damage from the next attack.`,
        requires_weapon_equipped: false,
        requires_trait: "arco_tech_novice",
    },

    {
        name: "Pyro Burst",
        mana_cost: 0,
        sprite: "SkillsA-3",
        type: "MultiAreaOfEffect",
        cooldown: 3000,
        charge_time: 2000,
        description: "Conjure a burst of fire in a small area around the target, dealing fire damage and igniting enemies, causing them to burn for a small amount of damage over time.",
    },

    {
        name: "Frost Field",
        description: "Summon a cloud of ice, slowing movement speed.",
        type: "Projectile",
        mana_cost: 0,
        sprite: "SkillsA-1",
    },

    {
        name: "Blazing Barrage",
        mana_cost: 0,
        sprite: "SkillsA-3",
        type: "MultiAreaOfEffect",
        cooldown: 3000,
        charge_time: 2000,
        description: "Send several small blasts of fire in a line towards the target",
    },

];

export default AbilityData;