const Staffs: ItemData[] = [

    {
        ID: "staff_evoker_1",
        Name: "Novice Mage's Staff of Electro Jab",
        Sprite: "librarium-45",
        Desc: "A wooden staff with a Novice-level enchantment that fires a bolt of lightning towards the target, causing Lightning damage to the target, and jumping to one other target within a small range.",
        Type: "Staff",
        Properties: {
            Damage: [
                { Type: "Lightning", Amount: 15 },
            ],
            Range: 200,
            Cooldown: 1000,
            Element: "Lightning",
            Effect: "Chain Lightning",
            ExtraTargets: 1
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "staff_evoker_1", Quantity: 1 }
    },

    {
        ID: "staff_ej_2",
        Name: "Apprentice Mage's Staff of Electro Jab",
        Sprite: "librarium-46",
        Desc: "A wooden staff with an Apprentice-level enchantment that fires a bolt of lightning towards the target, causing Lightning damage to the target, and jumping to two other targets within a small range.",
        Type: "Staff",
        Properties: {
            Damage: [
                { Type: "Lightning", Amount: 25 },
            ],
            Range: 200,
            Cooldown: 900,
            Element: "Lightning",
            Effect: "Chain",
            ExtraTargets: 2
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "staff_ej_2", Quantity: 1, Mods: { "Shaft": null } }
    },

    {
        ID: "staff_ej_3",
        Name: "Journeyman Mage's Staff of Electro Jab",
        Sprite: "librarium-47",
        Desc: "A more powerful wooden staff with a Journeyman-level enchantment that fires a bolt of lightning towards the target, causing Lightning damage to the target, and jumping to four other targets within a small range.",
        Type: "Staff",
        Properties: {
            Damage: [
                { Type: "Lightning", Amount: 50 },
            ],
            Range: 200,
            Cooldown: 900,
            Element: "Lightning",
            Effect: "Chain",
            ExtraTargets: 4
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "staff_ej_3", Quantity: 1, Mods: { "Shaft": null, "Empowerment Gem": null } }
    },

    {
        ID: "staff_ej_4",
        Name: "Expert Mage's Staff of Electro Jab",
        Sprite: "librarium-47",
        Desc: "A more powerful wooden staff with an Expert-level enchantment that fires a bolt of lightning towards the target, causing Lightning damage to the target, and jumping to seven other targets within a small range.",
        Type: "Staff",
        Properties: {
            Damage: [
                { Type: "Lightning", Amount: 125 },
            ],
            Range: 200,
            Cooldown: 800,
            Element: "Lightning",
            Effect: "Chain",
            ExtraTargets: 7
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "staff_ej_4", Quantity: 1, Mods: { "Shaft": null, "Empowerment Gem": null, "Focus Rune": null } }
    },

    {
        ID: "staff_ej_5",
        Name: "Master Mage's Staff of Electro Jab",
        Sprite: "librarium-47",
        Desc: "A more powerful wooden staff with a Master-level enchantment that fires a bolt of lightning towards the target, causing Lightning damage to the target, and jumping to ten other targets within a small range.",
        Type: "Staff",
        Properties: {
            Damage: [
                { Type: "Lightning", Amount: 200 },
            ],
            Range: 200,
            Cooldown: 750,
            Element: "Lightning",
            Effect: "Chain",
            ExtraTargets: 10
        },
        Stackable: false,
        Craftable: false,
        Moddable: false,
        InitialValue: { ID: "staff_ej_5", Quantity: 1, Mods: { "Shaft": null, "Empowerment Gem": null, "Focus Rune": null, "Relic": null } }
    },

];

Staffs.forEach((item) => {
    item.Category = "Staff";
});

export default Staffs;