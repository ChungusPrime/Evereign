//A list of occupations for characters, each with a name, description, and associated traits or bonuses.
// The Occupation determines which building type the player can assign the NPC to.
export interface Occupation {
    Name: string;
    Description: string;
    Traits: string[];
}

export const Occupations: Occupation[] = [
    {
        Name: "Farmer",
        Description: "Skilled in agriculture and animal husbandry.",
        Traits: ["agriculture_expert", "animal_handler"]
    },
    {
        Name: "Fisherman",
        Description: "Expert in fishing and aquatic life.",
        Traits: ["fishing_master", "water_navigation"]
    },
    {
        Name: "Hunter",
        Description: "Proficient in tracking and hunting wildlife.",
        Traits: ["tracking_expert", "archery_specialist"]
    },
    {
        Name: "Miner",
        Description: "Experienced in mining and resource extraction.",
        Traits: ["ore_expert", "cave_navigation"]
    },
    {
        Name: "Lumberjack",
        Description: "Skilled in forestry and woodcutting.",
        Traits: ["woodcraft_expert", "tree_climbing"]
    },
    {
        Name: "Fletcher",
        Description: "Specialist in crafting bows and arrows.",
        Traits: ["bowyer", "arrow_crafter"]
    },
    {
        Name: "Carpenter",
        Description: "Expert in woodworking and construction.",
        Traits: ["woodworking_master", "structure_builder"]
    },
    {
        Name: "Tailor",
        Description: "Skilled in sewing and garment making.",
        Traits: ["sewing_expert", "fashion_designer"]
    },
    {
        Name: "Cook",
        Description: "Proficient in culinary arts and food preparation.",
        Traits: ["culinary_master", "food_preserver"]
    },
    {
        Name: "Jeweller",
        Description: "Expert in crafting jewelry and precious items.",
        Traits: ["gem_cutter", "metal_worker"]
    },
    {
        Name: "Innkeeper",
        Description: "Experienced in hospitality and management.",
        Traits: ["hospitality_expert", "business_manager"]
    },
    {
        Name: "Blacksmith",
        Description: "Expert in forging weapons and armor.",
        Traits: ["weapon_master", "armor_crafter"]
    },
    {
        Name: "Merchant",
        Description: "A shrewd trader and negotiator.",
        Traits: ["bargain_master", "wealth_accumulator"]
    },
    {
        Name: "Guard",
        Description: "Trained in combat and protection.",
        Traits: ["combat_expert", "defender"]
    },
    {
        Name: "Apothecary",
        Description: "Skilled in medicine and healing arts.",
        Traits: ["medical_expert", "herbalist"]
    },
    {
        Name: "Scholar",
        Description: "Knowledgeable in various fields of study.",
        Traits: ["knowledge_seeker", "lore_master"]
    },
    {
        Name: "Builder",
        Description: "Expert in construction and architecture.",
        Traits: ["construction_master", "design_expert"]
    },
    {
        Name: "Alchemist",
        Description: "Skilled in potion-making and chemical reactions.",
        Traits: ["potion_brewer", "chemical_expert"]
    },
    {
        Name: "Artist",
        Description: "Creative and skilled in various art forms.",
        Traits: ["creative_genius", "artistic_master"]
    },
    {
        Name: "Entertainer",
        Description: "Skilled in performance and entertainment.",
        Traits: ["performance_expert", "crowd_pleaser"]
    },
    {
        Name: "Priest",
        Description: "Devoted to spiritual guidance and rituals.",
        Traits: ["spiritual_guide", "ritual_master"]
    },
    {
        Name: "Engineer",
        Description: "Skilled in mechanics and technological innovation.",
        Traits: ["mechanics_expert", "innovator"]
    },
    {
        Name: "Brewer",
        Description: "Expert in brewing beverages and ales.",
        Traits: ["brew_master", "fermentation_expert"]
    }
];
