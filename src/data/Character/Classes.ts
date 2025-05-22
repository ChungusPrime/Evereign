interface ClassData {
    name: string; // Name of the feat
    description: string; // Description of the feat
    starting_traits: string[]; // Starting traits
    starting_abilities: string[]; // Starting traits
    starting_items: string[]; // Starting traits
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
            "Shotgun Novice",
            "Explosives Novice",
            "Arco-Tech Novice",
        ],
        starting_abilities: [
            "Incendiary Shot",
            "Shrap Bomb",
            "Observer Struct",
        ],
        starting_items: [
            "shotgun_1_grandpa",
        ],
        unique_building: "Deepstrike Beacon",
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
            "staff_evoker_1",
            "evoker_robe_1",
            "evoker_hood_1"
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
            'great_hammer_bronze',
            'plate_armor_bronze',
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
            "sword_bronze",
            "shield_bronze",
            "mail_armor_bronze",
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
            "sword_bronze",
            "shield_bronze",
            "mail_armor_bronze",
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
            "sword_bronze",
            "shield_bronze",
            "mail_armor_bronze",
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
            "sword_bronze",
            "shield_bronze",
            "mail_armor_bronze",
        ],
        unique_building: ""
    },

];

export default ClassData;