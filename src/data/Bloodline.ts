// Bloodline perks, are perks that a player can unlock after completing a campaign, with their earned soulgems.
// These perks provide various benefits that enhance the player's abilities in subsequent playthroughs.

export const BloodlinePerks: { [key: string]: BloodlinePerk } = {

    "bloodline_1": {
        name: "Eternal Wisdom",
        description: "Gain increased experience points from all activities.",
        effect: "Experience points gained +20%",
        soulgemCost: 5
    },

    "bloodline_2": {
        name: "Wealth of Ages",
        description: "Start with additional gold at the beginning of each campaign.",
        effect: "Starting gold +500",
        soulgemCost: 3
    },

    "bloodline_3": {
        name: "Master Artisan",
        description: "Crafting times are reduced for all items.",
        effect: "Crafting time -15%",
        soulgemCost: 4
    },

    "bloodline_4": {
        name: "Battle Hardened",
        description: "Increase your damage resistance in combat.",
        effect: "Damage resistance +10%",
        soulgemCost: 4
    },

    "bloodline_5": {
        name: "Swift Learner",
        description: "Level up faster with increased skill point gain.",
        effect: "Skill points gained +25%",
        soulgemCost: 5
    },

    "bloodline_6": {
        name: "Resourceful Gatherer",
        description: "Gather more resources from harvesting activities.",
        effect: "Resources gathered +20%",
        soulgemCost: 3
    },

    "bloodline_7": {
        name: "Lucky Streak",
        description: "Increase your chances of finding rare items.",
        effect: "Chance to find rare items +15%",
        soulgemCost: 4
    },

    "bloodline_8": {
        name: "Enduring Spirit",
        description: "Increase your maximum health permanently.",
        effect: "Max health +100",
        soulgemCost: 5
    }
    
};