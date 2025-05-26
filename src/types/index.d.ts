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
declare module 'phaser3_gui_inspector';

interface Abilities {
    [key: string]: {
        Description: string,
        Cooldown: number,
        Damage: AbilityDamageArray,
        CooldownMax: number
    }
}

interface RaceData {

    // Name of the feat
    name: string;

    // Description of the feat
    description: string;

    // Unique racial trait
    starting_trait: string;

    // Base race attributes and their values
    base_attributes: {
        [key: string]: number; 
    }

    // Base race attributes and increased by these per level
    attributes_per_level: {
        [key: string]: number; 
    }
    
}

interface AbilityDamageArray {
    [key: number]: {
        Type: string,
        Min: number,
        Max: number,
        ApplyDebuff?: string
    }[]
}

interface StaticMapData {
    MapName: string;
    Resources: Array<string>;
    Towns?: any;
    Buildings?: StaticBuildingData[];
    Enemies?: Array<{ ID: number, OnDestroyAddFlag: number }>;
    Objects?: Array<{ ID: number, Type: string, Loot?: { ItemID: string, Amount: number }[], RequiresItem?: string, Unlocked?: boolean, RequiresActivatedSwitches?: number[] }>;
    Zones: { 
        ID: number;
        Name: string;
        Type: string;
        DestinationX?: number;
        DestinationY?: number;
        TransitionToMap?: string;
        QuestProgressID?: string;
        QuestProgressStep?: number;
        QuestUnlockStep?: number;
    }[];
    Type: string;
    Music: string;
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

interface ClassData {
    [key: string]: { 
        unlocked: boolean,
		walk_animation: string,
		classIconSprite: string,
        stats?: { baseHealth: number, healthPerLevel: number, baseMana: number, manaPerLevel: number },
        abilities?: AbilityData
    }
}

interface AbilityData {
    [key: string]: {
        name: string;
        resource_cost: number;
        type?: string;
        charge_time?: number;
        cooldown?: number;
        sprite: string;
        description: string;
        parameters?: any;
        unlock_cost?: number;
    }
}

interface Lore {
    key: string;
    text: string;
}

interface SaveData {
    CurrentMap: string;
    X: number;
    Y: number;
    Gold: number;
    CreatedAtTimestamp: string;
    LastTimestamp: string;
    Resources: ResourceData;
    Flags: Array<number>;
    Activity: {
        delta: number;
        type: string | null;
    },
    Character: any;
    MapData: any;
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

interface GameDataInterface {
    Controls: {
        Controls_Interact: string;
        Controls_Use_Hotbar_1: string;
        Controls_Use_Hotbar_2: string;
        Controls_Use_Hotbar_3: string;
        Controls_Use_Hotbar_4: string;
        Controls_Use_Hotbar_5: string;
        Controls_Weapon_Attack: string;
        Controls_Use_Ability_1: string;
        Controls_Use_Ability_2: string;
        Controls_Use_Ability_3: string;
        Controls_Use_Ability_4: string;
        Controls_Use_Ability_5: string;
        Controls_Move_Up: string;
        Controls_Move_Down: string;
        Controls_Move_Left: string;
        Controls_Move_Right: string;
    };
    Characters: {
        [key: string]: GameData;
    }
}

interface ItemData {
    ID: string,
    Name: string,
    Sprite: string,
    Desc: string,
    Craftable?: boolean;
    Components?: any;
    Slot?: string;
    Properties?: any;
    Stackable: boolean;
    StackSize?: number;
    Sound?: string;
    Moddable?: boolean;
    Category?: string;
    Type?: string;
    ModdableParts?: string[];
    DamageModifier?: number;
    Materials?: { ID: string, Amount: number }[];
}

interface CurrencyData {
    ID: number,
    Name: string,
    Sprite: string,
}

interface EquipmentSlot {
    [key: string]: number | null;
}

interface Equipment {
    Chest: EquipmentSlot;
    Feet: EquipmentSlot;
    Hands: EquipmentSlot;
    Head: EquipmentSlot;
    Legs: EquipmentSlot;
    Ring_1: EquipmentSlot;
    Ring_2: EquipmentSlot;
    Neck: EquipmentSlot;
}

interface Skill {
    Level: number;
    XP: number;
    XPNext: number;
}

interface Skills {
    [key: string]: Skill;
}

interface Class {
    Unlocked: boolean;
    Level: number;
    XP: number;
    Passive_Unlocked: boolean;
    Ability_1_Unlocked: boolean;
    Ability_1_Param_1_Level: number;
    Ability_1_Param_2_Level: number;
    Ability_1_Param_3_Level: number;
    Ability_1_Param_Legendary: boolean;
    Ability_2_Unlocked: boolean;
    Ability_2_Param_1_Level: number;
    Ability_2_Param_2_Level: number;
    Ability_2_Param_3_Level: number;
    Ability_2_Param_Legendary: boolean;
    Ability_3_Unlocked: boolean;
    Ability_3_Param_1_Level: number;
    Ability_3_Param_2_Level: number;
    Ability_3_Param_3_Level: number;
    Ability_3_Param_Legendary: boolean;
    Ability_4_Unlocked: boolean;
    Ability_4_Param_1_Level: number;
    Ability_4_Param_2_Level: number;
    Ability_4_Param_3_Level: number;
    Ability_4_Param_Legendary: boolean;
}

interface Classes {
    [key: string]: Class;
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
    Name: string;
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