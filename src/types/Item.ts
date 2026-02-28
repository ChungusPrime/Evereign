interface ItemData {

    ID: string,
    Name: string,
    Sprite: string,
    Texture?: number;

    Desc: string,

    Components?: any;
    Slot?: string;

    Properties?: { [key: string]: any };

    Stackable: boolean;
    StackSize?: number;

    Craftable?: boolean;
    Crafting?: {
        Skill?: string;
        SkillXP?: number;
        Materials?: { ID: string, Amount: number }[];
        Time?: number;
        Output?: { ID: string, Quantity: number };
    }

    Moddable?: boolean;
    ModdableParts?: string[];

    Sound?: string;
    Rarity?: string;
    
    Category?: string;
    Type?: string;
    
    DamageModifier?: number;

    InitialValue?: any;
    
    Tags?: number[];

}