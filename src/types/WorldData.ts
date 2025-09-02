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