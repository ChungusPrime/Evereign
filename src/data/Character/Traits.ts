/*
Feats are passive abilities that grant bonuses to characters. 
They are not active abilities, but rather passive effects that enhance a character's 
abilities or grant them new ones.
*/

interface Trait {
    name: string; // Name of the feat
    description: string; // Description of the feat
}

const TraitData: Trait[] = [

    // Pyro
    {
        name: "Pyro Novice",
        description: `Ability to cast Novice-level Fire spells.`,
    },

    {
        name: "Pyro Apprentice",
        description: `Ability to cast Apprentice-level Fire spells.`,
    },

    {
        name: "Pyro Journeyman",
        description: `Ability to cast Journeyman-level Fire spells.`,
    },

    {
        name: "Pyro Expert",
        description: `Ability to cast Expert-level Fire spells.`,
    },

    {
        name: "Pyro Master",
        description: `Ability to cast Master-level Fire spells.`,
    },

    // Cryo
    {
        name: "Cryo Novice",
        description: `Ability to cast Novice-level Ice spells.`,
    },

    {
        name: "Cryo Apprentice",
        description: `Ability to cast Apprentice-level Ice spells.`,
    },

    {
        name: "Cryo Journeyman",
        description: `Ability to cast Journeyman-level Ice spells.`,
    },

    {
        name: "Cryo Expert",
        description: `Ability to cast Expert-level Ice spells.`,
    },

    {
        name: "Cryo Master",
        description: `Ability to cast Master-level Ice spells.`,
    },

    // General Construction
    {
        name: "Bolstered Structures",
        description: `Buildings constructed by the character have higher health.`,
    },

    {
        name: "Builder Lineage",
        description: `Buildings are constructed faster.`,
    },

    // Swords
    {
        name: "Sword Novice",
        description: `Ability to use Novice-level Sword abilities.`,
    },

    {
        name: "Sword Apprentice",
        description: `Ability to use Apprentice-level Sword abilities.`,
    },

    {
        name: "Sword Journeyman",
        description: `Ability to use Journeyman-level Sword abilities.`,
    },

    {
        name: "Sword Expert",
        description: `Ability to use Expert-level Sword abilities.`,
    },

    {
        name: "Sword Master",
        description: `Ability to use Master-level Sword abilities.`,
    },

    // Proto-Struct Components
    {
        name: "Component Array mkI",
        description: `Grants access to component slot 1.`,
    },

    {
        name: "Component Array mkII",
        description: `Grants access to component slot 2.`,
    },

    {
        name: "Component Array mkIII",
        description: `Grants access to component slot 3.`,
    },

    {
        name: "Component Array mkIV",
        description: `Grants access to component slot 4.`,
    },

    {
        name: "Component Array mkV",
        description: `Grants access to component slot 5.`,
    },




    {
        name: "Arcane Synergy",
        description: "Intellect bonus from equipment grants bonus damage (1dmg x class level) to abilities and increases max mana (3mp x class level).",
    },


    {
        name: "Defence Specialist",
        description: `
        - +3 to base strength and constitution per level
        - Bonuses to melee combat (Higher damage and reduces time to attack)
        - Bonuses to smithing (Higher yield and reduces time to craft)
        - Resistance to physical damage (Incoming physical damage is reduced by 4 per level)
        - Resistance to fire damage (Incoming fire damage is reduced by 4 per level)
        - Buildings constructed by Defence Specialists have higher health.
        `,
    },

    {
        name: "Pioneer",
        description: `
        - Bonuses to Forestry (Higher yield and reduces time to gather)
        - Bonuses to Construction (Cheaper to construct buildings and reduces time to build)
        - Resistance to cold damage (Incoming cold damage is reduced by 4 per level)
        - +3 to all base attributes per level
        `,
    },

    {
        name: "Forest Kin",
        description: `
        - Bonuses to hunting
        - Bonuses to horticulture 
        - Resistance to poisons and nature damage
        - +2 to base agility and intelligence per level
        - +1 to all other base attributes per level
        `
    },

    {
        name: "ULTRA Protocol",
        description: `
            - Instead of base attribute increases, Proto-Structs gain access to component slots, which can be filled with various components that grant bonuses and abilities.
            - 1 component slot is granted at level 1, and an additional component slot is gained every 3 levels.
            - Components can be swapped out and upgraded, allowing for customization and specialization.
            - Components can be used to increase base attributes, resistances, and other abilities.
            - Components can be crafted and upgraded using engineering and smithing skills.
            - Components can be used to create unique abilities and effects, such as elemental damage, healing, or defensive capabilities.
            - Bonuses to engineering and smithing.
            `
    },

];

export default TraitData;