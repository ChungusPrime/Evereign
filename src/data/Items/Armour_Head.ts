const HeadArmour: ItemData[] = [

    {
        ID: "operative_helmet",
        Name: "Operative Helmet",
        Sprite: "leather_dark-30",
        Desc: "A lightweight helmet designed for operatives, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "operative_helmet", Quantity: 1 },
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

HeadArmour.forEach((item) => {
    item.Category = "Helmet";
});

export default HeadArmour;