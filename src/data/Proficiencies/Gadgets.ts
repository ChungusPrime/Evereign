const Gadgets: Proficiency = {

    ID: "gadgets",

    Name: "Gadgets",

    Description: `Gadgets are highly advanced technological devices that can be deployed in combat to provide various benefits. 
    They mainly provide utility and support, such as dealing damage, providing crowd control, or revealing information about enemies.`,

    Abilities: [
        {
            ID: "servo_gun",
            Name: "Servo Gun",
            mana_cost: 15,
            sprite: "SkillsB-127",
            type: "Active",
            cooldown: 15000,
            Description: `Activate a small turret attached to your armour, that automatically fires at nearby enemies.`,
            requires_weapon_equipped: false,
            requires_trait: "gadgeteer_novice",
        },
        {
            ID: "vulnerability_scanner",
            Name: "Vulnerability Scanner",
            mana_cost: 25,
            sprite: "SkillsB-129",
            type: "Active",
            cooldown: 25000,
            Description: `Scan a nearby enemy to reveal their vulnerabilities, increasing damage they take for a short time.`,
            targeting: "manual",
            targeting_shape: "circle",
            targeting_radius: 200,
            requires_weapon_equipped: false,
            requires_trait: "gadgeteer_master",
        },
        {
            ID: "wrist_rocket_launcher",
            Name: "Wrist Rocket Launcher",
            mana_cost: 30,
            sprite: "SkillsB-130",
            type: "Active",
            cooldown: 30000,
            Description: `Fire a rocket from your wrist-mounted launcher, dealing damage to the first enemy it hits.`,
            requires_weapon_equipped: true,
            weapon_type: "Pistol",
            requires_trait: "gadgeteer_master",
        },
        {
            ID: "jet_boots",
            Name: "Jet Boots",
            mana_cost: 20,
            sprite: "SkillsB-131",
            type: "Active",
            cooldown: 20000,
            Description: `Activate your jet boots to dash forward quickly, knocking back enemies in your path.`,
            requires_weapon_equipped: false,
            requires_trait: "gadgeteer_expert",
        },
        {
            ID: "repulsor_belt",
            Name: "Repulsor Belt",
            mana_cost: 25,
            sprite: "SkillsB-132",
            type: "Active",
            cooldown: 25000,
            Description: `Activate your repulsor belt to create a shockwave that knocks back enemies in a radius around you.`,
            requires_weapon_equipped: false,
            requires_trait: "gadgeteer_master",
        }
    ],

    Traits: [
        {
            ID: "gadgeteer_novice",
            Name: "Gadgeteer Novice",
            Description: "Your gadgets have a chance to not consume mana.",
            sprite: "SkillsB-43",
        },
        {
            ID: "gadgeteer_expert",
            Name: "Gadgeteer Expert",
            Description: "Your gadgets have a higher chance to not consume mana.",
            sprite: "SkillsB-44",
        },
        {
            ID: "gadgeteer_master",
            Name: "Gadgeteer Master",
            Description: "Your gadgets have a very high chance to not consume mana.",
            sprite: "SkillsB-45",
        },
    ]

}

export default Gadgets;