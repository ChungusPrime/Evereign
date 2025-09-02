const UncoveringMarXanthir: QuestData = {
    ID: "pond_meadow_to_mar_xanthir",
    Name: "Uncovering Mar'Xanthir",
    Description: `The only way to reach the swamp now is through a burial cave called Mar'Xanthir, 
    but I need 2 stone coins to unlock the way. One of the coins was lost in Willowvale, and the other was taken by the goblins.`,
    Rewards: [],
    Objectives: [
        { 
            Text: 'Find The Moon Coin',
            ProgressNeeded: 1
        },
        { 
            Text: 'Find The Star Coin',
            ProgressNeeded: 1
        },
        { 
            Text: `Enter Mar'Xanthir`,
            ProgressNeeded: 1
        },
    ]
};

export default UncoveringMarXanthir;