const EmberfallIsland: WorldData = {
    "1":{
        ID: 1,
        Type: "Test Chest",
        Loot: []
    },
    "2": {
        ID: 2,
        Type: "Test Locked Chest",
        RequiresItem: "iron_key",
        Loot: [],
    },
    "3": {
        ID: 4,
        Type: "Switch",
        RequiresItem: "iron_key",
    },
    "4":{
        ID: 5,
        Type: "Obstacle",
        RequiresActivatedSwitches: [4],
    },
}

export default EmberfallIsland;