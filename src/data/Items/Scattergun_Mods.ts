const ScattergunMods: ItemData[] = [

    {
        ID: "Reinforced_Barrel",
        Name: "Reinforced Barrel",
        Sprite: "weapons-293",
        Desc: "A simple yet effective barrel upgrade that increases the Scattergun's damage and pellet count.",
        Stackable: false,
        Craftable: true,
        Crafting: {
            Materials: [
                { ID: "iron_ingot", Amount: 2 },
                { ID: "wood_plank", Amount: 2 }
            ],
        },
        Properties: {
            Damage: [
                { Type: "Force", Amount: 2 }
            ],
            Pellets: 2,
        },
        InitialValue: { ID: "Reinforced_Barrel", Quantity: 1 }
    },

    {
        ID: "Extended_Barrel",
        Name: "Extended Barrel",
        Sprite: "weapons-293",
        Desc: "An extended barrel that increases the Scattergun's range and damage, allowing for more effective long-range shots.",
        Stackable: false,
        Craftable: true,
        Crafting: {
            Materials: [
                { ID: "steel_ingot", Amount: 3 },
                { ID: "wood_plank", Amount: 2 }
            ],
        },
        Properties: {
            Range: 100,
            Damage: [
                { Type: "Force", Amount: 4 }
            ],
        },
        InitialValue: { ID: "Extended_Barrel", Quantity: 1 }
    },

    {
        ID: "Precision_Barrel",
        Name: "Precision Barrel",
        Sprite: "weapons-293",
        Desc: "A precision-engineered barrel that improves accuracy and reduces recoil, making it easier to hit targets at range.",
        Stackable: false,
        Craftable: true,
        Crafting: {
            Materials: [
                { ID: "aluminum_ingot", Amount: 2 },
                { ID: "wood_plank", Amount: 2 }
            ],
        },
        Properties: {
            Accuracy: 0.1,
            RecoilReduction: 0.2,
        },
        InitialValue: { ID: "Precision_Barrel", Quantity: 1 }
    },

];

ScattergunMods.forEach((item) => {
    item.Category = "Mod";
    item.Type = "Scattergun";
    item.Slot = "Barrel";
});

export default ScattergunMods;