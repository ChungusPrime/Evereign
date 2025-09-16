const LegArmour: ItemData[] = [

    {
        ID: "operative_legguards",
        Name: "Operative Leg Guards",
        Sprite: "leather_dark-37",
        Desc: "A pair of sturdy leg guards designed for operatives.",
        Stackable: false,
        InitialValue: { ID: "operative_legguards", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 2,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false
    }

];

LegArmour.forEach((item) => {
    item.Category = "Legs";
});

export default LegArmour;