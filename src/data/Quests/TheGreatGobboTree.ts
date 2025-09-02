const TheGreatGobboTree: QuestData = {
    ID: "windy_ridge_the_gobbo_tree",
    Name: "The Great Gobbo Tree",
    Description: `I must find and return some ingredients to the wizard in Windy Ridge so that he can help me destroy the Great Gobbo Tree.`,
    Rewards: [],
    Objectives: [
        { 
            Text: `Collect Agramon's Root`,
            ProgressNeeded: 3
        },
        { 
            Text: `Collect Shriving Charm`,
            ProgressNeeded: 1
        },
        { 
            Text: 'Collect Bitterbark',
            ProgressNeeded: 3
        },
        {
            Text: 'Return the ingredients to the wizard in Windy Ridge',
            ProgressNeeded: 1
        },
        {
            Text: 'Destroy the Gobbo Tree',
            ProgressNeeded: 1
        },
        {
            Text: 'Return to the Mayor of Windy Ridge',
            ProgressNeeded: 1
        },
    ]
};

export default TheGreatGobboTree;