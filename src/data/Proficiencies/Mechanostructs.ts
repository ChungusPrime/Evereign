const Mechanostructs: Proficiency = {

    ID: "mechanostructs",
    Name: "Mechanostructs",
    Description: `Mechanostructs are small, deployable constructs that can provide various benefits to their master. They can be used for 
    different purposes, including reconnaissance, offense, or defense, depending on the type of construct deployed.`,

    Abilities: [
        {
            ID: "observer_struct",
            Name: "Observator",
            mana_cost: 15,
            sprite: "SkillsB-127",
            type: "Spawn",
            cooldown: 15000,
            Description: `Deploy an Observator. The struct follows you and passively marks targets in an area around it, causing them to take extra damage from the next attack.`,
            requires_weapon_equipped: false,
            requires_trait: "mechanostructs_novice",
        },
        {
            ID: "guardian_struct",
            Name: "Battlewarden",
            mana_cost: 20,
            sprite: "SkillsB-128",
            type: "Spawn",
            cooldown: 20000,
            Description: `Deploy a Battlewarden. The struct follows and orbits around you, firing pellets at nearby enemies.`,
            requires_weapon_equipped: false,
            requires_trait: "mechanostructs_novice",
        },
        {
            ID: "shield_struct",
            Name: "Shield Swarm",
            mana_cost: 20,
            sprite: "SkillsB-128",
            type: "Spawn",
            cooldown: 20000,
            Description: `Deploy a swarm of Shield structs. When you take damage, the swarm will absorb the attack, but one of the structs will be destroyed in the process.`,

            requires_weapon_equipped: false,
            requires_trait: "mechanostructs_novice",
        },
    ],

    Traits: [
        {
            ID: "mechanostructs_novice",
            Name: "Mechanostructs Novice",
            Description: "Your constructs have a chance to not consume mana.",
            sprite: "SkillsB-43",
        },
        {
            ID: "mechanostructs_expert",
            Name: "Mechanostructs Expert",
            Description: "Your constructs have a higher chance to not consume mana.",
            sprite: "SkillsB-44",
        },
        {
            ID: "mechanostructs_master",
            Name: "Mechanostructs Master",
            Description: "Your constructs have a very high chance to not consume mana.",
            sprite: "SkillsB-45",
        },
    ]

}

export default Mechanostructs;