const ArenaData: Campaign = {

    ID: "Arena",
    Name: "Arena",
    Description: `Arena`,

    Available: true,
    StartingMap: "Arena",
    StartingX: 1600,
    StartingY: 1600,
    StartingHour: 12,
    StartingMinute: 0,

    WorldMapInformation: {
        Arena: {
            Name: "Arena",
            Description: "A serene valley filled with lush greenery and hidden secrets.",
            Image: "arena_map.png",
            Size: { Width: 8000, Height: 6000 },
            MapName: "Arena",
            Type: "Exterior",
            Resources: ["Iron Deposit", "Stone Deposit", "Oak Tree", "Marigold", "Humming Bass", "River Tomato"],
            Music: "theme",
        },
    },

    WorldData: {
        "Arena": {
            "Arena_Trigger": {
                Type: "Trigger",
                StartDialogue: "Arena Challenge",
                DialogueSubject: "Arena Challenge",
                InitialData: {
                    Active: true
                },
            },
        }
    }

}

export default ArenaData;