interface ClassData {
    name: string; // Name of the feat
    description: string; // Description of the feat
    starting_traits: string[]; // Starting traits
    starting_abilities: string[]; // Starting traits
    starting_items: string[]; // Starting traits
}


const ClassData: any = [

    {
        name: "Evoker",
        description: `Harness the power of the elements to unleash devastating spells.`,
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
    },

    {
        name: "Operative",
        description: `Skulk in the shadows and weaken enemies before landing killing blows.`,
        starting_traits: [
            "Skulker",
        ],
        starting_abilities: [
            "Backstab",
            "Smoke Bomb",
        ],
        starting_items: [
            "dagger_bronze",
            "leather_armor_bronze",
        ],
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
    },

];

export default ClassData;