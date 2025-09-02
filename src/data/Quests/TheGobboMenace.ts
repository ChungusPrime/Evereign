const TheGobboMenace: QuestData = {
    ID: "willowvale_little_piddleton_goblins",
    Name: "The Gobbo Menace",
    Description: "There has been a sharp increase in Goblin activity in the area. I need to clear them out before I can continue my journey.",
    Rewards: [
        { ID: "town_centre_blueprint", Quantity: 1 }
    ],
    Objectives: [
        { 
            Text: 'Clear Goblin Camps 0/3',
            ProgressNeeded: 3
        },
        {
            Text: 'Tell the Mayor of Pond Meadow of your success',
            ProgressNeeded: 1
        }
    ],
    IntitialData: {
        ReadyToHandIn: false,
        Completed: false,
        ObjectiveProgress: [
            { Step: 0, Progress: 0, Completed: false, Visible: true },
            { Step: 1, Progress: 0, Completed: false, Visible: false }
        ]
    }
};

export default TheGobboMenace;
