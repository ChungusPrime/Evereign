const ChapelData: BuildingData = {
    ID: "chapel",
    Name: "Chapel",
    Desc: `The chapel provides spiritual services to your citizens.`,
    Spritesheet: "Buildings",
    Sprite: "church1",
    Size: { Width: 128, Height: 128 },
    PlotSize: { Width: 128, Height: 128 },
    AggroZone: false,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 20 },
            { ItemID: "stone_rough", Quantity: 16 }
        ]
    },
    Tiers: {},
    RequiresMilestone: 0
};

export default ChapelData;
