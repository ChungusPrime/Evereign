interface ItemData {
    ID: string,
    Name: string,
    Sprite: string,
    Desc: string,
    Craftable?: boolean;
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
    CraftingOutput?: { ID: string, Quantity: number };
    CraftingTime?: number;
    CraftingSkill?: string;
    CraftingSkillLevel?: number;
    CraftingSkillXP?: number;
}