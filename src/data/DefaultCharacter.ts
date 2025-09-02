const DefaultCharacter: Character = {

    CreatedAtTimestamp: Date.now().toString(),
    LastSaveTimestamp: Date.now().toString(),
    Reincarnation: 1,
    X: 6281,
    Y: 5500,
    CurrentMap: "Willowvale",
    Campaign: "The Midnight Accord",
    WorldData: {},
    CurrentHealth: 50,
    MaxHealth: 50,
    CurrentMana: 50,
    MaxMana: 50,
    Name: "Chungus",
    Level: 1,
    Race: "Human",
    Class: "Operative",
    Scaling: "Fixed",
    Difficulty: "Standard",

    // Portrait customisation
    Head: 1,
    Hair: 1,
    Eyes: 1,
    Mouth: 1,

    // Attributes
    AttributePoints: 0,
    Fortitude: 10,
    Versatility: 10,
    Vigor: 10,
    Expertise: 10,
    Personality: 10,
    Fortune: 10,
    Grit: 10,

    Traits: [],
    Abilities: [],
    
    BackpackTier: 1,
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

    DaytimeHour: 0,
    DaytimeMinute: 0,
    DaytimeDelta: 0,

    Skills: {
        Fishing: 0,
        Forestry: 0,
        Mining: 0,
        Botany: 0,
        Alchemy: 0,
        Cooking: 0,
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