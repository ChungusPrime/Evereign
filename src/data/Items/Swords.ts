const Swords: ItemData[] = [

    {
        ID: "orc_sword_1",
        Name: "Orcish Sword",
        Sprite: "librarium-45",
        Desc: "A crude sword wielded by orcs.",
        Type: "Sword",
        Properties: {
            Damage: [
                { Type: "Slash", Amount: 15 },
            ],
            Range: 200,
            Cooldown: 1000,
            ConeRadius: 50
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "orc_sword_1", Quantity: 1 }
    },

    {
        ID: "arming_sword_1",
        Name: "Arming Sword",
        Sprite: "librarium-45",
        Desc: "A standard sword used by knights.",
        Type: "Sword",
        Properties: {
            Damage: [
                { Type: "Slash", Amount: 25 },
            ],
            Range: 200,
            Cooldown: 1000,
            ConeRadius: 50
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "arming_sword_1", Quantity: 1 }
    },

];

Swords.forEach((item) => {
    item.Category = "Sword";
});

export default Swords;