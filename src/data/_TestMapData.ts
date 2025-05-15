const TestMapData: StaticMapData = {
    MapName: "Test Map",
    Type: "Interior",
    Music: "theme",
    Resources: [],
    Towns: [],
    Enemies: [],
    Buildings: [],
    Zones: [],
    Objects: [
        {
            ID: 1,
            Type: "Test Chest",
            Loot: []
        },
        {
            ID: 2,
            Type: "Test Locked Chest",
            RequiresItem: "iron_key",
            Loot: [],
        },
        {
            ID: 4,
            Type: "Switch",
            RequiresItem: "iron_key",
        },
        {
            ID: 5,
            Type: "Obstacle",
            RequiresActivatedSwitches: [4],
        },
    ]
}

export default TestMapData;