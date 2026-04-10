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

interface Activity {
    Type: string;
    Delta: number;
    IsAbility: boolean;
    AbilityID: string | null;
}

interface GameFlags {
    [key: number]: { 
        status: boolean,
        description: string
    }
}
