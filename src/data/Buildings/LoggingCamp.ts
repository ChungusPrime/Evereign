const LoggingCampData: BuildingData = {
    ID: "logging_camp",
    Name: "Logging Camp",
    Desc: `The logging camp harvests timber from nearby forests.`,
    Spritesheet: "Buildings",
    Sprite: "loggingcamp1",
    Size: { Width: 128, Height: 64 },
    PlotSize: { Width: 128, Height: 64 },
    AggroZone: false,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 8 },
            { ItemID: "stone_rough", Quantity: 4 }
        ]
    },
    Tiers: {},
    RequiresMilestone: 0
};

export default LoggingCampData;