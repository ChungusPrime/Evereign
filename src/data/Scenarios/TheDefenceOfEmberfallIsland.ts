const EmberfallIsland: Scenario = {
    Name: "The Defence of Emberfall Island",
    Description: "Emberfall Island is under attack by a horde of orcs! Defend the island and its inhabitants from the invading forces.",
    StartingPosition: { X: 1600, Y: 1600 },
    MapKey: "EmberfallIsland",
    DaytimeDelta: 0,
    DaytimeHour: 12,
    DaytimeMinute: 0,
    WorldData: {
        "EmberfallIsland_Trigger": {
            Type: "Trigger",
            StartDialogue: "Emberfall Island Challenge",
            DialogueSubject: "Emberfall Island Challenge",
            InitialData: {
                Active: true
            },
        },
    },
};

export default EmberfallIsland;