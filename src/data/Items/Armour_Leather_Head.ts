const Armour_Leather_Head: ItemData[] = [

    {
        ID: "agent_face_cover",
        Name: "Agent Face Cover",
        Sprite: "leather_dark-30",
        Desc: "A lightweight helmet designed for agents, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "agent_face_cover", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 2,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false,
        Texture: 3
    },

    {
        ID: "leather_cap",
        Name: "Leather Cap",
        Sprite: "leather_dark-30",
        Desc: "A lightweight helmet designed for leatherworkers, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "leather_cap", Quantity: 1 },
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
    }

];

Armour_Leather_Head.forEach((item) => {
    item.Tags = [14, 8];
    item.Category = "Head";
});

export default Armour_Leather_Head;