/** Represents a single saved player character and all of their associated data. 
 * @Name the character's name, chosen at character creation
 * @Race the character's race, chosen at character creation
 * @Difficulty the game's difficulty level, chosen at character creation
 * @Class the character's class, chosen at character creation
 * @Campaign the campaign the character is participating in
 * @Level the character's current level
 * @Experience the character's current experience points
 * @NextLevelExperience the experience points required to reach the next level
 * @AttributePoints the number of unspent attribute points the character has
 */

interface Character {

    // Character creation choices    
    Name: string;
    Race: string;
    Difficulty: string;
    Class: string;
    Campaign: string;
    CharacterType: "Campaign" | "Scenario";

    // Character progression
    NewGamePlus: number;
    Level: number;
    Experience: number;
    NextLevelExperience: number;
    AttributePoints: number;
    CurrentMap: string;
    BackpackTier: number;
    CampaignCompleted: boolean;

    Abilities: { ID: string; Tier: number, Cooldown: number }[];
    Traits: { ID: string; Tier: number }[];
    Proficiencies: { [key: string]: { Level: number; Experience: number; NextLevelExperience: number } };
    Skills: { [key: string]: { Level: number; Experience: number; NextLevelExperience: number } };

    MetNPCs: string[];
    UnlockedBuildings: string[];
    ProgressFlags: number[];
    Stats: Stats;
    CurrentHealth: number;
    CurrentMana: number;

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
    MaxHealth: number;
    MaxMana: number;
    MovementSpeed: number;
    HealthRegeneration: number;
    BlockRating: number;
    EvadeRating: number;
    ManaRegeneration: number;
    CriticalStrikeChance: number;
    CriticalStrikeDamageModifier: number;
    LifeSteal: number;
    Defence_Pierce: number;
    Defence_Impact: number;
    Defence_Slash: number;
    Defence_Fire: number;
    Defence_Cold: number;
    Defence_Acid: number;
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

interface Race {
    Name: string;
    Skin: number;
    Description: string;
    Traits: string[];
    Skins: string[];
    Available: boolean;
    Attributes: {
        [key: string]: number; 
    }
    Items?: {[slot: string]: { 
        ID: string;
        Quantity: number
    }};
}

interface BloodlinePerk {
    name: string;
    description: string;
    effect: string;
    soulgemCost?: number;
}

interface Class {
    Name: string; 
    Description: string; 
    Proficiencies: string[];
    Abilities: string[];
    Traits: string[];
    AttributeBonuses?: { [attribute: string]: number }; 
    Items: {[slot: string]: { 
        ID: string;
        Quantity: number
    }};
    Hotbar: {[slot: string]: { 
        Type: string;
        ID: string;
    }};
    UniqueBuilding: string;
    Available?: boolean; 
}
