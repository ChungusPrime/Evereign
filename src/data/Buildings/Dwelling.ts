const Dwelling: BuildingData = {
    ID: "dwelling",
    Name: "Dwelling",
    Desc: `The Dwelling provides basic housing for citizens and is essential for the growth of your town.
    It can be upgraded to increase its capacity and provide better living conditions.`,
    Size: { Width: 128, Height: 128 },
    Spritesheet: "Buildings",
    Sprite: "dwelling1",
    PlotSize: { Width: 128, Height: 128 },
    BaseHousingSlots: 5,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 24 },
            { ItemID: "stone_rough", Quantity: 12 }
        ],
        2: [
            { ItemID: "plank_willow", Quantity: 24 },
            { ItemID: "stone_rough", Quantity: 48 },
            { ItemID: "ingot_iron", Quantity: 6 }
        ],
        3: [
            { ItemID: "plank_willow", Quantity: 72 },
            { ItemID: "ingot_steel", Quantity: 24 },
        ]
    },
    AggroZone: false,
    Tiers: {
        1: {
            Width: 224,
            Height: 224,
            BaseResourceCost: [
                { Resource: 100, Amount: 50 }
            ]
        }
    },
    RequiresMilestone: 0
};

export default Dwelling;