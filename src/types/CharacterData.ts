/** This interface represents a single saved player character and all of their associated data. */
interface Character {

    // Character creation choices    
    Name: string;
    Race: string;
    Scaling: string;
    Difficulty: string;
    Class: string;
    Campaign: string;

    // Character progression
    Reincarnation: number;
    Level: number;
    Experience: number;
    NextLevelExperience: number;
    AttributePoints: number;
    CurrentMap: string;
    BackpackTier: number;

    Abilities: { ID: string; Tier: number, Cooldown: number }[];
    Traits: { ID: string; Tier: number }[];
    Proficiencies: { [key: string]: { Level: number; Experience: number; NextLevelExperience: number } };
    Skills: { [key: string]: { Level: number; Experience: number; NextLevelExperience: number } };

    MetNPCs: string[];
    UnlockedBuildings: string[];
    ProgressFlags: number[];
    ComputedStats: Stats;
    Stats: Stats;

    // Timestamps
    CreatedAtTimestamp: string;
    LastSaveTimestamp: string;

    // Portrait
    Head: number;
    Hair: number;
    Eyes: number;
    Mouth: number;

    Inventory: {
        [key: string]: InventoryItem | null;
    };
    
    Hotbar: {[slot: string]: { 
        Type: string;
        ID: string;
    }};

    Quests: {
        ID: string;
        ReadyToHandIn: boolean;
        Completed: boolean;
        ObjectiveProgress: {
            Step: number;
            Progress: number;
            Completed: boolean;
            Visible: boolean;
        }[]
    }[];

    NextBuildingCost: {
        Building: string;
        Cost: {
            Resource: number;
            Amount: number;
        }[]
    }[];

    Bestiary: {
        ID: string;
        Progress: number;
    }[];

    Reputation: { 
        Name: string;
        Value: number;
        Towns: string[] 
    }[];

    PlayerTowns: {
        [key: string]: {
            Name: string;
            Buildings: PlayerBuilding[];
            StorageMax: number;
            Storage: { 
                ItemID: number;
                Quantity: number;
            }[]
        }
    };

    DaytimeHour: number;
    DaytimeMinute: number;
    DaytimeDelta: number;

    X: number;
    Y: number;
    
    FoundLoreEntries: string[];
    DialogueFlags: string[];
    CompletedMilestones: number[];
    WorldData: {[key: string]: WorldData};
}

// Stat block for holding base and computed stats
interface Stats {
    CurrentHealth: number;
    CurrentMana: number;
    MaxHealth: number;
    MaxMana: number;
    MovementSpeed: number;
    HealthRegeneration: number;
    ManaRegeneration: number;
    CriticalStrikeChance: number;
    CriticalStrikeDamageModifier: number;
    LifeSteal: number;
    Defence_Pierce: number;
    Defence_Impact: number;
    Defence_Slash: number;
    Defence_Fire: number;
    Defence_Cold: number;
    Defence_Lightning: number;
    Defence_Poison: number;
    Defence_Arcane: number;
    Defence_True: number;
    Defence_Bleed: number;
    Defence_Radiant: number;
    Defence_Corruption: number;
    Defence_Sonic: number;
    Fortitude: number;
    Versatility: number;
    Vigor: number;
    Expertise: number;
    Arcana: number;
    Personality: number;
    Fortune: number;
    Grit: number;
}