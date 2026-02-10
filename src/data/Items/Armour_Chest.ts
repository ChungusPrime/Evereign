const ChestArmour: ItemData[] = [

    {
        ID: "evokers_robe",
        Name: "Evoker's Robe",
        Sprite: "leather_dark-33",
        Desc: "A set of lightweight robe designed for evokers, providing protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "evokers_robe", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 2,
            Defence_Impact: 1,
            Defence_Slash: 1
        },
        Moddable: false,
        Craftable: false,
        Texture: 3
    },

    {
        ID: "agent_coat",
        Name: "Agent Coat",
        Sprite: "leather_dark-33",
        Desc: "A set of lightweight coat designed for agents, providing protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "agent_coat", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 5,
            Defence_Impact: 1,
            Defence_Slash: 3
        },
        Moddable: false,
        Craftable: false,
        Texture: 2
    },

    {
        ID: "leather_armour",
        Name: "Leather Armour",
        Sprite: "leather_dark-33",
        Desc: "A set of lightweight armour designed for agents, providing protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "leather_armour", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 5,
            Defence_Impact: 1,
            Defence_Slash: 3
        },
        Moddable: false,
        Craftable: false,
        Texture: 1
    },

    {
        ID: "padded_leather_armour",
        Name: "Padded Leather Armour",
        Sprite: "leather_dark-33",
        Desc: "A set of lightweight padded leather armour designed for agents, providing protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "padded_leather_armour", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 5,
            Defence_Impact: 1,
            Defence_Slash: 3
        },
        Moddable: false,
        Craftable: false,
        Texture: 0
    }

];

ChestArmour.forEach((item) => {
    item.Category = "Chest";
});

export default ChestArmour;