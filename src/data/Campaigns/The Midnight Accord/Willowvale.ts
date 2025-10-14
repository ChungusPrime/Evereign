export const Willowvale: WorldData = {

    "Journal_One_Trigger": {
        Type: "Trigger",
        StartDialogue: "Journal Entries",
        DialogueSubject: "Entry One",
        InitialData: {
            Active: true
        },
    },

    "WV_Abandoned_Shack": {
        Type: "Dwelling",
        Name: "Abandoned Shack",
        InitialData: {
            Tier: 1,
            Owner: "Unknown"
        }
    },

    "WV_Discover_LP": {
        Type: "Trigger",
        QuestProgressID: "willowvale_little_piddleton",
        QuestProgressStep: 0,
        QuestUnlockStep: 1,
        InitialData: {
            Active: true
        },
    },

    "LP_Ballista_Tower_1": {
        Type: "Ballistae Tower",
        InitialData: {}
    },

    "LP_Ballista_Tower_2": {
        Type: "Ballistae Tower",
        InitialData: {}
    },

    "LP_Dorris_Shop": {
        Type: "Shop",
        InitialData: {
            Inventory: [
                { ItemID: "health_potion", Amount: 5 },
                { ItemID: "mana_potion", Amount: 3 },
            ]
        }
    },

    "LP_General_Shop": {
        Type: "Market",
        Name: "Little Piddleton General",
        Level: 1,
        InitialData: {
            Buying: [
                { ID: "pickaxe_bronze", Price: 23, Amount: 5 },
                { ID: "bronze_felling_axe", Price: 17, Amount: 8 },
                { ID: "bronze_fishing_rod", Price: 14, Amount: 3 },
            ],
            Selling: [
                { ID: "stone_rough", Price: 1, Amount: 150 },
                { ID: "marigold", Price: 2, Amount: 150 },
            ]
        }
    },

    "LP_Hraderman_Shop": {
        Type: "Shop",
        InitialData: {
            Inventory: [
                { ItemID: "health_potion", Amount: 5 },
                { ItemID: "mana_potion", Amount: 3 },
            ]
        }
    },

    "LP_Pale_Moon_Inn": {
        Type: "Inn",
        Name: "The Pale Moon Inn",
        Level: 1,
        InitialData: {
            PeopleAvailableForHire: {
                QuantityMax: 5,
                Types: ["Lumberjack", "Farmer", "Miner"]
            }
        }
    },

    "LP_Marjory_Home": {
        Type: "Dwelling",
        Name: "Marjory Gerder's Home",
        Level: 2,
        InitialData: {}
    },

    "LP_Bodmin_Home": {
        Type: "Dwelling",
        Name: "Bodmin Wazzock's Home",
        Level: 2,
        InitialData: {}
    },

    "LP_Trom_Home": {
        Type: "Dwelling",
        Name: "Trom Bolder's Home",
        Level: 2,
        InitialData: {}
    },

    "LP_Edna_Home": {
        Type: "Dwelling",
        Name: "Edna Hockleman's Home",
        Level: 2,
        InitialData: {}
    },

    "LP_Vilhelm_Home": {
        Type: "Dwelling",
        Name: "Vilhelm Dasfoe's Home",
        Level: 2,
        InitialData: {}
    },

    "WV_World_Goblin_1": {
        Type: "Goblin Slinger",
        Level: 1,
        InitialData: {
            Alive: true,
            Health: 10
        }
    },
    "WV_World_Goblin_2": {
        Type: "Goblin Slinger",
        Level: 1,
        InitialData: {
            Alive: true,
            Health: 10
        }
    },
    "WV_World_Goblin_3": {
        Type: "Goblin Slinger",
        Level: 1,
        InitialData: {
            Alive: true,
            Health: 10
        }
    },
    "WV_World_Goblin_4": {
        Type: "Goblin Slinger",
        Level: 1,
        InitialData: {
            Alive: true,
            Health: 10
        }
    },


    "382": {
        Type: "Chest",
        InitialData: {
            Unlocked: true,
            Loot: [
                { ItemID: "gold", Amount: 50 },
                { ItemID: "shard_valius", Amount: 1 },
                { ItemID: "iron_key", Amount: 1 },
            ]
        }
    },
    "607": {
        Type: "Red Chest",
        InitialData: {
            Unlocked: false,
            Loot: [
                { ItemID: "gold", Amount: 100 },
                { ItemID: "iron_key", Amount: 1 },
            ],
        }
    },
    "566": {
        Type: "Gorgutz' Chest",
        RequiresItem: "gorgutz_key",
        InitialData: {
            Unlocked: false,
            Loot: [
                { ItemID: "gold", Amount: 200 },
                { ItemID: "gorgutz_axe", Amount: 1 },
            ],
        }
    },
    "666": {
        Type: "Test Chest",
        InitialData: {
            Unlocked: true,
            Loot: [
                { ItemID: "town_centre_blueprint", Amount: 1 },
                { ItemID: "apprentice_spellbook", Amount: 1 },
            ],
        }
    },
    "713": {
        Type: "Town Centre",
        Name: "Little Piddleton Town Hall",
        Level: 2,
        Person: "Scipius Bogtrotter",
        InitialData: {

        }
    },
    "667": {
        Type: "Dwelling",
        Name: "Chiss Bluefield's Home",
        Level: 2,
        InitialData: {

        }
    },
    "690": {
        Type: "Dwelling",
        Name: "Marjory Gerder's Home",
        Level: 2,
        InitialData: {

        }
    },
    "691": {
        Type: "Dwelling",
        Name: "Trom Bolder's Home",
        Level: 2,
        InitialData: {

        }
    },
    "693": {
        Type: "Farm",
        Name: "Bluefield's Farm",
        Level: 2,
        InitialData: {

        }
    },
    "694": {
        Type: "Farm",
        Name: "McCratney Family Farm",
        Level: 2,
        InitialData: {

        }
    },
    "695": {
        Type: "Dwelling",
        Name: "Jack McCratney's Home",
        Level: 2,
        InitialData: {
            
        }
    },
    "700": {
        Type: "Dwelling",
        Name: "Edna Hockleman's Home",
        Level: 2,
        InitialData: {

        }
    },
    "702": {
        Type: "Dwelling",
        Name: "Vilhelm Dasfoe's Home",
        Level: 2,
        InitialData: {

        }
    },
    "703": {
        Type: "Dwelling",
        Name: "Mardrin Falcknor's Home",
        Level: 2,
        InitialData: {

        }
    },

    "9": {
        Type: "Warehouse",
        Name: "Little Piddleton Warehouse",
        Level: 1,
        InitialData: {

        }
    },
    "219": {
        Type: "Abandoned Mine",
        Name: "Abandoned Mine",
        Level: 1,
        InitialData: {

        }
    },
    "87": {
        Type: "Goblin Outpost",
        Name: "Goblin Outpost",
        Level: 1,
        OnDestroyDisableObstacle: [554, 555],
        InitialData: {
            Units: [
                { Name: "Goblin Slinger", Total: 3, Alive: 0, Dead: 0 },
            ]
        }
    },
    "300": {
        Type: "Goblin Tower",
        Name: "Goblin Tower",
        Destroyed: false,
        Level: 1,
        InitialData: {
            Units: [
                { Name: "Goblin Slinger", Total: 3, Alive: 0, Dead: 0 },
            ]
        }
    },
    "381": {
        Type: "Goblin Tower",
        Name: "Goblin Tower",
        Level: 1,
        InitialData: {
            Alive: true,
            Health: 10,
            Units: [
                { Name: "Goblin Slinger", Total: 3, Alive: 0, Dead: 0 },
            ]
        }
    },
    "396": {
        Type: "Goblin Tower",
        Name: "Goblin Tower",
        Level: 1,
        InitialData: {
            Alive: true,
            Health: 10,
            Units: [
                { Name: "Goblin Slinger", Total: 3, Alive: 0, Dead: 0 },
            ]
        }
    },
    "616": {
        Type: "Transition",
        QuestProgressID: "willowvale_test_map",
        InitialData: {
            Active: true
        },
    },
    "394": {
        ID: 394,
        Name: "Transition to Willowvale Caverns",
        Type: "Transition",
        DestinationX: 192,
        DestinationY: 3136,
        TransitionToMap: "WillowvaleCaverns",
        InitialData: {
            Active: true
        },
    },
    "427": {
        ID: 427,
        Name: "Transition to Willowvale Caverns",
        Type: "Transition",
        DestinationX: 192,
        DestinationY: 3136,
        TransitionToMap: "WillowvaleCaverns",
        InitialData: {
            Active: true
        },
    }
};