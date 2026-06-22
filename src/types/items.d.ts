interface InventoryItem {
    ID: string;
    Quantity: number;
    CurrentMagazine?: number;
    Ammo?: string;
    Mods?: { [key: string]: string | null };
    Cooldown?: number;
}

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

    /** Time in ms to use this item (shows a progress bar). If absent, use is instant. */
    UseTime?: number;
    /** Effects applied when this item is used from the hotbar or inventory */
    OnUse?: OnUseEffect | OnUseEffect[];

    Tags?: number[];

}

interface LootItem {
    ItemID?: string;
    Amount: number;
}

interface Tag {
    [key: number]: string;
}

interface EquipmentSlot {
    [key: string]: number | null;
}
