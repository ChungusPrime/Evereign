interface QuestData {
    // The ID of the quest
    ID: string;

    // The name of the quest
    Name: string;

    // The description of the quest
    Description: string;

    // An array of rewards granted for completing the quest
    Rewards?: {ID: string, Quantity: number }[];

    // An array of objectives for the quest
    Objectives: { Text: string, ProgressNeeded: number }[];

    // The data added to the player's quest log when the quest is accepted
    IntitialData?: {
        ID: string;
        ReadyToHandIn: boolean;
        Completed: boolean;
        ObjectiveProgress: {
            Step: number;
            Progress: number;
            Completed: boolean;
            Visible: boolean;
        }[];
    };
    
}

interface DialogueData {

    // Greeting text for the first time meeting the NPC
    FirstTimeGreeting?: string;

    // Standard greeting text for subsequent interactions
    NormalGreeting?: string;

    // Dialogue subjects available with the NPC
    Subjects: {
        [key: string]: {

            Text: string;
            Hidden?: boolean;
            
            // The ID of the quest to progress
            QuestProgressID?: string;

            // The specific objective of the quest to add progress to
            QuestProgressStep?: number;

            // The ID of the quest to complete
            CompleteQuest?: string;

            RequiresFlag?: string;

            Locked?: boolean;

            // Dont show dialogue if the player is on a specific quest
            HideIfOnQuest?: string;

            RequiresQuest?: string;

            Responses?: { 
                Text: string;
                Flag: string;
                EndDialogue?: boolean;
                GrantQuest?: string;
                GoToSubject?: string;
                GoToMain?: boolean;
                DestroyObstacles?: number[];
            }[];
            OtherPerson?: string;
        }
    }

}
