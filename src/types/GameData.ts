/** This interface represents a save data file */
interface GameData {
    CreatedAtTimestamp: string;
    LastSaveTimestamp: string;
    CurrentMap: string;
    Name: string;
    Level: number;
    Race: string;
    Abilities: string[];
    Scaling: string;
    Difficulty: string;
    Traits: string[];
    Class: string;
    Campaign: string;
    CurrentHealth: number;
    CurrentMana: number;
    MetNPCs: string[];
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