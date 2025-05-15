const AbilityData: any = [

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