interface GameData {
    Controls: { [key: string]: string | number; };
    Options: { [key: string]: boolean | string | number; };
    Characters: { [key: string]: Character; }
    SoulGems: number;
    CompletedCampaigns: string[];
    ReincarnationTraits: string[];
    LastCharacterPlayed: string | null;
    Scenarios: any;
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
}

interface Activity {
    Type: string;
    Delta: number;
    IsAbility: boolean;
    AbilityID: string | null;
    IsItem: boolean;
    ItemID: string | null;
    TiledID: string | null;
    /** The Tiled object type string used to look up ObjectData, e.g. "Willow Tree" */
    WorldObjectType: string | null;
    IsReloading: boolean;
    IsHarvesting: boolean;
    /** World-space target position for targeted abilities */
    TargetX: number | null;
    TargetY: number | null;
}

interface GameFlags {
    [key: number]: { 
        status: boolean,
        description: string
    }
}
