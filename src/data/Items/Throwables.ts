const Throwables: ItemData[] = [

    {
        ID: "grenade_mk1",
        Name: "Grenade Mk1",
        Sprite: "ownmisc-0",
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
        Moddable: false
    },

];

Throwables.forEach((item) => {
    item.Category = "Throwable";
});

export default Throwables;