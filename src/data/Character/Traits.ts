/*
Feats are passive abilities that grant bonuses to characters. 
They are not active abilities, but rather passive effects that enhance a character's 
abilities or grant them new ones.
*/
const TraitData: Traits = {

    // Armour
    "cloth_armour_specialist": {
        Name: "Cloth Armour Specialist",
        Description: `Allows you to wear Cloth Armour with reduced movement speed penalty.`,
    },

    "leather_armour_specialist": {
        Name: "Leather Armour Specialist",
        Description: `Allows you to wear Leather Armour with reduced movement speed penalty.`,
    },

    "chainmail_armour_specialist": {
        Name: "Chainmail Armour Specialist",
        Description: `Allows you to wear Chainmail Armour with reduced movement speed penalty.`,
    },

    "plate_armour_specialist": {
        Name: "Plate Armour Specialist",
        Description: `Allows you to wear Plate Armour with reduced movement speed penalty.`,
    },

    "dual_wielding_specialist": {
        Name: "Dual Wielding Specialist",
        Description: `Allows you to dual wield one-handed weapons.`,
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

    "well_connected": {
        Name: "Well Connected",
        Description: "Each Town Centre you build gives you a free random worker.",
    },

    "on_the_frontier": {
        Name: "On the Frontier",
        Description: "Defensive structures are slightly cheaper to build.",
    },

    "forest_kin": {
        Name: "Forest Kin",
        Description: `
        - You can see hidden paths in forests on the world map
        - You take reduced damage from natural hazards
        `
    },

    "defence_specialist": {
        Name: "Defence Specialist",
        Description: `
        - You take reduced damage from melee attacks
        - You can build defensive structures at a reduced cost
        `,
    },

    "human_1": {
        Name: "Human Versatility",
        Description: `
        - +3 to all base attributes per level
        - Bonuses to diplomacy and barter
        - Resistance to all damage types (Incoming damage is reduced by 2 per level)
        `,
    },

    "dwarf_1": {
        Name: "Dwarf Resilience",
        Description: `
        - +2 to base constitution and strength per level
        - Bonuses to mining (Higher yield and reduces time to gather)
        - Bonuses to smithing (Higher yield and reduces time to craft)
        - Resistance to physical damage (Incoming physical damage is reduced by 4 per level)
        - Resistance to fire damage (Incoming fire damage is reduced by 4 per level)
        - Buildings constructed by Dwarves have higher health.
        `,
    },

    "elf_1": {
        Name: "Elven Grace",
        Description: `
        - +2 to base agility and intelligence per level
        - +1 to all other base attributes per level
        - Bonuses to archery (Higher damage and reduces time to attack)
        - Bonuses to herbalism (Higher yield and reduces time to gather)
        - Bonuses to alchemy (Higher yield and reduces time to craft)
        - Resistance to nature damage (Incoming nature damage is reduced by 4 per level)
        - Resistance to cold damage (Incoming cold damage is reduced by 4 per level)
        - Bonuses to stealth (Reduces chance to be detected while sneaking)
        - Bonuses to perception (Increases chance to detect hidden objects and enemies)
        - You can see hidden paths in forests on the world map
        - You take reduced damage from natural hazards
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

    "ultris_grade_unit": {
        Name: "ULTRIS Grade Unit",
        Description: `
        - No starting attribute bonuses
        - Start with 3 proto-struct component slots
        - Gain one additional component slot every level
        - You can interface with ancient machines and devices
        `
    }

};

export default TraitData;