const GoblinOutpostData: BuildingData = {
    ID: "goblin_outpost",
    Name: "Orc Outpost",
    Desc: `A hostile outpost that spawns goblin units.`,
    Spritesheet: "Buildings",
    Sprite: "orc_outpost_1",
    Size: { Width: 128, Height: 128 },
    PlotSize: { Width: 128, Height: 64 },
    IsHostile: true,
    AggroZone: false,
    AggroRadius: 300,
    SpawnInterval: 3000,
    MaxSpawnCount: 3,
    BuildingCost: {},
    Tiers: {},
    RequiresMilestone: 0
};

export default GoblinOutpostData;