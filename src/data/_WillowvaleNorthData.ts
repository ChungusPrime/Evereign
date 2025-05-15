const WillowValeNorthData: StaticMapData = {
    MapName: "Willowvale North",
    Type: "Exterior",
    Music: "theme",
    Resources: [],
    Towns: [],
    Enemies: [],
    Buildings: [],
    Zones: [],
    Objects: [
        {
            ID: 75,
            Type: "Obstacle",
            RequiresActivatedSwitches: [70, 72]
        },
        {
            ID: 70,
            Type: "Switch",
            RequiresItem: "stone_coin_moon"
        },
        {
            ID: 72,
            Type: "Switch",
            RequiresItem: "stone_coin_star"
        }
    ]
}

export default WillowValeNorthData;