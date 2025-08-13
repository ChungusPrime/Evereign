const Throwables: ItemData[] = [

    {
        ID: "grenade_mk1",
        Name: "Grenade Mk1",
        Sprite: "general-15",
        Desc: "A basic high explosive grenade.",
        Stackable: true,
        StackSize: 200,
        Type: "Grenade",
        Properties: {
            DamageMod: [                
                { Type: "Piercing", Amount: 2 },
                { Type: "Force", Amount: 3 }
            ],
            Pellets: 8,
        },
        InitialValue: { ID: "grenade_mk1", Quantity: 1 },
        Craftable: true,
        Moddable: false,
        Materials: [
            { ID: "stone_rough", Amount: 1 },
            { ID: "gunpowder", Amount: 1 },
            { ID: "ore_iron", Amount: 1 }
        ],
        CraftingTime: 10,
        CraftingOutput: { ID: "grenade_mk1", Quantity: 1 },
    },

];

Throwables.forEach((item) => {
    item.Category = "Throwable";
});

export default Throwables;