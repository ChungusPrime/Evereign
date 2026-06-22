const GoblinTowerData: BuildingData = {
    ID: "goblin_tower",
    Name: "Orc Tower",
    Desc: `A hostile tower that spawns goblin units to defend it.`,
    Spritesheet: "Buildings",
    Sprite: "goblin_tower_1",
    Size: { Width: 64, Height: 64 },
    PlotSize: { Width: 128, Height: 64 },
    IsHostile: true,
    AggroZone: true,
    AggroRadius: 250,
    SpawnInterval: 3000,
    MaxSpawnCount: 3,
    BuildingCost: {},
    Tiers: {},
    RequiresMilestone: 0
};

export default GoblinTowerData;