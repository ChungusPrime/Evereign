const BallistaTowerData: BuildingData = {
    ID: "ballista_tower",
    Name: "Ballista Tower",
    Desc: `Basic defensive tower, will fire ballistae at enemies within its range`,
    Spritesheet: "Buildings",
    Sprite: "BallistaTower",
    Size: { Width: 64, Height: 64 },
    PlotSize: { Width: 128, Height: 64 },
    Type: "Defensive",
    AggroZone: false,
    BuildingCost: {
        1: [
            { ItemID: "log_willow", Quantity: 12 },
            { ItemID: "stone_rough", Quantity: 6 }
        ]
    },
    Tiers: {},
    RequiresMilestone: 0
};

export default BallistaTowerData;