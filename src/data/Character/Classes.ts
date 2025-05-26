interface ClassData {
    name: string; // Name of the feat
    description: string; // Description of the feat
    starting_traits: string[]; // Starting traits
    starting_abilities: string[]; // Starting traits
    starting_items: { ID: string; Quantity: number }[]; // Starting items, can be an array of objects or strings
    unique_building: string; // Unique building
}


const ClassData: ClassData[] = [

    {
        name: "Operative",
        description: `Operatives are highly specialised soldiers, equipped to deal with a variety of threats. 
        Trained in the use of guns, explosives and advanced technology, they are capable of identifying threats from a 
        safe distance, then taking them down up-close with chaos and speed. 
        Unique building allows the operative to remotley call in a variety of offensive strikes.`,
        starting_traits: [
            "shotgun_novice",
            "explosive_novice",
            "archo_tech_novice",
        ],
        starting_abilities: [
            "incendiary_shot",
            "shrap_bomb",
            "observer_struct",
        ],
        starting_items: [
            { ID: "grandpa_shotgun", Quantity: 1 },
            { ID: "marigold_brew", Quantity: 5 },
            { ID: "lead_shot", Quantity: 100 },
            { ID: "operative_armor", Quantity: 1 },
            { ID: "operative_helmet", Quantity: 1 }
        ],
        unique_building: "Arco-Tech Support Relay",
    },

    {
        name: "Evoker",
        description: `Harness the power of the elements to unleash devastating spells. 
        Unique building allows the evoker to empower their spells with elemental energy by deconstructing magical items.`,
        starting_traits: [
            "Pyro Novice",
            "Cryo Novice",
        ],
        starting_abilities: [
            'Pyro Burst',
            'Frost Field',
        ],
        starting_items: [
            { ID: "staff_evoker_1", Quantity: 1 },
            { ID: "evoker_robe_1", Quantity: 1 },
            { ID: "evoker_hood_1", Quantity: 1 }
        ],
        unique_building: "Arcane Extractor"
    },

    {
        name: "Godsworn",
        description: `Call upon the power of the gods to smite your enemies.`,
        starting_traits: [
            'Heavy Armor Novice',
            'Greathammer Novice'
        ],
        starting_abilities: [
            'Shield of the Blessed'
        ],
        starting_items: [
            { ID: "great_hammer_bronze", Quantity: 1 },
            { ID: "plate_armor_bronze", Quantity: 1 }
        ],
        unique_building: ""
    },

    {
        name: "Gladiator",
        description: `Deliver powerful blows to your enemies, gaining strength from your victories.`,
        starting_traits: [
            "Glorious Victory, gain increased loot and XP from defeating enemies in rapid succession.",
        ],
        starting_abilities: [
            "Shield Bash",
            "Charge",
        ],
        starting_items: [
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "mail_armor_bronze", Quantity: 1 }
        ],
        unique_building: ""
    },

    {
        name: "Captain",
        description: `Command your allies to victory, inspiring them with your presence.`,
        starting_traits: [
            "Glorious Victory, gain increased loot and XP from defeating enemies in rapid succession.",
        ],
        starting_abilities: [
            "Shield Bash",
            "Charge",
        ],
        starting_items: [
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "mail_armor_bronze", Quantity: 1 }
        ],
        unique_building: ""
    },

    {
        name: "Demonologist",
        description: `Summon powerful demons to fight by your side, while consuming the life of your enemies.`,
        starting_traits: [
            "Glorious Victory, gain increased loot and XP from defeating enemies in rapid succession.",
        ],
        starting_abilities: [
            "Shield Bash",
            "Charge",
        ],
        starting_items: [
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "mail_armor_bronze", Quantity: 1 }
        ],
        unique_building: ""
    },

    {
        name: "Enginewright",
        description: `Construct turrets and contraptions to destroy your enemies.`,
        starting_traits: [
            "Glorious Victory, gain increased loot and XP from defeating enemies in rapid succession.",
        ],
        starting_abilities: [
            "Shield Bash",
            "Charge",
        ],
        starting_items: [
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "sword_bronze", Quantity: 1 },
            { ID: "mail_armor_bronze", Quantity: 1 }
        ],
        unique_building: ""
    },

];

export default ClassData;