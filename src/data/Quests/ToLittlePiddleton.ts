const ToLittlePiddleton: QuestData = {
    ID: "willowvale_little_piddleton",
    Name: "To Little Piddleton",
    Description: "The first stop in my mission is Little Piddleton. It's a small town, but it's a start.",
    Rewards: [
        { ID: "town_centre_blueprint", Quantity: 1 },
    ],
    Objectives: [
        {
            Text: 'Find Little Piddleton',
            ProgressNeeded: 1
        },
        {
            Text: 'Rest for the night at the inn in Little Piddleton',
            ProgressNeeded: 1
        },
        { 
            Text: 'Destroy Orc siege tunnels near Little Piddleton',
            ProgressNeeded: 2
        },
        {
            Text: 'Talk to the Mayor of Little Piddleton and tell him of your vision',
            ProgressNeeded: 1
        },

    ],
    IntitialData: {
        ID: "willowvale_little_piddleton",
        ReadyToHandIn: false,
        Completed: false,
        ObjectiveProgress: [
            { Step: 0, Progress: 0, Completed: false, Visible: true },
            { Step: 1, Progress: 0, Completed: false, Visible: false },
            { Step: 2, Progress: 0, Completed: false, Visible: false },
            { Step: 3, Progress: 0, Completed: false, Visible: false }
        ]
    }
};

export default ToLittlePiddleton;
