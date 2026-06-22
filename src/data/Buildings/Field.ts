const FieldData: BuildingData = {
    ID: "field",
    Name: "Field",
    Desc: `Fields are worked by farmers and produce crops over time.`,
    Spritesheet: "Buildings",
    Sprite: "field",
    Size: { Width: 224, Height: 224 },
    PlotSize: { Width: 128, Height: 64 },
    WorkerSlots: 1,
    WorkerType: "Farmer",
    Skill: "Farming",
    Jobs: [
        { Name: "Grow Wheat",   LevelRequirement: 1 },
        { Name: "Grow Potatoes", LevelRequirement: 1 },
        { Name: "Grow Tea",     LevelRequirement: 2 },
        { Name: "Grow Coffee",  LevelRequirement: 2 },
        { Name: "Grow Cotton",  LevelRequirement: 3 },
        { Name: "Grow Hops",    LevelRequirement: 3 }
    ],
    AggroZone: false,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 8 }
        ]
    },
    Tiers: {},
    RequiresMilestone: 0
};

export default FieldData;