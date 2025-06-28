const FeetArmour: ItemData[] = [

    {
        ID: "operative_boots",
        Name: "Operative Boots",
        Sprite: "armour-5",
        Desc: "A pair of sturdy boots designed for operatives, providing protection and comfort during long missions.",
        Stackable: false,
        InitialValue: { ID: "operative_boots", Quantity: 1 },
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

FeetArmour.forEach((item) => {
    item.Category = "Feet";
});

export default FeetArmour;