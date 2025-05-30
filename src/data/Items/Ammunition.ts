const Ammunition: ItemData[] = [

    {
        ID: "lead_shot",
        Name: "Lead Shot",
        Sprite: "general-15",
        Desc: "A handful of lead shot, used in shotguns.",
        Stackable: true,
        StackSize: 200,
        DamageModifier: 1,
        Type: "Ammunition",
        Properties: {
            DamageMod: [],
        },
        InitialValue: { ID: "lead_shot", Quantity: 1 },
    },

];

Ammunition.forEach((item) => {
    item.Category = "Shot";
});

export default Ammunition;