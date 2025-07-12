/*
Feats are passive abilities that grant bonuses to characters. 
They are not active abilities, but rather passive effects that enhance a character's 
abilities or grant them new ones.
*/

interface Traits {
    [key: string]: {
        Name: string;
        Description: string;
        RequiredTraits?: string[];
        RequiredAttributes?: {
            Fortitude?: number;
            Versatility?: number;
            Vigor?: number;
            Expertise?: number;
            Personality?: number;
            Fortune?: number;
            Grit?: number;
        };
    };
}

const TraitData: Traits = {

    // Scatterguns
    "scattergun_novice": {
        Name: "Scattergun Novice",
        Description: `Basic training on how to use Scatterguns.`,
        RequiredTraits: [],
        RequiredAttributes: {
            Versatility: 5,
        }
    },

    "scattergun_apprentice": {
        Name: "Scattergun Apprentice",
        Description: `Intermediate training on how to use Scatterguns. 
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "Scattergun_novice",
        ],
        RequiredAttributes: {
            Versatility: 10,
        }
    },

    "scattergun_journeyman": {
        Name: "Scattergun Journeyman",
        Description: `Advanced training on how to use Scatterguns. 
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "Scattergun_apprentice",
        ],
        RequiredAttributes: {
            Versatility: 15,
        }
    },

    "scattergun_expert": {
        Name: "Scattergun Expert",
        Description: `Expert training on how to use Scatterguns. 
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "Scattergun_journeyman",
        ],
        RequiredAttributes: {
            Versatility: 20,
        }
    },

    "scattergun_master": {
        Name: "Scattergun Master",
        Description: `Master training on how to use Scatterguns. 
        - The number of pellets fired per shot is increased by 2.
        - Each base damage type of Scatterguns is increased by 2.`,
        RequiredTraits: [
            "Scattergun_expert",
        ],
        RequiredAttributes: {
            Versatility: 25,
        }
    },

    // Explosives
    "explosive_novice": {
        Name: "Explosive Novice",
        Description: `Basic training on the use of improvised explosives.`,
    },

    // Gadgetry
    "gadgetry_novice": {
        Name: "Gadgetry Novice",
        Description: `Understanding of how to use simple Gadgets.`,
    },

    // Pyro
    "pyro_novice": {
        Name: "Pyro Novice",
        Description: `Ability to cast Novice-level Fire spells.`,
    },

    "pyro_apprentice": {
        Name: "Pyro Apprentice",
        Description: `Ability to cast Apprentice-level Fire spells.`,
    },

    "pyro_journeyman": {
        Name: "Pyro Journeyman",
        Description: `Ability to cast Journeyman-level Fire spells.`,
    },

    "pyro_expert": {
        Name: "Pyro Expert",
        Description: `Ability to cast Expert-level Fire spells.`,
    },

    "pyro_master": {
        Name: "Pyro Master",
        Description: `Ability to cast Master-level Fire spells.`,
    },

    // Cryo
    "cryo_novice": {
        Name: "Cryo Novice",
        Description: `Ability to cast Novice-level Ice spells.`,
    },

    "cryo_apprentice": {
        Name: "Cryo Apprentice",
        Description: `Ability to cast Apprentice-level Ice spells.`,
    },

    "cryo_journeyman": {
        Name: "Cryo Journeyman",
        Description: `Ability to cast Journeyman-level Ice spells.`,
    },

    "cryo_expert": {
        Name: "Cryo Expert",
        Description: `Ability to cast Expert-level Ice spells.`,
    },

    "cryo_master": {
        Name: "Cryo Master",
        Description: `Ability to cast Master-level Ice spells.`,
    },

    // General Construction
    "bolstered_structures": {
        Name: "Bolstered Structures",
        Description: `Buildings constructed by the character have higher health.`,
    },

    "builder_lineage": {
        Name: "Builder Lineage",
        Description: `Buildings are constructed faster.`,
    },

    // Swords
    "sword_novice": {
        Name: "Sword Novice",
        Description: `Ability to use Novice-level Sword abilities.`,
    },

    "sword_apprentice": {
        Name: "Sword Apprentice",
        Description: `Ability to use Apprentice-level Sword abilities.`,
    },

    "sword_journeyman": {
        Name: "Sword Journeyman",
        Description: `Ability to use Journeyman-level Sword abilities.`,
    },

    "sword_expert": {
        Name: "Sword Expert",
        Description: `Ability to use Expert-level Sword abilities.`,
    },

    "sword_master": {
        Name: "Sword Master",
        Description: `Ability to use Master-level Sword abilities.`,
    },

    // Proto-Struct Components
    "protostruct_mk1": {
        Name: "Component Array mkI",
        Description: `Grants access to component slot 1.`,
    },

    "protostruct_mk2": {
        Name: "Component Array mkII",
        Description: `Grants access to component slot 2.`,
    },

    "protostruct_mk3": {
        Name: "Component Array mkIII",
        Description: `Grants access to component slot 3.`,
    },

    "protostruct_mk4": {
        Name: "Component Array mkIV",
        Description: `Grants access to component slot 4.`,
    },

    "protostruct_mk5": {
        Name: "Component Array mkV",
        Description: `Grants access to component slot 5.`,
    },

    "arcane_synergy": {
        Name: "Arcane Synergy",
        Description: "Intellect bonus from equipment grants bonus damage (1dmg x class level) to abilities and increases max mana (3mp x class level).",
    },

    "defence_specialist": {
        Name: "Defence Specialist",
        Description: `
        - +3 to base strength and constitution per level
        - Bonuses to melee combat (Higher damage and reduces time to attack)
        - Bonuses to smithing (Higher yield and reduces time to craft)
        - Resistance to physical damage (Incoming physical damage is reduced by 4 per level)
        - Resistance to fire damage (Incoming fire damage is reduced by 4 per level)
        - Buildings constructed by Defence Specialists have higher health.
        `,
    },

    "pioneer": {
        Name: "Pioneer",
        Description: `
        - Bonuses to Forestry (Higher yield and reduces time to gather)
        - Bonuses to Construction (Cheaper to construct buildings and reduces time to build)
        - Resistance to cold damage (Incoming cold damage is reduced by 4 per level)
        - +3 to all base attributes per level
        `,
    },

    "forest_kin": {
        Name: "Forest Kin",
        Description: `
        - Bonuses to hunting
        - Bonuses to horticulture 
        - Resistance to poisons and nature damage
        - +2 to base agility and intelligence per level
        - +1 to all other base attributes per level
        `
    },

    "ultra_protocol": {
        Name: "ULTRA Protocol",
        Description: `
            - Instead of base attribute increases, Proto-Structs gain access to component slots, which can be filled with various components that grant bonuses and abilities.
            - 1 component slot is granted at level 1, and an additional component slot is gained every 3 levels.
            - Components can be swapped out and upgraded, allowing for customization and specialization.
            - Components can be used to increase base attributes, resistances, and other abilities.
            - Components can be crafted and upgraded using engineering and smithing skills.
            - Components can be used to create unique abilities and effects, such as elemental damage, healing, or defensive capabilities.
            - Bonuses to engineering and smithing.
            `
    }

};

export default TraitData;