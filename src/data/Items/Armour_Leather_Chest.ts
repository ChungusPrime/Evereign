const Armour_Leather_Chest: ItemData[] = [

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

Armour_Leather_Chest.forEach((item) => {
    item.Tags = [14, 7];
    item.Category = "Chest";
});

export default Armour_Leather_Chest;