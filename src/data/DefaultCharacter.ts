const DefaultCharacter: Character = {

    CreatedAtTimestamp: Date.now().toString(),
    LastSaveTimestamp: Date.now().toString(),
    Reincarnation: 1,
    X: 6281,
    Y: 5500,
    CurrentMap: "Tutors Island",
    Campaign: "Tutorial",
    WorldData: {},
    PlayerTowns: {},
    Name: "Bithmas",
    Race: "Human",
    Class: "Agent",
    Scaling: "Fixed",
    Difficulty: "Standard",

    Level: 1,
    Experience: 0,
    NextLevelExperience: 1000,
    AttributePoints: 0,

    // Portrait customisation
    Head: 1,
    Hair: 1,
    Eyes: 1,
    Mouth: 1,

    Proficiencies: {},

    Skills: {
        Fishing: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Forestry: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Mining: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Botany: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Alchemy: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Cooking: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Security: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Smithing: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Tailoring: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Engineering: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Enchanting: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Carpentry: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Trading: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Diplomacy: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Stealth: { Level: 1, Experience: 0, NextLevelExperience: 100 },
        Survival: { Level: 1, Experience: 0, NextLevelExperience: 100 },
    },

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

    DaytimeHour: 0,
    DaytimeMinute: 0,
    DaytimeDelta: 0,

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

    ComputedStats: {
        CurrentHealth: 20,
        CurrentMana: 20,
        MaxHealth: 20,
        MaxMana: 20,
        MovementSpeed: 80,
        HealthRegeneration: 0,
        ManaRegeneration: 0,
        CriticalStrikeChance: 5,
        CriticalStrikeDamageModifier: 2.0,
        LifeSteal: 0,
        Defence_Pierce: 0,
        Defence_Impact: 0,
        Defence_Slash: 0,
        Defence_Fire: 0,
        Defence_Cold: 0,
        Defence_Lightning: 0,
        Defence_Poison: 0,
        Defence_Arcane: 0,
        Defence_True: 0,
        Defence_Bleed: 0,
        Defence_Radiant: 0,
        Defence_Corruption: 0,
        Defence_Sonic: 0,
        Fortitude: 0,
        Versatility: 0,
        Vigor: 0,
        Expertise: 0,
        Arcana: 0,
        Personality: 0,
        Fortune: 0,
        Grit: 0,
    },

    Stats: {
        CurrentHealth: 20,
        CurrentMana: 20,
        MaxHealth: 20,
        MaxMana: 20,
        MovementSpeed: 80,
        HealthRegeneration: 0,
        ManaRegeneration: 0,
        CriticalStrikeChance: 5,
        CriticalStrikeDamageModifier: 2.0,
        LifeSteal: 0,
        Defence_Pierce: 0,
        Defence_Impact: 0,
        Defence_Slash: 0,
        Defence_Fire: 0,
        Defence_Cold: 0,
        Defence_Lightning: 0,
        Defence_Poison: 0,
        Defence_Arcane: 0,
        Defence_True: 0,
        Defence_Bleed: 0,
        Defence_Radiant: 0,
        Defence_Corruption: 0,
        Defence_Sonic: 0,
        Fortitude: 0,
        Versatility: 0,
        Vigor: 0,
        Expertise: 0,
        Arcana: 0,
        Personality: 0,
        Fortune: 0,
        Grit: 0,
    },

};

export default DefaultCharacter;