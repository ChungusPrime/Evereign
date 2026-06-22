const MarketData: BuildingData = {
    ID: "market",
    Name: "Market",
    Desc: `The market allows you to buy and sell goods with travelling merchants.`,
    Spritesheet: "Buildings",
    Sprite: "market1",
    Size: { Width: 128, Height: 128 },
    PlotSize: { Width: 128, Height: 64 },
    Type: "Market",
    AggroZone: false,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 20 },
            { ItemID: "stone_rough", Quantity: 10 }
        ]
    },
    Tiers: {},
    RequiresMilestone: 0
};

export default MarketData;