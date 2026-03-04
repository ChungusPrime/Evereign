const Armour_Leather_Feet: ItemData[] = [

    {
        ID: "leather_shoes",
        Name: "Leather Shoes",
        Sprite: "leather_dark-41",
        Desc: "Simple leather shoes that provide basic protection for the feet.",
        Stackable: false,
        InitialValue: { ID: "leather_shoes", Quantity: 1 },
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
        ID: "agent_boots",
        Name: "Agent Boots",
        Sprite: "leather_dark-41",
        Desc: "A pair of sturdy boots designed for agents, providing protection and comfort during long missions.",
        Stackable: false,
        InitialValue: { ID: "agent_boots", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 4,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false,
        Texture: 1
    },

    {
        ID: "travellers_boots",
        Name: "Traveller's Boots",
        Sprite: "leather_dark-41",
        Desc: "Simple leather boots that provide basic protection for the feet.",
        Stackable: false,
        InitialValue: { ID: "travellers_boots", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 2,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false,
        Texture: 2
    },

];

Armour_Leather_Feet.forEach((item) => {
    item.Tags = [14, 10];
    item.Category = "Feet";
});

export default Armour_Leather_Feet;