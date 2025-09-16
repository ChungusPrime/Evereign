const ScipiusDialogue = {
    FirstTimeGreeting: `Good day sir, I haven't seen your face before and you're certainly better dressed than anyone in Willowvale. 
                        Do you travel from the Capital? I would be happy to discuss local tidings with you.`,
    NormalGreeting: `Greetings, {playerName}. How can I help you?`,
    Subjects: {

        "Ask about Little Piddleton": {
            Text: `We are a humble village, loyal to the crown. Our main exports are wheat and oats from our farmland, and our village is famed for it's delicious oatcakes.`,
            Responses: [
                { Text: 'Back', Flag: "ScipiusLittlePiddletonInfo", GoToMain: true }
            ]
        },

        "Tell Scipius of your vision": {

            // The ID of the quest to complete
            CompleteQuest: "willowvale_little_piddleton",

            // The ID of the quest to progress
            QuestProgressID: "willowvale_little_piddleton",

            // The specific objective of the quest to add progress to
            QuestProgressStep: 1,

            // Dont show dialogue if the player is on a specific quest
            HideIfOnQuest: "willowvale_little_piddleton_goblins",
            
            Text: `Well, that is certainly quite the tale. It's not entirely unbelievable, especially given recent events. Currently all of our efforts are focussed on quelling the recent 
                   embiggening of goblin numbers in Willowvale. If you were willing to lend your aid to us, it would allow us to offer our help to your cause.`,
                   
            Responses: [
                { Text: 'Offer to help Scipius', Flag: "AcceptQuest", GrantQuest: "willowvale_little_piddleton_goblins", GoToSubject: "Quest Accepted", DestroyObstacles: [725, 726, 727, 728] },
                { Text: 'Decline to help', Flag: "QuestRejected", GoToSubject: "Quest Rejected" }
            ]
        },

        "Ask about the goblin attacks": {
            RequiresQuest: "willowvale_little_piddleton_goblins",
            Text: `There have always been goblins in the area, but recently their numbers have increased dramatically. They've been attacking our farms, stealing our livestock, and causing general chaos.
            If you can clear the path towards Pond Meadow, just north of here, it will allow us to push the goblins back and re-establish trade with Pond Meadow.`,
            Responses: [
                { Text: 'Back', Flag: "LittlePiddletonQuestInfo1", GoToMain: true }
            ]
        },

        "Quest Accepted": {
            Hidden: true,
            Text: `Thank you, {PlayerName}! I am sure the people of Little Piddleton and Willowvale as a whole will be most grateful for your assistance. You will find many goblin camps along the road north of here, the first thing you will need to do is
                   destroy a few of them, this will allow you to get to Pond Meadow, another small village north west of Little Piddleton. Once you have done that, speak to the Mayor of Pond Meadow, he will know what to do next.`,
            Responses: [
                { Text: 'Back', Flag: "LittlePiddletonQuestAccept1", GoToMain: true }
            ]
        },

        "Quest Rejected": {
            Hidden: true,
            Text: `I understand, {PlayerName}. Your journey is your own, and I cannot fault you for choosing your own path. Should you change your mind, the offer will remain open.`,
            Responses: [
                { Text: 'Back', Flag: "LittlePiddletonQuestReject1", GoToMain: true }
            ]
        }

    }
}

export default ScipiusDialogue;