const WillowvaleData: StaticMapData = {
    MapName: "Willowvale",
    Type: "Exterior",
    Resources: ["Iron", "Stone", "Oak", "Marigold", "Humming Bass", "River Tomato"],
    Music: "theme",
    Objects: [
        {
            ID: 382,
            Type: "Chest",
        },
        {
            ID: 607,
            Type: "Red Chest",
            RequiresItem: "iron_key",
        },
        {
            ID: 566,
            Type: "Gorgutz' Chest",
            RequiresItem: "gorgutz_key",
        },
        {
            ID: 666,
            Type: "Test Chest",
        }
    ],

    // Static Building Data
    Buildings: [
        {
            ID: 713,
            Name: "Little Piddleton Town Hall",
            Type: "Town Centre",
            Level: 2,
            Person: "Scipius Bogtrotter"
        },
        {
            ID: 667,
            Name: "Chiss Bluefield's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 690,
            Name: "Marjory Gerder's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 691,
            Name: "Trom Bolder's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 693,
            Name: "Bluefield's Farm",
            Type: "Farm",
            Level: 2
        },
        {
            ID: 694,
            Name: "McCratney Family Farm",
            Type: "Farm",
            Level: 2
        },
        {
            ID: 695,
            Name: "Jack McCratney's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 700,
            Name: "Edna Hockleman's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 702,
            Name: "Vilhelm Dasfoe's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 703,
            Name: "Mardrin Falcknor's Home",
            Type: "Dwelling",
            Level: 2
        },
        {
            ID: 8,
            Name: "Little Piddleton General",
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
            ID: 219,
            Name: "Abandoned Mine",
            Type: "Abandoned Mine",
            Level: 1
        },
        {
            ID: 87,
            Name: "Goblin Outpost",
            Type: "Goblin Outpost",
            OnDestroyDisableObstacle: [554, 555],
            Level: 1
        },
        {
            ID: 300,
            Name: "Goblin Tower",
            Type: "Goblin Tower",
            Level: 1
        },
        {
            ID: 381,
            Name: "Goblin Tower",
            Type: "Goblin Tower",
            Level: 1
        },
        {
            ID: 396,
            Name: "Goblin Tower",
            Type: "Goblin Tower",
            Level: 1
        }
        
    ],
    
    Zones: [
        {
            ID: 394,
            Name: "Transition to Willowvale Caverns",
            Type: "Transition",
            DestinationX: 192,
            DestinationY: 3136,
            TransitionToMap: "WillowvaleCaverns",
        },
        {
            ID: 427,
            Name: "Transition to Willowvale Caverns",
            Type: "Transition",
            DestinationX: 192,
            DestinationY: 3136,
            TransitionToMap: "WillowvaleCaverns",
        },
        {
            ID: 616,
            Name: "To Test Map",
            Type: "Transition",
            DestinationX: 271,
            DestinationY: 101,
            TransitionToMap: "TestMap",
        },
        {
            ID: 722,
            Name: "Little Piddleton Trigger",
            Type: "Trigger",
            QuestProgressID: "willowvale_little_piddleton",
            QuestProgressStep: 0,
            QuestUnlockStep: 1,
        }
    ],
    
}

export default WillowvaleData;