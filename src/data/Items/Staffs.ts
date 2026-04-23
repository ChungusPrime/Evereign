const Staffs: ItemData[] = [

    {
        ID: "staff_evoker_1",
        Name: "Novice Mage's Staff of Electro Jab",
        Sprite: "librarium-45",
        Desc: "A wooden staff with a Novice-level enchantment that fires a bolt of lightning towards the target, causing Lightning damage to the target, and jumping to two other target within a small range.",
        Type: "Staff",
        Properties: {
            MaxCharge: 100,
            ChargeDelta: 300,
            Damage: [
                { Type: "Lightning", Amount: 10 },
            ],
            Range: 200,
            Cooldown: 1000,
            Element: "Lightning",
            Effect: "Chain Lightning",
            ExtraTargets: 2
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "staff_evoker_1", Quantity: 1, Charge: 100, Cooldown: 0 }
    },

];

Staffs.forEach((item) => {
    item.Category = "Staff";
});

export default Staffs;