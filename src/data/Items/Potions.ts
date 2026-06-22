const Potions: ItemData[] = [

    {
        ID: "marigold_brew",
        Name: "Marigold Brew",
        Sprite: "potions-481",
        Desc: "A simple brew known for its light healing properties.",
        Stackable: true,
        StackSize: 5,
        InitialValue: { ID: "marigold_brew", Quantity: 1 },
        Craftable: true,
        OnUse: { Heal: 50 },
        UseTime: 2000,
    },

    {
        ID: "bloomberry_decoction",
        Name: "Bloomberry Decoction",
        Sprite: "potions-482",
        Desc: "A decoction made from Bloomberries, known to restore mana.",
        Stackable: true,
        StackSize: 5,
        InitialValue: { ID: "bloomberry_decoction", Quantity: 1 },
        Craftable: true,
        OnUse: { RestoreMana: 50 },
        UseTime: 2000,
    },

];

Potions.forEach((item) => {
    item.Category = "Potion";
});


export default Potions;