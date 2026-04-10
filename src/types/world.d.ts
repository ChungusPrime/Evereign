interface ObjectDefinition {
    x: number;
    y: number;
    width: number;
    height: number;
    flippedHorizontal?: boolean;
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
}
