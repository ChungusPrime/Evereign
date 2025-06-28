const HandArmour: ItemData[] = [

    {
        ID: "operative_gloves",
        Name: "Operative Gloves",
        Sprite: "armour-5",
        Desc: "A pair of sturdy gloves designed for operatives.",
        Stackable: false,
        InitialValue: { ID: "operative_gloves", Quantity: 1 },
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

HandArmour.forEach((item) => {
    item.Category = "Hands";
});

export default HandArmour;