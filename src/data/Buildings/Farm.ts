const FarmData: BuildingData = {
    ID: "farm",
    Name: "Farm",
    Desc: `The farm provides food for your citizens and workers.`,
    Spritesheet: "Buildings",
    Sprite: "farm1",
    Size: { Width: 224, Height: 224 },
    PlotSize: { Width: 128, Height: 64 },
    WorkerSlots: 1,
    WorkerType: "Farmer",
    Skill: "Farming",
    AggroZone: false,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 16 },
            { ItemID: "stone_rough", Quantity: 8 }
        ]
    },
    Tiers: {},
    RequiresMilestone: 0
};

export default FarmData;