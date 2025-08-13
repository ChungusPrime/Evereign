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
        Interact: string;
        Use_Hotbar_1: string;
        Use_Hotbar_2: string;
        Use_Hotbar_3: string;
        Use_Hotbar_4: string;
        Use_Hotbar_5: string;
        Use_Hotbar_6: string;
        Use_Hotbar_7: string;
        Use_Hotbar_8: string;
        Use_Hotbar_9: string;
        Use_Hotbar_10: string;
        Weapon_Attack: string;
        Use_Offhand: string;
        Move_Up: string;
        Move_Down: string;
        Move_Left: string;
        Move_Right: string;
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
    ID: number;
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
    ID: number;
    Name: string;
    Size: number;
    PlotSize?: { Width: number, Height: number };
    Desc: string;
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
}

interface QuestData {
    ID: string;
    Name: string;
    Description: string,
    Rewards?: string[],
    Objectives: { Text: string, ProgressNeeded: number }[]
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
    DefaultWorldData: {[key: string]: WorldData};
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

interface WorldData {
    [key: string]: {
        Alive?: boolean;
        Health?: number;
        Active?: boolean;
        Destroyed?: boolean;
        Name?: string;
        Level?: number;
        Unlocked?: boolean;
        Units?: IUnit[];
        QuestProgressID?: string;
        QuestProgressStep?: number;
        Person?: string;
        QuestUnlockStep?: number;
        Selling?: {
            ID: string;
            QuantityMin?: number;
            QuantityMax?: number;
            CurrentQuantity?: number;
            PriceMin?: number;
            PriceMax?: number;
            CurrentPrice?: number;
            Price?: number;
            Amount?: number;
        }[];
        Buying?: {
            ID: string;
            QuantityMin?: number;
            QuantityMax?: number;
            CurrentQuantity?: number;
            PriceMin?: number;
            PriceMax?: number;
            CurrentPrice?: number;
            Price?: number;
            Amount?: number;
        }[];
        RequiresItem?: string;
        PeopleAvailableForHire?: {
            QuantityMax: number;
            Types: string[];
        }
        RequiresActivatedSwitches?: number[];
        OnDestroyDisableObstacle?: number[];
        ID?: number;
        Type?: string;
        Loot?: LootItem[];
        TransitionToMap?: string;
        DestinationX?: number;
        DestinationY?: number;
    };
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