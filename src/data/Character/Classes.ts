interface ClassData {
    name: string; // Name of the class
    description: string; // Description of the class
    starting_traits: string[]; // Starting passive traits
    starting_abilities: string[]; // Starting active abilities
    starting_attribute_bonuses?: { [attribute: string]: number }; // Starting attribute bonuses, optional
    starting_items: { ID: string; Quantity: number }[]; // Starting items
    unique_building: string; // Unique building
    Available?: boolean; // Whether the class is available or not
}


const ClassData: ClassData[] = [

    {
        name: "Operative",
        description: `Operatives are highly specialised soldiers, equipped to deal with a variety of threats. 
        Trained in the use of guns, explosives and advanced technology, they are capable of identifying threats from a 
        safe distance, then taking them down up-close with chaos and speed. 
        Unique building allows the operative to remotley call in a variety of offensive strikes.`,
        starting_traits: [
            "Scattergun_novice",
            "explosive_novice",
            "archo_tech_novice",
        ],
        starting_abilities: [
            "incendiary_shot",
            "shrap_bomb",
            "observer_struct",
        ],
        starting_attribute_bonuses: {
            "Fortitude": 0,
            "Versatility": 5,
            "Vigor": 3,
            "Expertise": 4,
            "Arcana": 0,
            "Personality": 2,
            "Fortune": 2,
            "Grit": 2,
        },
        starting_items: [
            { ID: "grandpa_Scattergun", Quantity: 1 },
            { ID: "marigold_brew", Quantity: 5 },
            { ID: "stone_shot", Quantity: 100 },
            { ID: "operative_armor", Quantity: 1 },
            { ID: "operative_helmet", Quantity: 1 },
            { ID: "operative_gloves", Quantity: 1 },
            { ID: "operative_boots", Quantity: 1 },
            { ID: "operative_legguards", Quantity: 1 }
        ],
        unique_building: "Arco-Tech Support Relay",
        Available: true
    },

    {
        name: "Evoker",
        description: `Harness the power of the elements to unleash devastating spells. 
        Unique building allows the evoker to empower their spells with elemental energy by deconstructing magical items.`,
        starting_traits: [
            "pyro_novice",
            "cryo_novice",
            "electro_novice"
        ],
        starting_abilities: [
            'Pyro Burst',
            'Frost Field',
            'Electro Jab'
        ],
        starting_attribute_bonuses: {
            "Fortitude": 0,
            "Versatility": 0,
            "Vigor": 1,
            "Expertise": 2,
            "Arcana": 5,
            "Personality": 2,
            "Fortune": 3,
            "Grit": 1,
        },
        starting_items: [
            { ID: "staff_evoker_1", Quantity: 1 },
            { ID: "evoker_robe_1", Quantity: 1 },
            { ID: "evoker_hood_1", Quantity: 1 },
            { ID: "evoker_gloves_1", Quantity: 1 },
            { ID: "evoker_boots_1", Quantity: 1 },
            { ID: "evoker_legguards_1", Quantity: 1 },
            { ID: "marigold_brew", Quantity: 5 },
            { ID: "bloomberry_decoction", Quantity: 5 }
        ],
        unique_building: "Arcane Extractor",
        Available: false
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
        unique_building: "Shrine of the Gods",
        Available: false
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
        unique_building: "Coliseum",
        Available: false
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
        unique_building: "Barracks",
        Available: false
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
        unique_building: "Summoning Circle",
        Available: false
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
        unique_building: "Cannon Foundry",
        Available: false
    },

];

export default ClassData;