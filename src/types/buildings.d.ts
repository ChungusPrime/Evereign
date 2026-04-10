type PlayerBuilding = {
    name: string;
    type: string; 
    x: number;
    y: number;
    area: string;
    level: number;
    id: string;
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
