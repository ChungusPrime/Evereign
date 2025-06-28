const DefaultCharacter: Character = {

    CreatedAtTimestamp: Date.now().toString(),
    LastSaveTimestamp: Date.now().toString(),

    X: 6281,
    Y: 5500,

    Name: "Adventurer",
    Level: 1,
    Race: "Human",
    CurrentMap: "Willowvale",
    Class: "Evoker",
    Scaling: "fixed",
    Difficulty: "Normal",

    // Attributes
    Fortitude: 10,
    Versatility: 10,
    Vigor: 10,
    Expertise: 10,
    Personality: 10,
    Fortune: 10,
    Grit: 10,

    Traits: [],
    Abilities: [],
    
    Inventory: {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
        "10": null,
        "11": null,
        "12": null,
        "13": null,
        "14": null,
        "15": null,
        "16": null,
        "17": null,
        "18": null,
        "19": null,
        "20": null,
        "Equipment_Head": null,
        "Equipment_Chest": null,
        "Equipment_Hands": null,
        "Equipment_Legs": null,
        "Equipment_Feet": null,
        "Equipment_Ring_1": null,
        "Equipment_Ring_2": null,
        "Equipment_Neck": null,
        "Equipment_MainHand": null,
        "Equipment_OffHand": null,
        "Equipment_Back": null
    },
    
    Hotbar: {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
        "10": null
    },
    
    Campaign: "The Midnight Accord",
    WorldData: {},

    CurrentHealth: 50,
    MaxHealth: 50,
    CurrentMana: 50,
    MaxMana: 50,

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

};

export default DefaultCharacter;