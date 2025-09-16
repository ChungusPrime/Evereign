const Ammunition: ItemData[] = [

    {
        ID: "stone_shot",
        Name: "Stone Shot",
        Sprite: "general-15",
        Desc: "A handful of Stone shot, used in Scatterguns.",
        Stackable: true,
        StackSize: 200,
        Type: "Scattergun",
        Properties: {
            DamageMod: [
                { Type: "Pierce", Min: 2, Max: 4 },
                { Type: "Impact", Min: 3, Max: 5 }
            ],
            Pellets: 5,
        },
        InitialValue: { ID: "stone_shot", Quantity: 1 },
        Craftable: true,
        Moddable: false,
        Materials: [
            { ID: "stone_rough", Amount: 1 },
        ],
        CraftingTime: 10,
        CraftingOutput: { ID: "stone_shot", Quantity: 20 },
    },

    {
        ID: "lead_shot",
        Name: "Lead Shot",
        Sprite: "general-15",
        Desc: "A handful of lead shot, used in Scatterguns.",
        Stackable: true,
        StackSize: 200,
        Type: "Scattergun",
        Properties: {
            DamageMod: [
                { Type: "Piercing", Value: 1 },
                { Type: "Force", Value: 1 },
            ],
        },
        InitialValue: { ID: "lead_shot", Quantity: 1 },
        Craftable: true,
        Moddable: false,
        Materials: [
            { ID: "iron_ore", Amount: 1 },
        ],
        CraftingTime: 10,
        CraftingOutput: { ID: "lead_shot", Quantity: 20 },
    },

];

Ammunition.forEach((item) => {
    item.Category = "Ammunition";
});

export default Ammunition;