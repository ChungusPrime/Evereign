const Armour_Plate_Head: ItemData[] = [

    {
        ID: "godsworn_helmet",
        Name: "Godsworn Helmet",
        Sprite: "leather_dark-30",
        Desc: "A lightweight helmet designed for agents, providing head protection without sacrificing mobility.",
        Stackable: false,
        InitialValue: { ID: "godsworn_helmet", Quantity: 1 },
        Type: "Armour",
        Rarity: "Common",
        Properties: {
            Defence_Pierce: 3,
            Defence_Impact: 2,
            Defence_Slash: 2,
        },
        Moddable: false,
        Craftable: false,
        Texture: 2
    },

];

Armour_Plate_Head.forEach((item) => {
    item.Tags = [16, 8];
    item.Category = "Head";
});

export default Armour_Plate_Head;