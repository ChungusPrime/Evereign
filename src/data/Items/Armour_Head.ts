const HeadArmour: ItemData[] = [

    {
        ID: "operative_helmet",
        Name: "Operative Helmet",
        Sprite: "armour-5",
        Desc: "A lightweight helmet designed for operatives, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "operative_helmet", Quantity: 1 },
        Type: "Armour"
    }

];

HeadArmour.forEach((item) => {
    item.Category = "Helmet";
});

export default HeadArmour;