const WarehouseData: BuildingData = {
    ID: "warehouse",
    Name: "Warehouse",
    Spritesheet: "Buildings",
    Sprite: "warehouse1",
    Size: { Width: 128, Height: 128 },
    PlotSize: { Width: 128, Height: 128 },
    Desc: `The warehouse provides storage space for all kinds of resources`,
    ResourceStorageIncrease: 1000,
    Tiers: {},
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
    RequiresMilestone: 0,
    AggroZone: false
};

export default WarehouseData;