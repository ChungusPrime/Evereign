const WarchiefGorgutz: QuestData = {
    ID: "pond_meadow_kill_gorgutz",
    Name: "Warchief Gorgutz",
    Description: "I have been informed that a rather large Goblin Warchief has been leading the goblins in the area. I need to take him out before I can continue my journey.",
    Rewards: [
        { ID: "warehouse_blueprint", Quantity: 1 },
        { ID: "mine_blueprint", Quantity: 1 },
        { ID: "logging_camp_blueprint", Quantity: 1 }
    ],
    Objectives: [
        {
            Text: 'Slay Warchief Gorgutz',
            ProgressNeeded: 1
        }
    ],
};

export default WarchiefGorgutz;
