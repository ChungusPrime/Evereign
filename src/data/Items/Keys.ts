const Keys: ItemData[] = [

    {
        ID: "gorgutz_key",
        Name: "Gorgutz' Key",
        Sprite: "bonus1-16",
        Desc: "A bronze key, found on the body of the slain goblin Warlord Gorgutz.",
        Stackable: false
    },

    {
        ID: "iron_key",
        Name: "Iron Key",
        Sprite: "bonus1-24",
        Desc: "An iron key with a small red gem embedded in the handle.",
        Stackable: false
    },

    {
        ID: "stone_coin_star",
        Name: "Stone Coin",
        Sprite: "bonus1-44",
        Desc: "A small coin made of rough stone, has an engraving of a star in the centre.",
        Stackable: false
    },
    
    {
        ID: "stone_coin_moon",
        Name: "Stone Coin",
        Sprite: "bonus1-43",
        Desc: "A small coin made of rough stone, has an engraving of a moon in the centre.",
        Stackable: false
    },

];

Keys.forEach((item) => {
    item.Category = "Key";
});

export default Keys;