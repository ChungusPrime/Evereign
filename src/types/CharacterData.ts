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
    CurrentHealth: number;
    MaxHealth: number;
    CurrentMana: number;
    MaxMana: number;
    MetNPCs: string[];
    Fortitude: number;
    Versatility: number;
    Vigor: number;
    Expertise: number;
    Personality: number;
    Fortune: number;
    Grit: number;
    Inventory: {
        [key: string]: {
            ID: string;
            Quantity: number;
            CurrentMagazine?: number;
            Ammo?: string;
            Mods?: { [key: string]: string | null };
        } | null;
    };
    Hotbar: {
        [key: string]: {
            ID: string;
            Item?: string;
            Ability?: string;
        } | null;
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