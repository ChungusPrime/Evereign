const Gadgeteer: Proficiency = {

    ID: "gadgeteer",
    Name: "Gadgeteer",
    Description: "The Gadgeteer is a master of technology, using their abilities to deploy turrets and constructs to control the battlefield. They can specialize in different types of gadgets, such as offensive turrets or defensive constructs, to suit their playstyle.",

    Abilities: [
        {
            ID: "observer_struct",
            Name: "Deploy Observer Struct",
            mana_cost: 15,
            sprite: "SkillsB-127",
            type: "Spawn",
            cooldown: 15000,
            Description: `Deploy a controllable, invisible observation drone. Activate the ability again to destroy the drone, marking targets in an area around it, causing them to take extra damage from the next attack.`,
            requires_weapon_equipped: false,
            requires_trait: "arco_tech_novice",
        }
    ],

    Traits: [
        {
            ID: "gadgeteer_novice",
            Name: "Gadgeteer Novice",
            Description: "Your gadgets have a chance to not consume mana.",
        },
        {
            ID: "gadgeteer_expert",
            Name: "Gadgeteer Expert",
            Description: "Your gadgets have a higher chance to not consume mana.",
        },
        {
            ID: "gadgeteer_master",
            Name: "Gadgeteer Master",
            Description: "Your gadgets have a very high chance to not consume mana.",
        },
    ]

}

export default Gadgeteer;