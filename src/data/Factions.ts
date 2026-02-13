interface Faction {
    Name: string;
    Description: string;
}

const Factions: Record<string, Faction> = {

    "lumber_militia": {
        Name: "Lumber Militia",
        Description: `The Lumber Militia is a faction of woodcutters and lumberjacks who have banded together to protect their livelihoods and communities. They are skilled in the use of axes and other woodcutting tools, and are known for their rugged individualism and self-reliance. The Lumber Militia is often called upon to defend against threats to the forests, such as encroaching development or dangerous wildlife.`,
    },

    "stone_guild": {
        Name: "Stone Guild",
        Description: `The Stone Guild is a faction of stonemasons, quarry workers, and stonecutters who have come together to protect their trade and the resources they rely on. They are skilled in the use of chisels, hammers, and other stoneworking tools, and are known for their craftsmanship and attention to detail. The Stone Guild is often called upon to defend against threats to the quarries and stone resources, such as illegal mining or rival factions seeking to control the trade.`,
    },

    "iron_clan": {
        Name: "Iron Clan",
        Description: `The Iron Clan is a faction of blacksmiths, metalworkers, and miners who have united to protect their industry and the resources they depend on. They are skilled in the use of hammers, anvils, and other metalworking tools, and are known for their strength and resilience. The Iron Clan is often called upon to defend against threats to the mines and metal resources, such as rival factions seeking to control the trade or dangerous creatures that lurk in the depths.`,
    },

    "arco_tech": {
        Name: "Arco Tech",
        Description: `Arco Tech is a faction of engineers, inventors, and tinkerers who have come together to protect their innovations and the resources they rely on. They are skilled in the use of various tools and machinery, and are known for their creativity and ingenuity. Arco Tech is often called upon to defend against threats to their workshops and inventions, such as rival factions seeking to steal their technology or dangerous creatures that are attracted to their machines.`,
    },

    "ultris": {
        Name: "ULTRIS",
        Description: `ULTRIS is a faction of advanced AI constructs and synthetic beings who have come together to protect their existence and the resources they rely on. They are skilled in the use of advanced technology and programming, and are known for their intelligence and adaptability. ULTRIS is often called upon to defend against threats to their data centers and resources, such as rival factions seeking to hack their systems or dangerous entities that are attracted to their technology.`,
    },

    "pioneers": {
        Name: "Pioneers",
        Description: `The Pioneers are a faction of explorers, settlers, and adventurers who have come together to protect their communities and the resources they rely on. They are skilled in the use of various tools and survival techniques, and are known for their bravery and resourcefulness. The Pioneers are often called upon to defend against threats to their settlements and resources, such as rival factions seeking to control the land or dangerous creatures that lurk in the wilderness.`,
    },

    "People of Willowvale": {
        Name: "People of Willowvale",
        Description: `The People of Willowvale are a faction of settlers and inhabitants of the region surrounding the town of Willowvale. They are a diverse group of individuals who have come together to protect their homes and communities, and are known for their resilience and determination. The People of Willowvale are often called upon to defend against threats to their town and resources, such as rival factions seeking to control the area or dangerous creatures that lurk in the wilderness.`,
    },

    "The Blood Red Comets": {
        Name: "The Blood Red Comets",
        Description: `The Blood Red Comets are a faction of mercenaries and raiders who have come together to protect their interests and the resources they rely on. They are skilled in combat and are known for their ruthlessness and willingness to do whatever it takes to achieve their goals. The Blood Red Comets are often called upon to defend against threats to their operations and resources, such as rival factions seeking to control the area or dangerous creatures that lurk in the wilderness.`,
    }

};

export default Factions;