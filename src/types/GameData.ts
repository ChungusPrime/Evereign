/** This interface represents a save data file */
interface GameData {
    CreatedAtTimestamp: string;
    LastSaveTimestamp: string;
    CurrentMap: string;
    Name: string;
    Level: number;
    Race: string;
    Abilities: { ID: string; Tier: number }[];
    Traits: { ID: string; Tier: number }[];
    Scaling: string;
    Difficulty: string;
    Class: string;
    Campaign: string;
    CurrentHealth: number;
    CurrentMana: number;
    MetNPCs: string[];
    QuickSlots: {
        1: string | null;
        2: string | null;
        3: string | null;
        4: string | null;
        5: string | null;
    };
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
    Inventory: any[];
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
    Equipment: Equipment;
    Skills: Skills;
    Maps: MapData;
}