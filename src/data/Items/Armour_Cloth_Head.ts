const Armour_Cloth_Head: ItemData[] = [

    {
        ID: "evokers_hood",
        Name: "Evoker's Hood",
        Sprite: "leather_dark-30",
        Desc: "A lightweight helmet designed for evokers, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "evokers_hood", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 2,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false,
        Texture: 1
    },

];

Armour_Cloth_Head.forEach((item) => {
    item.Tags = [13, 8];
    item.Category = "Head";
});

export default Armour_Cloth_Head;