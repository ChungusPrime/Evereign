const QuestData: QuestData[] = [
    
    {
        ID: "willowvale_little_piddleton",
        Name: "To Little Piddleton",
        Description: "The first stop in my mission is Little Piddleton. It's a small town, but it's a start.",
        Rewards: [],
        Objectives: [
            { 
                Text: 'Find Little Piddleton',
                ProgressNeeded: 1
            },
            {
                Text: 'Talk to the Mayor of Little Piddleton and tell him of your vision',
                ProgressNeeded: 1
            }
        ]
    },

    {
        ID: "willowvale_little_piddleton_goblins",
        Name: "The Gobbo Menace",
        Description: "There has been a sharp increase in Goblin activity in the area. I need to clear them out before I can continue my journey.",
        Rewards: ["town_centre_blueprint"],
        Objectives: [
            { 
                Text: 'Clear Goblin Camps 0/3',
                ProgressNeeded: 3
            },
            {
                Text: 'Tell the Mayor of Pond Meadow of your success',
                ProgressNeeded: 1
            }
        ]
    },

    {
        ID: "pond_meadow_kill_gorgutz",
        Name: "Warchief Gorgutz",
        Description: "I have been informed that a rather large Goblin Warchief has been leading the goblins in the area. I need to take him out before I can continue my journey.",
        Rewards: ["warehouse_blueprint", 'mine_blueprint', 'logging_camp_blueprint'],
        Objectives: [
            { 
                Text: 'Slay Warchief Gorgutz',
                ProgressNeeded: 1
            }
        ]
    },

    {
        ID: "pond_meadow_to_windy_ridge",
        Name: "To Windy Ridge",
        Description: "Now that the Goblin threat has been quelled, the Mayor of Pond Meadow has informed me that the next town on my journey is Windy Ridge. I should head there next.",
        Rewards: [""],
        Objectives: [
            { 
                Text: 'Talk to the Mayor of Windy Ridge',
                ProgressNeeded: 1
            }
        ]
    },

    {
        ID: "windy_ridge_intro",
        Name: "The Source",
        Description: `With the recent goblin activity in the area, the way through the Neverin Swamp has been blocked by a rock slide. 
        In exchange for information on how to get to the swamp, the Mayor has asked me to find and destroy the source of the goblins, 
        but first I must find it.`,
        Rewards: [""],
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
    },

    {
        ID: "windy_ridge_the_gobbo_tree",
        Name: "The Great Gobbo Tree",
        Description: `I must find and return some ingredients to the wizard in Windy Ridge so that he can help me destroy the Great Gobbo Tree.`,
        Rewards: [""],
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
    },

    {
        ID: "pond_meadow_to_mar_xanthir",
        Name: "The Great Gobbo Tree",
        Description: `The only way to reach the swamp now is through a burial cave called Mar'Xanthir, 
        but I need 2 stone coins to unlock the way. One of the coins was lost in Willowvale, and the other was taken by the goblins.`,
        Rewards: [""],
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
    },

];

export default QuestData;