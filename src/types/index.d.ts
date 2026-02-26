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

interface Proficiency {
    Abilities: Ability[];
    Traits: Trait[];
    Name: string;
    Description: string;
    ID: string;
}

interface Ability {
    ID: string;
    Name: string;
    Description: string;
    mana_cost: number;
    sprite: string;
    type: string;
    cooldown?: number;
    charge_time?: number;
    requires_weapon_equipped?: boolean;
    weapon_type?: string;
    apply_effect?: string;
    apply_effect_duration?: number;
    requires_trait?: string;
}

interface Trait {
    ID: string;
    Name: string;
    Description: string;
    RequiredTraits?: string[];
    RequiredAttributes?: {
        Fortitude?: number;
        Versatility?: number;
        Vigor?: number;
        Expertise?: number;
        Personality?: number;
        Fortune?: number;
        Grit?: number;
    };
}

interface Traits {
    [key: string]: {
        Name: string;
        Description: string;
        RequiredTraits?: string[];
        RequiredAttributes?: {
            Fortitude?: number;
            Versatility?: number;
            Vigor?: number;
            Expertise?: number;
            Personality?: number;
            Fortune?: number;
            Grit?: number;
        };
    };
}

interface Skill {
    Name: string;
    Description?: string;
    Levels?: {
        [level: number]: {
            Unlock?: string | string[] | boolean;
        };
    }
}

interface ObjectDefinition {
    x: number;
    y: number;
    width: number;
    height: number;
    flippedHorizontal?: boolean;
}

type PlayerBuilding = {
    name: string;
    type: string; 
    x: number;
    y: number;
    area: string;
    level: number;
    id: string;
}

interface GameData {
    Controls: {
        [key: string]: string | number;
    };

    Options: {
        [key: string]: boolean | string | number;
    };

    Characters: {
        [key: string]: Character;
    }

    SoulGems: number;

    CompletedCampaigns: string[];

    ReincarnationTraits: string[];

    LastCharacterPlayed: string | null;
}

interface InventoryItem {
    ID: string;
    Quantity: number;
    CurrentMagazine?: number;
    Ammo?: string;
    Mods?: { [key: string]: string | null };
    Cooldown?: number;
}

interface CharacterAbilities {
    [key: string]: {
        Cooldown?: number,
        Damage?: AbilityDamageArray,
        CooldownMax?: number
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

    // Greeting text for the first time meeting the NPC
    FirstTimeGreeting?: string;

    // Standard greeting text for subsequent interactions
    NormalGreeting?: string;

    // Dialogue subjects available with the NPC
    Subjects: {
        [key: string]: {

            Text: string;
            Hidden?: boolean;
            
            // The ID of the quest to progress
            QuestProgressID?: string;

            // The specific objective of the quest to add progress to
            QuestProgressStep?: number;

            // The ID of the quest to complete
            CompleteQuest?: string;

            RequiresFlag?: string;

            Locked?: boolean;

            // Dont show dialogue if the player is on a specific quest
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
    BuildingCost: {
        [key: number]: {
            ItemID: string;
            Quantity: number;
        }[];
    };
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
        ID: string;
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
    Available: boolean;
    Name: string;
    Description: string;
    WorldData: {[key: string]: WorldData};
    //DefaultWorldData: any;
    StartingMap?: string,
    StartingX?: number,
    StartingY?: number,
    StartingHour?: number,
    StartingMinute?: number,
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

interface Tag {
    [key: number]: string;
}

interface EquipmentSlot {
    [key: string]: number | null;
}

interface HelpText {
    [section: string]: string;
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