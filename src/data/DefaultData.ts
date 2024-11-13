const DefaultData: GameData = {
    CreatedAtTimestamp: Date.now().toString(),
    LastSaveTimestamp: Date.now().toString(),
    CurrentClass: "Evoker",
    CurrentMap: "Willowvale",
    Gold: 0,
    Shards: 0,
    Inventory: [],
    ProgressFlags: [],
    UnlockedBuildings: ["Town Centre"],
    PlayerTowns: {},
    DaytimeHour: 9,
    DaytimeMinute: 0,
    DaytimeDelta: 0,
    X: 6304,
    Y: 5504,
    Equipment: {
        Chest: {},
        Feet: {},
        Hands: {},
        Head: {},
        Legs: {},
        Ring_1: {},
        Ring_2: {},
        Neck: {},
        Item_1: {},
        Item_2: {},
        Item_3: {},
    },
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
    Classes: {
        Evoker: {
            Unlocked: true,
            Level: 1,
            XP: 0,
            Passive_Unlocked: true,
            Ability_1_Unlocked: true,
            Ability_1_Param_1_Level: 1,
            Ability_1_Param_2_Level: 1,
            Ability_1_Param_3_Level: 1,
            Ability_1_Param_Legendary: false,
            Ability_2_Unlocked: false,
            Ability_2_Param_1_Level: 1,
            Ability_2_Param_2_Level: 1,
            Ability_2_Param_3_Level: 1,
            Ability_2_Param_Legendary: false,
            Ability_3_Unlocked: false,
            Ability_3_Param_1_Level: 1,
            Ability_3_Param_2_Level: 1,
            Ability_3_Param_3_Level: 1,
            Ability_3_Param_Legendary: false,
            Ability_4_Unlocked: false,
            Ability_4_Param_1_Level: 1,
            Ability_4_Param_2_Level: 1,
            Ability_4_Param_3_Level: 1,
            Ability_4_Param_Legendary: false
        },
        Godsworn: {
            Unlocked: false,
            Level: 1,
            XP: 0,
            Passive_Unlocked: true,
            Ability_1_Unlocked: true,
            Ability_1_Param_1_Level: 1,
            Ability_1_Param_2_Level: 1,
            Ability_1_Param_3_Level: 1,
            Ability_1_Param_Legendary: false,
            Ability_2_Unlocked: false,
            Ability_2_Param_1_Level: 1,
            Ability_2_Param_2_Level: 1,
            Ability_2_Param_3_Level: 1,
            Ability_2_Param_Legendary: false,
            Ability_3_Unlocked: false,
            Ability_3_Param_1_Level: 1,
            Ability_3_Param_2_Level: 1,
            Ability_3_Param_3_Level: 1,
            Ability_3_Param_Legendary: false,
            Ability_4_Unlocked: false,
            Ability_4_Param_1_Level: 1,
            Ability_4_Param_2_Level: 1,
            Ability_4_Param_3_Level: 1,
            Ability_4_Param_Legendary: false
        },
        Gladiator: {
            Unlocked: false,
            Level: 1,
            XP: 0,
            Passive_Unlocked: true,
            Ability_1_Unlocked: true,
            Ability_1_Param_1_Level: 1,
            Ability_1_Param_2_Level: 1,
            Ability_1_Param_3_Level: 1,
            Ability_1_Param_Legendary: false,
            Ability_2_Unlocked: false,
            Ability_2_Param_1_Level: 1,
            Ability_2_Param_2_Level: 1,
            Ability_2_Param_3_Level: 1,
            Ability_2_Param_Legendary: false,
            Ability_3_Unlocked: false,
            Ability_3_Param_1_Level: 1,
            Ability_3_Param_2_Level: 1,
            Ability_3_Param_3_Level: 1,
            Ability_3_Param_Legendary: false,
            Ability_4_Unlocked: false,
            Ability_4_Param_1_Level: 1,
            Ability_4_Param_2_Level: 1,
            Ability_4_Param_3_Level: 1,
            Ability_4_Param_Legendary: false
        },
        Harbinger: {
            Unlocked: false,
            Level: 1,
            XP: 0,
            Passive_Unlocked: true,
            Ability_1_Unlocked: true,
            Ability_1_Param_1_Level: 1,
            Ability_1_Param_2_Level: 1,
            Ability_1_Param_3_Level: 1,
            Ability_1_Param_Legendary: false,
            Ability_2_Unlocked: false,
            Ability_2_Param_1_Level: 1,
            Ability_2_Param_2_Level: 1,
            Ability_2_Param_3_Level: 1,
            Ability_2_Param_Legendary: false,
            Ability_3_Unlocked: false,
            Ability_3_Param_1_Level: 1,
            Ability_3_Param_2_Level: 1,
            Ability_3_Param_3_Level: 1,
            Ability_3_Param_Legendary: false,
            Ability_4_Unlocked: false,
            Ability_4_Param_1_Level: 1,
            Ability_4_Param_2_Level: 1,
            Ability_4_Param_3_Level: 1,
            Ability_4_Param_Legendary: false
        },
        Operative: {
            Unlocked: false,
            Level: 1,
            XP: 0,
            Passive_Unlocked: true,
            Ability_1_Unlocked: true,
            Ability_1_Param_1_Level: 1,
            Ability_1_Param_2_Level: 1,
            Ability_1_Param_3_Level: 1,
            Ability_1_Param_Legendary: false,
            Ability_2_Unlocked: false,
            Ability_2_Param_1_Level: 1,
            Ability_2_Param_2_Level: 1,
            Ability_2_Param_3_Level: 1,
            Ability_2_Param_Legendary: false,
            Ability_3_Unlocked: false,
            Ability_3_Param_1_Level: 1,
            Ability_3_Param_2_Level: 1,
            Ability_3_Param_3_Level: 1,
            Ability_3_Param_Legendary: false,
            Ability_4_Unlocked: false,
            Ability_4_Param_1_Level: 1,
            Ability_4_Param_2_Level: 1,
            Ability_4_Param_3_Level: 1,
            Ability_4_Param_Legendary: false
        }
    },
    Maps: {
        Willowvale: {
            Buildings: [
                {
                    ID: 87,
                    Units: [
                        { Name: "Goblin Slinger", Total: 3, Remaining: 3, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 300,
                    Units: [
                        { Name: "Goblin Slinger", Total: 5, Remaining: 5, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 396,
                    Units: [
                        { Name: "Goblin Slinger", Total: 5, Remaining: 5, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 381,
                    Units: [
                        { Name: "Goblin Slinger", Total: 5, Remaining: 5, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 429,
                    Units: [
                        { Name: "Goblin Slinger", Total: 5, Remaining: 5, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 426,
                    Units: [
                        { Name: "Goblin Slinger", Total: 5, Remaining: 5, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 425,
                    Units: [
                        { Name: "Goblin Slinger", Total: 5, Remaining: 5, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 424,
                    Units: [
                        { Name: "Goblin Slinger", Total: 5, Remaining: 5, Alive: 0, Dead: 0 },
                    ]
                },
                {
                    ID: 8,
                    Selling: [
                        { ID: 1, Price: 3, Amount: 300 },
                    ],
                    Buying: [
                        { ID: 2, Price: 5, Amount: 150 },
                    ]
                }
            ]
        }
    }

};

export default DefaultData;
