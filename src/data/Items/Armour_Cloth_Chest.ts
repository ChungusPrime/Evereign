const Armour_Cloth_Chest: ItemData[] = [

    {
        ID: "evokers_robe",
        Name: "Evoker's Robe",
        Sprite: "leather_dark-33",
        Desc: "A set of lightweight robe designed for evokers, providing protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "evokers_robe", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 2,
            Defence_Impact: 1,
            Defence_Slash: 1
        },
        Moddable: false,
        Craftable: false,
        Texture: 3
    },

];

Armour_Cloth_Chest.forEach((item) => {
    item.Tags = [13, 7];
    item.Category = "Chest";
});

export default Armour_Cloth_Chest;