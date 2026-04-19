interface ResourceData {
    [key: number]: {
        ID: number;
        name: string;
        sprite: string;
    }
}

interface Resource {
    ID: number;
    quantity: number;
}

interface CurrencyData {
    ID: number,
    Name: string,
    Sprite: string,
}

interface Job {
    Name: string,
    LevelRequirement: number
}

interface Lore {
    key: string;
    text: string;
}

interface LoreEntry {
    ID: string;
    Title: string;
    Description: string;
    Author?: string; // Optional author of the lore entry
    Tags?: string[]; // Optional tags for categorization
    LoreType: "History" | "Magic" | "Mythology" | "Geography" | "Culture"; // Type of lore entry
    DateAdded: Date; // Date when the lore entry was added
    Text: string; // Main content of the lore entry
}

interface BestiaryData {
    ID: string;
    Name: string;
    Description: string;
    Tiers: {
        [key: number]: {
            Description: string;
        }
    }
}

interface HelpText {
    [section: string]: string;
}

interface Achievement {
    ID: string;
    Name: string;
    Description: string;
    Icon: string;
    SoulgemValue: number;
}

interface Difficulty {
    ID: string;
    Name: string;
    Description: string;
    EnemyHealthMultiplier: number;
    EnemyDamageMultiplier: number;
    EnemyCountMultiplier: number;
};