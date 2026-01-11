const JournalEntries: DialogueData = {

        Subjects: {

            "Entry One": {
                Text: `Finally, here I am, in the quaint forest of Willowvale. The journey was long and arduous, but I have arrived at last.\n
                According to my map, if I keep following the path to the west, I should reach the town of Little Piddleton very shortly.\n
                They must hear of my vision, of the impending darkness that threatens to engulf the realm. I must warn them, and quickly.`,
                Responses: [
                    { Text: 'Onward To Willowvale', Flag: "JournalEntries-EntryOne", EndDialogue: true, GrantQuest: "willowvale_little_piddleton" }
                ]
            },
    
            "Entry Two": {
                Text: `JournalEntryTwo`,
                Responses: [
                    { Text: 'Continue', Flag: "JournalEntries-EntryTwo", EndDialogue: true }
                ]
            },
    
            "Entry Three": {
                Text: `JournalEntryThree`,
                Responses: [
                    { Text: 'Continue', Flag: "JournalEntries-EntryThree", EndDialogue: true }
                ]
            }

        }

};


export default JournalEntries;