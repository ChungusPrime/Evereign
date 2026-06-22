const MineData: BuildingData = {
    ID: "mine",
    Name: "Mine",
    Desc: `The mine extracts ore and stone from the earth.`,
    Spritesheet: "Buildings",
    Sprite: "mine1",
    Size: { Width: 128, Height: 64 },
    PlotSize: { Width: 128, Height: 64 },
    AggroZone: false,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 12 },
            { ItemID: "stone_rough", Quantity: 8 }
        ]
    },
    Tiers: {},
    RequiresMilestone: 0
};

export default MineData;