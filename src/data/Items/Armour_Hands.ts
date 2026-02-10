const HandArmour: ItemData[] = [

    {
        ID: "leather_gloves",
        Name: "Leather Gloves",
        Sprite: "leather_dark-22",
        Desc: "Simple leather gloves that provide basic protection for the hands.",
        Stackable: false,
        InitialValue: { ID: "leather_gloves", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 2,
            Defence_Impact: 4,
            Defence_Slash: 1,
        },
        Moddable: false,
        Craftable: false,
        Texture: 0
    },

    {
        ID: "agent_gloves",
        Name: "Agent Gloves",
        Sprite: "leather_dark-22",
        Desc: "A pair of sturdy gloves designed for agents of the kingdom.",
        Stackable: false,
        InitialValue: { ID: "agent_gloves", Quantity: 1 },
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

HandArmour.forEach((item) => {
    item.Category = "Hands";
});

export default HandArmour;