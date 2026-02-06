const InnData: BuildingData = {
    ID: "inn",
    Name: "Inn",
    Desc: `The Inn provides a place for travelers to rest and recover. It can also serve as a gathering place for locals.`,
    Spritesheet: "Buildings",
    Sprite: "inn-1",
    Size: { Width: 224, Height: 224 },
    BaseHousingSlots: 10,
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
                { Resource: 150, Amount: 75 }
            ]
        }
    },
    RequiresMilestone: 0
};

export default InnData;