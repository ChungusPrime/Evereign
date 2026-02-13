const AbilityData: Record<string, Ability> = {



    "shrap_charge": {
        id: "shrap_charge",
        name: "Shrapnel Charge",
        mana_cost: 10,
        sprite: "SkillsB-190",
        type: "Buff",
        cooldown: 12000,
        description: "The next grenade you throw will send shrapnel flying in all directions, dealing Bleed damage to all enemies in the area.",
        requires_weapon_equipped: false,
        requires_trait: "explosives_novice",
    },

    "observer_struct": {
        id: "observer_struct",
        name: "Deploy Observer Struct",
        mana_cost: 15,
        sprite: "SkillsB-127",
        type: "Spawn",
        cooldown: 15000,
        description: `Deploy a controllable, invisible observation drone. Activate the ability again to destroy the drone, marking targets in an area around it, causing them to take extra damage from the next attack.`,
        requires_weapon_equipped: false,
        requires_trait: "arco_tech_novice",
    },

    "pyro_burst": {
        id: "pyro_burst",
        name: "Pyro Burst",
        mana_cost: 0,
        sprite: "SkillsA-3",
        type: "MultiAreaOfEffect",
        cooldown: 3000,
        charge_time: 2000,
        description: "Conjure a burst of fire in a small area around the target, dealing fire damage and igniting enemies, causing them to burn for a small amount of damage over time.",
    },

    "frost_field": {
        id: "frost_field",
        name: "Frost Field",
        description: "Summon a cloud of ice, slowing movement speed.",
        type: "Projectile",
        mana_cost: 0,
        sprite: "SkillsA-1",
    },

    "blazing_barrage": {
        id: "blazing_barrage",
        name: "Blazing Barrage",
        mana_cost: 0,
        sprite: "SkillsA-3",
        type: "MultiAreaOfEffect",
        cooldown: 3000,
        charge_time: 2000,
        description: "Send several small blasts of fire in a line towards the target",
    },

};

export default AbilityData;