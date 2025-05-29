const GameData: GameData = {

    CreatedAtTimestamp: Date.now().toString(),
    LastSaveTimestamp: Date.now().toString(),

    X: 6281,
    Y: 5500,

    Name: "Test Character",
    Level: 1,
    Race: "Human",
    CurrentMap: "Willowvale",
    Class: "Evoker",
    Scaling: "fixed",
    Difficulty: "Normal",

    Traits: [],
    Abilities: [],
    Inventory: [],

    Equipment: {
        Head: null,
        Chest: null,
        Hands: null,
        Legs: null,
        Feet: null,
        Ring_1: null,
        Ring_2: null,
        Neck: null,
        MainHand: null,
        OffHand: null
    },

    QuickSlots: {
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
    },
    
    Campaign: "The Twilight Accord",

    CurrentHealth: 25,
    CurrentMana: 50,

    Quests: [],

    CompletedMilestones: [],
    
    ProgressFlags: [],
    FoundLoreEntries: [],
    DialogueFlags: [],
    UnlockedBuildings: [],
    MetNPCs: [],

    Reputation: [
        { 
            Name: "Little Piddleton", 
            Value: 0, 
            Towns: [ 
                "Little Piddleton",
                "Pond Meadow"
            ]
        },
        { 
            Name: "Brackenwald",
            Value: 0,
            Towns: [
                "Emberstead"
            ]
        },
    ],

    PlayerTowns: {},

    DaytimeHour: 9,
    DaytimeMinute: 0,
    DaytimeDelta: 0,

    Skills: {
        Fishing: {
            Level: 1,
            XP: 0,
            XPNext: 100
        },
        Forestry: {
            Level: 1,
            XP: 0,
            XPNext: 100
        },
        Mining: {
            Level: 1,
            XP: 0,
            XPNext: 100
        },
        Botany: {
            Level: 1,
            XP: 0,
            XPNext: 100
        },
        Alchemy: {
            Level: 1,
            XP: 0,
            XPNext: 100
        }
    },

    Bestiary: [
        { ID: "gobbo_slinger", Progress: 0 },
        { ID: "gobbo_raider", Progress: 0 },
        { ID: "gobbo_warboss", Progress: 0 },
    ],

    NextBuildingCost: [
        { 
            Building: "Town Centre", 
            Cost: [
                { Resource: 1, Amount: 25 },
                { Resource: 2, Amount: 25 },
                { Resource: 8, Amount: 150 },
            ]
        },
    ],
    
    Maps: {

        TestMap: {
            Enemies: [],
            Buildings: [],
            Objects: [
                {
                    ID: 1,
                    Type: "Chest",
                    Name: "Test Chest",
                    Unlocked: true,
                    Loot: [
                        { ItemID: "iron_key", Amount: 1 },
                    ]
                },
                {
                    ID: 2,
                    Type: "Chest",
                    Name: "Test Locked Chest",
                    Unlocked: false,
                    Loot: [
                        { ItemID: "iron_key", Amount: 1 },
                    ],
                },
                {
                    ID: 4, 
                    Name: "Door Switch",
                    Type: "Switch", 
                    Active: false 
                },
                {
                    ID: 5, 
                    Name: "Door", 
                    Type: "Obstacle", 
                    Active: true 
                }
            ]
        },

        Willowvale: {
            Enemies: [
                { ID: 442, Alive: true },
                { ID: 545, Alive: true },
                { ID: 546, Alive: true },
                { ID: 547, Alive: true },
            ],
            Buildings: [
                { ID: 87, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 3, Alive: 0, Dead: 0 },
                ]},
                { ID: 300, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 5, Alive: 0, Dead: 0 },
                ]},
                { ID: 396, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 5, Alive: 0, Dead: 0 },
                ]},
                { ID: 381, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 5, Alive: 0, Dead: 0 },
                ]},
                { ID: 429, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 5, Alive: 0, Dead: 0 },
                ]},
                { ID: 426, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 5, Alive: 0, Dead: 0 },
                ]},
                { ID: 425, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 5, Alive: 0, Dead: 0 },
                ]},
                { ID: 424, Destroyed: false, Units: [
                    { Name: "Goblin Slinger", Total: 5, Alive: 0, Dead: 0 },
                ]},
                { ID: 8, Destroyed: false,
                    Selling: [
                        { ID: "pickaxe_bronze", Price: 23, Amount: 5 },
                        { ID: "bronze_felling_axe", Price: 17, Amount: 8 },
                        { ID: "bronze_fishing_rod", Price: 14, Amount: 3 },
                    ],
                    Buying: [
                        { ID: "stone_rough", Price: 1, Amount: 150 },
                        { ID: "marigold", Price: 2, Amount: 150 },
                    ]
                }
            ],
            Objects: [
                {
                    ID: 382,
                    Type: "Chest",
                    Name: "Goblin Chest",
                    Unlocked: true,
                    Loot: [
                        { ItemID: "gold", Amount: 50 },
                        { ItemID: "shard_valius", Amount: 1 },
                        { ItemID: "iron_key", Amount: 1 },
                    ]
                },
                {
                    ID: 607,
                    Type: "Chest",
                    Name: "Red Chest",
                    Unlocked: false,
                    Loot: [

                    ],
                },
                {
                    ID: 566,
                    Name: "Gorgutz' Hoard",
                    Type: "Chest",
                    Unlocked: false,
                    Loot: [
                    ],
                },
                {
                    ID: 666,
                    Name: "Test Chest",
                    Type: "Chest",
                    Unlocked: true,
                    Loot: [
                        { ItemID: "town_centre_blueprint", Amount: 1 },
                        { ItemID: "apprentice_spellbook", Amount: 1 },
                    ],
                },
                { ID: 554, Name: "Barrier", Type: "Obstacle", Active: true },
                { ID: 555, Name: "Barrier", Type: "Obstacle", Active: true },
                { ID: 562, Name: "Barrier", Type: "Obstacle", Active: true },
                { ID: 563, Name: "Barrier", Type: "Obstacle", Active: true },

                { ID: 725, Name: "Barrier", Type: "Obstacle", Active: true },
                { ID: 726, Name: "Barrier", Type: "Obstacle", Active: true },
                { ID: 727, Name: "Barrier", Type: "Obstacle", Active: true },
                { ID: 728, Name: "Barrier", Type: "Obstacle", Active: true },

                { ID: 722, Name: "Willowvale Discovery Trigger", Type: "Trigger", Active: true },
            ]
        },

        WillowvaleCaverns: {
            Enemies: [],
            Buildings: [],
            Objects: []
        },

        WillowvaleNorth: {
            Enemies: [],
            Buildings: [],
            Objects: [
                {
                    ID: 75,
                    Type: "Obstacle",
                    Name: "Mar'Xanthir Gate",
                    RequiresActivatedSwitches: [70, 72],
                    Active: true,
                },
                {
                    ID: 70,
                    Type: "Switch",
                    Name: "Slot for Moon Coin",
                    RequiresItem: 12,
                    Active: false,
                },
                {
                    ID: 72,
                    Type: "Switch",
                    Name: "Slot for Star Coin",
                    RequiresItem: 19,
                    Active: false,
                }
            ]
        }

    }

};

export default GameData;
