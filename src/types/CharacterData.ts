/** This interface represents a save data file */
interface Character {
    CreatedAtTimestamp: string;
    LastSaveTimestamp: string;
    Reincarnation: number;
    CurrentMap: string;
    Name: string;
    Level: number;
    Head: number;
    Hair: number;
    Eyes: number;
    Mouth: number;
    Race: string;
    AttributePoints: number;
    BackpackTier: number;
    Abilities: { ID: string; Tier: number, Cooldown: number }[];
    Traits: { ID: string; Tier: number }[];
    Scaling: string;
    Difficulty: string;
    Class: string;
    Campaign: string;
    MetNPCs: string[];

    // Stats and attributes
    Fortitude: number;
    Arcana: number;
    Versatility: number;
    Vigor: number;
    Expertise: number;
    Personality: number;
    Fortune: number;
    Grit: number;
    MovementSpeed: number;
    CriticalStrikeChance: number;
    EvadeChance: number;
    BlockChance: number;
    CriticalStrikeDamageModifier: number;
    LifeSteal: number;
    HealthRegeneration: number;
    ManaRegeneration: number;
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
    CurrentHealth: number;
    MaxHealth: number;
    CurrentMana: number;
    MaxMana: number;
    Experience: number;
    NextLevelExperience: number;
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

    UnlockedBuildings: string[];
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
    ProgressFlags: number[];
    Reputation: { 
        Name: string;
        Value: number;
        Towns: string[] 
    }[];
    PlayerTowns: {
        [key: string]: {
            Name: string;
            Buildings: {
                type: string; 
                x: number;
                y: number;
                area: string;
                level: number 
            }[];
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
    Skills: Skills;
    WorldData: {[key: string]: WorldData};
}