interface ItemData {
    ID: string,
    Name: string,
    Sprite: string,
    Desc: string,
    
    Components?: any;
    Slot?: string;
    Properties?: { [key: string]: any };
    Stackable: boolean;
    StackSize?: number;
    Sound?: string;
    Rarity?: string;
    Moddable?: boolean;
    Category?: string;
    Type?: string;
    ModdableParts?: string[];
    DamageModifier?: number;
    Materials?: { ID: string, Amount: number }[];
    InitialValue?: any;
    Texture?: number;
    Tags?: number[];
    Craftable?: boolean;
    Crafting?: {
        Skill: string;
        SkillXP: number;
        Materials: { ID: string, Amount: number }[];
        Time: number;
        Output: { ID: string, Quantity: number };
    }

}