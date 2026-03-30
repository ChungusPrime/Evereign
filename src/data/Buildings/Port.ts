const PortData: BuildingData = {
    ID: "port",
    Name: "Port",
    Spritesheet: "Buildings",
    Sprite: "port-1",
    Size: {
        Width: 0,
        Height: 0
    },
    Desc: "",
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

export default PortData;