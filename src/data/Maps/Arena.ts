const ArenaData: WorldData = {

    "Arena_Trigger": {
        Type: "Trigger",
        StartDialogue: "Arena Challenge",
        DialogueSubject: "Arena Challenge",
        InitialData: {
            Active: true
        },
    },

    "Test_Orc_Outpost_1": {
        Type: "Orc Outpost",
        Name: "Orc Outpost",
        Level: 1,
        OnDestroyDisableObstacle: [],
        InitialData: {
            Units: [
                { Name: "Orc Slinger", Total: 1, Alive: 0, Dead: 0, Level: 1, Modifiers: ["Fortified"] },
                { Name: "Orc Slinger", Total: 1, Alive: 0, Dead: 0, Level: 2, Modifiers: ["Aggressive"] },
                { Name: "Orc Slinger", Total: 1, Alive: 0, Dead: 0, Level: 3, Modifiers: ["Infested"] },
            ]
        }
    },

    "Test_Chest_1": {
        Type: "Chest",
        Name: "Wooden Chest",
        InitialData: {
            Unlocked: true,
            Loot: [
                { ItemID: "gold", Amount: 50 },
                { ItemID: "shard_valius", Amount: 1 },
                { ItemID: "town_centre_blueprint", Amount: 1 },
            ]
        }
    },

    "orcish1": {
        Type: "Orc Slinger",
        Level: 1,
        Modifiers: ["Fortified"],
        InitialData: {
            Alive: true,
            Health: 10
        }
    },

    "orcish2": {
        Type: "Orc Slinger",
        Level: 2,
        Modifiers: ["Brutal"],
        InitialData: {
            Alive: true,
            Health: 10
        }
    },

}

export default ArenaData;