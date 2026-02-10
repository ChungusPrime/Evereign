const HeadArmour: ItemData[] = [

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
        ID: "godsworn_helmet",
        Name: "Godsworn Helmet",
        Sprite: "leather_dark-30",
        Desc: "A lightweight helmet designed for agents, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "godsworn_helmet", Quantity: 1 },
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

    {
        ID: "evokers_hood",
        Name: "Evoker's Hood",
        Sprite: "leather_dark-30",
        Desc: "A lightweight helmet designed for evokers, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "evokers_hood", Quantity: 1 },
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

HeadArmour.forEach((item) => {
    item.Category = "Helmet";
});

export default HeadArmour;