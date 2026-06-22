const Tutorial: Scenario = {
    Name: "Tutorial",
    Description: "Welcome to the tutorial! This scenario will guide you through the basics of Evereign, including combat, building, and resource management. Follow the instructions and complete the objectives to learn how to play the game.",
    StartingPosition: { X: 1600, Y: 1600 },
    MapKey: "Tutors Island",
    DaytimeDelta: 0,
    DaytimeHour: 12,
    DaytimeMinute: 0,
    WorldData: {
        "Tutorial_Trigger": {
            Type: "Trigger",
            StartDialogue: "Tutorial Challenge",
            DialogueSubject: "Tutorial Challenge",
            InitialData: {
                Active: true
            },
        },
    },
};

export default Tutorial;