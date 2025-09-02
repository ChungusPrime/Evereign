const TheSource: QuestData = {
    ID: "windy_ridge_intro",
    Name: "The Source",
    Description: `With the recent goblin activity in the area, the way through the Neverin Swamp has been blocked by a rock slide. 
    In exchange for information on how to get to the swamp, the Mayor has asked me to find and destroy the source of the goblins, 
    but first I must find it.`,
    Rewards: [],
    Objectives: [
        { 
            Text: 'Find the source of the goblins',
            ProgressNeeded: 1
        },
        { 
            Text: 'Inform the Mayor of Windy Ridge of your discovery',
            ProgressNeeded: 1
        },
        { 
            Text: 'Find someone who can help you destroy the source',
            ProgressNeeded: 1
        },
    ]
};

export default TheSource;