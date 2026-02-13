const Pyromancer: Proficiency = {

    Name: "Pyromancer",
    Description: "The Pyromancer is a master of fire magic, using their abilities to deal damage and control the battlefield. They can specialize in different types of fire magic, such as fireballs or flame walls, to suit their playstyle.",
    ID: "pyromancer",

    Abilities: [
        {
            ID: "pyro_burst",
            Name: "Pyro Burst",
            mana_cost: 0,
            sprite: "SkillsA-3",
            type: "MultiAreaOfEffect",
            cooldown: 3000,
            charge_time: 2000,
            Description: "Conjure a burst of fire in a small area around the target, dealing fire damage and igniting enemies, causing them to burn for a small amount of damage over time.",
            requires_weapon_equipped: false,
        },
        {
            ID: "blazing_barrage",
            Name: "Blazing Barrage",
            mana_cost: 0,
            sprite: "SkillsA-3",
            type: "MultiAreaOfEffect",
            cooldown: 3000,
            charge_time: 2000,
            Description: "Send several small blasts of fire in a line towards the target",
            requires_weapon_equipped: false,
        }
    ],

    Traits: [
        {
            ID: "fire_novice",
            Name: "Fire Novice",
            Description: "Your fire abilities have a chance to not consume mana.",
        },

        {
            ID: "fire_expert",
            Name: "Fire Expert",
            Description: "Your fire abilities have a higher chance to not consume mana.",
        },

        {
            ID: "fire_master",
            Name: "Fire Master",
            Description: "Your fire abilities have a very high chance to not consume mana.",
        },
    ],


}

export default Pyromancer;