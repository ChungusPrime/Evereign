const ClassData: ClassData[] = [

    {
        Name: "Agent",
        Description: `Agents fill many roles within the kingdom. Usually working alone as scouts, spies, or assassins, they often work in the shadows to gather information and 
        eliminate threats before they have a chance to act, but are also capable enforcers of the law, protecting the kingdom from those who would do it harm.
        Agents are skilled in the use of scatterguns, explosives, and have some knowledge of Gadgetry, making them versatile combatants.`,
        Traits: [
            "scattergun_novice",
            "explosive_novice",
            "gadgetry_novice",
        ],
        Abilities: [
            "incendiary_shot",
            "shrap_charge",
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
            2: { Type: "Ability", ID: "shrap_charge"},
            3: { Type: "Ability", ID: "observer_struct"},
            4: { Type: "Item", ID: "marigold_brew" },
            5: { Type: "Item", ID: "stone_shot" },
            6: { Type: "Item", ID: "grenade_mk1" },
        },
        Items: {
            Equipment_MainHand: { ID: "grandpa_scattergun", Quantity: 1 },
            Equipment_Chest: { ID: "agent_coat", Quantity: 1 },
            Equipment_Head: { ID: "agent_face_cover", Quantity: 1 },
            Equipment_Hands: { ID: "agent_gloves", Quantity: 1 },
            Equipment_Feet: { ID: "agent_boots", Quantity: 1 },
            Equipment_Legs: { ID: "agent_legguards", Quantity: 1 },
            1: { ID: "marigold_brew", Quantity: 5 },
            2: { ID: "stone_shot", Quantity: 100 },
            3: { ID: "grenade_mk1", Quantity: 5 }
        },
        UniqueBuilding: "Arco-Tech Support Relay",
        Available: true
    },

    {
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
            'pyro_burst',
            'frost_field',
            'electro_jab'
        ],
        AttributeBonuses: {
            Fortitude: 0,
            Versatility: 0,
            Vigor: 1,
            Expertise: 2,
            Arcana: 5,
            Personality: 2,
            Fortune: 3,
            Grit: 1,
        },
        Hotbar: {
            1: { Type: "Ability", ID: "pyro_burst" },
            2: { Type: "Ability", ID: "frost_field"},
            3: { Type: "Ability", ID: "electro_jab"},
            4: { Type: "Item", ID: "marigold_brew" },
            5: { Type: "Item", ID: "bloomberry_decoction" },
        },
        Items: {
            Equipment_MainHand: { ID: "staff_evoker_1", Quantity: 1 },
            Equipment_Chest: { ID: "evokers_robe", Quantity: 1 },
            Equipment_Head: { ID: "evokers_hood", Quantity: 1 },
            Equipment_Hands: null,
            Equipment_Feet: { ID: "leather_shoes", Quantity: 1 },
            Equipment_Legs: null,
            1: { ID: "marigold_brew", Quantity: 5 },
            2: { ID: "bloomberry_decoction", Quantity: 5 }
        },
        UniqueBuilding: "Arcane Extractor",
        Available: true
    },

    {
        Name: "Godsworn",
        Description: `Godsworn are holy warriors who have dedicated their lives to the service of the divine. They are skilled in the use of hammers and heavy armor, and can channel 
        their divine energy to heal and protect their allies. Godsworn are often seen as the champions of the kingdom, using their strength and faith to protect it from evil.
        They are known for their unwavering devotion to their cause, and their ability to inspire those around them to greatness.`,
        Traits: [
            "holy_novice",
            "protection_novice",
            "blessing_novice"
        ],
        Abilities: [
            'smite',
            'divine_shield',
            'blessing_of_strength'
        ],
        AttributeBonuses: {
            Fortitude: 3,
            Versatility: 2,
            Vigor: 2,
            Expertise: 1,
            Arcana: 0,
            Personality: 4,
            Fortune: 2,
            Grit: 3,
        },
        Hotbar: {
            1: { Type: "Ability", ID: "smite" },
            2: { Type: "Ability", ID: "divine_shield"},
            3: { Type: "Ability", ID: "blessing_of_strength"},
            4: { Type: "Item", ID: "marigold_brew" },
        },
        Items: {
            Equipment_MainHand: { ID: "hammer_godsworn_1", Quantity: 1 },
            Equipment_Chest: { ID: "godsworn_armor_1", Quantity: 1 },
            Equipment_Head: { ID: "godsworn_helmet_1", Quantity: 1 },
            Equipment_Hands: { ID: "godsworn_gauntlets_1", Quantity: 1 },
            Equipment_Feet: { ID: "godsworn_boots_1", Quantity: 1 },
            Equipment_Legs: { ID: "godsworn_legguards_1", Quantity: 1 },
            1: { ID: "marigold_brew", Quantity: 5 },
        },
        UniqueBuilding: "Temple of the Divine",
        Available: false
    },

    /*{
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