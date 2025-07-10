interface SkillData {
    [skillName: string]: {
        Description?: string;
        Levels?: {
            [level: number]: {
                XpRequired: number;
                Unlock?: string;
            };
        }
    }
}

const Skills: SkillData = {

    Fishing: {
        Description: "Catch fish and other aquatic creatures.",
        Levels: {
            1: {
                XpRequired: 0,
            },
            2: {
                XpRequired: 100,
                Unlock: "Fishing Rod"
            },
            3: {
                XpRequired: 300,
                Unlock: "Fishing Net"
            },
            4: {
                XpRequired: 600,
                Unlock: "Fish Bait"
            },
            5: {
                XpRequired: 1000,
                Unlock: "Fishing Trap"
            }
        }
    },

    Mining: {
        Description: "Extract minerals and ores from the earth.",
        Levels: {
            1: {
                XpRequired: 0,
            },
            2: {
                XpRequired: 150,
                Unlock: "Pickaxe"
            },
            3: {
                XpRequired: 400,
                Unlock: "Mining Helmet"
            },
            4: {
                XpRequired: 800,
                Unlock: "Drill"
            },
            5: {
                XpRequired: 1500,
                Unlock: "Mining Cart"
            }
        }
    },

    Forestry: {
        Description: "Gather wood and other resources from trees.",
        Levels: {
            1: {
                XpRequired: 0,
            },
            2: {
                XpRequired: 200,
                Unlock: "Axe"
            },
            3: {
                XpRequired: 500,
                Unlock: "Lumberjack Boots"
            },
            4: {
                XpRequired: 1000,
                Unlock: "Chainsaw"
            },
            5: {
                XpRequired: 2000,
                Unlock: "Forestry Wagon"
            }
        }
    },

    Botany: {
        Description: "Study and gather plants and herbs.",
        Levels: {
            1: {
                XpRequired: 0,
            },
            2: {
                XpRequired: 120,
                Unlock: "Botany Kit"
            },
            3: {
                XpRequired: 350,
                Unlock: "Herbalist's Gloves"
            },
            4: {
                XpRequired: 700,
                Unlock: "Botanical Journal"
            },
            5: {
                XpRequired: 1300,
                Unlock: "Botany Field Guide"
            }
        }
    },

    Alchemy: {
        Description: "Create potions and elixirs using gathered ingredients.",
        Levels: {
            1: {
                XpRequired: 0,
            },
            2: {
                XpRequired: 250,
                Unlock: "Alchemy Set"
            },
            3: {
                XpRequired: 600,
                Unlock: "Potion Vials"
            },
            4: {
                XpRequired: 1200,
                Unlock: "Alchemist's Robe"
            },
            5: {
                XpRequired: 2200,
                Unlock: "Grimoire of Alchemy"
            }
        }
    },

    Cooking: {
        Description: "Prepare and cook food using gathered ingredients.",
        Levels: {
            1: {
                XpRequired: 0,
            },
            2: {
                XpRequired: 180,
                Unlock: "Cooking Pot"
            },
            3: {
                XpRequired: 450,
                Unlock: "Chef's Knife"
            },
            4: {
                XpRequired: 900,
                Unlock: "Cooking Apron"
            },
            5: {
                XpRequired: 1700,
                Unlock: "Culinary Book"
            }
        }
    },



    
    

}

export default Skills;