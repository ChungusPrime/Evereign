interface ObjectDefinition {
    x: number;
    y: number;
    width: number;
    height: number;
    flippedHorizontal?: boolean;
}

/** Defines a generic object in the world, which can be extended with specific properties for different types of objects (e.g., resources, interactables, obstacles).
 * @Name the name of the object, used for display and reference
 * @Description a brief description of the object, shown in tooltips and other UI elements
 * @Category the category of the object (e.g., "Trees", "Rocks", "Buildings"), used for organization and filtering
 * @HarvestAmount the amount of resources obtained when harvesting the object
 * @HarvestItem the specific item obtained from harvesting the object
 */
interface ObjectData {
    Name: string;
    Description: string;
    Category: string;
    BaseHarvestAmount: number;
    HarvestItem: string;
    HarvestTime: number;
    HarvestSound: string;
    HarvestRequiresToolType: string;
    HarvestExperienceType: string;
    HarvestExperienceValue: number;
    /** Full label used as the activity type string, e.g. "Cutting Willow Tree" */
    ActivityLabel: string;
    /** Floating text message shown on each successful harvest */
    FloatMessage: string;
    /** Texture key for the floating text icon */
    FloatSprite: string;
    /** Frame number for the floating text icon */
    FloatFrame: number;
    /** Whether the object should be depleted after a single harvest */
    DepletesOnHarvest: boolean;
}

interface Scenario {
    Name: string;
    Description: string;
    StartingPosition: { X: number, Y: number };
    MapKey: string;
    DaytimeDelta: number;
    DaytimeHour: number;
    DaytimeMinute: number;
    WorldData: WorldData;
    CharacterName?: string;
    CharacterRace?: Races;
    CharacterClass?: Classes;
}

interface WorldData {
    [key: string]: any;
    InitialData?: {
        Alive?: boolean;
        Health?: number;
        PeopleAvailableForHire?: {
            QuantityMax: number;
            Types: string[];
        };
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
        Units?: {
            Name: string;
            Total: number;
            Alive: number;
            Dead: number;
        }[];
        Unlocked?: boolean;
        Loot?: LootItem[];
        Active?: boolean;
    };
    DepletedHarvestables?: string[];
    Alive?: boolean;
    Health?: number;
    Active?: boolean;
    Destroyed?: boolean;
    Modifiers?: string[];
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
}

interface MapData {
    [key: string]: Region;
}

interface Region {
    Buildings: IBuilding[];
    Objects: IObject[];
    Enemies: IEnemy[];
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

interface IObject {
    ID: number;
    Type: string;
    Loot?: LootItem[];
    RequiresItem?: number;
    RequiresActivatedSwitches?: number[];
    Unlocked?: boolean;
    Active?: boolean;
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
    Level?: number;
    Modifiers?: string[];
}
