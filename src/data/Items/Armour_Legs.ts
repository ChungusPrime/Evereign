const LegArmour: ItemData[] = [

    {
        ID: "agent_legguards",
        Name: "Agent Leg Guards",
        Sprite: "leather_dark-37",
        Desc: "A pair of sturdy leg guards designed for agents.",
        Stackable: false,
        InitialValue: { ID: "agent_legguards", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 2,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false,
        Texture: 0
    },

    {
        ID: "leather_leggings",
        Name: "Leather Leggings",
        Sprite: "leather_dark-37",
        Desc: "A pair of sturdy leather leggings designed for protection and mobility.",
        Stackable: false,
        InitialValue: { ID: "leather_leggings", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 2,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false,
        Texture: 1
    }

];

LegArmour.forEach((item) => {
    item.Category = "Legs";
});

export default LegArmour;