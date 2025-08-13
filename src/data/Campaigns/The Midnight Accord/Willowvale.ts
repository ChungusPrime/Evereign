export const Willowvale: WorldData = {
    
    "442": {
        Type: "Goblin Slinger",
        Level: 1,
    },
    "545": {
        Type: "Goblin Slinger",
        Level: 1
    },
    "546": {
        Type: "Goblin Slinger",
        Level: 1
    },
    "547": {
        Type: "Goblin Slinger",
        Level: 1
    },
    "382": {
        Type: "Chest"
    },
    "607": {
        Type: "Red Chest",
        RequiresItem: "iron_key"
    },
    "566": {
        Type: "Gorgutz' Chest",
        RequiresItem: "gorgutz_key"
    },
    "666": {
        Type: "Test Chest"
    },
    "713": {
        Type: "Town Centre",
        Name: "Little Piddleton Town Hall",
        Level: 2,
        Person: "Scipius Bogtrotter"
    },
    "667": {
        Type: "Dwelling",
        Name: "Chiss Bluefield's Home",
        Level: 2
    },
    "690": {
        Type: "Dwelling",
        Name: "Marjory Gerder's Home",
        Level: 2
    },
    "691": {
        Type: "Dwelling",
        Name: "Trom Bolder's Home",
        Level: 2
    },
    "693": {
        Type: "Farm",
        Name: "Bluefield's Farm",
        Level: 2
    },
    "694": {
        Type: "Farm",
        Name: "McCratney Family Farm",
        Level: 2
    },
    "695": {
        Type: "Dwelling",
        Name: "Jack McCratney's Home",
        Level: 2
    },
    "700": {
        Type: "Dwelling",
        Name: "Edna Hockleman's Home",
        Level: 2
    },
    "702": {
        Type: "Dwelling",
        Name: "Vilhelm Dasfoe's Home",
        Level: 2
    },
    "703": {
        Type: "Dwelling",
        Name: "Mardrin Falcknor's Home",
        Level: 2
    },
    "8": {
        Type: "Market",
        Name: "Little Piddleton General",
        Level: 1,
        Buying: [{
            ID: "1",
            QuantityMin: 100,
            QuantityMax: 400,
            PriceMin: 2,
            PriceMax: 4,
            CurrentQuantity: 0,
            CurrentPrice: 0
        },
        {
            ID: "2",
            QuantityMin: 200,
            QuantityMax: 300,
            PriceMin: 3,
            PriceMax: 5,
            CurrentQuantity: 0,
            CurrentPrice: 0
        },
        {
            ID: "3",
            QuantityMin: 400,
            QuantityMax: 600,
            CurrentQuantity: 0,
            PriceMin: 1,
            PriceMax: 3,
            CurrentPrice: 2
        }
    ],
    Selling: [
        
    ]
},
"9": {
    Type: "Warehouse",
    Name: "Little Piddleton Warehouse",
    Level: 1
},
"21": {
    Type: "Inn",
    Name: "The Pale Moon Inn",
    Level: 1,
    PeopleAvailableForHire: {
        QuantityMax: 5,
        Types: ["Lumberjack", "Farmer", "Miner"]
    }
},
"219": {
    Type: "Abandoned Mine",
    Name: "Abandoned Mine",
    Level: 1
},
"87": {
    Type: "Goblin Outpost",
    Name: "Goblin Outpost",
    Level: 1,
    OnDestroyDisableObstacle: [554, 555]
},
"300": {
    Type: "Goblin Tower",
    Name: "Goblin Tower",
    Level: 1
},
"381": {
    Type: "Goblin Tower",
    Name: "Goblin Tower",
    Level: 1
},
"396": {
    Type: "Goblin Tower",
    Name: "Goblin Tower",
    Level: 1
},

// Triggers
"616": {
    Type: "Trigger",
    QuestProgressID: "willowvale_test_map",
    QuestProgressStep: 0,
    QuestUnlockStep: 1
},
"394": {
    ID: 394,
    Name: "Transition to Willowvale Caverns",
    Type: "Transition",
    DestinationX: 192,
    DestinationY: 3136,
    TransitionToMap: "WillowvaleCaverns",
},
"427": {
    ID: 427,
    Name: "Transition to Willowvale Caverns",
    Type: "Transition",
    DestinationX: 192,
    DestinationY: 3136,
    TransitionToMap: "WillowvaleCaverns",
},
"722": {
    Type: "Trigger",
    QuestProgressID: "willowvale_little_piddleton",
    QuestProgressStep: 0,
    QuestUnlockStep: 1
},

};