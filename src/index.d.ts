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

interface BuildingData {
    Name: string;
    Size: number;
    Cost: {
        Resource: number;
        Amount: number
    }[];
    Image?: string;
    RequiresMilestone: number | boolean;
}

interface MilestoneItem {
    ID: number;
    Name: string;
    Description: string,
    Unlocked: boolean
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
        stats?: any,
        abilities?: AbilityData
    }
}

interface Lore {
    key: string;
    text: string;
}

interface AbilityData {
    [key: string]: {
        name: string;
        resource: string;
        resource_cost: number;
        type?: string;
        cooldown?: number;
        sprite: string;
        description: string;
        parameters?: any;
        unlock_cost?: number;
    }
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
    Objects?: Array<{ ID: number, OnDestroyAddFlag: number }>,
    Zones: Array<any>,
    Type: string
}

interface Activity {
    Type: string;
    Delta: number;
}

interface ItemData {
    ID: number,
    Name: string,
    Sprite: string,
    Desc: string,
    Components?: any;
    Slot?: string;
    Properties?: any;
    Category: string;
}

interface EquipmentSlot {
    [key: string]: any; // Since equipment slots are empty objects initially
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
    Item_1: EquipmentSlot;
    Item_2: EquipmentSlot;
    Item_3: EquipmentSlot;
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

interface GameData {
    CreatedAtTimestamp: string;
    LastSaveTimestamp: string;
    CurrentClass: string;
    CurrentMap: string;
    UnlockedBuildings: string[];
    Gold: number;
    Shards: number;
    Inventory: any[];
    ProgressFlags: number[];
    PlayerTowns: any;
    DaytimeHour: number;
    DaytimeMinute: number;
    DaytimeDelta: number;
    X: number;
    Y: number;
    Equipment: Equipment;
    Skills: Skills;
    Classes: Classes;
    Maps: MapData;
}

interface MapData {
    [key: string]: Region;
}

interface Region {
    Buildings: IBuilding[];
}

interface IBuilding {
    ID: number;
    Units?: IUnit[];
    Selling?: any;
    Buying?: any;
}

interface IUnit {
    Name: string;
    Total: number
    Remaining: number;
    Alive: number;
    Dead: number;
}

