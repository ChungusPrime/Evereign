const ChestArmour: ItemData[] = [

    {
        ID: "operative_armor",
        Name: "Operative Armor",
        Sprite: "armour-9",
        Desc: "A set of lightweight armor designed for operatives, providing protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "operative_armor", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 5,
            Defence_Impact: 1,
            Defence_Slash: 3
        },
        Moddable: false,
        Craftable: false
    }

];

ChestArmour.forEach((item) => {
    item.Category = "Chest";
});

export default ChestArmour;