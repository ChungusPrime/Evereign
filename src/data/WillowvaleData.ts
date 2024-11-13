const WillowvaleData: _Map = {
    
    MapName: "Willowvale",
    
    Type: "Exterior",
    
    Resources: ["Iron", "Stone", "Oak", "Marigold", "Humming Bass"],
    
    Enemies: [
        { ID: 442, OnDestroyAddFlag: 3 },
        { ID: 545, OnDestroyAddFlag: 4 },
        { ID: 546, OnDestroyAddFlag: 5 },
        { ID: 547, OnDestroyAddFlag: 6 },
        { ID: 557, OnDestroyAddFlag: 7 },
        { ID: 556, OnDestroyAddFlag: 8 },
        { ID: 558, OnDestroyAddFlag: 9 },
    ],

    Objects: [

    ],
    
    Towns: {
        "Little Piddleton": {
            Leader: "Scipius Bogtrotter"
        }
    },

    Buildings: [

        // Friendly buildings
        {
            ID: 5,
            Name: "Little Piddleton Town Hall",
            Type: "Town Centre",
            Level: 2
        },
        {
            ID: 6,
            Name: "Farm",
            Type: "Farm",
            Level: 2
        },
        {
            ID: 7,
            Name: "Farm",
            Type: "Farm",
            Level: 2
        },
        {
            ID: 8,
            Name: "Market",
            Type: "Market",
            Level: 1,
            Buying: [
                {
                    ResourceID: 1,
                    QuantityMin: 100,
                    QuantityMax: 400,
                    PriceMin: 2,
                    PriceMax: 4,
                },
                {
                    ResourceID: 2,
                    QuantityMin: 200,
                    QuantityMax: 300,
                    PriceMin: 3,
                    PriceMax: 5,
                },
                {
                    ResourceID: 3,
                    QuantityMin: 400,
                    QuantityMax: 600,
                    PriceMin: 1,
                    PriceMax: 3,
                }
            ],
            Selling: [

            ]
        },
        {
            ID: 9,
            Name: "Warehouse",
            Type: "Warehouse",
            Level: 1
        },
        {
            ID: 21,
            Name: "The Pale Moon Inn",
            Type: "Inn",
            Level: 1,
            PeopleAvailableForHire: {
                QuantityMax: 5,
                Types: [ "Lumberjack", "Farmer", "Miner" ]
            }
        },
        {
            ID: 342,
            Name: "Chiss Bluefield's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 343,
            Name: "Trom Bolder's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 344,
            Name: "Edna Hockleman's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 345,
            Name: "Vilhelm Dasfoe's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 346,
            Name: "Mardrin Falcknor's Home",
            Type: "Dwelling",
            Level: 2
        },

        // Neutral Buildings
        {
            ID: 219,
            Name: "Abandoned Mine",
            Type: "Abandoned Mine",
        },

        // Goblin Stuff
        {
            ID: 87,
            Name: "Goblin Outpost",
            Type: "Goblin Outpost",
            OnDestroyAddFlag: 2
        },
        {
            ID: 300,
            Name: "Goblin Tower",
            Type: "Goblin Tower",
        },
        {
            ID: 381,
            Name: "Goblin Tower",
            Type: "Goblin Tower",
        },
        {
            ID: 396,
            Name: "Goblin Tower",
            Type: "Goblin Tower",
        }

    ],

    Zones: [

        {
            ID: 394,
            Name: "Transition to Willowvale Caverns",
            Type: "Transition",
            TransitionToMap: "Willowvale Caverns",
            TransitionToObjectID: 1
        }

    ],

}


export default WillowvaleData;