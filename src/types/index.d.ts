declare const PACKAGE_VERSION: string;

declare module "*.jpg" {
    const path: string;
    export default path;
}

declare module "*.png" {
    const path: string;
    export default path;
}

declare module "*.json" {
    const path: any;
    export default path;
}

declare module "*.mp3" {
    const path: any;
    export default path;
}

declare module 'phaser-navmesh';

interface GameData {
    Controls: {
        [key: string]: string;
    };

    Options: {
        [key: string]: boolean | string | number;
    };

    Characters: {
        [key: string]: Character;
    }
}

interface Abilities {
    [key: string]: {
        Description: string,
        Cooldown: number,
        Damage: AbilityDamageArray,
        CooldownMax: number
    }
}

interface EffectData {
    ID: string;
    Name: string;
    Description: string;
    Duration: number;
    TickRate: number;
    Intensity: number;
}

interface AbilityDamageArray {
    [key: number]: {
        Type: string,
        Min: number,
        Max: number,
        ApplyDebuff?: string
    }[]
}

interface RaceData {
    Name: string;
    Description: string;
    RacialTrait: string;
    Attributes: {
        [key: string]: number; 
    }
}

interface LoreEntry {
    ID: string;
    Title: string;
    Description: string;
    Author?: string; // Optional author of the lore entry
    Tags?: string[]; // Optional tags for categorization
    LoreType: "History" | "Magic" | "Mythology" | "Geography" | "Culture"; // Type of lore entry
    DateAdded: Date; // Date when the lore entry was added
    Text: string; // Main content of the lore entry
}

interface ClassData {

    // Name of the class
    Name: string; 

    // Description of the class
    Description: string; 

    // Starting passive traits
    Traits: string[]; 

    // Starting active abilities
    Abilities: string[]; 

    // Starting attribute bonuses
    AttributeBonuses?: { [attribute: string]: number }; 

    // Starting items
    Items: {[slot: string]: { 
        ID: string;
        Quantity: number
    }};

    Hotbar: {[slot: string]: { 
        Type: string;
        ID: string;
    }};

    // Unique building associated with the class
    UniqueBuilding: string;

    // Whether the class is available during character creation or not
    Available?: boolean; 
}

interface StaticBuildingData { 
    ID: string;
    Name: string;
    Type: string;
    Level: number;
    Buying?: any;
    Selling?: any;
    PeopleAvailableForHire?: any;
    OnDestroyDisableObstacle?: number[];
    Person?: string;
}

interface DialogueData {
    [key: string]: {
        FirstTimeGreeting?: string;
        NormalGreeting?: string;
        Subjects: {
            [key: string]: {
                Text: string;
                Hidden?: boolean;
                CompleteQuest?: string;
                QuestProgressID?: string;
                QuestProgressStep?: number;
                HideIfOnQuest?: string;
                RequiresQuest?: string;
                Responses?: { 
                    Text: string;
                    Flag: string;
                    EndDialogue?: boolean;
                    GrantQuest?: string;
                    GoToSubject?: string;
                    GoToMain?: boolean;
                    DestroyObstacles?: number[];
                }[];
                OtherPerson?: string;
            }
        }
    }
}

interface Job {
    Name: string,
    LevelRequirement: number
}

interface BuildingData {
    Spritesheet: string;
    Sprite: string;
    ID: string;
    Name: string;
    Size: { Width: number, Height: number };
    PlotSize?: { Width: number, Height: number };
    Desc: string;
    BaseHousingSlots?: number;
    BaseStorageSlots?: number;
    Tiers: {
        [key: number]: {
            Width: number;
            Height: number;
            BaseResourceCost: {
                Resource: number;
                Amount: number;
            }[]
        }
    }
    BaseCost: {
        Tier: number;
        Resource: number;
        Amount: number;
    }[];
    RequiresMilestone: number | boolean;
    AggroZone: boolean;
}

interface QuestData {
    // The ID of the quest
    ID: string;

    // The name of the quest
    Name: string;

    // The description of the quest
    Description: string;

    // An array of rewards granted for completing the quest
    Rewards?: {ID: string, Quantity: number }[];

    // An array of objectives for the quest
    Objectives: { Text: string, ProgressNeeded: number }[];

    // The data added to the player's quest log when the quest is accepted
    IntitialData?: {
        ReadyToHandIn: boolean;
        Completed: boolean;
        ObjectiveProgress: {
            Step: number;
            Progress: number;
            Completed: boolean;
            Visible: boolean;
        }[];
    };
    
}

interface ResourceData {
    [key: number]: {
        ID: number;
        name: string;
        sprite: string;
    }
}

interface Resource {
    ID: number;
    quantity: number;
}

interface Lore {
    key: string;
    text: string;
}

interface GameFlags {
    [key: number]: { 
        status: boolean,
        description: string
    }
}

interface _Map {
    MapName: string;
    Resources: Array<string>,
    Towns: any,
    Buildings?: Array<any>,
    Enemies?: Array<{ ID: number, OnDestroyAddFlag: number }>,
    Objects?: Array<{ ID: number, Type: string, Loot: { ItemID: number, Amount: number }[], RequiresItem?: number, Locked: Boolean }>,
    Zones: Array<any>,
    Type: string
}

interface Activity {
    Type: string;
    Delta: number;
}

interface BestiaryData {
    ID: string;
    Name: string;
    Description: string;
    Tiers: {
        [key: number]: {
            Description: string;
        }
    }
}

interface Campaign {
    ID: string;
    Name: string;
    Description: string;
    WorldData: {[key: string]: WorldData};
    //DefaultWorldData: any;
    StartingMap?: string,
    StartingX?: number,
    StartingY?: number,
    WorldMapInformation?: {[key: string]: {
        Name: string;
        Description: string;
        Image: string;
        Size: { Width: number, Height: number };
        MapName: string;
        Type: string;
        Resources?: Array<string>;
        Music?: string;
    }};
}

interface CurrencyData {
    ID: number,
    Name: string,
    Sprite: string,
}

interface EquipmentSlot {
    [key: string]: number | null;
}

interface HelpText {
    [section: string]: string;
}

interface Skill {
    Level: number;
    XP: number;
}

interface Skills {
    [key: string]: number;
}

interface MapData {
    [key: string]: Region;
}

interface Region {
    Buildings: IBuilding[];
    Objects: IObject[];
    Enemies: IEnemy[];
}

interface IObject {
    ID: number;
    Type: string;
    Loot?: LootItem[];
    RequiresItem?: number;
    RequiresActivatedSwitches?: number[];
    Unlocked?: boolean;
    Active?: boolean;
}

interface LootItem {
    ItemID?: string;
    Amount: number;
}

interface IEnemy {
    ID?: number;
    Alive?: boolean;
}

interface IBuilding {
    ID: number;
    Destroyed: boolean;
    Units?: IUnit[];
    Selling?: { ID: string, Price: number, Amount: number }[];
    Buying?: { ID: string, Price: number, Amount: number }[];
}

interface IUnit {
    Name: string;
    Total: number
    Alive: number;
    Dead: number;
}