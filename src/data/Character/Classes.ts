const ClassData: ClassData[] = [

    {
        Name: "Operative",
        Description: `Operatives fill many roles within the kingdom. Usually working alone as scouts, spies, or assassins, they often work in the shadows to gather information and 
        eliminate threats before they have a chance to act, but are also capable enforcers of the law, protecting the kingdom from those who would do it harm.
        Operatives are skilled in the use of scatterguns, explosives, and have some knowledge of Gadgetry, making them versatile combatants.`,
        
        Traits: [
            "scattergun_novice",
            "explosive_novice",
            "gadgetry_novice",
        ],
        Abilities: [
            "incendiary_shot",
            "shrap_bomb",
            "observer_struct",
        ],
        AttributeBonuses: {
            Fortitude: 0,
            Versatility: 5,
            Vigor: 3,
            Expertise: 4,
            Arcana: 0,
            Personality: 2,
            Fortune: 2,
            Grit: 2,
        },
        Hotbar: {
            1: { Type: "Ability", ID: "incendiary_shot" },
            2: { Type: "Ability", ID: "shrap_bomb"},
            3: { Type: "Ability", ID: "observer_struct"},
            4: { Type: "Item", ID: "marigold_brew" },
            5: { Type: "Item", ID: "stone_shot" }
        },
        Items: {
            Equipment_MainHand: { ID: "grandpa_Scattergun", Quantity: 1 },
            Equipment_Chest: { ID: "operative_armor", Quantity: 1 },
            Equipment_Head: { ID: "operative_helmet", Quantity: 1 },
            Equipment_Hands: { ID: "operative_gloves", Quantity: 1 },
            Equipment_Feet: { ID: "operative_boots", Quantity: 1 },
            Equipment_Legs: { ID: "operative_legguards", Quantity: 1 },
            1: { ID: "marigold_brew", Quantity: 5 },
            2: { ID: "stone_shot", Quantity: 100 }
        },
        UniqueBuilding: "Arco-Tech Support Relay",
        Available: true
    },

    /*{
        Name: "Evoker",
        Description: `Evokers are powerful magic users who harness the elements to cast devastating spells. They are skilled in the use of staffs and magical devices, and can channel their arcane energy to unleash powerful attacks.
        Evokers are often seen as the guardians of the kingdom, using their magic to protect it from threats both internal and external.
        They are known for their ability to manipulate the elements, using fire, ice, and lightning to devastating effect.`,
        Traits: [
            "pyro_novice",
            "cryo_novice",
            "electro_novice"
        ],
        Abilities: [
            'Pyro Burst',
            'Frost Field',
            'Electro Jab'
        ],
        AttributeBonuses: {
            "Fortitude": 0,
            "Versatility": 0,
            "Vigor": 1,
            "Expertise": 2,
            "Arcana": 5,
            "Personality": 2,
            "Fortune": 3,
            "Grit": 1,
        },
        Items: [
            { ID: "staff_evoker_1", Quantity: 1 },
            { ID: "evoker_robe_1", Quantity: 1 },
            { ID: "evoker_hood_1", Quantity: 1 },
            { ID: "evoker_gloves_1", Quantity: 1 },
            { ID: "evoker_boots_1", Quantity: 1 },
            { ID: "evoker_legguards_1", Quantity: 1 },
            { ID: "marigold_brew", Quantity: 5 },
            { ID: "bloomberry_decoction", Quantity: 5 }
        ],
        UniqueBuilding: "Arcane Extractor",
        Available: false
    },*/

    /*{
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
    },*/

];

export default ClassData;